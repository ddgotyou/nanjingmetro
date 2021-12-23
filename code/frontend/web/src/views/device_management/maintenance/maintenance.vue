<template>
  
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="Message" style="width: 800px;" class="filter-item" v-model="temp.keyword"/>
      <el-button v-waves class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search" @click="refresh()">
        Search
      </el-button>
      <el-button v-waves class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="resetOption()">
        Reset
      </el-button>
      <!-- input type="file" id="fileExport" @change="handleFileChange()" ref="inputer">
      <el-button v-waves class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="upload_test()">
        上传测试
      </el-button-->
      <br/>
      <el-select placeholder="实训室" clearable style="width: 150px" class="filter-item" @change="refresh()" v-model="temp.classroom">
        <el-option v-for="item in shixunshi_Options" :key="item" :label="item" :value="item" />
      </el-select>
      &nbsp;
      <el-select placeholder="设备" clearable style="width: 150px" class="filter-item" @change="refresh()" v-model="temp.device">
        <el-option v-for="item in shebei_Options" :key="item" :label="item" :value="item" />
      </el-select>
      &nbsp;
      <el-select placeholder="周期" clearable style="width: 150px" class="filter-item" @change="refresh()" v-model="temp.period">
        <el-option v-for="item in zhouqi_Options" :key="item" :label="item" :value="item" />
      </el-select>
      &nbsp;

      <el-select placeholder="维保人员" clearable style="width: 250px" class="filter-item" @change="refresh()" v-model="temp.user">
        <el-option v-for="item in weihurenyuan_Options" :key="item" :label="item" :value="item" />
      </el-select>
      &nbsp;
    </div>

    <el-dialog title="详细信息" :visible.sync="dialogTableVisible1">
      <el-form label-position="left" label-width="180px" style="margin-left: 10%;">
        <el-form-item label="实训室名称">
          <label style="font-weight:normal;">classroom123</label>
        </el-form-item>
        <el-form-item label="设备id">
          <label style="font-weight:normal;">{{this.list[this.now_num].re_device}}</label>
        </el-form-item>
        <el-form-item label="设备名称">
          <label style="font-weight:normal;">{{this.list[this.now_num].re_deviceName}}</label>
        </el-form-item>
        <el-form-item label="周期">
           <label style="font-weight:normal;">{{this.list[this.now_num].re_period}}</label>
        </el-form-item>
        <el-form-item label="维护时间">
          <label style="font-weight:normal;">{{this.list[this.now_num].re_time}}</label>
        </el-form-item>
        <el-form-item label="维保人员id">
          <label style="font-weight:normal;">{{this.list[this.now_num].re_people}}</label>
        </el-form-item>
        <el-form-item label="维保人员">
          <label style="font-weight:normal;">{{this.list[this.now_num].re_peopleName}}</label>
        </el-form-item>
        <el-form-item label="规程名">
          <label style="font-weight:normal;">{{this.list[this.now_num].re_ruleName}}</label>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-table
      
      empty-text="没有数据了哦"
      :data="list"
      border
      :row-class-name="tableRowClassName"
      highlight-current-row
      style="width: 100%;"
      
    >
      <el-table-column label="序号" type="index" sortable align="center" style="width: 5%"></el-table-column>

      <el-table-column label="实训室名称" style="width: 20%" align="center" property="re_classroomName"></el-table-column>

      <el-table-column label="设备" style="width: 15%" align="center" property="re_deviceName"></el-table-column>

      <el-table-column label="周期" style="width: 15%" align="center" property="re_period"></el-table-column>

      <el-table-column label="维护时间" style="width: 15%" property="re_time"></el-table-column>

      <el-table-column label="维保人员" align="center" style="width: 15%" property="re_peopleName"></el-table-column>

      <el-table-column label="预计维修日期" align="center" style="width: 15%" property="reminderDay"></el-table-column>

      <el-table-column label="操作" align="center" style="width: 15%" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="safe" @click="show_details(scope)">
            详情
          </el-button>
          <el-button size="mini" type="safe" @click="previewPDF(scope)">
            查看规程
          </el-button>
          <el-button size="mini" type="safe" @click="onDownLoad();">
            下载规程
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<style>
.el-table .hidden-row {
  display:none;
}
</style>

<script>
import * as api from "@/api/device/device_2.js"

export default { 
  name: 'ComplexTable',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  components: {
      api
  },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        list:'',
      },
      dialogTableVisible1:false,
      dialogTableVisible2:false,

      now_num:0,

      shixunshi_Options:[],
      shebei_Options:[],
      zhouqi_Options:[],
      weihushijian_Options:[],
      weihurenyuan_Options:[],

      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],

      temp: {
        classroom:"",
        device:"",
        period:"",
        user:"",
        keyword:""
      },
      
    }
  },
  created() {
    api.listMaintenance(
      this.temp
    ).then((res)=>{
      this.list=res._embedded.workSheets;
      //console.log(this.list);
    }).catch((error)=>{
      this.$message({
          message: '没有检索到维修信息',
          type: 'warning'
      });
    });

    api.listOption().then((res)=>{
      this.shixunshi_Options=res.classroomList;
      this.shebei_Options=res.deviceList;
      this.zhouqi_Options=res.periodList;
      this.weihushijian_Options=res.timeList;
      this.weihurenyuan_Options=res.userList;
    })
  },
  methods: {
    onDownLoad(){
        this.$message.error("pdf下载功能尚未实现~");
    },

    previewPDF(index){
      this.$message.error("pdf预览功能尚未实现~");
    },

    show_details(scope){
      //console.log(scope);
      this.dialogTableVisible1 = true; 
      this.now_num=scope.$index;
    },

    refresh(){
      api.listMaintenance(
        this.temp
      ).then((res)=>{
        console.log("dashabi");
        console.log(res);
        this.list=res._embedded.workSheets;
        //console.log(this.list);
      }).catch((error)=>{
        this.$message({
            message: '上述检索条件不存在维修信息',
            type: 'warning'
        });
        this.list=[];
      });
    },

    tableRowClassName({row,index}){
      var sp=true;
      if(!this.listQuery.shixunshi_key===-1){
        if(!row.shixunshi_key===this.listQuery.shixunshi_key){
          return 'hidden-row';
        }
      }
      
      return '';
    },


    resetOption(){
      this.temp.classroom="";
      this.temp.device="";
      this.temp.period="";
      this.temp.time="";
      this.temp.user="";
      this.temp.keyword="";

      api.listMaintenance(
        this.temp
      ).then((res)=>{
        this.list=res._embedded.workSheets;
        //console.log(this.list);
      }).catch((error)=>{
        this.$message({
            message: '没有检索到维修信息',
            type: 'warning'
        });
      });
    }
  }
}
</script>