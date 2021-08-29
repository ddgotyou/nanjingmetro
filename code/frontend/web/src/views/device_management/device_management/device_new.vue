<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form
        :label-position="right"
        inline="true"
        model="basicinfo"
        ref="basicinfo"
        class="form"
        label-width="100px"
      >
        <el-row>
          <el-col span="12">
            <el-form-item label="设备名称" prop="equname">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="状态" prop="equname">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所处实验室" prop="equname">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用途" prop="equname">
              <el-input v-model="basicinfo.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="负责人">
              <el-select
                v-model="basicinfo.attributes"
                multiple
                placeholder="请选择"
                style="width: 95%"
              >
                <el-option label="一号" value="1"></el-option>
                <el-option label="二号" value="2"></el-option>
                <el-option label="2号" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="购买时间" prop="equname">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="购买时间" prop="equname">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="售后联系人" prop="equname">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item align="left" label="售后联系方式" prop="equname">
          <el-input></el-input>
          <!-- v-model="basicinfo.name" -->
        </el-form-item>
      </el-form>
    </el-card>
    <div style="margin: 40px"></div>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>维保信息</span>
      </div>
      <el-form
        inline="true"
        model="repairinfo"
        ref="repairinfo"
        label-width="100px"
        class="form"
      >
        <el-row>
          <el-col span="12">
            <el-form-item label="周期" prop="taskmajor">
              <el-select v-model="repairinfo.taskmajor">
                <el-option label="一号" value="1"></el-option>
                <el-option label="二号" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="维保时间" prop="task">
              <el-select v-model="repairinfo.task">
                <el-option label="一号" value="1"></el-option>
                <el-option label="二号" value="2"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-button size="small">导出</el-button> -->
          </el-col>
        </el-row>

        <el-row>
          <el-col span="12">
            <el-form-item label="维护人员" prop="classify">
              <el-select v-model="repairinfo.classify">
                <el-option label="一号" value="1"></el-option>
                <el-option label="二号" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="规程" prop="classify">
              <el-select v-model="repairinfo.classify">
                <el-option label="一号" value="1"></el-option>
                <el-option label="二号" value="2"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-button size="small">查看</el-button> -->
          </el-col>
        </el-row>
        <el-row>
          <el-col span="2">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
              style="display: inline-block"
            >
              <el-button size="small">上 传</el-button>
            </el-upload>
          </el-col>
          <el-col span="2">
            <el-button size="small">导出</el-button>
          </el-col>
          <el-col span="2">
            <el-button size="small">查看</el-button>
          </el-col>
        </el-row>

        <div style="margin: 20px"></div>

        <div style="text-align: right">
          <el-button @click="goEqadmin">取 消</el-button>
          <el-button type="primary" @click="goEqadmin">保 存</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>

<script>
export default {
  data() {
    const item = {
      teacher: "王一二",
      state: "",
      plan: "",
      stunum: "",
      passnum: "",
      passrate: "",
    };
    return {
      basicinfo: {
        name: "",
        state: "",
      },
      tableData: Array(5).fill(item),
      repairinfo: {
        name: "",
        state: "",
      },
    };
  },
  methods: {
    //定义导出Excel表格事件
    exportExcel() {
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          "sheetjs.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    goNeweq() {
      this.$router.push("/equnew");
    },
    goEqadmin() {
      this.$router.push("/equadmin");
    },
  },
};
</script>
