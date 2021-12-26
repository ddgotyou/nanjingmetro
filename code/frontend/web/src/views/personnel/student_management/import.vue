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
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
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
      let reader = new FileReader();
      if (typeof FileReader === "undefined") {
        // 如果浏览器不支持 FileReader
        this.$message.warning("您的浏览器不支持文件读取。");
        return;
      }

      reader.readAsArrayBuffer(file.raw); //读任意文件
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
