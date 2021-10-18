<template>
  <div class="app-container">
    <!-- 主体 -->
    <el-card class="card-box" style="width: 100%">
      <!-- 讲师信息表单 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <!-- 姓名 -->
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" class="same-width"></el-input>
            </el-form-item>
            <!-- 性别 -->
            <el-form-item label="性别">
              <el-select v-model="form.sex" class="same-width">
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
              <el-input v-model="form.tel" class="same-width"></el-input>
            </el-form-item>
            <!-- 邮箱 -->
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" class="same-width"></el-input>
            </el-form-item>
            <!-- 身份证号 -->
            <el-form-item label="身份证号" prop="idcard">
              <el-input v-model="form.idcard" class="same-width"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 用户组 -->
            <el-form-item label="用户组">
              <el-select v-model="form.usergroup" class="same-width">
                <el-option
                  v-for="item in selection.usergroup"
                  :key="item.key"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <!-- 部门 -->
            <el-form-item label="部门">
              <el-row class="same-width">
                <el-col :span="11">
                  <el-select v-model="form.dept" multiple collapse-tags>
                    <el-option
                      v-for="item in selection.dept"
                      :key="item.key"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-col>
                <el-col :span="9">
                  <auto-complete
                    v-model="deptInput"
                    :suggestions="selection.dept"
                    placeholder=""
                  />
                </el-col>
                <el-col :span="4">
                  <el-button
                    plain
                    type="primary"
                    icon="el-icon-plus"
                    @click="handleAdd"
                  ></el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <!-- 岗位 -->
            <el-form-item label="岗位">
              <auto-complete
                v-model="form.post"
                :suggestions="suggestion.post"
                class="same-width"
              />
            </el-form-item>
            <!-- 讲师状态 -->
            <el-form-item label="讲师状态">
              <el-select v-model="form.status" class="same-width">
                <el-option
                  v-for="item in selection.status"
                  :key="item.key"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
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
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addTeacher, editTeacher, teacherInfo } from "@/api/personnel/teacher";
import { listUserGroup, listDept, listPost } from "@/api/personnel/personnel";
import AutoComplete from "../AutoComplete.vue";

export default {
  components: {
    AutoComplete,
  },
  data: function () {
    return {
      // 操作类型，“提交”、“编辑”或“详情”
      option: "",
      // 要“编辑”或者查看“详情”的讲师的 id
      id: null,

      // 添加部门的基础 key
      baseKey: 999,
      // 添加部门输入框的当前值
      deptInput: undefined,
      // 新增、编辑和详情的表单
      form: {
        name: undefined,
        sex: "",
        tel: "",
        email: undefined,
        idcard: undefined,
        usergroup: undefined,
        dept: [],
        post: "",
        status: "",
      },

      // 表单中的选择框选项
      selection: {
        sex: [
          { key: "1", label: "男", value: "0" },
          { key: "2", label: "女", value: "1" },
        ],
        usergroup: [],
        dept: [],
        status: [
          { key: "1", label: "正式", value: "0" },
          { key: "2", label: "临时", value: "1" },
        ],
      },

      suggestion: {
        post: [],
      },

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
      },
    };
  },

  computed: {},
  mounted: function () {
    // 接受 index 页面传递的参数，并保存
    this.option = this.$route.query.option;
    this.id = this.$route.query.id;
    // 加载包括下拉框值的数据
    this.loadData();
  },
  methods: {
    loadData() {
      // 获取用户组、部门的选择下拉框选项，获取岗位、学历、专业的建议下拉框选项
      listUserGroup(null).then((response) => {
        this.selection.usergroup = response._embedded.dboxToes;
      });
      listDept(null).then((response) => {
        this.selection.dept = response._embedded.dboxVoes;
      });
      listPost(null).then((response) => {
        this.suggestion.post = response._embedded.dboxVoes;
      });

      // 如果是“编辑”，则根据 index 页面传递的 id 请求该讲师的字段信息
      if (this.option === "edit") {
        teacherInfo(this.id, null).then((response) => {
          this.form = response._embedded.trainerToes[0];
        });
      }
    },
    // 添加一个部门
    handleAdd() {
      let isExist =
        this.selection.dept
          .map((element) => element.value)
          .indexOf(this.deptInput) === -1;
      if (isExist) {
        this.selection.dept.push({
          key: (this.baseKey += 1),
          label: this.deptInput,
          value: this.deptInput,
        });
      }
      this.form.dept.push(this.deptInput);
      this.deptInput = undefined;
    },
    // 提交新增讲师的表单
    optionAdd() {
      console.log(this.form);
      addTeacher(this.form).then((response) => {
        let code = response._embedded.responses[0].code;
        if (code === "200") {
          this.$message.success("添加成功！");
          this.onCancel();
        } else {
          let msg = response._embedded.responses[0].msg;
          this.$message.error(msg);
        }
      });
    },
    // 提交修改讲师的表单
    optionEdit() {
      editTeacher(this.id, this.form).then((response) => {
        let code = response._embedded.responses[0].code;
        if (code === "200") {
          this.$message.success("修改成功！");
          this.onCancel();
        } else {
          this.$message.error("修改失败！请再次尝试。");
        }
      });
    },
    // 提交新增或修改的表单
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.option === "add") this.optionAdd();
          else if (this.option === "edit") this.optionEdit();
        } else {
          this.$message.error("请按提示填写正确内容！");
        }
      });
    },
    // 取消，返回上一级菜单
    onCancel() {
      this.$router.push("/personnel/teacher-management");
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
