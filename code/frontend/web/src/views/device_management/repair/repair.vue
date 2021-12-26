<template>
  
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="Message" style="width: 800px;" class="filter-item" v-model="temp.keyword"/>
      <el-button v-waves class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search" @click="refresh()">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="resetOption()">
        重置
      </el-button>
      <br/>
      <el-select placeholder="实训室" clearable style="width: 150px" class="filter-item" @change="refresh()" v-model="temp.classroom">
        <el-option v-for="item in shixunshi_Options" :key="item" :label="item" :value="item" />
      </el-select>
      &nbsp;
      <el-select placeholder="设备" clearable style="width: 150px" class="filter-item" @change="refresh()" v-model="temp.device">
        <el-option v-for="item in shebei_Options" :key="item" :label="item" :value="item" />
      </el-select>
      &nbsp;
      <el-select placeholder="状态" clearable style="width: 150px" class="filter-item" @change="refresh()" v-model="temp.status">
        <el-option v-for="item in zhuangtai_Options" :key="item" :label="item" :value="item" />
      </el-select>
      &nbsp;
    </div>

    <el-dialog title="详细信息" :visible.sync="dialogTableVisible1">
      <el-form label-position="left" label-width="180px" style="margin-left: 10%;">
        <el-form-item label="实训室id">
          <label style="font-weight:normal;">{{this.list[this.now_num].deviceClassroom}}</label>
        </el-form-item>
        <el-form-item label="实训室名称">
          <label style="font-weight:normal;">{{this.list[this.now_num].deviceClassroomName}}</label>
        </el-form-item>
        <el-form-item label="设备id">
          <label style="font-weight:normal;">{{this.list[this.now_num].deviceId}}</label>
        </el-form-item>
        <el-form-item label="设备名称">
          <label style="font-weight:normal;">{{this.list[this.now_num].deviceName}}</label>
        </el-form-item>
        <el-form-item label="状态">
          <label v-if="this.list[this.now_num].deviceStatusVO.name=='正常'" style="font-weight:normal; color:green;">{{this.list[this.now_num].deviceStatusVO.name}}</label>
          <label v-else-if="this.list[this.now_num].deviceStatusVO.name=='故障'" style="font-weight:normal; color:red;">{{this.list[this.now_num].deviceStatusVO.name}}</label>
          <label v-else-if="this.list[this.now_num].deviceStatusVO.name=='占用'" style="font-weight:normal; color:orange;">{{this.list[this.now_num].deviceStatusVO.name}}</label>
          <label v-else style="font-weight:normal; color:orange;">待补充</label>
        </el-form-item>
        <el-form-item label="负责人">
          <label style="font-weight:normal;">{{this.list[this.now_num].afterSale}}</label>
        </el-form-item>
        <el-form-item label="负责人联系方式">
          <label style="font-weight:normal;">{{this.list[this.now_num].afterSaleNumber}}</label>
        </el-form-item>
        <el-form-item label="设备描述" style="margin-bottom:10px">
        </el-form-item>
          <div style="height:200px; color:grey; font-style: italic; padding-left: 20px; border-style: ridge; padding-top:10px">
            {{this.list[this.now_num].deviceDescription}}
          </div>
      </el-form>
    </el-dialog>

    <el-dialog title="设备状态修改" :visible.sync="dialogTableVisible2">
      <el-form label-position="left" label-width="180px" style="margin-left: 5%;">


        <label>请选择需要将 {{list[now_num].deviceClassroomName}} 中的 {{list[now_num].deviceName}} 修改为的状态</label>
        <div style="margin-top:5%"></div>
        <el-select v-model="temp_statue" style="margin-left: 5%;">
          <el-option
            v-for="item in zhuangtai_Options"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>

        <div style="margin-top:5%;"></div>
        
          <el-button type="primary" @click="change_this()">确认修改</el-button>
          <el-button @click="dialogTableVisible2 = false;">取消</el-button>
        
      </el-form>
    </el-dialog>

    <el-table
      
      empty-text="没有数据了哦"
      :data="list"
      border
      highlight-current-row
      style="width: 100%;"
      
    >
      <el-table-column label="序号" type="index" align="center" style="width: 5%"></el-table-column>

      <el-table-column label="实训室名称" style="width: 20%" align="center" property="deviceClassroomName"></el-table-column>

      <el-table-column label="设备" style="width: 15%" property="deviceName"></el-table-column>

      <el-table-column label="状态" style="width: 15%" align="center"> 
        <template slot-scope="{row}">
          <span v-if="row.deviceStatusVO.name=='正常'" style="color:green">{{ row.deviceStatusVO.name}}</span>
          <span v-else-if="row.deviceStatusVO.name=='故障'" style="font-weight:bold;color:red;">{{ row.deviceStatusVO.name}}</span>
          <span v-else-if="row.deviceStatusVO.name=='占用'" style="color:orange">{{ row.deviceStatusVO.name}}</span>
          <span v-else style="color:orange">待补充</span>
        </template>
      </el-table-column>

      <el-table-column label="负责人" style="width: 15%" property="afterSale"></el-table-column>

      <el-table-column label="负责人联系方式" align="center" style="width: 15%" property="afterSaleNumber"></el-table-column>

      <el-table-column label="操作" align="center" style="width: 15%" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="safe" @click="dialogTableVisible1 = true; now_num=scope.$index;">
            详情
          </el-button>

            <el-button slot="reference" size="mini" type="safe" @click="change_it(scope);">
              报修
            </el-button>

          <el-button size="mini" type="safe" @click="dialogTableVisible2 = true; now_num=scope.$index; temp_statue=list[now_num].deviceStatusVO.name">
            修改状态
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
import api from '@/api/device/device_2.js'

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
  components:{
    api
  },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      dialogTableVisible1: false,
      dialogTableVisible2: false,
      listLoading: true,
      temp_statue:"",
      listQuery: {
        list:'',
      },
      now_num:0,
      shixunshi_Options:[],
      shebei_Options:[],
      zhuangtai_Options:[
        "正常",
        "故障",
        "占用"
      ],
      
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],

      temp: {
        classroom:"",
        device:"",
        status:"",

        keyword:""
      },

    }
  },
  created() {
    api.listRepair(
      this.temp
    ).then((res)=>{
      this.list = res._embedded.devices.filter(v=>v.deviceStatusVO.name!==null);
      //console.log(this.list);
    }).catch((error)=>{
      this.$message({
          message: '没有检索到维修信息',
          type: 'warning'
      });
    });

    api.listRepairOption().then((res)=>{
      this.shixunshi_Options=res.classroomList;
      this.shebei_Options=res.deviceList;
    })
  },
  methods: {
    refresh(){
      api.listRepair(
        this.temp
      ).then((res)=>{
        this.list = res._embedded.devices.filter(v=>v.deviceStatusVO.name!==null);
        //console.log(this.list);
      }).catch((error)=>{
        this.$message({
            message: '上述检索条件不存在维修信息',
            type: 'warning'
        });
        this.list=[];
      });
    },

    resetOption(){
      this.temp.classroom="";
      this.temp.device="";
      this.temp.status="";
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
    },

    change_it(scope){
      this.$confirm('确认要对 '+scope.row.deviceClassroomName+' 中的 '+scope.row.deviceName+' 进行报修操作么？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if(scope.row.deviceStatusVO.name==="故障"){
              this.$message({
                message: '该设备当前已是报修状态！',
                type: 'warning'
              });
              return;
            }else{
                api.changeStatus({
                  deviceName:scope.row.deviceName,
                  status:"故障"
                }).then((res) => {
                  //console.log(res);
                  if(res.deviceStatusVO.name==="故障"){
                    this.$message({
                      message: scope.row.deviceClassroomName+' 中的 '+scope.row.deviceName+' 已经成功报修！',
                      type: 'success'
                    });
                    scope.row.deviceStatusVO.name="故障"
                  }else{
                    this.$message.error("未能成功修改状态，请于管理员联系");
                  }
                }).catch((res)=>{
                    this.$message.error("未能成功修改状态，请于管理员联系");
                    console.log(res);
                });
            }
          })
    },

    change_this(){
      if(this.list[this.now_num].deviceStatusVO.name===this.temp_statue){
        this.$message({
          message: '该设备当前已是'+this.temp_statue+'状态！',
          type: 'warning'
        });
      }else{
        api.changeStatus({
          deviceName:this.list[this.now_num].deviceName,
          status:this.temp_statue
        }).then((res) => {
          //console.log(res);
          if(res.deviceStatusVO.name===this.temp_statue){
            this.$message({
              message: this.list[this.now_num].deviceClassroomName+' 中的 '+this.list[this.now_num].deviceName+' 已经成功修改为'+this.temp_statue+"状态！",
              type: 'success'
            });
            this.list[this.now_num].deviceStatusVO.name=this.temp_statue
          }else{
            this.$message.error("未能成功修改状态，请于管理员联系");
          }
        }).catch((res)=>{
          this.$message.error("未能成功修改状态，请于管理员联系");
          console.log(res);
        });
      }

      this.dialogTableVisible2 = false;
    },

  }
}
</script>
