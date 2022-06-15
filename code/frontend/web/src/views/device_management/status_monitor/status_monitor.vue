<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <span style="margin-right: 10px">分组</span>
        <el-select v-model="selectedGroup" placeholder="选择一个分组">
          <el-option
            v-for="item in ipGroups"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
        <el-button type="primary" style="margin: 5px" @click="getIPAutoConnect"
          >连接</el-button
        >
        <el-button type="warning" style="margin: 5px" @click="handleRefresh"
          >刷新</el-button
        >
        <el-button style="margin: 5px" @click="disconnectAll">终止</el-button>
      </div>
      <div>
        <el-collapse v-model="activeCollapseMonitor" @change="handleCollapse">
          <el-collapse-item title="监控" name="0">
            <div>
              <div class="image-div" v-for="n in DivNum" :key="`none-${n}`">
                <span v-show="ScreenSizeChange[n - 1] == 1">{{
                  ipInfo[n - 1] != null ? "IP为" + `${ipInfo[n - 1].ip}` : "无"
                }}</span>

                <!-- 此处实现了点击方框缩放的功能，两个class用于css替换，替换是由@click点击触发， ScreenSizeChange 和 ScreenIsShow 两个数组维护状态
                具体逻辑是，一个监控画面放大时，其余画面都要隐藏，再次点击时接触该状态 -->
                <div
                  :class="{ 'image-box-enlarge': ScreenSizeChange[n - 1] == 1 }"
                  class="image-box"
                  :id="`screen_${n - 1}`"
                  v-if="ReloadDiv"
                  v-show="ScreenIsShow[n - 1]"
                  @click="setFocus(n - 1)"
                />
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>

    <el-card style="marginTop:5px">
      <el-collapse v-model="activeCollapse" @change="handleCollapse">
        <el-collapse-item title="配置" name="1">
          <div style="margin-left:10px;margin-top:10px">
            <div>
              <span class="span-in-card"
                >IP地址
                <el-input
                  class="input-in-card"
                  v-model="ipInput.ip"
                  placeholder="账号"
                ></el-input>
              </span>
              <span class="span-in-card"
                >端口
                <el-input
                  class="input-in-card"
                  v-model="ipInput.port"
                  placeholder="密码"
                ></el-input
              ></span>
              <span class="span-in-card"
                >分组
                <el-input
                  class="input-in-card"
                  v-model="ipInput.monitorGroup"
                  placeholder="分组"
                ></el-input>
              </span>
              <el-button type="primary" @click="handleAdd">添加</el-button>
            </div>
            <div>
              <span class="span-in-card">
                删除ID
                <el-input
                  id="ip"
                  v-model="ipSelDel"
                  style="width:80%;margin:5px"
                  placeholder="输入ID删除对应项"
                />
              </span>
              <el-button type="warning" style="margin:5px" @click="handleDelete"
                >删除</el-button
              >
            </div>
          </div>

          <el-table :data="ipInfo">
            <el-table-column prop="id" label="ID" width="60" sortable />
            <el-table-column prop="ip" label="被监控机ip" min-width="200" />
            <el-table-column prop="port" label="端口" width="100" />
            <el-table-column
              prop="monitorgroup"
              label="分组"
              min-width="100"
              sortable
            />
            <el-table-column fixed="right" label="操作" width="60">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="delMonitorButton(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
import RFB from "@novnc/novnc/core/rfb";
import { getAllIP, addIP, delIP } from "@/api/IPservice/IPservice";

export default {
  data() {
    return {
      DivNum: 9,
      ipGroups: [],
      selectedGroup: "",
      ipSelDel: null,
      ipInput: { ip: "192.168.1.", port: 9000, monitorGroup: "group1" },
      ipInfo: [],
      ScreenSizeChange: [],
      ScreenIsShow: [],

      //！！！WebSocket地址，远程桌面的实现与摄像头不同，主要依赖 VNC 进行，在被监控机器上运行 Ultra VNC Server ，浏览器配置 noVNC
      //当前大致逻辑是，被监控计算机 →→→ 被监控计算机上的WebSocket
      //                                     ⬇ 
      //                              浏览器所在计算机     （可看到服务器其实不参与）
      // wsURL: "127.0.0.1", //已无实际意义
      RFBPool: [],
      PortWebSocket: 9000,

      ReloadDiv: true,
      activeCollapse: ["1"],
      activeCollapseMonitor: ["0"]
    };
  },

  mounted() {
    for (let i = 0; i < this.DivNum; i++) {
      this.ScreenIsShow.push(true);
      this.ScreenSizeChange.push(0);
    }
    this.getIP();
  },

  methods: {
    handleDelete() {
      this.delIP();
    },
    handleAdd() {
      this.addIP();
    },

    delMonitorButton(id) {
      let data = { id: id };
      delIP(data).then(res => {
        this.$message({
          message: res
        });
        this.getIP();
      });
    },

    delIP() {
      let data = {
        id: this.ipSelDel
      };
      delIP(data).then(res => {
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
      addIP(data).then(res => {
        this.$message({ message: res });
        this.getIP();
      });
    },

    getIP() {
      getAllIP().then(response => {
        this.ipInfo = response;
        this.getGroup();
      });
    },

    getIPAutoConnect() {
      getAllIP().then(response => {
        this.ipInfo = response;
        this.connectVnc();
      });
    },
    //以上均为api

    //提取数据中的分组信息
    getGroup() {
      for (var i = 0; i < this.ipInfo.length; i++) {
        if (this.ipGroups.indexOf(this.ipInfo[i].monitorgroup) == -1) {
          this.ipGroups.push(this.ipInfo[i].monitorgroup);
        }
      }
    },

    //新建VNC连接，项目中引入了noVNC库，这是一个浏览器端的VNC组件，即import RFB from "@novnc/novnc/core/rfb";
    //有关noVNC的各类用法，详见 https://novnc.com/info.html   https://github.com/novnc/noVNC
    connectVnc() {
      //密码来源于VNC服务器的设置
      const PASSWORD = "4396";

      //处理分组
      let needConnect = [];
      for (let i = 0; i < this.ipInfo.length; i = i + 1) {
        if (this.ipInfo[i].monitorgroup === this.selectedGroup) {
          needConnect.push(this.ipInfo[i]);
        }
      }

      let SessionNum = needConnect.length;

      //以下语句新建VNC实例并存入 RFBPool 中以便管理
      for (var i = 0; i < SessionNum && i < 4; i++) {
        let url =
          "ws://" +
          needConnect[i].ip +
          ":" +
          this.PortWebSocket.toString() +
          "/websockify";
        var newRFB = new RFB(
          document.getElementById("screen_" + (i + 1)),
          url,
          {
            credentials: { password: PASSWORD }
          }
        );
        newRFB._viewOnly = true;
        newRFB._scaleViewport = true;
        newRFB._resizeSession = true;
        this.RFBPool.push(newRFB);
      }
    },

    disconnectAll() {
      for (var i = 0; i < this.RFBPool.length; i++) {
        if (this.RFBPool[i] !== null) {
          this.RFBPool[i]._disconnect();
          this.RFBPool[i] = null;
        }
      }
      this.reload();
    },

    handleRefresh() {
      this.disconnectAll();
      this.connectVnc();
    },

    //按照传入的 current值 ，隐藏所有监控画面的div方框，除了点击放大的那个
    screenShowOne(current) {
      for (let i = 0; i < this.ScreenIsShow.length; i = i + 1) {
        if (i !== current) {
          this.$set(this.ScreenIsShow, i, false);
        } else {
          this.$set(this.ScreenIsShow, i, true);
        }
      }
    },

    screenShowAll(current) {
      for (let i = 0; i < this.ScreenIsShow.length; i = i + 1) {
        this.$set(this.ScreenIsShow, i, true);
      }
    },

    setFocus(scrid) {
      for (let i = 0; i < this.DivNum; i = i + 1) {
        if (i === scrid) {
          //显示控制
          if (this.ScreenIsShow.indexOf(false) == -1) {
            //没有false表明没有focus
            this.screenShowOne(i);
          } else {
            this.screenShowAll(i);
          }

          //大小控制 注意对数组操作要用 this.$set
          if (this.ScreenSizeChange[i] === 0) {
            this.$set(this.ScreenSizeChange, i, 1);
          } else {
            this.$set(this.ScreenSizeChange, i, 0);
          }
        }
      }
    },

    //刷新div的方法，清除连接中断后留在网页上的监控图像
    reload() {
      this.ReloadDiv = false;
      this.$nextTick(() => {
        this.ReloadDiv = true;
      });
    },

    handleCollapse(val) {}
  }
};
</script>

<style lang="scss" scoped>
.input-in-card {
  width: 30vh;
  margin: 5px;
}
.span-in-card {
  margin-left: 10px;
  display: inline-block;
}
.image-div {
  margin: 2px;
  margin-right: 10px;
  display: inline-block;
}

/* 以下两个css用于切换，实现监控画面点击放大 */
.image-box {
  height: 30vh;
  width: 40vh;
  border-radius: 5px;
  background: rgba(73, 73, 73, 0.137);
}
.image-box-enlarge {
  height: 60vh;
  width: 80vh;
  border-radius: 5px;
  background: rgba(33, 45, 83, 0.281);
}
</style>
