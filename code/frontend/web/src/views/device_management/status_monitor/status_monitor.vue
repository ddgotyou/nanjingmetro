<template>
  <div class="app-container">
    <el-card class="card-box" style="width: 100%">
      <div slot="header">
        <span style="margin-right: 20px">组:</span>
        <el-select v-model="selectedGroup" placeholder="组">
          <el-option
            v-for="item in groups"
            :key="item.id"
            :label="item.value"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <el-button style="margin: 5px" @click="handleRefresh">刷新</el-button>
        <el-button style="margin: 5px" @click="disconnectAll">终止</el-button>
      </div>
      <div>
        <el-collapse v-model="activeCollapseMonitor" @change="handleCollapse">
          <el-collapse-item title="监控" name="0">
            <div style="width: 100%; height: 100%; float: left;">
              <div
                class="image-box"
                id="screen1"
                v-show="ScreenIsShow[0]"
                @click="setFocus(1)"
                :style="{
                  width: videoWidth1 + 'px',
                  height: videoHeight1 + 'px',
                  float: 'left'
                }"
              ></div>

              <div
                class="image-box"
                id="screen2"
                v-show="ScreenIsShow[1]"
                @click="setFocus(2)"
                :style="{
                  width: videoWidth2 + 'px',
                  height: videoHeight2 + 'px',
                  float: 'left'
                }"
              ></div>

              <div
                class="image-box"
                id="screen3"
                v-show="ScreenIsShow[2]"
                @click="setFocus(3)"
                :style="{
                  width: videoWidth3 + 'px',
                  height: videoHeight3 + 'px',
                  float: 'left'
                }"
              ></div>

              <div
                class="image-box"
                id="screen4"
                v-show="ScreenIsShow[3]"
                @click="setFocus(4)"
                :style="{
                  width: videoWidth4 + 'px',
                  height: videoHeight4 + 'px',
                  float: 'left'
                }"
              ></div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>

    <el-card class="card-box" style="width: 100%">
      <div>
        <el-collapse v-model="activeCollapse" @change="handleCollapse">
          <el-collapse-item title="配置" name="1">
            <el-row style="margin: 10px">
              <el-col :span="12">
                ip:
                <el-input
                  id="ip"
                  v-model="ipInput.ip"
                  style="width:80%;margin:5px"
                />
              </el-col>
              <el-col :span="8">
                port:
                <el-input
                  id="port"
                  v-model="ipInput.port"
                  style="width:80%;margin:5px"
                />
              </el-col>
              <el-col :span="8">
                组:
                <el-input
                  id="port"
                  v-model="ipInput.monitorGroup"
                  style="width:80%;margin:5px"
                />
              </el-col>
              <el-col :span="4">
                <el-button type="primary" style="margin:5px" @click="handleAdd"
                  >提交</el-button
                >
              </el-col>
            </el-row>
            <el-row style="margin: 10px">
              <el-col :span="12">
                id:
                <el-input
                  id="ip"
                  v-model="ipSelDel"
                  style="width:80%;margin:5px"
                />
              </el-col>
              <el-col :span="6">
                <el-button
                  type="primary"
                  style="margin:5px"
                  @click="handleDelete"
                  >删除</el-button
                >
              </el-col>
            </el-row>

            <el-table class="custom-table" :data="ipInfo" border>
              <el-table-column prop="id" label="ID" width="60" />
              <el-table-column prop="ip" label="被监控机ip" width="180" />
              <el-table-column prop="port" label="端口" width="180" />
              <el-table-column prop="monitorgroup" label="组" width="180" />
            </el-table>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
  </div>
</template>

<script>
import RFB from "@novnc/novnc/core/rfb";
import api from "@/api/IPservice/IPservice";

export default {
  components: {
    api
  },
  data() {
    return {
      groups: [],
      groupId: 0,
      selectedGroup: "",
      ipSelDel: 1,
      ipInput: { ip: "192.168.1.", port: 9000, monitorGroup: "group1" },
      ipInfo: [],
      SignalScreenSizeChange: [0, 0, 0, 0],
      ScreenIsShow: [true, true, true, true],
      wsURL: "127.0.0.1",
      RFBPool: [],
      PortWebSocket: 9000,
      wscreen: [
        {
          scre: "screen1"
        },
        {
          scre: "screen2"
        },
        {
          scre: "screen3"
        },
        {
          scre: "screen4"
        }
      ],

      activeCollapse: ["1"],
      activeCollapseMonitor: ["0"]
    };
  },

  mounted() {
    this.getIP();
  },

  methods: {
    handleDelete() {
      this.delIP();
    },

    handleAdd() {
      this.addIP();
    },

    delIP() {
      let data = {
        id: this.ipSelDel
      };
      api.delIP(data).then(res => {
        this.$message({ message: res });
        this.getIP();
      });
    },

    addIP() {
      let data = {
        ip: this.ipInput.ip,
        port: this.ipInput.port,
        monitorgroup: this.ipInput.monitorGroup
      };
      api.addIP(data).then(res => {
        this.$message({ message: res });
        this.getIP();
      });
    },

    getIP() {
      api.getAllIP().then(response => {
        this.ipInfo = response;
        this.processGroup();
      });
    },

    getIPAutoConnect() {
      api.getAllIP().then(response => {
        this.ipInfo = response;
        this.connectVnc();
      });
    },

    processGroup() {
      var s = this.ipInfo.length;
      var isRepeat = false;
      for (let i = 0; i < s; i = i + 1) {
        for (let gd = 0; gd < this.groups.length; gd = gd + 1) {
          if (this.groups[gd].value === this.ipInfo[i].monitorgroup) {
            isRepeat = true;
            break;
          }
        }
        if (isRepeat === false) {
          let pushData = {
            id: this.groupId,
            value: this.ipInfo[i].monitorgroup
          };
          this.groupId = this.groupId + 1;
          this.groups.push(pushData);
        }
        isRepeat = false;
      }
    },

    // vnc连接断开的回调函数
    //  disconnectedFromServer(msg) {
    //    if (msg.detail.clean) {
    //      // 根据 断开信息的msg.detail.clean 来判断是否可以重新连接
    //      //this.connectVnc()
    //    } else {
    //      //这里做不可重新连接的一些操作
    //      //console.log('链接失败,重新链接中-------' + this.wsURL)
    //      //this.connectVnc()
    //    }
    //  },
    //  // 连接成功的回调函数
    //  connectedToServer(msg) {
    //    // console.log('success', msg)
    //  },

    //连接vnc的函数
    connectVnc() {
      const PASSWORD = "4396";
      let needConnect = [];
      for (let i = 0; i < this.ipInfo.length; i = i + 1) {
        if (this.ipInfo[i].monitorgroup === this.selectedGroup) {
          needConnect.push(this.ipInfo[i]);
        }
      }
      let SessionNum = needConnect.length;
      //  console.log(`read ${SessionNum} ip to connect.`);
      for (var i = 0; i < SessionNum && i < 4; i++) {
        //  if(this.RFBPool[i]!==null){
        //    this.RFBPool[i]._disconnect();
        //    this.RFBPool[i]=null;
        //    document.getElementById(this.wscreen[i].scrt).innerHTML='';
        //  }
        //  this.RFBPool[i]=null;
        let url =
          "ws://" +
          needConnect[i].ip +
          ":" +
          this.PortWebSocket.toString() +
          "/websockify";
        //  this.PortWebSocket = this.PortWebSocket + 1;
        console.log("连接至" + url);
        var newRFB = new RFB(
          document.getElementById(this.wscreen[i].scre),
          url,
          {
            credentials: { password: PASSWORD }
          }
        );
        newRFB._viewOnly = true;
        newRFB._scaleViewport = true;
        newRFB._resizeSession = true;
        this.RFBPool.push(newRFB);
        //   document.getElementById(this.wscreen[i].scrt).innerHTML = this.chosM[i];
      }
    },

    disconnectAll() {
      for (var i = 0; i < this.RFBPool.length; i++) {
        if (this.RFBPool[i] !== null) {
          this.RFBPool[i]._disconnect();
          this.RFBPool[i] = null;
        }
      }
    },

    handleRefresh() {
      this.disconnectAll();
      this.connectVnc();
    },

    //handleConnectChange() {
    //  this.disconnectAll();
    //  var i = 0;
    //  var size = this.ipInfo.length; //BUG
    //  for (i = 0; i < size; i = i + 1) {
    //    if (this.ipInfo[i] != null) {
    //      var tempIpList = this.ipInfo[i].ip.split(".");
    //      if (tempIpList[2] === this.ScreenGroup) {
    //        this.ipReadyToConnect.push(this.ipInfo[i]);
    //      }
    //    }
    //  }
    //  //  this.connectSixVnc();
    //},

    signalScreenSizeChangeUpdateOne(current) {
      var i = 0;
      for (i = 0; i < this.SignalScreenSizeChange.length; i = i + 1) {
        if (i !== current) {
          this.$set(this.SignalScreenSizeChange, i, 0);
        } else {
          //  console.log("set SSSC " + i + " to true");
          this.$set(this.SignalScreenSizeChange, i, 1);
        }
      }
    },

    screenIsShowUpdateOne(current) {
      var i = 0;
      for (i = 0; i < this.ScreenIsShow.length; i = i + 1) {
        if (i !== current) {
          this.$set(this.ScreenIsShow, i, false);
        } else {
          //  console.log("set SIS " + i + " to true");
          this.$set(this.ScreenIsShow, i, true);
        }
      }
    },

    screenUpdateShowAll(current) {
      var i = 0;
      for (i = 0; i < this.ScreenIsShow.length; i = i + 1) {
        if (i !== current) {
          this.$set(this.ScreenIsShow, i, true);
        } else {
          this.$set(this.SignalScreenSizeChange, i, 0);
        }
      }
    },

    setFocus: function(scrid) {
      switch (scrid) {
        case 1:
          if (this.SignalScreenSizeChange[0] == 0) {
            this.signalScreenSizeChangeUpdateOne(0);
            this.screenIsShowUpdateOne(0);
          } else {
            this.screenUpdateShowAll(0);
          }
          break;
        case 2:
          if (this.SignalScreenSizeChange[1] == 0) {
            this.signalScreenSizeChangeUpdateOne(1);
            this.screenIsShowUpdateOne(1);
          } else {
            this.screenUpdateShowAll(1);
          }
          break;
        case 3:
          if (this.SignalScreenSizeChange[2] == 0) {
            this.signalScreenSizeChangeUpdateOne(2);
            this.screenIsShowUpdateOne(2);
          } else {
            this.screenUpdateShowAll(2);
          }
          break;
        case 4:
          if (this.SignalScreenSizeChange[3] == 0) {
            this.signalScreenSizeChangeUpdateOne(3);
            this.screenIsShowUpdateOne(3);
          } else {
            this.screenUpdateShowAll(3);
          }
          break;
      }
    },

    handleCollapse(val) {
      //  console.log(val);
    }
  },

  computed: {
    videoWidth1: {
      get: function() {
        if (this.SignalScreenSizeChange[0] == 0) {
          return 300;
        } else if (this.SignalScreenSizeChange[0] == 1) {
          return 800;
        }
      }
    },
    videoHeight1: {
      get: function() {
        if (this.SignalScreenSizeChange[0] == 0) {
          return 300;
        } else if (this.SignalScreenSizeChange[0] == 1) {
          return 600;
        }
      }
    },
    videoWidth2: {
      get: function() {
        if (this.SignalScreenSizeChange[1] == 0) {
          return 300;
        } else if (this.SignalScreenSizeChange[1] == 1) {
          return 800;
        }
      }
    },
    videoHeight2: {
      get: function() {
        if (this.SignalScreenSizeChange[1] == 0) {
          return 300;
        } else if (this.SignalScreenSizeChange[1] == 1) {
          return 600;
        }
      }
    },
    videoWidth3: {
      get: function() {
        if (this.SignalScreenSizeChange[2] == 0) {
          return 300;
        } else if (this.SignalScreenSizeChange[2] == 1) {
          return 800;
        }
      }
    },
    videoHeight3: {
      get: function() {
        if (this.SignalScreenSizeChange[2] == 0) {
          return 300;
        } else if (this.SignalScreenSizeChange[2] == 1) {
          return 600;
        }
      }
    },
    videoWidth4: {
      get: function() {
        if (this.SignalScreenSizeChange[3] == 0) {
          return 300;
        } else if (this.SignalScreenSizeChange[3] == 1) {
          return 800;
        }
      }
    },
    videoHeight4: {
      get: function() {
        if (this.SignalScreenSizeChange[3] == 0) {
          return 300;
        } else if (this.SignalScreenSizeChange[3] == 1) {
          return 600;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.card-box {
  width: 400px;
  max-width: 100%;
  margin: 20px auto;
}

.image-box {
  width: 100%;
  height: 100%;
  // border: 5px solid red;
  background: rgb(54, 54, 54);
  margin: 10px;
}

.custom-table {
  margin: 10px;
}
</style>
