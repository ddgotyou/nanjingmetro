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
      wsurl: "ws://192.168.1.110:8081/", //139.224.212.195
      JsPlayerPool: [],
      DivNum: 15,
      ReloadCanvas: true,
      CanvasWidth: 40,
      CanvasHeight: 30
    };
  },

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

    InitPlayer() {
      this.connectAllCamera();

      var willConnect = [];
      var s = this.cameraIpResult.length;
      for (let i = 0; i < s; i = i + 1) {
        if (this.groupPicked === this.cameraIpResult[i].camgroup) {
          willConnect.push(this.cameraIpResult[i]);
        }
      }

      for (let i = 0; i < willConnect.length; i = i + 1) {
        let TmpPlayer = null;
        TmpPlayer = new JSMpeg.Player(this.wsurl + willConnect[i].wsurl, {
          canvas: document.getElementById("CamPlayerGroup_" + (i + 1)),
          disableGl: true
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
