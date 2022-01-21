<template>
  <div class="app-container">
    <el-card class="card-box" style="width: 100%">
      <div class="step-box">
        <el-steps direction="vertical" :active="active" :space="200">
          <el-step>
            <template slot="description">
              <p>
                请按照模板样式填写
                <br />
                为确保您的学员数据导入正常，建议下载新的模板导入
              </p>
            </template>
            <template slot="title">
              <el-row>
                <el-col :span="12">
                  <p>下载模板，填写学员信息</p>
                </el-col>
                <el-col :span="12">
                  <el-button @click="handleDownload">下载模板</el-button>
                </el-col>
              </el-row>
            </template>
          </el-step>
          <el-step>
            <template slot="title">
              <el-row>
                <el-col :span="12">
                  <p>上传填写好的模板</p>
                </el-col>
                <el-col :span="8">
                  <el-upload
                    ref="upload"
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-change="handleChange"
                    :before-remove="beforeRemove"
                    :http-request="parseFile"
                    :file-list="fileList"
                    accept=".xls,.xlsx"
                  >
                    <el-button type="primary">上传文件</el-button>
                  </el-upload>
                </el-col>
              </el-row>
            </template>
          </el-step>
        </el-steps>
      </div>
      <!-- 提交与取消（返回）按钮 -->
      <div align="center">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </div></el-card
    >
  </div>
</template>

<script>
import XLSX from "xlsx";
import * as api from "@/api/personnel/teacher";

const pattEmail = /^[\w\.-]+@[\w\.]+\.[A-z]+$/;
const pattIdcard = /^\d{18}$/;

export default {
  data: function () {
    return {
      active: 0, // 激活的步骤序号
      data: [],
      fileList: [],
      right: true, // 文件格式是否正确
    };
  },
  computed: {},
  mounted: function () {},
  methods: {
    handleDownload() {
      this.active = 1;
      window.location.href = "/template/template-student.xlsx";
    },
    handlePreview() {},
    handleRemove() {},
    // 文件覆盖 和 解析文件
    // 因为并不真正的上传，所以不能在 on-success 中处理
    handleChange(file, fileList) {
      this.active = 2;
      // 如果文件数量 >= 1, 用最新上传的文件覆盖;
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]];
      }
    },
    async parseFile(params) {
      const _file = params.file;
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        try {
          const data = event.target.result;
          const workbook = XLSX.read(data, { type: "binary" });
          // 循环读取每个 sheet
          for (let i in workbook.Sheets) {
            const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[i]);
            // 若当前 sheet 没有数据，则跳过
            if (sheet.length === 0) continue;
            // 将 sheet 中的每行数据读取、类型转换、判断格式，保存到变量
            this.readTable(sheet);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fileReader.readAsBinaryString(_file);
    },
    readTable(sheet) {
      this.data = [];

      for (let i in sheet) {
        let row = {};

        // 读取数据
        row.name = sheet[i].姓名;
        row.sex = sheet[i].性别;
        row.tel = sheet[i].联系电话;
        row.email = sheet[i].邮箱;
        row.idcard = sheet[i].身份证号;
        row.dept = sheet[i].部门;
        row.leader = sheet[i].组长;
        row.post = sheet[i].岗位;
        row.edu = sheet[i].学历;
        row.major = sheet[i].专业;
        row.type = sheet[i].学员状态;

        // 类型转换
        row.name = row.name ? String(row.name) : null; // 必填
        if (!row.sex) row.sex = null;
        else if (row.sex === "男") row.sex = "0";
        else if (row.sex === "女") row.sex = "1";
        else row.sex = "?";
        row.tel = row.tel ? String(row.tel) : null;
        row.email = row.email ? String(row.email) : null; // 必填
        row.idcard = row.idcard ? String(row.idcard) : null; // 必填
        row.usergroup = [];
        row.dept = row.dept ? String(row.dept).split(",") : [];
        row.leader = row.leader ? String(row.leader).split(",") : [];
        row.post = row.post ? String(row.post) : null;
        row.edu = row.edu ? String(row.edu) : null;
        row.major = row.major ? String(row.major) : null;
        if (!row.type) row.sex = null;
        else if (row.type === "正式") row.type = "0";
        else if (row.type === "临时") row.type = "1";
        else row.type = "?";

        // 检查格式
        if (!row.name || !row.email || !row.idcard || !row.type) {
          this.right = false;
          this.$message.warning(`第${i + 2}行：请按照模板说明填写必填项。`);
          return;
        } else if (row.sex === "?" || row.type === "?") {
          this.right = false;
          this.$message.warning(`第${i + 2}行：请通过下拉框选择值。`);
          return;
        } else if (!pattEmail.test(row.email)) {
          this.right = false;
          this.$message.warning(`第${i + 2}行：请按填写正确的邮箱格式。`);
          return;
        } else if (!pattIdcard.test(row.idcard)) {
          this.right = false;
          this.$message.warning(`第${i + 2}行：请按填写正确的身份证号格式。`);
          return;
        }

        this.data.push(row);
      }
      console.log(this.data);
    },
    // 文件删除确认
    async beforeRemove(file, fileList) {
      await this.$confirm("是否确认删除文件？", "提示", {
        type: "warning",
      }).then(() => {
        return true;
      });
    },
    // 逐个请求，新增讲师
    onSubmit() {
      if (!this.right)
        this.$message.warning(`文件格式不正确，请按照模板填写文件。`);
      // return;
      // 伪并行，新增任务逐个开始，但相比于请求时间，迭代时间可忽略不计
      let promises = [];
      // 逐个新增
      for (let i in this.data) {
        let promise = new Promise((resolve, reject) => {
          api
            .add(this.data[i])
            .then((response) => resolve(response))
            .catch((error) => reject(error.response.data));
        });
        promises.push(promise);
      }

      // 保证所有并行任务完成后
      Promise.all(promises).then(
        // resolve
        (values) => {
          this.$message.success(`成功添加${values.length}位学员。`);
          this.onCancel(); // 返回上一级
        },
        // reject
        (errors) => {
          console.log(errors);
        }
      );
    },
    // 取消，返回上一级菜单
    onCancel() {
      this.$router.push("/personnel/student-management");
    },
  },
};
</script>

<style lang="scss" scoped>
.card-box {
  width: 400px;
  max-width: 100%;
  margin: 20px auto;
}

.step-box {
  width: 100%;
  margin: 50px;
}
</style>
