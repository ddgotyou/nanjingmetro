<template>
  <div class="login">
    <!-- 登录 -->
    <login-form
      :display="display.login"
      @register="handleRegister"
    ></login-form>
    <!-- 注册 -->
    <register-form
      :display="display.register"
      @return="handleReturn"
      @display="handleDisplayChange"
    ></register-form>

    <!--  底部  -->
    <div class="el-login-footer">
      <!-- <span>Copyright © 2018-2021 <a href="http://www.avantport.com">Avantport</a> All Rights Reserved.</span> -->
    </div>
  </div>
</template>

<script>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import LoginForm from "./login/LoginForm.vue";
import RegisterForm from "./login/RegisterForm.vue";

export default {
  components: { LoginForm, RegisterForm },
  name: "Login",
  data() {
    return {
      display: { login: true, register: false },
      codeUrl: "",
      cookiePassword: "",
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
  created() {},
  methods: {
    handleRegister() {
      this.display.login = false;
      this.display.register = true;
    },
    handleReturn() {
      this.display.register = false;
      this.display.login = true;
    },
    handleDisplayChange(value) {
      this.display.register = value;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.jpeg");
  background-size: cover;
}
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
  position: absolute;
  right: 120px;
  bottom: 100px;
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
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
</style>
