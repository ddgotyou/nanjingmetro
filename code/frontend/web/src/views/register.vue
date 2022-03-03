<template>
  <div class="login">
    <!-- 注册 -->
    <el-form
      v-if="display"
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
      <!-- 角色类别 -->
      <el-form-item prop="type">
        <el-select v-model="form.status" placeholder="角色类型">
          <svg-icon
            slot="prefix"
            icon-class="user"
            class="el-input__icon input-icon"
          />
          <el-option
            v-for="item in selection.type"
            :key="item.key"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
      v-if="!display"
      ref="nextStepForm"
      :model="form"
      :rules="registerRules"
      class="register-form"
    >
      <!-- 姓名 -->
      <el-form-item prop="name">
        <el-input v-model="form.nickname" placeholder="姓名"></el-input>
      </el-form-item>
      <!-- 性别 -->
      <el-form-item prop="sex">
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
      <el-form-item prop="tel">
        <el-input v-model="form.tel" placeholder="联系方式"></el-input>
      </el-form-item>
      <!-- 身份证号 -->
      <el-form-item prop="idcard">
        <el-input v-model="form.idcard" placeholder="身份证号"></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item prop="email">
        <el-input v-model="form.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item> </el-form-item>
      <!-- 部门 -->
      <!-- <el-form-item>
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
      </el-form-item> -->
      <!-- 岗位 -->
      <!-- <el-form-item>
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
      </el-form-item> -->
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

    <!--  底部  -->
    <div class="el-login-footer">
      <!-- <span>Copyright © 2018-2021 <a href="http://www.avantport.com">Avantport</a> All Rights Reserved.</span> -->
    </div>
  </div>
</template>

<script>
import { register } from "@/api/register";

export default {
  name: "Register",
  data() {
    return {
      display: true,
      password2: "",
      form: {
        username: "", // 必填
        password: "", // 必填
        type: "", // 必填
        code: "",
        nickname: null,
        sex: null,
        tel: null,
        idcard: "", // 必填
        email: "", // 必填
      },
      selection: {
        sex: [
          { key: "1", label: "男", value: "0" },
          { key: "2", label: "女", value: "1" },
        ],
        dept: [],
        post: [],
        type: [
          { key: "1", label: "正式", value: "0" },
          { key: "2", label: "临时", value: "1" },
        ],
      },
      registerRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" },
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" },
          {
            pattern: /^[0-9A-Za-z]{5,}$/,
            trigger: "blur",
            message: "密码需要由至少5位的数字或字母组成",
          },
        ],
        type: [
          { required: true, trigger: "blur", message: "用户类型不能为空" },
        ],
        name: [{ required: true, trigger: "blur", message: "名称不能为空" }],
        sex: [{ required: true, trigger: "blur", message: "性别不能为空" }],
        tel: [{ required: true, trigger: "blur", message: "联系方式不能为空" }],
        idcard: [
          { required: true, trigger: "blur", message: "请输入身份证号" },
          {
            pattern: /(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            trigger: "blur",
            message: "证件号码格式有误",
          },
        ],
        email: [
          { required: true, trigger: "blur", message: "请输入邮箱地址" },
          {
            type: "email",
            trigger: ["blur", "change"],
            message: "邮箱地址格式有误",
          },
        ],
      },
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
  mounted: function () {
    // 加载下拉框数据
    this.loadData();
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
      this.$refs["registerForm"].validate((valid) => {
        if (valid) {
          if (this.form.password !== this.password2) {
            this.$message.error("两次输入的密码不一致！");
            this.password2 = "";
            return;
          } else {
            this.display = false;
          }
        } else {
          this.$message.error("请按提示填写正确内容！");
        }
      });
    },
    handleReturn() {
      this.$router.push({ path: "/login" }).catch(() => {});
    },
    handleSubmit() {
      // this.form.type = "1";
      this.$refs["nextStepForm"].validate((valid) => {
        if (valid) {
          register(this.form)
            .then((response) => {
              this.$message.success("注册成功！");
              this.$router.push("/login");
            })
            .catch((error) => {
              console.log(error.response.data.error);
            });
        } else {
          this.$message.error("请按提示填写正确内容！");
        }
      });
    },
    handleCancel() {
      this.display = true;
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
.register-form {
  border-radius: 6px;
  background: #fbfdfd;
  width: 400px;
  padding: 25px 25px 5px 25px;
  position: absolute;
  right: 120px;
  bottom: 100px;
  .el-input {
    width: 350px;
    height: 38px;
    input {
      height: 38px;
    }
  }
}
</style>
