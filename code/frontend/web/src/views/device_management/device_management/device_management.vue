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

      <el-dialog :visible.sync="dialogFormVisible2_apply" width="80vw" style="padding-top: 0;" class="detail_dialog">
        <template slot="title">
          <div style="display: inline-block; font-size: 20px; text-align: left; width: fit-content;">设备1预约</div>
          <div class="new_clip_item" style="display: inline-block; margin-left: 2vw;" 
              @click="change_apply.start_ = null; change_apply.start_format = ''; change_apply.desc = ''; value2 = [];
                      change_apply.end_ = null; change_apply.end_format = ''; dialogFormVisible3_apply = true;">[新建预约]</div>
        </template>

        <div>
          <el-table
              :data = "apply_list"
              style="width: 100%;"
              v-loading="type_loading" element-loading-text="正在获取数据...">
                <el-table-column>
                  <template slot="header">
                    <div style="font-size: medium; padding-left: 0.2vw;">开始时间</div>
                  </template>
                  <template slot-scope="scope">
                    <div style="padding-left: 0.2vw;">{{scope.row.start_format}}</div>
                  </template>
                </el-table-column>

                <el-table-column>
                  <template slot="header">
                    <div style="font-size: medium; padding-left: 0.2vw;">结束时间</div>
                  </template>
                  <template slot-scope="scope">
                    <div style="padding-left: 0.2vw;">{{scope.row.end_format}}</div>
                  </template>
                </el-table-column>

                <el-table-column>
                  <template slot="header">
                    <div style="font-size: medium; padding-left: 0.2vw;">用途说明</div>
                  </template>
                  <template slot-scope="scope">
                    <div style="padding-left: 0.2vw;">{{scope.row.desc}}</div>
                  </template>
                </el-table-column>

                <el-table-column width="120">
                  <template slot="header">
                    <div style="font-size: medium; padding-left: 0.2vw;">操作</div>
                  </template>
                  <template slot-scope="scope">
                    <el-popconfirm
                        :title='"您确定要删除这次预约吗？"'
                        @confirm = "apply_delete(scope.$index)">
                      <div slot="reference" class="table_opera">删除</div>
                    </el-popconfirm>
                  </template>
                </el-table-column>

            </el-table>
        </div>
      </el-dialog>

      <el-dialog :visible.sync="dialogFormVisible3_apply" width="60vw">
        <template slot="title">
          <div style="font-size: 18px;">新建预约</div>
        </template>
        <div style="padding-right: 8vw;">
          <el-form ref="change_type_name" :model="new_dataset" label-position="top" style="margin-left: 10vw">
            <el-form-item label="简述申请用途：">
              <el-input v-model="change_apply.desc" placeholder="请输入申请用途"></el-input>
            </el-form-item>
            <el-form-item label="选择预约时间段：">
              <el-date-picker
                  style="margin-top: 10px;"
                  v-model="value2"
                  type="datetimerange"
                  value-format="timestamp"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  :default-time="['12:00:00','12:00:00']"
                  @change="apply_new_change()">
                </el-date-picker>
            </el-form-item>
            <el-form-item style="margin-top: 40px;">
              <el-button type="primary" @click="apply_new()">立即创建</el-button>
              <el-button @click="dialogFormVisible3_apply = false;" >取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>

      <el-dialog :visible.sync="dialogFormVisible2" width="80vw" style="padding-top: 0;" class="detail_dialog" @close="fake_close_type_dialog()" >
        <template slot="title">
          <div style="display: inline-block; font-size: 20px; text-align: left; width: fit-content;">设备类型管理</div>
          <div class="new_clip_item" style="display: inline-block; margin-left: 2vw;" 
              @click="change_type_name.name = ''; dialogFormVisible3 = true;">[添加type]</div>
        </template>

        <div>
          <el-table
              :data = "now_type_list"
              style="width: 100%;"
              v-loading="type_loading" element-loading-text="正在获取数据...">
                <el-table-column>
                  <template slot="header">
                    <div style="font-size: medium; padding-left: 0.2vw;">ID</div>
                  </template>
                  <template slot-scope="scope">
                    <div style="padding-left: 0.2vw;">{{scope.row.id}}</div>
                  </template>
                </el-table-column>

                <el-table-column>
                  <template slot="header">
                    <div style="font-size: medium; padding-left: 0.2vw;">名称</div>
                  </template>
                  <template slot-scope="scope">
                    <div style="padding-left: 0.2vw;">{{scope.row.name}}</div>
                  </template>
                </el-table-column>

                <el-table-column width="120">
                  <template slot="header">
                    <div style="font-size: medium; padding-left: 0.2vw;">操作</div>
                  </template>
                  <template slot-scope="scope">
                    <el-popconfirm
                        :title='"您确定要删除这条数据吗？"'
                        @confirm = "type_delete(scope.$index)">
                      <div slot="reference" class="table_opera">删除</div>
                    </el-popconfirm>
                    <div slot="reference" class="table_opera" style="margin-left: 10px"
                          @click="dialogFormVisible4 = true; 
                                  change_type_temp = scope.row.name;
                                  change_type_name.name = scope.row.name;
                                  change_type_name.id = scope.row.id;">修改</div>
                  </template>
                </el-table-column>

            </el-table>
        </div>
      </el-dialog>

      <el-dialog :visible.sync="dialogFormVisible3" width="60vw">
        <template slot="title">
          <div style="font-size: 18px;">新建类型</div>
        </template>
        <div style="padding-right: 8vw;">
          <el-form ref="change_type_name" :model="new_dataset" label-width="15vw">
            <el-form-item label="类型名称：">
              <el-input v-model="change_type_name.name" placeholder="请输入类型名称"></el-input>
            </el-form-item>
            <el-form-item style="margin-top: 40px;">
              <el-button type="primary" @click="type_new()">立即创建</el-button>
              <el-button @click="dialogFormVisible3 = false;" >取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>

      <el-dialog :visible.sync="dialogFormVisible4" width="60vw">
        <template slot="title">
          <div style="font-size: 18px;">修改类型</div>
        </template>
        <div style="padding-right: 8vw;">
          <el-form ref="change_type_name" :model="new_dataset" label-width="15vw">
            <el-form-item label="类型名称：">
              <el-input v-model="change_type_name.name" placeholder="请输入类型名称"></el-input>
            </el-form-item>
            <el-form-item style="margin-top: 40px;">
              <el-button type="primary" @click="type_change()">立即修改</el-button>
              <el-button @click="dialogFormVisible4 = false;" >取消</el-button>
            </el-form-item>
          </el-form>
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
          <el-button @click="handleDelete" style="background-color: #bb505d; color: white">删除设备</el-button>
          <el-button type="primary" @click="add">新增设备</el-button>
          <el-button @click="handle_dialogForm();">设备类型管理</el-button>
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
      <el-table-column prop="deviceTypeName" label="类型"></el-table-column>
      <el-table-column label="操作">
        <!-- icon="el-icon-edit" -->
        <template slot-scope="scope">
          <el-button @click.native.prevent="edit(scope.$index)" type="text">修改</el-button>
          <el-button @click.native.prevent="apply(scope.$index)" type="text">申请</el-button>
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

.detail_dialog .el-dialog__body{
  padding-top: 5px;
}

.new_clip_item:hover{
  text-decoration: underline; 
  cursor: pointer; 
  margin-left: 2vw;
  color: #494e8f;
}

.table_opera{
  padding-left: 0.4vw;
  display: inline-block;
}
.table_opera:hover{
  padding-left: 0.4vw;
  display: inline-block;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
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

      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,

      dialogFormVisible2_apply: false,
      dialogFormVisible3_apply: false,

      apply_list:[
        {
          start_: 1651363200,
          start_format: "2022-05-01 08:00",
          end_: 1651370400,
          end_format: "2022-05-01 10:00",
          desc: "教学使用"
        },
        {
          start_: 1651473000,
          start_format: "2022-05-02 14:30",
          end_: 1651487400,
          end_format: "2022-05-02 18:30",
          desc: "申请申请123"
        },
        {
          start_: 1651550400,
          start_format: "2022-05-03 12:00",
          end_: 1651552200,
          end_format: "2022-05-03 12:30",
          desc: "申请使用test"
        },
        {
          start_: 1651579200,
          start_format: "2022-05-03 20:00",
          end_: 1651591800,
          end_format: "2022-05-03 23:30",
          desc: "test_123321"
        },
      ],
      change_apply:{
        start_: null,
        start_format: "",
        end_: null,
        end_format: "",
        desc: ""
      },

      value2: [],

      now_type_list:[
        {
          id: 0,
          name: "电脑"
        },
        {
          id: 1,
          name: "监控设备"
        },
        {
          id: 2,
          name: "教学设备"
        }
      ],
      change_type_name:{
        name:"",
        id:""
      },
      type_loading: false,
      change_type_temp:"",

      fake_type_id: 3,
      fake_temp_arr: [], 
      fake_type_change_arr: [],
    };
  },

  created() {
    //console.log("created",this.tableData)
    this.getDeviceList();
  },
  methods: {
    apply_new(){
      if(this.desc == ""){
        this.$message({
          message: '您尚未输入申请用途',
          type: 'warning'
        });
      }
      var falg = 0;
      for(let i in this.apply_list){
        if(this.change_apply.end_ < this.apply_list[i].start_){
          continue;
        }
        else if(this.change_apply.start_ > this.apply_list[i].end_){
          continue;
        }
        else{
          this.$message({
            message: '您申请的时间段与已有安排冲突',
            type: 'warning'
          });
          falg = 1;
          break;
        }
      }
      setTimeout(() => {
        if(falg == 0){
          this.apply_list.push({
            start_: this.change_apply.start_,
            start_format: this.change_apply.start_format,
            end_: this.change_apply.end_,
            end_format: this.change_apply.end_format,
            desc: this.change_apply.desc
          },);
          this.dialogFormVisible3_apply = false;
        }
      }, 1000);
      
    },

    formateDate (date) {
      var nian = date.getFullYear()
      var yue = (date.getMonth() + 1).toString().padStart(2, '0')
      var ri = date.getDate().toString().padStart(2, '0')
      var shi = date.getHours().toString().padStart(2, '0')
      var fen = date.getMinutes().toString().padStart(2, '0')
      var miao = date.getSeconds().toString().padStart(2, '0')

      return ""+nian+"-"+yue+"-"+ri+" "+shi+":"+fen
    },

    apply_delete(index){
      setTimeout(() => {
        this.apply_list.splice(index,1);
      }, 1000);
    },

    apply_new_change(){
      this.change_apply.start_ = this.value2[0] / 1000;
      this.change_apply.end_ = this.value2[1] / 1000;
      var start_sp = new Date(this.value2[0]);
      var end_sp = new Date(this.value2[1]);
      this.change_apply.start_format = this.formateDate(start_sp);
      this.change_apply.end_format = this.formateDate(end_sp);
      console.log(this.change_apply);
    },

    fake_close_type_dialog(){
      this.getDeviceList();
    },

    handle_dialogForm(){
      //this.type_loading = true;
      /*api.type_get({
        
      }).then(response => {
        console.log(response);
        this.now_type_list = response._embedded.deviceTypes;
        this.type_loading = false;
      }).catch((error)=>{
        this.$message({
          message: '类型列表加载失败',
          type: 'warning'
        });
      });*/
      setTimeout(() => {
        this.dialogFormVisible2 = true;
      }, 1000);
      
    },

    type_delete(index){
      /*api.type_delete({
        id: index
      }).then(response => {
        this.$message({
          message: '类型删除成功',
          type: 'warning'
        });
        this.type_get();
      }).catch((error)=>{
        this.$message({
          message: '类型删除失败',
          type: 'warning'
        });
      });*/
      setTimeout(() => {
        var temp = this.now_type_list[index].name;
        this.now_type_list.splice(index,1);

        this.fake_temp_arr.push(temp);
      }, 1000);
    },

    type_new(){
      /*api.type_new({
        name: this.change_type_name.name
      }).then(response => {
        this.$message({
          message: '类型添加成功',
          type: 'warning'
        });
        this.type_get();
      }).catch((error)=>{
        this.$message({
          message: '类型添加失败',
          type: 'warning'
        });
      });*/
      
      setTimeout(() => {
        this.now_type_list.push({
          id: this.fake_type_id,
          name: this.change_type_name.name
        });
        this.dialogFormVisible3 = false;
        this.change_type_name.name = "";
      }, 1000);
    },

    type_change(){
      if(this.change_type_name.name == this.change_type_temp){
        this.$message({
          message: '您输入的类型名与原有的类型名相同，请核实！',
          type: 'warning'
        });
        return;
      }

      setTimeout(() => {
        for (let i in this.now_type_list){
          if(this.now_type_list[i].id == this.change_type_name.id){
            var temp = this.now_type_list[i].name;
            this.now_type_list[i].name = this.change_type_name.name;
            this.fake_type_change_arr.push({
              ori: temp,
              new_: this.change_type_name.name
            });
            break;
          }
        }
        this.dialogFormVisible4 = false;
        this.change_type_name.name = "";
      }, 1000);
    },

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
    apply(index) {
      setTimeout(() => {
        this.dialogFormVisible2_apply = true;
      }, 1000);
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

        //console.log(this.fake_type_change_arr);

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
          
          var sp = 0;
          var type_list = ["电脑","电脑","监控设备","教学设备","电脑","监控设备","教学设备","监控设备","电脑","监控设备"];
          for(var i = 0; i < response._embedded.devices.length; i++)
          {
            var ttmp = type_list[sp];
            for(let i in this.fake_temp_arr){
              if(ttmp == this.fake_temp_arr[i]){
                ttmp = "";
              }
            }
            for(let i in this.fake_type_change_arr){
              if(ttmp == this.fake_type_change_arr[i].ori){
                ttmp = this.fake_type_change_arr[i].new_;
              }
            }
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
              deviceTypeName: ttmp   
            };
            sp = (sp + 1) % type_list.length;
            this.tableData.push(item)
          }
        })
      });
      this.loading = false;
      console.log(this.tableData);
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
          var sp = 0;
          var type_list = ["电脑","电脑","监控设备","教学设备","电脑","监控设备","教学设备","监控设备","电脑","监控设备"];
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
              deviceTypeName: type_list[sp]     
            };
            sp = (sp + 1) % type_list.length;
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
