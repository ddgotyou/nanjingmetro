<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      v-show="showSearch"
      :inline="true"
    >
      <el-form-item prop="roleName">
        <!-- v-model="queryParams.roleName" -->
        <el-input
          placeholder="请输入搜索关键词"
          clearable
          size="small"
          style="width: 240px"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row>
      <el-col :span="2">
        <el-button plain @click="dialogFormVisible = true"
          >新增实验室</el-button
        >
        <el-dialog title="新增实验室" :visible.sync="dialogFormVisible">
          <el-form :model="newlabForm">
            <el-form-item label="名称" label-width="100px">
              <el-input
                v-model="newlabForm.name"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="类型" label-width="100px">
              <el-input v-model="newlabForm.type"></el-input>
            </el-form-item>
            <el-form-item label="描述" label-width="100px">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                v-model="textarea2"
              >
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false"
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </el-col>
      <el-col :span="2" offset="2">
        <el-button plain @click="add">新增设备</el-button>
      </el-col>
      <el-col :span="2" offset="2">
        <el-button plain @click="search">删除记录</el-button>
      </el-col>
    </el-row>

    <div style="margin: 20px"></div>

    <el-button
      type="primary"
      plain
      icon="el-icon-download"
      size="mini"
      @click="exportExcel"
      >导出</el-button
    >

    <div style="margin: 20px"></div>

    <el-table
      :data="deviceList"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
      id="device_table"
    >
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>

      <el-table-column type="index" label="序号" width="100"> </el-table-column>
      <el-table-column prop="classroom" label="实验室名称"> </el-table-column>
      <el-table-column prop="deviceStatus.name" label="设备"> </el-table-column>
      <el-table-column prop="deviceStatus.description" label="状态">
      </el-table-column>
      <el-table-column label="操作">
        <el-link type="primary">修改</el-link>
      </el-table-column>
    </el-table>
    <el-row>
      <el-pagination
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :total="totalPage"
        layout="total, sizes, prev, pager, next, jumper"
        class="pagination"
        @size-change="pagingSizeChange"
        @current-change="pagingCurrentChange"
      />
    </el-row>
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
</style>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
import { listDevice } from "@/api/device/device";

export default {
  data() {
    const item = {
      student: "王一二",
      state: "",
      process: "2021-01-01",
      score: "",
    };
    return {
      deviceList: [],
      tableData: Array(20).fill(item),
      dialogFormVisible: false,
      newlabForm: {
        pass: "",
        checkPass: "",
      },
      showSearch: true,
      pageSizes: [100, 200, 300, 400],
      pageSize: 100,
      totalPage: 400,
      currentPage: 1,
    };
  },
  created() {
    //console.log("created",this.tableData);
    this.getDeviceList();
  },
  methods: {
    getDeviceList() {
      let vm = this;
      listDevice().then((response) => {
        vm.deviceList = response._embedded.devices;
      });
    },
    handleEdit() {
      dialogFormVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    add() {
      this.$router.push({ path: "new_device" });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    pagingSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    pagingCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    exportExcel() {
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(
        document.querySelector("#device_table")
      );
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
<style>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
