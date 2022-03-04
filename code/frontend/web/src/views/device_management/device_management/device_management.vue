<template>
  <div class="app-container">
    <div style="margin-top:0px;"></div>
    <el-card class="box-card" style="width:100%">

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

      <el-dialog title="修改实验室信息" :visible.sync="dialogFormVisible1">
        <div style="margin-left: 10%; padding-bottom: 5%; font-size: 15px">请确认您要对{{change_choice.name}}教室（编号为{{change_choice.id}}）要进行的修改：</div>
        <el-form>
            <el-form-item label="类型" label-width="100px">
              <el-select
                v-model="change_choice.type"
                name="type"
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
                v-model="change_choice.description"
              >
              </el-input>
            </el-form-item>
          </el-form>
        
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="handle_change_classroom()">确 定</el-button>
        </div>
        
      </el-dialog>

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

      <el-form label-position="right" label-width="80px" :model="searchData">
        <el-row>
          <el-col>
            <el-form-item label="模糊搜索">
              <el-input id="search" v-model="searchData.value" name="search_value" placeholder="请输入搜索关键词" style="width: 80%"/>
              <el-button type="primary" @click="search_commit" style="margin-left: 1.5%; width: 7%">搜 索</el-button>
              <el-button @click="search_reset" style="margin-left: 1.5%; width: 7%">重 置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 20px">
          <el-button @click="handleDelete" style="width: 8%; background-color: #bb505d; color: white">删除设备</el-button>
          <el-button type="primary" style="width: 8%;" @click="add">新增设备</el-button>
        </el-row>
      </el-form>

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
      <el-table-column label="序号" align="center" width="80">
        <template slot-scope="scope">
          {{(currentPage - 1)*pageSize + scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column prop="deviceClassroom" label="实验室名称"> </el-table-column>
      <el-table-column prop="deviceName" label="设备"> </el-table-column>
      <el-table-column prop="deviceId" label="设备ID"> </el-table-column>
      <el-table-column prop="deviceDescription" label="状态"></el-table-column>
      <el-table-column prop="afterSale" label="售后人员"> </el-table-column>
      <el-table-column prop="afterSaleNumber" label="售后电话"></el-table-column>
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
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="totalPage"
        layout="prev, pager, next"
        class="pagination"
        @current-change="pagingCurrentChange"
      />
      
    </el-row>
    </el-card>
    
    <div style="margin: 20px"></div>
    <el-card class="box-card" style="width:100%">
      <div slot="header">
        <span>实验室列表</span>
        <el-button type="text" plain @click="dialogFormVisible = true" style="float: right; padding: 3px 0" icon="el-icon-circle-plus">新增实验室</el-button>
      </div>

      <el-table
        v-loading="loading"
        :data="classroomlist"
        style="width: 100%"
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
      <el-table-column label="序号" align="center" width="100">
        <template slot-scope="scope">
          {{(currentPage - 1)*pageSize + scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="实验室名称" align="center"> </el-table-column>
      <el-table-column prop="id" label="实验室编号" align="center"> </el-table-column>
      <el-table-column prop="type" label="实验室类型" width="center"> </el-table-column>
      <el-table-column prop="description" label="实验室描述" width="400"> </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <!-- icon="el-icon-edit" -->
        <template slot-scope="scope">
          <el-button @click.native.prevent="delete_classroom(scope.$index)" type="text">删除实验室</el-button>
          <el-button @click.native.prevent="change_classroom(scope.$index)" type="text">修改实验室</el-button>
        </template>
      </el-table-column>
    </el-table>
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
import * as api from "@/api/device/device"

export default {
  components: {
    api
  },
  data() {
    return {
      searchData: {
        name: '',
        keyword: '',
        purchaseDate:'',
        value:''
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
        name: "",
        description: "",
        type:""
      },
      classroomid:{},

      //pageSizes: [100, 200, 300, 400],
      pageSize: 8,
      totalPage: 35,
      currentPage: 1,
      maxPage:2,

      classrooms:[],
      classroomlist:[],

      change_choice:{
        name:"",
        id:"",
        type:"",
        description:""
      },
      dialogFormVisible1: false,
    };
  },

  created() {
    //console.log("created",this.tableData)
    this.getDeviceList();
  },
  methods: {
    //新增实验室
    addclassroom(){
      var data={
        "name": this.newlabForm.name,
        "description": this.newlabForm.description,
        "type": this.newlabForm.type,
      }
      api.addClassroom(data).then(response => {
        this.$message.success("新增实验室成功！");
        this.dialogFormVisible = false;
      }).catch((error)=>{
        this.$message({
          message: '该教室名已存在',
          type: 'warning'
        });
      })
      //清空
      this.newlabForm={};
      this.getDeviceList();
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
    change_classroom(index){
      this.change_choice.name = this.classroomlist[index].name;
      this.change_choice.id = this.classroomlist[index].id;
      this.change_choice.type = this.classroomlist[index].type;
      this.change_choice.description = this.classroomlist[index].description;

      this.dialogFormVisible1 = true;
      console.log(this.classroomlist[index]);
    },
    handle_change_classroom(){
      var params = {
        name: this.change_choice.name,
        description: this.change_choice.description,
        type: this.change_choice.type,
        id: this.change_choice.id
      }
      api.changeClassroom(params).then((res)=>{
        this.dialogFormVisible1 = false;
        if(res.description == params.description && res.type == params.type){
          this.$message({
            message: "您已成功修改"+params.name+"教室的信息！",
            type: 'success'
          });
        }
      }).catch((err)=>{
        this.$message({
          message: "您输入的描述信息过长，请确认后重新输入",
          type: 'error'
        });
        console.log(err);
      });
      this.getDeviceList();
    },
    //删除实验室
    delete_classroom(index){
      //console.log(index);
      var params = {
        id: this.classroomlist[index].id,
      };
      console.log(params);
      api.deleteClassroom(params).then((res) => {
        this.$message({
          message: "您已成功删除该教室信息",
          type: 'success'
        });
        this.getDeviceList();
      }).catch((error)=>{
        console.log(error);
      });
    },
    //获取设备列表
    getDeviceList() {
      this.loading = true;
      var params = {
        page: 0,
        size: 8
      };
      api.listDevice(params).then((response) => {

        console.log(response);

        this.totalPage = response.page.totalElements;
        this.currentPage = response.page.number + 1;
        this.maxPage = response.page.totalPage;

        this.tableData = [];
        //this.tableData = response._embedded.devices;
        api.classrooms().then( res => {
          //实验室列表
          this.classroomlist = res._embedded.classrooms;
          this.classrooms=[]
          for(var i=0;i<res._embedded.classrooms.length;i++)
          {
            var temp=res._embedded.classrooms[i]._links.self.href.split("/")
            var classroom_id=temp[temp.length-1]
            this.classroomid[classroom_id] = res._embedded.classrooms[i].name
            //this.classrooms.push({label:res._embedded.classrooms[i].name,value:classroom_id})
          }

          for(var i = 0; i < response._embedded.devices.length; i++)
          {
            let item = {
              deviceClassroom: this.classroomid[response._embedded.devices[i].deviceClassroom],
              deviceName: response._embedded.devices[i].deviceName,
              deviceDescription: response._embedded.devices[i].deviceStatusVO.name,
              deviceId:response._embedded.devices[i].deviceId,
              chargePeople: response._embedded.devices[i].chargePeople,
              chargePeopleName: response._embedded.devices[i].chargePeopleName,
              chargePeopleTel: response._embedded.devices[i].chargePeopleTel,
              afterSale: response._embedded.devices[i].afterSale,
              afterSaleNumber: response._embedded.devices[i].afterSaleNumber,
            };
            this.tableData.push(item)
          }
        })
      });
      this.loading = false;
      //console.log(this.tableData);
    },

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
      this.currentPage = 0;
      var params = {
        page: 0,
        size: 8,
        keyword: this.searchData.value,
      };
      api.search(params).then((response) => {
        this.totalPage = response.page.totalElements;
        this.currentPage = response.page.number + 1;
        this.maxPage = response.page.totalPage;
        //console.log(res);
        //this.response = res;
        this.tableData = [];
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
              chargePeople: response._embedded.devices[i].chargePeople,
              chargePeopleName: response._embedded.devices[i].chargePeopleName,
              chargePeopleTel: response._embedded.devices[i].chargePeopleTel,
              afterSale: response._embedded.devices[i].afterSale,
              afterSaleNumber: response._embedded.devices[i].afterSaleNumber,
            };
            this.tableData.push(item)
          }
        })
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
      this.search_list();
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

    pagingCurrentChange(val) {
      //this.currentPage = this.currentPage - 1;

      //console.log("this.currentPage");

      //this.loading = true;
      var params = {
        page: this.currentPage - 1,
        keyword: this.searchData.value,
        size: 8
      };
      api.search(params).then((response) => {
        this.totalPage = response.page.totalElements;
        this.currentPage = response.page.number + 1;


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
      //this.loading = false;
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
