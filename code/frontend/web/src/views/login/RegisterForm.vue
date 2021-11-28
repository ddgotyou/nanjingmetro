<template>
  <div>
    <!-- 注册 -->
    <el-form
      v-if="displayRegister"
      ref="registerForm"
      :model="form"
      :rules="registerRules"
      class="register-form"
    >
      <h3 class="title">南京市城市轨道交通线网实训基地<br />培训管理系统</h3>
      <!-- 账号 -->
      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          type="text"
          auto-complete="off"
          placeholder="账号"
        >
          <svg-icon
            slot="prefix"
            icon-class="user"
            class="el-input__icon input-icon"
          />
        </el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
        >
          <svg-icon
            slot="prefix"
            icon-class="password"
            class="el-input__icon input-icon"
          />
        </el-input>
      </el-form-item>
      <!-- 确认密码 -->
      <el-form-item prop="password">
        <el-input
          v-model="password2"
          type="password"
          auto-complete="off"
          placeholder="确认密码"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon
            slot="prefix"
            icon-class="password"
            class="el-input__icon input-icon"
          />
        </el-input>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item style="width: 100%">
        <!-- 下一步 -->
        <el-col :span="12" align="center">
          <el-button
            size="medium"
            type="primary"
            @click.native.prevent="handleNextStep"
          >
            <span>下一步</span>
          </el-button>
        </el-col>
        <!-- 返回 -->
        <el-col :span="12" align="center">
          <el-button size="medium" @click.native.prevent="handleReturn">
            <span>返 回</span>
          </el-button>
        </el-col>
      </el-form-item>
    </el-form>

    <!-- 下一步 -->
    <el-form
      v-if="displayNextStep"
      ref="nextStepForm"
      :model="form"
      class="register-form"
    >
      <!-- 姓名 -->
      <el-form-item>
        <el-input v-model="form.name" placeholder="姓名"></el-input>
      </el-form-item>
      <!-- 性别 -->
      <el-form-item>
        <el-select v-model="form.sex" placeholder="性别">
          <el-option
            v-for="item in selection.sex"
            :key="item.key"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!-- 联系方式 -->
      <el-form-item>
        <el-input v-model="form.tel" placeholder="联系方式"></el-input>
      </el-form-item>
      <!-- 身份证号 -->
      <el-form-item>
        <el-input v-model="form.idcard" placeholder="身份证号"></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item>
        <el-input v-model="form.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <!-- 部门 -->
      <el-form-item>
        <el-select
          v-model="form.dept"
          filterable
          allow-create
          multiple
          collapse-tags
          placeholder="部门"
        >
          <el-option
            v-for="item in selection.dept"
            :key="item.key"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!-- 岗位 -->
      <el-form-item>
        <el-select
          v-model="form.post"
          filterable
          allow-create
          placeholder="岗位"
        >
          <el-option
            v-for="item in selection.post"
            :key="item.key"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item>
        <el-col :span="12" align="center">
          <el-button
            size="medium"
            type="primary"
            @click.native.prevent="handleSubmit"
          >
            <span>确 认</span>
          </el-button>
        </el-col>
        <el-col :span="12" align="center">
          <el-button size="medium" @click.native.prevent="handleCancel">
            <span>取 消</span>
          </el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import all from "@/api/personnel/selection";

export default {
  name: "Register",
  props: ["display"],
  data() {
    return {
      displayNextStep: false,
      password2: "",
      form: {
        username: "",
        password: "",
        code: "",
        name: "",
        sex: "",
        tel: "",
        idcard: "",
        emial: "",
        dept: [],
        post: "",
      },
      selection: {
        sex: [
          { key: "1", label: "男", value: "0" },
          { key: "2", label: "女", value: "1" },
        ],
        dept: [],
        post: [],
      },
      registerRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" },
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" },
        ],
      },

      // 添加部门的基础 key
      baseKey: 999,
      // 添加部门输入框的当前值
      deptInput: undefined,
    };
  },
  computed: {
    displayRegister: {
      get() {
        return this.display;
      },
      set(value) {
        this.$emit("display", value);
      },
    },
  },
  mounted: function () {
    // 加载下拉框数据
    this.loadData();
  },
  created() {
    // this.getCode();
    // this.getCookie();
  },
  methods: {
    async loadData() {
      // listDept(null).then((response) => {
      //   this.selection.dept = response._embedded.dboxVoes;
      // });
      // listPost(null).then((response) => {
      //   this.selection.post = response._embedded.dboxVoes;
      // });
    },
    handleNextStep() {
      if (this.form.password !== this.password2) {
        this.$message.error("两次输入的密码不一致！");
        this.password2 = "";
        return;
      }

      this.displayRegister = false;
      this.displayNextStep = true;
    },
    handleReturn() {
      this.$emit("return");
    },
    handleSubmit() {
      console.log(this.form);
    },
    handleCancel() {
      this.displayNextStep = false;
      this.displayRegister = true;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.register-form {
  border-radius: 6px;
  background: #fbfdfd;
  width: 400px;
  padding: 25px 25px 5px 25px;
  text-align: center;
  .el-input {
    width: 350px;
    height: 38px;
    input {
      height: 38px;
    }
  }
}
</style>
