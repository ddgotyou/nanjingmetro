<template>
  <el-form
    v-if="display"
    ref="loginForm"
    :model="loginForm"
    :rules="loginRules"
    class="login-form"
  >
    <h3 class="title">南京市城市轨道交通线网实训基地<br />培训管理系统</h3>
    <!-- 账号 -->
    <el-form-item prop="username">
      <el-input
        v-model="loginForm.username"
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
        v-model="loginForm.password"
        type="password"
        auto-complete="off"
        placeholder="密码"
        @keyup.enter.native="handleLogin"
      >
        <svg-icon
          slot="prefix"
          icon-class="password"
          class="el-input__icon input-icon"
        />
      </el-input>
    </el-form-item>
    <!-- 记住密码 -->
    <el-checkbox v-model="loginForm.rememberMe" style="margin-bottom: 25px"
      >记住密码</el-checkbox
    >
    <el-form-item style="width: 100%">
      <!-- 登录 -->
      <el-col :span="12" align="center">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-col>
      <!-- 注册 -->
      <el-col :span="12" align="center">
        <el-button size="medium" @click.native.prevent="handleRegister">
          <span>注 册</span>
        </el-button>
      </el-col>
    </el-form-item>
  </el-form>
</template>

<script>
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";

export default {
  name: "Login",
  props: ["display"],
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "admin123",
        rememberMe: false,
        code: "",
        uuid: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" },
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" },
        ],
        code: [
          { required: true, trigger: "change", message: "验证码不能为空" },
        ],
      },
      loading: false,
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    //this.getCode();
    this.getCookie();
  },
  methods: {
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password:
          password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), {
              expires: 30,
            });
            Cookies.set("rememberMe", this.loginForm.rememberMe, {
              expires: 30,
            });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove("rememberMe");
          }
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" }).catch(() => {});
            })
            .catch(() => {
              this.loading = false;
              //this.getCode();
            });
        }
      });
    },
    handleRegister() {
      this.$emit("register");
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

.login-form {
  border-radius: 6px;
  background: #fbfdfd;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
</style>
