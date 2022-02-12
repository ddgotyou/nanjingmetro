<template>
  <div class="app-container">
    <el-card class="box-card" style="width:100%">
      <div slot="header">监控画面</div>
      <div>
        <el-select v-model="groupPicked" clearable placeholder="请选择摄像头">
          <el-option
            v-for="item in cameraGroup"
            :key="item.id"
            :label="item.group"
            :value="item.group"
          />
        </el-select>
        <div style="margin:10px;">
          <el-button type="primary" @click="show">打开</el-button>
          <el-button @click="terminate">关闭</el-button>
          <el-button @click="pause">暂停</el-button>
          <el-button type="primary" @click="connectAllCamera"
            >开启推流</el-button
          >
          <el-button type="primary" @click="remoteShutdown">终止推流</el-button>
          <span style="margin-left:20px;display:inline-block">服务器接口:</span>
          <span style="margin-left:5px;display:inline-block">{{ wsurl }}</span>
        </div>
      </div>
      <div
        class="monitor-canvas"
        id="location01"
        style="height:200px;width:300px;"
      >
        <canvas
          style="height:200px;width:300px;"
          id="CamPlayerGroup_1"
        ></canvas>
      </div>
      <div
        class="monitor-canvas"
        id="location02"
        style="height:200px;width:300px;"
      >
        <canvas
          style="height:200px;width:300px;"
          id="CamPlayerGroup_2"
        ></canvas>
      </div>
      <div
        class="monitor-canvas"
        id="location03"
        style="height:200px;width:300px;"
      >
        <canvas
          style="height:200px;width:300px;"
          id="CamPlayerGroup_3"
        ></canvas>
      </div>
      <div
        class="monitor-canvas"
        id="location04"
        style="height:200px;width:300px;"
      >
        <canvas
          style="height:200px;width:300px;"
          id="CamPlayerGroup_4"
        ></canvas>
      </div>
      <div
        class="monitor-canvas"
        id="location05"
        style="height:200px;width:300px;"
      >
        <canvas
          style="height:200px;width:300px;"
          id="CamPlayerGroup_5"
        ></canvas>
      </div>
      <div
        class="monitor-canvas"
        id="location06"
        style="height:200px;width:300px;"
      >
        <canvas
          style="height:200px;width:300px;"
          id="CamPlayerGroup_6"
        ></canvas>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  kill,
  turnoff,
  connectAll,
  getAll
} from "@/api/cameraip/cameraip";

export default {
  data: function() {
    return {
      cameraGroup: [],
      groupId: 0,
      groupPicked: "",
      cameraIpResult: [],
      wsurl: "ws://139.224.212.195:8081/",
      player_1: null,
      player_2: null,
      player_3: null,
      player_4: null,
      player_5: null,
      player_6: null
    };
  },

  mounted() {
    this.getAllCamera();
  },

  beforeDestroy() {
    this.terminate();
    this.remoteShutdown();
  },

  methods: {
    getAllCamera() {
      getAll()
        .then(res => {
          this.cameraIpResult = res;
          this.processGroup();
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

    processGroup() {
      var s = this.cameraIpResult.length;
      var isRepeat = false;
      for (let i = 0; i < s; i = i + 1) {
        for (let gd = 0; gd < this.cameraGroup.length; gd = gd + 1) {
          if (this.cameraGroup[gd].value === this.cameraIpResult[i].camgroup) {
            isRepeat = true;
            break;
          }
        }
        if (isRepeat === false) {
          let pushData = {
            id: this.groupId,
            value: this.cameraIpResult[i].camgroup
          };
          this.groupId = this.groupId + 1;
          this.cameraGroup.push(pushData);
        }
        isRepeat = false;
      }
    },

    remoteShutdown() {
      turnoff().then(kill());
    },

    show: function() {
      if (this.player_1 != null) this.player_1.destroy();
      this.player_1 = null;
      if (this.player_2 != null) this.player_2.destroy();
      this.player_2 = null;
      if (this.player_3 != null) this.player_3.destroy();
      this.player_3 = null;
      if (this.player_4 != null) this.player_4.destroy();
      this.player_4 = null;
      if (this.player_5 != null) this.player_5.destroy();
      this.player_5 = null;
      if (this.player_6 != null) this.player_6.destroy();
      this.player_6 = null;

      var willConnect = [];
      var s = this.cameraIpResult.length;
      for (let i = 0; i < s; i = i + 1) {
        if (this.groupPicked === this.cameraIpResult[i].camgroup) {
          willConnect.push(this.cameraIpResult[i]);
        }
      }

      this.player_1 = new JSMpeg.Player(this.wsurl + willConnect[0].wsurl, {
        canvas: document.getElementById("CamPlayerGroup_1"),
        disableGl: true
      });
      this.player_2 = new JSMpeg.Player(this.wsurl + willConnect[1].wsurl, {
        canvas: document.getElementById("CamPlayerGroup_2"),
        disableGl: true
      });
      this.player_3 = new JSMpeg.Player(this.wsurl + willConnect[2].wsurl, {
        canvas: document.getElementById("CamPlayerGroup_3"),
        disableGl: true
      });
      this.player_4 = new JSMpeg.Player(this.wsurl + willConnect[3].wsurl, {
        canvas: document.getElementById("CamPlayerGroup_4"),
        disableGl: true
      });
      this.player_5 = new JSMpeg.Player(this.wsurl + willConnect[4].wsurl, {
        canvas: document.getElementById("CamPlayerGroup_5"),
        disableGl: true
      });
      this.player_6 = new JSMpeg.Player(this.wsurl + willConnect[5].wsurl, {
        canvas: document.getElementById("CamPlayerGroup_6"),
        disableGl: true
      });
      if (this.player_1.paused) this.player_1.play();
      if (this.player_2.paused) this.player_2.play();
      if (this.player_3.paused) this.player_3.play();
      if (this.player_4.paused) this.player_4.play();
      if (this.player_5.paused) this.player_5.play();
      if (this.player_6.paused) this.player_6.play();
    },

    pause: function() {
      if (this.player_1 != null) this.player_1.pause();
      if (this.player_2 != null) this.player_2.pause();
      if (this.player_3 != null) this.player_3.pause();
      if (this.player_4 != null) this.player_4.pause();
      if (this.player_5 != null) this.player_5.pause();
      if (this.player_6 != null) this.player_6.pause();
    },

    terminate: function() {
      if (this.player_1 != null) this.player_1.destroy();
      this.player_1 = null;
      if (this.player_2 != null) this.player_2.destroy();
      this.player_2 = null;
      if (this.player_3 != null) this.player_3.destroy();
      this.player_3 = null;
      if (this.player_4 != null) this.player_4.destroy();
      this.player_4 = null;
      if (this.player_5 != null) this.player_5.destroy();
      this.player_5 = null;
      if (this.player_6 != null) this.player_6.destroy();
      this.player_6 = null;
    }
  }
};
</script>
<style lang="scss" scoped>
.box-card {
  width: 400px;
  max-width: 100%;
  margin: 5px auto;
}
.monitor-canvas {
  margin: 5px;
  display: inline-block;
}
</style>
