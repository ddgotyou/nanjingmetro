<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-card class="box-card" style="margin:10px">
          <div slot="header">
            监控管理
            <el-button type="text" @click="edit" style="margin-left:30px">
              监控查看</el-button
            >
          </div>
          <div style="margin:15px;margin-bottom:20px">
            选择摄像头
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
          </div>
          <div style="margin-left:20px;margin-top:20px">
            <el-button type="primary" @click="connectAllCamera"
              >开启推流</el-button
            >
            <el-button type="warning" @click="remoteShutdown"
              >关闭推流</el-button
            >
            <span class="span-in-card">websocket:</span>
            <el-input
              :style="{ width: '300px', margin: '5px' }"
              v-model="wsurl"
              placeholder="websocket"
            ></el-input>
          </div>
          <el-divider content-position="left">配置</el-divider>
          <div style="margin-left:20px;margin-top:10px">
            <div>
              <span class="span-in-card"
                >账号
                <el-input
                  class="input-in-card"
                  v-model="cameraToAdd.admin"
                  placeholder="账号"
                ></el-input>
              </span>
              <span class="span-in-card"
                >密码
                <el-input
                  class="input-in-card"
                  v-model="cameraToAdd.password"
                  placeholder="密码"
                ></el-input
              ></span>
            </div>
            <div>
              <span class="span-in-card"
                >地址
                <el-input
                  class="input-in-card"
                  v-model="cameraToAdd.ipport"
                  placeholder="ip和端口"
                ></el-input>
              </span>
              <span class="span-in-card"
                >接口
                <el-input
                  class="input-in-card"
                  v-model="cameraToAdd.wsurl"
                  placeholder="wsurl"
                ></el-input>
                <el-popover
                  placement="top-start"
                  width="150"
                  trigger="hover"
                  content="必须以live开头,不可带有空格,建议设置为live0,live1,live2..."
                >
                  <el-button
                    type="info"
                    plain
                    circle
                    icon="el-icon-question"
                    slot="reference"
                  />
                </el-popover>
              </span>
              <span class="span-in-card"
                >分组
                <el-input
                  class="input-in-card"
                  v-model="cameraToAdd.camgroup"
                  placeholder="group"
                ></el-input>
              </span>
            </div>
            <el-button
              :style="{ marginTop: '10px' }"
              type="primary"
              @click="addCam"
              >添加摄像头</el-button
            >
          </div>
          <div style="margin-left:20px;margin-top:10px">
            <el-input
              class="input-in-card"
              v-model="cameraToDel.id"
              placeholder="输入id删除摄像头"
            ></el-input>
            <el-button type="warning" @click="delCam">删除</el-button>
          </div>
        </el-card>
        <el-card class="box-card" style="margin:10px">
          <el-table :data="cameraIpResult">
            <el-table-column prop="id" label="ID" width="40" />
            <el-table-column prop="admin" label="账号" />
            <el-table-column prop="password" label="密码" width="100" />
            <el-table-column prop="ipport" label="IP地址" width="150" />
            <el-table-column prop="wsurl" label="连接url" />
            <el-table-column prop="camgroup" label="分组" />
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="delCamButton(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <!-- 播放器的canvas，v-if用于刷新 -->
      <el-col :span="11" :style="{ margin: '20px' }">
        <canvas
          class="canvas-for-test"
          id="CamPlayer_1"
          v-if="ReloadCanvas"
        ></canvas>
      </el-col>
    </el-row>
  </div>
</template>

<!--
页面使用element-ui，具体tag组件详见https://element.eleme.cn/#/zh-CN/component/installation  （注意版本区别）
-->

<script>
//引入用到的api
import {
  addCam,
  delCam,
  kill,
  turnoff,
  connectAll,
  getAll
} from "@/api/cameraip/cameraip";

export default {
  //定义该Vue页面的数据
  data() {
    return {
      canvas: null,
      wsurl: "ws://139.224.212.195:8081/",
      player_1: null,
      cameraIpSelected: "",
      cameraIpResult: [],
      cameraToAdd: {
        admin: "admin",
        password: "admin123",
        ipport: "192.168.1.:554",
        wsurl: "live0",
        camgroup: "group1"
      },
      cameraToDel: {
        id: null
      },
      ReloadCanvas: true
    };
  },

  //Vue watch属性 在cameraIpSelected值发生变化时刷新播放器
  watch: {
    cameraIpSelected() {
      if (this.player_1 != null) this.player_1.destroy();
      this.player_1 = null;
    }
  },

  //页面加载时执行，从后端接口获取数据
  mounted() {
    this.getAllCamera();
  },

  //离开该页面前，关闭播放器
  beforeDestroy() {
    this.terminate();
    this.remoteShutdown();
  },

  methods: {
    //两个删除数据接口函数，分别对应表格和按钮
    delCamButton(id) {
      let data = { id: id };
      delCam(data).then(res => {
        this.$message({
          message: res
        });
        this.getAllCamera();
      });
    },
    delCam() {
      let data = { id: this.cameraToDel.id };
      delCam(data).then(res => {
        this.$message({
          message: res
        });
        this.getAllCamera();
      });
    },

    //添加数据
    addCam() {
      let data = this.cameraToAdd;
      addCam(data).then(res => {
        this.$message({
          message: res
        });
        this.getAllCamera();
      });
    },

    //获取所有摄像头数据
    getAllCamera() {
      getAll()
        .then(res => {
          this.cameraIpResult = res;
        })
        .catch(error => {
          console.log(error);
        });
    },

    //请求服务器连接摄像头
    connectAllCamera() {
      connectAll()
        .then(res => {
          if (res[0].id === -10) {
            this.$message({ message: res[0].admin });
          } else {
            this.cameraIpResult = res;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    //开启播放器，即新建一个JSMpeg实例，具体使用方法详见https://github.com/phoboslab/jsmpeg
    show() {
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
    },

    //关闭网页上的播放器，this.reload()作用是刷新掉播放器中已停止的画面，使其变成原始灰色
    terminate() {
      if (this.player_1 != null) this.player_1.destroy();
      this.player_1 = null;
      this.reload();
    },

    //请求服务器关闭FFmpeg实例
    remoteShutdown() {
      turnoff().then(kill());
    },

    reload() {
      this.ReloadCanvas = false;
      this.$nextTick(() => {
        this.ReloadCanvas = true;
      });
    },

    //Vue路由跳转到其他页面
    edit() {
      if (this.player_1 != null) this.player_1.destroy();
      this.player_1 = null;
      this.$router.push("zidingyi");
    }
  }
};
</script>
<style>
.input-in-card {
  width: 30vh;
  margin: 5px;
}
.span-in-card {
  margin-left: 5px;
  display: inline-block;
}
.canvas-for-test {
  height: 45vh;
  width: 60vh;
  background-color: rgba(73, 73, 73, 0.137);
  border-radius: 5px;
}
/* css样式 */
</style>
