<template>
  <div class="app-container">
    <el-card class="card-box" style="width: 100%">
      <div class="step-box">
        <el-steps direction="vertical" :active="1" :space="200">
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
                  <el-button>下载最新模板</el-button>
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
                <el-col :span="12">
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-change="handleChange"
                    :on-exceed="handleExceed"
                    multiple
                    :limit="3"
                    :file-list="fileList"
                  >
                    <el-button type="primary">上传</el-button>
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
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      fileList: [],
    };
  },
  computed: {},
  mounted: function () {},
  methods: {
    handlePreview() {},
    handleRemove() {},
    handleExceed() {},
    handleChange(file) {
      console.log(file);
      this.fileTemp = file.raw;
      if (this.fileTemp) {
        if (
          this.fileTemp.type ==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          this.fileTemp.type == "application/vnd.ms-excel"
        ) {
          this.importfxx(this.fileTemp);
        } else {
          this.$message({
            type: "warning",
            message: "附件格式错误，请删除后重新上传！",
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: "请上传附件！",
        });
      }

      // ..............................

      // 伪并行，新增任务逐个开始，但相比于请求时间，迭代时间可忽略不计
      let promises = [];
      // 逐个新增
      for (let i in data) {
        let promise = new Promise((resolve, reject) => {
          api
            .add(data[i])
            .then((response) => resolve(response))
            .catch((error) => reject(error.response.data));
        });
        promises.push(promise);
      }

      // 保证所有并行任务完成后
      Promise.all(promises).then(
        // resolve
        (values) => {
          this.$message.success(`成功删除${values.length}位学员。`);
        },
        // reject
        (errors) => {
          console.log(errors);
        }
      );
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
