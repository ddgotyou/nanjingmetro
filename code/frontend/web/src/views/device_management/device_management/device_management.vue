<template>
  <div class="app-container">
    <el-form
      :model="searchData"
      :inline="true"
    >
      <el-form-item prop="roleName">
        <!-- v-model="queryParams.roleName" -->
        <el-input id="search" v-model="searchData.value" name="search_value" placeholder="请输入搜索关键词"
          clearable
          size="small"
          style="width: 240px" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="search_commit"
          >搜 索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="search_reset"
          >重 置</el-button
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
    <el-card class="box-card" style="width:100%">
      <div slot="header">设备列表</div>
      <el-table
        :data="tableData"
        style="width: 100%"
        id="device_table"
      >
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>

      <el-table-column type="index" label="序号" width="100"> </el-table-column>
      <el-table-column prop="deviceClassroom" label="实验室名称"> </el-table-column>
      <el-table-column prop="deviceName" label="设备"> </el-table-column>
      <el-table-column prop="deviceDescription" label="状态"></el-table-column>
      <el-table-column label="操作">
        <!-- icon="el-icon-edit" -->
        <template slot-scope="scope">
          <el-button @click.native.prevent="edit(scope.$index, tableData)" type="text">修改</el-button>
        </template>
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
</style>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
import api from "@/api/device/device"

export default {
  components: {
    api
  },
  data() {
    const item = {
      student: "王一二",
      state: "",
      process: "2021-01-01",
      score: "",
    };
    return {
      searchData: {
        name: '',
        keyword: '',
        purchaseDate:''
      },
      search_status: false,
      index: 1,

      teachers: [],
      response: {},
      tableData: [],
      deviceList: [],

      dialogFormVisible: false,
      newlabForm: {
        pass: "",
        checkPass: "",
      },
      //showSearch: true,
      pageSizes: [100, 200, 300, 400],
      pageSize: 100,
      totalPage: 400,
      currentPage: 1,
    };
  },

  created() {
    console.log("created",this.tableData)
    this.getDeviceList();
  },
  methods: {
    edit(index, data) {
      //this.$router.push({ path: "new_device" });
      this.$router.push({ path: 'device_edit', query: { self: this.tableData[index].self }})
      //this.$router.push({ path: 'device_edit', query: {self: this.tableData[1].self}});
    },
    getDeviceList() {
      let vm = this;
      api.listDevice().then((response) => {
        vm.tableData = response._embedded.devices;
      });
    },
    // list() {
    //   console.log(this.searchData);
    //   var params = {
    //     name:'',
    //     value: '',
    //     index: this.index-1,
    //     //size: this.pageSize
    //   };
    //   let that=this;
    //   api.search(params).then( res => {
    //     that.response = res;
    //     that.tableData = [];
    //     for(var i = 0; i < res._embedded.devices.length; i++)
    //     {
    //       let item = {
    //         deviceClassroom: res._embedded.devices[i].deviceClassroom,
    //         deviceName: res._embedded.devices[i].deviceName,
    //         deviceDescription: res._embedded.devices[i].deviceDescription,
    //         //self: res._embedded.devices[i]._links.self.href
    //       };
    //       that.tableData.push(item)
    //     }
    //   });
    // },
    handleEdit() {
      dialogFormVisible = true;
    },
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert("submit!");
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
    // 前往新增设备页面
    add() {
      this.$router.push({ path: "new_device" });
    },
    search_commit()
    {
      this.index=1
      this.search_list()
    },
    search_list() {
      console.log(this.searchData);
      var params = {
        name: "1",
        keyword: this.searchData.value,

      };
      let that=this;
      api.search(params).then( res => {
        that.response = res;
        that.tableData = [];
        for(var i = 0; i < res._embedded.devices.length; i++)
        {
          let item = {
            deviceName: res._embedded.devices[i].deviceName,
            deviceClassroom: res._embedded.devices[i].deviceClassroom,
            deviceDescription: res._embedded.devices[i].deviceDescription,
          };
          that.tableData.push(item)
        }
      });
      this.search_status = true;
    },
    search_reset() {
      this.searchData = {
        name: '',
        period: ['',''],
        status: '',
        teacher: '',
        value: ''
      };
      this.search_status = false;
      this.index=1;
      this.list();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleUpdate(row) {
      this.reset();
      this.getTreeselect();
      const userId = row.userId || this.ids;
      getUser(userId).then(response => {
        this.form = response.data;
        this.postOptions = response.posts;
        this.roleOptions = response.roles;
        this.form.postIds = response.postIds;
        this.form.roleIds = response.roleIds;
        this.open = true;
        this.title = "修改用户";
        this.form.password = "";
      });
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
