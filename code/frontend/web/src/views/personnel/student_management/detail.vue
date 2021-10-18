<template>
  <div class="app-container">
    <!-- 主体 -->
    <el-card class="card-box" style="width: 100%">
      <!-- 学员信息表单 -->
      <el-form label-width="80px">
        <el-row>
          <el-col :span="12">
            <!-- 姓名 -->
            <el-form-item label="姓名">
              <el-input
                :value="form.name"
                :readonly="true"
                class="same-width"
              ></el-input>
            </el-form-item>
            <!-- 性别 -->
            <el-form-item label="性别">
              <el-input
                :value="getStudentSex"
                :readonly="true"
                class="same-width"
              ></el-input>
            </el-form-item>
            <!-- 联系电话 -->
            <el-form-item label="联系电话">
              <el-input
                :value="form.tel"
                :readonly="true"
                class="same-width"
              ></el-input>
            </el-form-item>
            <!-- 邮箱 -->
            <el-form-item label="邮箱">
              <el-input
                :value="form.email"
                :readonly="true"
                class="same-width"
              ></el-input>
            </el-form-item>
            <!-- 身份证号 -->
            <el-form-item label="身份证号">
              <el-input
                :value="form.idcard"
                :readonly="true"
                class="same-width"
              ></el-input>
            </el-form-item>
            <!-- 用户组 -->
            <el-form-item label="用户组">
              <el-input
                :value="form.usergroup"
                :readonly="true"
                class="same-width"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 部门 -->
            <el-form-item label="部门">
              <el-input
                :value="getStudentDept"
                :readonly="true"
                class="same-width"
              ></el-input>
            </el-form-item>
            <!-- 岗位 -->
            <el-form-item label="岗位">
              <el-input
                :value="form.post"
                :readonly="true"
                class="same-width"
              ></el-input>
            </el-form-item>
            <!-- 学历 -->
            <el-form-item label="学历">
              <el-input
                :value="form.edu"
                :readonly="true"
                class="same-width"
              ></el-input>
            </el-form-item>
            <!-- 专业 -->
            <el-form-item label="专业">
              <el-input
                :value="form.major"
                :readonly="true"
                class="same-width"
              ></el-input>
            </el-form-item>
            <!-- 学员状态 -->
            <el-form-item label="学员状态">
              <el-input
                :value="getStudentStatus"
                :readonly="true"
                class="same-width"
              ></el-input>
            </el-form-item>
            <!-- 电子档案 -->
            <el-form-item>
              <el-button>查看电子档案</el-button>
              <el-button>导出电子档案</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 提交与取消（返回）按钮 -->
        <el-form-item align="center">
          <el-button @click="onCancel">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { studentInfo } from "@/api/personnel/student";

export default {
  data: function () {
    return {
      // 要“编辑”或者查看“详情”的学员的 id
      id: null,

      // 新增、编辑和详情的表单
      form: {
        name: undefined,
        sex: undefined,
        tel: undefined,
        email: undefined,
        idcard: undefined,
        usergroup: undefined,
        dept: [],
        post: undefined,
        edu: undefined,
        major: undefined,
        status: undefined,
      },
    };
  },

  computed: {
    // 将“0/1”转换为“男/女”
    getStudentSex() {
      return this.form.sex === "0" ? "男" : "女";
    },
    // 将部门数组转换为字符串
    getStudentDept() {
      return this.form.dept.join("，");
    },
    // 将“0/1”转换为“正式/临时”
    getStudentStatus() {
      return this.form.status === "0" ? "正式" : "临时";
    },
  },
  mounted: function () {
    // 接受 index 页面传递的参数，并保存
    this.id = this.$route.query.id;
    // 加载该学员的数据
    this.loadData();
  },
  methods: {
    // 加载数据
    loadData() {
      studentInfo(this.id, null).then((response) => {
        this.form = response._embedded.traineeToes[0];
      });
    },
    // 返回上一级菜单
    onCancel() {
      this.$router.push("/personnel/student-management");
    },
  },
};
</script>

<style lang="scss" scoped>
.card-box {
  max-width: 100%;
  margin: 20px auto;
}

.same-width {
  width: 375px;
}
</style>
