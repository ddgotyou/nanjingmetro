<template>
  <div class="app-container">
    <el-button type="primary" @click="goto_edit">监控管理</el-button>
    <el-button type="primary" @click="goto_monitor_wall">监控墙</el-button>

    <el-collapse
      class="custom-collapse"
      v-model="activeCollapseStorage"
      @change="handleCollapse"
    >
      <el-collapse-item title="监控视频库" name="0">
        <el-table :data="cameraIpResult">
          <el-table-column prop="id" label="ID" width="60" />
          <el-table-column prop="admin" label="账号" />
          <el-table-column prop="password" label="密码" />
          <el-table-column prop="ipport" label="IP地址" width="250" />
          <el-table-column prop="wsurl" label="连接url" />
          <el-table-column prop="camgroup" label="分组" />
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import {
  addCam,
  delCam,
  kill,
  turnoff,
  connectAll,
  getAll
} from "@/api/cameraip/cameraip";

export default {
  data() {
    return {
      cameraIpResult: [],
      activeCollapseStorage: ["0"]
    };
  },

  mounted() {
    this.getAllCamera();
  },

  methods: {
    getAllCamera() {
      getAll()
        .then(res => {
          this.cameraIpResult = res;
        })
        .catch(error => {
          console.log(error);
          //  this.$message({
          //    message: error
          //  });
        });
    },

    goto_edit() {
      this.$router.push("jiankongguanli");
    },
    goto_monitor_wall() {
      this.$router.push("zidingyi");
    },

    handleCollapse(val) {}
  }
};
</script>
<style lang="scss" scoped>
.box-card {
  width: 400px;
  max-width: 100%;
  margin: 10px auto;
}
.custom-collapse {
  margin: 10px;
}
</style>
