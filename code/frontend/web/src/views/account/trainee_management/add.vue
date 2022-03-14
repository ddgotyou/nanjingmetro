<template>
  <div class="app-container">
    <!-- 主体 -->
    <el-card class="card-box" style="width: 100%">
      <!-- 学员信息表单 -->
      <el-form
        ref="form"
        v-resize="setLabelWidth"
        :model="form"
        :rules="rules"
        :label-width="labelWidth"
        label-position="right"
        class="trainee-form"
      >
        <el-row>
          <el-col :span="12">
            <!-- 姓名 -->
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <!-- 性别 -->
            <el-form-item label="性别">
              <el-select v-model="form.sex">
                <el-option
                  v-for="item in selection.sex"
                  :key="item.key"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <!-- 联系电话 -->
            <el-form-item label="联系电话">
              <el-input v-model="form.tel"></el-input>
            </el-form-item>
            <!-- 邮箱 -->
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <!-- 身份证号 -->
            <el-form-item label="身份证号" prop="idcard">
              <el-input v-model="form.idcard"></el-input>
            </el-form-item>
            <!-- 学员状态 -->
            <el-form-item label="学员状态" prop="type">
              <el-select v-model="form.type">
                <el-option
                  v-for="item in selection.type"
                  :key="item.key"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 部门 -->
            <el-form-item label="部门">
              <el-select
                v-model="form.dept"
                filterable
                allow-create
                multiple
                collapse-tags
                @change="handleChange"
              >
                <el-option
                  v-for="item in selection.dept"
                  :key="item.key"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <!-- 组长 -->
            <el-form-item label="组长">
              <el-select
                v-model="form.leader"
                multiple
                collapse-tags
                placeholder="不是组长"
              >
                <el-option
                  v-for="item in selection.leader"
                  :key="item.key"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>
            <!-- 岗位 -->
            <el-form-item label="岗位">
              <el-select v-model="form.post" filterable allow-create>
                <el-option
                  v-for="item in selection.post"
                  :key="item.key"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <!-- 学历 -->
            <el-form-item label="学历">
              <el-select v-model="form.edu" filterable allow-create>
                <el-option
                  v-for="item in selection.edu"
                  :key="item.key"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <!-- 专业 -->
            <el-form-item label="专业">
              <el-select v-model="form.major" filterable allow-create>
                <el-option
                  v-for="item in selection.major"
                  :key="item.key"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <!-- 用户组 -->
            <el-form-item label="用户组">
              <el-select v-model="form.usergroup" multiple collapse-tags>
                <el-option
                  v-for="item in selection.usergroup"
                  :key="item.key"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 提交与取消按钮 -->
        <div align="center">
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="onCancel">取消</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import * as api from "@/api/account/trainee";
import * as sel from "@/api/account/selection";
import { resize } from "@/utils/resize";
import inputWidth from "../global";

export default {
  directives: {
    resize: resize(),
  },
  data: function () {
    return {
      // label 宽度，自适应
      labelWidth: "auto",

      // 新增表单
      form: {
        name: "", // 必填
        sex: null,
        tel: null,
        email: "", // 必填
        idcard: "", // 必填
        usergroup: [], // 必填
        dept: [],
        leader: [],
        post: null,
        edu: null,
        major: null,
        type: "", // 必填
      },
      // form: {
      //   name: "测试学员", // 必填
      //   sex: "0",
      //   tel: null,
      //   email: "test@163.com", // 必填
      //   idcard: "123000199901010001", // 必填
      //   usergroup: [999], // 必填
      //   dept: [],
      //   leader: [],
      //   post: "普通员工",
      //   edu: "本科",
      //   major: null,
      //   type: "0", // 必填
      // },

      // 表单中的选项值
      selection: {
        sex: [
          { key: "1", label: "男", value: "0" },
          { key: "2", label: "女", value: "1" },
        ],
        usergroup: [],
        dept: [],
        post: [],
        edu: [],
        major: [],
        type: [
          { key: "1", label: "正式", value: "0" },
          { key: "2", label: "临时", value: "1" },
        ],
        leader: [],
      },

      // 填写规则
      rules: {
        name: [
          {
            type: "string",
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
        email: [
          {
            type: "string",
            required: true,
            message: "请输入邮箱地址",
            trigger: "blur",
          },
          {
            type: "email",
            message: "邮箱地址格式有误",
            trigger: ["blur", "change"],
          },
        ],
        idcard: [
          {
            type: "string",
            required: true,
            message: "请输入身份证号",
            trigger: "blur",
          },
          {
            type: "string",
            pattern: /(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: "证件号码格式有误",
            trigger: "blur",
          },
        ],
        type: [
          {
            type: "string",
            required: true,
            message: "请选择学员类型",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  mounted: function () {
    // 设置 label 宽度
    this.setLabelWidth();
    // 加载数据
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
      // 获取用户组、部门、岗位、学历、专业的选项值
      sel.userGroupByType("trainee").then((response) => {
        response._embedded.groupVoes.forEach((item) => {
          this.selection.usergroup.push({
            key: item.id,
            label: item.name,
            value: item.id,
          });
        });
      });
      sel.dept(null).then((response) => {
        this.selection.dept = response._embedded.dboxVoes;
      });
      sel.post(null).then((response) => {
        this.selection.post = response._embedded.dboxVoes;
      });
      sel.edu(null).then((response) => {
        this.selection.edu = response._embedded.dboxVoes;
      });
      sel.major(null).then((response) => {
        this.selection.major = response._embedded.dboxVoes;
      });
    },
    // 部门值改变
    handleChange(value) {
      // 更新 leader 选项
      let key = 0;
      this.selection.leader = [];
      value.forEach((element) => {
        this.selection.leader.push({
          key: (key += 1),
          label: element,
          value: element,
        });
      });
    },
    // 提交新增表单
    onSubmit() {
      // 如果用户未选择用户组，则添加到默认学员组
      if (this.form.usergroup === [])
        this.form.usergroup = [defaultStudentUserGroupId];

      // 验证数据格式
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // 数据格式正确
          api
            .add(this.$user.userId, this.form)
            .then((response) => {
              this.$message.success("新增成功");
              this.onCancel();
            })
            .catch((error) => {
              this.$message.error(error.response.data);
            });
        } else {
          // 数据格式不正确
          this.$message.error("请按提示填写正确内容！");
        }
      });
    },
    // 取消，返回上一级菜单
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
  .el-input {
    width: 375px;
  }
  .el-select {
    width: 375px;
  }
}
</style>