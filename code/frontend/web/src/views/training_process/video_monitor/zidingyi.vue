<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header">
        监控画面
        <el-button
          type="text"
          @click="goto_management"
          style="margin-left:30px"
        >
          监控管理</el-button
        >
      </div>
      <div class="monitor-div">
        <el-select
          v-model="groupPicked"
          clearable
          placeholder="选择分组"
          class="select-in-monitor"
        >
          <el-option
            v-for="item in cameraGroup"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-button type="primary" @click="InitPlayer">开启</el-button>
        <el-button @click="terminate">关闭</el-button>
        <el-button type="warning" @click="remoteShutdown">终止推流</el-button>
        <span style="margin-left:20px;display:inline-block">服务器接口</span>
        <el-input
          id="wsurl"
          v-model="wsurl"
          name="wsurl"
          style="margin: 5px; width: 30%"
        />

        <el-button
          type="info"
          plain
          circle
          icon="el-icon-circle-plus-outline"
          @click="canvasResizeEnlarge"
        ></el-button>
        <el-button
          type="info"
          plain
          circle
          icon="el-icon-remove-outline"
          @click="canvasResizeShrink"
        ></el-button>
      </div>

      <!-- 通过v-for循环生成DivNum个canvas，注意id和key用于对生成内容进行区分
      canvasResize用于调整大小 -->
      <div>
        <div class="canvas-div" v-for="n in DivNum" :key="`none-${n}`">
          <canvas
            :style="canvasResize"
            class="monitor-canvas"
            :id="`CamPlayerGroup_${n}`"
            v-if="ReloadCanvas"
          ></canvas>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { kill, turnoff, connectAll, getAll } from "@/api/cameraip/cameraip";

export default {
  data: function() {
    return {
      cameraGroup: [],
      groupId: 0,
      groupPicked: "",
      cameraIpResult: [],

      //！！！WebSocket地址，注意由于监控画面的传输都是 服务器 →→→ 浏览器 形式，此种服务器连续主动向浏览器发送数据的形式HTTP请求不支持，故需要 WebSocket 
      //当前大致逻辑是，摄像头 →→→ 服务器上的FFmpeg
      //                             ⬇ 
      //                   服务器上的WebSocket →→→ 浏览器
      //因此要获得监控，必须输入正确的WebSocket地址，例如服务器当前在192.168.1.108:8080（内网 + 端口）上运行，
      //就请求 ws://192.168.1.108:8080/live0 （live + 任意字符）形式，这样服务器的WebSocket能捕获该请求并在有监控画面时不断进行传输
      wsurl: "ws://139.224.212.195:8081/",  

      JsPlayerPool: [],   //对新建的多个Jsmpeg播放器进行管理
      DivNum: 5,
      ReloadCanvas: true,
      CanvasWidth: 40,
      CanvasHeight: 30
    };
  },

  //computed是Vue的计算属性，即CanvasHeight与CanvasWidth一旦发生变化，就自动执行该函数调整大小
  computed: {
    canvasResize() {
      return {
        "--CanvasHeight": this.CanvasHeight + "vh",
        "--CanvasWidth": this.CanvasWidth + "vh"
      };
    }
  },

  methods: {
    canvasResizeEnlarge() {
      if (this.CanvasHeight < 80) {
        this.CanvasHeight = this.CanvasHeight + 5;
        this.CanvasWidth = this.CanvasWidth + 5;
      }
    },
    canvasResizeShrink() {
      if (this.CanvasHeight > 20) {
        this.CanvasHeight = this.CanvasHeight - 5;
        this.CanvasWidth = this.CanvasWidth - 5;
      }
    },

    getAllCamera() {
      getAll()
        .then(res => {
          this.cameraIpResult = res;
          this.getGroup();
        })
        .catch(error => {
          console.log(error);
        });
    },

    connectAllCamera() {
      connectAll()
        .then(res => {
          if (res[0].id === -10) {
            this.$message.error({ message: res[0].admin });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    getGroup() {
      for (var i = 0; i < this.cameraIpResult.length; i++) {
        if (this.cameraGroup.indexOf(this.cameraIpResult[i].camgroup) == -1) {
          this.cameraGroup.push(this.cameraIpResult[i].camgroup);
          this.groupId = this.groupId + 1;
        }
      }
    },

    remoteShutdown() {
      turnoff().then(kill());
    },

    //初始化播放器，准备播放摄像头监控画面
    InitPlayer() {
      this.connectAllCamera();

      //从数据中依据分组得出要连接的摄像头
      var willConnect = [];
      var s = this.cameraIpResult.length;
      for (let i = 0; i < s; i = i + 1) {
        if (this.groupPicked === this.cameraIpResult[i].camgroup) {
          willConnect.push(this.cameraIpResult[i]);
        }
      }

      //新建相应数量的Jsmpeg，并存入JsPlayerPool[] 以便管理
      for (let i = 0; i < willConnect.length; i = i + 1) {
        let TmpPlayer = null;
        TmpPlayer = new JSMpeg.Player(this.wsurl + willConnect[i].wsurl, {
          canvas: document.getElementById("CamPlayerGroup_" + (i + 1)),
          disableGl: true   //使用WebGL导致视频流无法正确播放，不确定原因
        });
        if (TmpPlayer.paused) TmpPlayer.play();
        this.JsPlayerPool.push(TmpPlayer);
      }
    },

    terminate() {
      this.remoteShutdown();
      for (let i = 0; i < this.JsPlayerPool.length; i = i + 1) {
        if (this.JsPlayerPool[i] != null) this.JsPlayerPool[i].destroy();
        this.JsPlayerPool[i] = null;
      }
      this.reload();
    },

    reload() {
      this.ReloadCanvas = false;
      this.$nextTick(() => {
        this.ReloadCanvas = true;
      });
    },

    goto_management() {
      if (this.player_1 != null) this.player_1.destroy();
      this.player_1 = null;
      this.$router.push("jiankongguanli");
    }
  },

  mounted() {
    this.getAllCamera();
  },

  beforeDestroy() {
    this.terminate();
  }
};
</script>
<style lang="scss" scoped>
.box-card {
  min-width: 400px;
  max-width: 100%;
  margin: 3px;
}
.canvas-div {
  margin: 2px;
  display: inline-block;
}
.monitor-div {
  margin: 5px;
}

/* 注意Css变量  var(--CanvasHeight)  的用法 */
.monitor-canvas {
  height: var(--CanvasHeight);
  width: var(--CanvasWidth);
  background-color: rgba(73, 73, 73, 0.137);
  border-radius: 5px;
}
.select-in-monitor {
  margin-right: 5px;
  display: inline-block;
}
</style>
