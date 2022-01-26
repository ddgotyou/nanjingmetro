<template>
  <div class="app-container">
    <el-row>
      <el-col :span="11">
        <el-card class="box-card" style="margin:10px">
          <div slot="header">
            监控管理
            <el-button type="primary" @click="edit" style="margin-left:30px">
              监控查看</el-button
            >
          </div>
          <div style="margin:15px;margin-bottom:20px">
            摄像头：
            <el-select
              size="medium"
              v-model="cameraIpSelected"
              placeholder="摄像头"
              style="width: 250px"
            >
              <el-option
                v-for="item in cameraIpResult"
                :key="item.id"
                :label="item.ipport"
                :value="item.wsurl"
              />
            </el-select>
          </div>

          <div style="margin-left:20px">
            <el-button type="primary" @click="show">显示</el-button>
            <el-button @click="terminate">关闭</el-button>
            <el-button @click="remoteShutdown">终止服务器推流</el-button>
          </div>
          <div style="margin-left:20px;margin-top:20px">
            <el-button type="primary" @click="connectAll">开启推流</el-button>
            <span style="margin-left:10px;display:inline-block"
              >websocket:</span
            >
            <el-input
              :style="{ width: '300px', margin: '5px' }"
              v-model="wsurl"
              placeholder="websocket"
            ></el-input>
          </div>
          <el-divider content-position="left">配置</el-divider>
          <div style="margin-left:20px;margin-top:10px">
            <div>
              <span style="margin-left:10px;display:inline-block"
                >账号：
                <el-input
                  :style="{ width: '200px', margin: '5px' }"
                  v-model="cameraToAdd.admin"
                  placeholder="账号"
                ></el-input>
              </span>
              <span style="margin-left:10px;display:inline-block"
                >密码：
                <el-input
                  :style="{ width: '200px', margin: '5px' }"
                  v-model="cameraToAdd.password"
                  placeholder="密码"
                ></el-input
              ></span>
            </div>
            <div>
              <span style="margin-left:10px;display:inline-block"
                >地址：
                <el-input
                  :style="{ width: '200px', margin: '5px' }"
                  v-model="cameraToAdd.ipport"
                  placeholder="ip和端口"
                ></el-input>
              </span>
              <span style="margin-left:10px;display:inline-block"
                >接口：
                <el-input
                  :style="{ width: '200px', margin: '5px' }"
                  v-model="cameraToAdd.wsurl"
                  placeholder="wsurl"
                ></el-input>
              </span>
              <span style="margin-left:10px;display:inline-block"
                >分组：
                <el-input
                  :style="{ width: '200px', margin: '5px' }"
                  v-model="cameraToAdd.camgroup"
                  placeholder="group"
                ></el-input>
              </span>
            </div>
            <el-button
              :style="{ marginTop: '10px' }"
              type="primary"
              @click="addCam"
              >添加摄像头配置</el-button
            >
          </div>
          <div style="margin-left:20px;margin-top:10px">
            <el-input
              :style="{ width: '200px', margin: '5px' }"
              v-model="cameraToDel.id"
              placeholder="输入id删除摄像头"
            ></el-input>
            <el-button type="primary" @click="delCam">删除</el-button>
          </div>
        </el-card>
        <el-card class="box-card" style="margin:10px">
          <el-table :data="cameraIpResult">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="admin" label="账号" />
            <el-table-column prop="password" label="密码" />
            <el-table-column prop="ipport" label="IP地址" />
            <el-table-column prop="wsurl" label="连接url" />
            <el-table-column prop="camgroup" label="分组" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="11" :style="{ margin: '20px' }">
        <canvas style="height:450px;width:600px;" id="CamPlayer_1"></canvas>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from "@/api/cameraip/cameraip";

export default {
  components: {
    api
  },
  data() {
    return {
      canvas: null,
      wsurl: "ws://10.8.0.1:8081/",
      player_1: null,
      cameraIpSelected: "",
      cameraIpResult: [
        //    {
        //       id: 1,
        //      admin: "admin",
        //      password: "admin123",
        //      ipport: "192.168.1.8:554",
        //      wsurl: "live0",
        //      camgroup
        //    },
      ],
      cameraToAdd: {
        admin: "admin",
        password: "admin123",
        ipport: "192.168.1.:554",
        wsurl: "live0",
        camgroup: "group1"
      },
      cameraGroup: [],
      groupId: 0,
      cameraToDel: {
        id: null
      }
    };
  },
  watch: {
    cameraIpSelected() {
      if (this.player_1 != null) this.player_1.destroy();
      this.player_1 = null;
    }
  },

  mounted() {
    this.getAll();
  },

  beforeDestroy() {
    this.terminate();
    this.remoteShutdown();
  },

  methods: {
    delCam() {
      let data = { id: this.cameraToDel.id };
      api.delCam(data).then(res => {
        this.$message({
          message: res
        });
        //  console.log(res);
        this.getAll();
      });
    },

    addCam() {
      let data = this.cameraToAdd;
      api.addCam(data).then(res => {
        this.$message({
          message: res
        });
        this.getAll();
      });
    },

    getAll() {
      api
        .getAll()
        .then(res => {
          this.cameraIpResult = res;
          this.processGroup();
        })
        .catch(error => {
          console.log(error);
          //  this.$message({
          //    message: error
          //  });
        });
    },
    connectAll() {
      api
        .connectAll()
        .then(res => {
          if (res[0].id === -10) {
            this.$message({ message: res[0].admin });
          } else {
            this.cameraIpResult = res;
          }
        })
        .catch(error => {
          console.log(error);
          //  this.$message({
          //    message: error
          //  });
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

    show: function() {
      if (this.cameraIpSelected === "") {
        return;
      }
      if (this.player_1 != null) this.player_1.destroy();
      this.player_1 = null;

      this.player_1 = new JSMpeg.Player(this.wsurl + this.cameraIpSelected, {
        canvas: document.getElementById("CamPlayer_1"),
        disableGl: true
      });
      if (this.player_1.paused) this.player_1.play();
      //  console.log(this.player_1);
    },

    terminate: function() {
      if (this.player_1 != null) this.player_1.destroy();
      this.player_1 = null;
      //  console.log(this.player_1);
    },

    remoteShutdown() {
      api.turnoff().then(api.kill());
    },

    edit() {
      if (this.player_1 != null) this.player_1.destroy();
      this.player_1 = null;
      this.$router.push("zidingyi");
    }
  }
};
</script>
<style>
/*修正下拉框位置*/
/*.el-select-dropdown {
    top: 400px !important;
    left: 500px !important;
  }*/
</style>
