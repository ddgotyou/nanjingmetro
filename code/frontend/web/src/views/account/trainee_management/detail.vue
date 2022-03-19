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
            <!-- 姓名 -->
            <el-form-item label="姓名">
              <el-input :value="form.name" :readonly="true"></el-input>
            </el-form-item>
            <!-- 性别 -->
            <el-form-item label="性别">
              <el-input :value="getSex" :readonly="true"></el-input>
            </el-form-item>
            <!-- 联系电话 -->
            <el-form-item label="联系电话">
              <el-input :value="form.tel" :readonly="true"></el-input>
            </el-form-item>
            <!-- 邮箱 -->
            <el-form-item label="邮箱">
              <el-input :value="form.email" :readonly="true"></el-input>
            </el-form-item>
            <!-- 身份证号 -->
            <el-form-item label="身份证号">
              <el-input :value="form.idcard" :readonly="true"></el-input>
            </el-form-item>
            <!-- 学员状态 -->
            <el-form-item label="学员状态">
              <el-input :value="getType" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 部门 -->
            <el-form-item label="部门">
              <el-input :value="getDept" :readonly="true"></el-input>
            </el-form-item>
            <!-- 组长 -->
            <el-form-item label="组长">
              <el-input :value="getLeader" :readonly="true"></el-input>
            </el-form-item>
            <!-- 岗位 -->
            <el-form-item label="岗位">
              <el-input :value="getPost" :readonly="true"></el-input>
            </el-form-item>
            <!-- 学历 -->
            <el-form-item label="学历">
              <el-input :value="form.edu" :readonly="true"></el-input>
            </el-form-item>
            <!-- 专业 -->
            <el-form-item label="专业">
              <el-input :value="form.major" :readonly="true"></el-input>
            </el-form-item>
            <!-- 用户组 -->
            <el-form-item label="用户组">
              <el-input :value="getUserGroup" :readonly="true"></el-input>
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

export default {
  directives: {
    resize: resize(),
  },
  data: function () {
    return {
      // label 宽度，自适应
      labelWidth: "auto",

      // 要“编辑”或者查看“详情”的学员的 id
      id: null,

      // 新增、编辑和详情的表单
      form: {
        name: null,
        sex: null,
        tel: null,
        email: null,
        idcard: null,
        usergroup: [],
        dept: [],
        leader: [],
        post: [],
        edu: null,
        major: null,
        status: null,
      },
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
      api.detail(this.id, null).then((response) => {
        this.form = response;
      });
    },
    // 返回上一级菜单
    onCancel() {
      this.$router.push("/account/trainee-management");
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
  .el-autocomplete {
    width: 375px;
  }
  .el-input {
    width: 375px;
  }
  .el-select {
    width: 375px;
  }
}
</style>
