<template>
  <div class="app-container">
    <!-- 主体 -->
    <el-card class="card-box" style="width: 100%">
      <!-- 学员信息表单 -->
      <el-form
        ref="form"
        v-resize="setLabelWidth"
        :label-width="labelWidth"
        label-position="right"
        class="trainee-form"
      >
        <el-row>
          <el-col :span="12">
            <!-- 工号 -->
            <el-form-item label="工号">
              <el-input :value="data.no" :readonly="true"></el-input>
            </el-form-item>
            <!-- 姓名 -->
            <el-form-item label="姓名">
              <el-input :value="data.name" :readonly="true"></el-input>
            </el-form-item>
            <!-- 用户名 -->
            <el-form-item label="用户名">
              <el-input :value="data.username" :readonly="true"></el-input>
            </el-form-item>
            <!-- 部门编号 -->
            <el-form-item label="部门编号">
              <el-input :value="data.deptNo" :readonly="true"></el-input>
            </el-form-item>
            <!-- 部门名称 -->
            <el-form-item label="部门名称">
              <el-input :value="data.deptName" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 岗位类别 -->
            <el-form-item label="岗位类别">
              <el-input :value="data.postType" :readonly="true"></el-input>
            </el-form-item>
            <!-- 岗位编号 -->
            <el-form-item label="岗位编号">
              <el-input :value="data.postNo" :readonly="true"></el-input>
            </el-form-item>
            <!-- 岗位 -->
            <el-form-item label="岗位">
              <el-input :value="data.post" :readonly="true"></el-input>
            </el-form-item>
            <!-- 隶属上级工号 -->
            <el-form-item label="隶属上级工号">
              <el-input :value="data.leaderNo" :readonly="true"></el-input>
            </el-form-item>
            <!-- 隶属上级姓名 -->
            <el-form-item label="隶属上级姓名">
              <el-input :value="data.leaderName" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 提交与取消（返回）按钮 -->
        <div align="center">
          <el-button @click="onCancel">返回</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import * as api from "@/api/account/trainee";
import { resize } from "@/utils/resize";

const inputWidth = 375;

const DATA = {
  no: "",
  name: "",
  username: "320112199710161623",
  deptNo: "2",
  deptName: "南京地铁运营有限公司.工会工作部.工会新入职",
  postType: "技能A",
  post: "调度长",
  postNo: "22",
  leaderNo: "",
  leaderName: "",
};

export default {
  directives: {
    resize: resize(),
  },
  data: function () {
    return {
      // label 宽度，自适应
      labelWidth: "auto",

      data: {},
    };
  },

  computed: {
    // 将“0/1”转换为“男/女”
    getSex() {
      if (this.form.sex === "0") return "男";
      else if (this.form.sex === "1") return "女";
      else return null;
    },
    // 将部门数组转换为字符串
    getDept() {
      return this.form.dept.join("，");
    },
    // 将组长数组转换为字符串
    getLeader() {
      return this.form.leader.join("，");
    },
    // 将岗位数组转换为字符串
    getPost() {
      return this.form.post.join("，");
    },
    // 将用户组数组转换为字符串
    getUserGroup() {
      return this.form.usergroup.join("，");
    },
    // 将“0/1”转换为“正式/临时”
    getType() {
      if (this.form.type === "0") return "正式";
      else if (this.form.type === "1") return "临时";
      else return null;
    },
  },
  mounted: function () {
    // 设置 label 宽度
    this.setLabelWidth();
    // 接受 index 页面传递的参数，并保存
    this.id = this.$route.query.id;
    // 加载该学员的数据
    this.loadData();
  },
  methods: {
    // 设置 label 宽度
    setLabelWidth() {
      let formWidth = this.$refs["form"].$el.clientWidth;
      this.labelWidth = (formWidth / 2 - inputWidth) / 2;
      if (this.labelWidth >= 100) {
        this.labelWidth = this.labelWidth + "px";
      } else {
        this.labelWidth = "100px";
      }
    },
    // 加载数据
    loadData() {
      this.data = DATA;
      // api.detail(this.id, null).then((response) => {
      //   this.form = response;
      // });
    },
    // 返回上一级菜单
    onCancel() {
      this.$router.push("/account/personnel-management");
    },
  },
};
</script>

<style lang="scss" scoped>
.card-box {
  max-width: 100%;
  margin: 20px auto;
}

.trainee-form {
  .el-input {
    width: 325px;
  }
}
</style>
