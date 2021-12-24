<template>
  <div class="app-container">
    <el-card class="box-card" style="width:100%">
      <div slot="header">筛选</div>
      <el-form label-position="right" label-width="80px" :model="searchData">
        <el-row>
          <el-col span="24">
            <el-form-item label="模糊搜索">
              <el-input id="search" v-model="searchData.value" name="search_value" placeholder="请输入搜索关键词" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <div style="text-align: left">
              <!-- 三个按钮 新增实验室是对话框，新增设备是页面 -->
              <el-button type="primary" @click="dialogFormVisible = true">新增实验室</el-button>
              <el-button type="primary" @click="add">新增设备</el-button>
              <el-button @click="handleDelete">删 除</el-button>
            </div>
          </el-col>
          <el-col span="12">
            <div style="text-align: right">
              <el-button type="primary" @click="search_commit">搜 索</el-button>
              <el-button @click="search_reset">重 置</el-button>
            </div>
          </el-col>
        </el-row>
        <el-dialog title="新增实验室" :visible.sync="dialogFormVisible">
          <el-form :model="newlabForm">
            <el-form-item label="名称" label-width="100px">
              <el-input
                v-model="newlabForm.name"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="类型" label-width="100px">
              <el-select
                v-model="newlabForm.type"
                name="type"
                placeholder="请选择"
                style="width: 95%"
              >
                <el-option label="教学室" value="教学室"></el-option>
                <el-option label="实训室" value="实训室"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述" label-width="100px">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                v-model="newlabForm.description"
              >
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addclassroom"
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </el-form>
    </el-card>
    <div style="margin: 20px"></div>
    <el-card class="box-card" style="width:100%">
      <div slot="header">
        <span>设备列表</span>
        <el-button
      type="text"
      style="float: right; padding: 3px 0"
      plain
      icon="el-icon-download"
      @click="exportExcel"
      >导出</el-button>
      </div>

      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        id="device_table"
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <!-- 不显示，用来在选择到某个设备时同时获得其 ID -->
      <el-table-column v-if="false" label="ID" prop="deviceId"/>
      <el-table-column type="index" label="序号" width="100"> </el-table-column>
      <el-table-column prop="deviceClassroom" label="实验室名称"> </el-table-column>
      <el-table-column prop="deviceName" label="设备"> </el-table-column>
      <el-table-column prop="deviceDescription" label="状态"></el-table-column>
      <el-table-column label="操作">
        <!-- icon="el-icon-edit" -->
        <template slot-scope="scope">
          <el-button @click.native.prevent="edit(scope.$index)" type="text">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 页码 -->
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
import * as api from "@/api/device/device.js"

export default {
  components: {
    api
  },
  data() {
    return {
      searchData: {
        name: '',
        keyword: '',
        purchaseDate:''
      },
      search_status: false,
      index: 1,
      // 遮罩层
      loading: true,
      teachers: [],
      response: {},
      tableData: [],
      deviceList: [],
      deviceSelection: [],

      dialogFormVisible: false,
      newlabForm: {
        pass: "",
        checkPass: "",
      },
      classroomid:{},

      pageSizes: [100, 200, 300, 400],
      pageSize: 100,
      totalPage: 400,
      currentPage: 1,
    };
  },

  created() {
    //console.log("created",this.tableData)
    this.getDeviceList();
  },
  methods: {
    //新增实验室
    addclassroom(){
      this.dialogFormVisible = false
      var data={
        "name": this.newlabForm.name,
        "description": this.newlabForm.description,
        "type": this.newlabForm.type,
      }
      api.addClassroom(data).then(response => {
        this.$message.success("新增实验室成功！")
      });
      //清空
      this.newlabForm={};
    },
    //修改设备
    edit(index) {
      let id = this.tableData[index].deviceId;
      console.log("修改设备信息")
      console.log(id);

      //前往修改页面
      this.$router.push({
        path: 'device_edit',
        query: { id },
      });
      //this.$router.push({ path: 'device_edit', query: { self: this.tableData[index].self }})
      //this.$router.push({ path: 'device_edit', query: {self: this.tableData[1].self}});
    },
    //获取设备列表
    getDeviceList() {
      this.loading = true;
      api.listDevice().then((response) => {
        this.tableData = [];
        //this.tableData = response._embedded.devices;
        api.classrooms().then( res => {
          //实验室列表
          this.classrooms=[]
          for(var i=0;i<res._embedded.classrooms.length;i++)
          {
            var temp=res._embedded.classrooms[i]._links.self.href.split("/")
            var classroom_id=temp[temp.length-1]
            this.classroomid[classroom_id] = res._embedded.classrooms[i].name
            //this.classrooms.push({label:res._embedded.classrooms[i].name,value:classroom_id})
          }
          //console.log(this.classrooms)
          for(var i = 0; i < response._embedded.devices.length; i++)
          {
            let item = {
              deviceClassroom: this.classroomid[response._embedded.devices[i].deviceClassroom],
              deviceName: response._embedded.devices[i].deviceName,
              deviceDescription: response._embedded.devices[i].deviceStatusVO.name,
              deviceId:response._embedded.devices[i].deviceId,
            };
            this.tableData.push(item)
          }
        })
      });
      this.loading = false;
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
    handleSelectionChange(selection) {
      this.deviceSelection = selection;
    },
    // 删除设备
    async handleDelete() {
      let deviceNum = this.deviceSelection.length; // 选中的数量
      // 如果没有选中任何项，则提示并返回
      if (deviceNum === 0) {
        this.$message.warning("未选中任何设备！");
        return;
      }
      // 逐个删除
      let flags = new Array(deviceNum).fill(false); // 用来记录删除是否成功的标志
      for (var i = 0; i < deviceNum; i++) {
          var params = {
          deviceIds: this.deviceSelection[i].deviceId,
        };
        api.deldevice(params)
        flags[i] = true;
        // api.deldevice(params).then((response) => {
        //   let code = response._embedded.responses[0].code;
        //   if (code === "200") flags[i] = true;
        // });
      }
      //this.$message.success(`删除成功！共删除 ${deviceNum} 个设备。`);
      //this.getDeviceList();

      //提示或刷新数据
      //如果标志数组中没有 false，则提示删除成功并重置数据
      let success = (await flags.indexOf(false)) === -1;
      if (success) {
        this.$message.success(`删除成功！共删除 ${deviceNum} 个设备。`);
        this.loading= true;
        this.getDeviceList();
        this.loading= false;
      } else {
        this.$message.error("删除失败！");
      }
      this.loading= true;
      this.getDeviceList();
      this.loading= false;
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
