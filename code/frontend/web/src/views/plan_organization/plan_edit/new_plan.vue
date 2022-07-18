<template>
  <div class="app-container">

  <div class="building-container">
  <el-form label-position="right" label-width="80px">
  <el-card class="box-card" style="width:100%">
    <div slot="header">楼宇选择</div>
    <el-row>
      <el-col :span="12"></el-col>
    </el-row>
    <div id="father"></div>


  </el-card>
  </el-form>
  </div>

  <div class="floor-container">
  <el-form label-position="right" label-width="80px" :model="taskData">
  <el-card class="box-card" style="width:100%">
    <div slot="header">教室选择</div>
    <el-row>
      <el-col :span="12">
        <p>请填写预约时间</p>
      <el-form-item label="课时安排">
      <el-date-picker
        style="width:50%;"
        value-format="yyyy-MM-dd"
        v-model="taskData.date"
        type="date"
        placeholder="选择日期"
        :picker-options="taskPeriodOptions">
      </el-date-picker>
      <el-time-picker
        style="width:25%;"
        placeholder="起始时间"
        format="HH:mm"
        value-format="HH:mm"
        :disabled="taskData.date==null"
        v-model="taskData.period[0]"
        :picker-options="{
         selectableRange: startTimeRange
        }"
        @change="changeStartTime">
      </el-time-picker>
      <el-time-picker
        style="width:25%;"
        placeholder="结束时间"
        format="HH:mm"
        value-format="HH:mm"
        :disabled="taskData.date==null||taskData.period[0]==null"
        v-model="taskData.period[1]"
        :picker-options="{
        selectableRange: endTimeRange
        }"
        @change="changeEndTime">
        </el-time-picker>
      </el-form-item>
      </el-col>
    </el-row>
    <div id="son"></div>


  </el-card>
  </el-form>
  </div>

    <el-button style="float:right;margin:10px;" icon="el-icon-arrow-left" circle @click="$router.go(-1)"></el-button>
    <el-form label-position="right" label-width="80px" :model="formData">
      <el-card class="box-card" style="width:100%">
        <div slot="header">基本信息</div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称">
              <el-input id="name" v-model="formData.name" name="name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="专业">
              <el-input id="speciality" v-model="formData.speciality" name="speciality" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="类型">
              <el-select id="type" filterable v-model="formData.type" style="width:100%" placeholder="请选择">
                <el-option
                  v-for="item in kinds"
                  :key="item.value"
                  :label="item.lable"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划时间">
              <el-date-picker
                style="width:100%;"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="formData.period"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="taskPeriodOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="描述">
              <el-input
                id="description"
                v-model="formData.description"
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="box-card" style="width:100%">
        <div slot="header">任务列表</div>
        <el-table
          :data="tableData"
          :default-sort = "{prop: 'order', order: 'ascending'}"
          style="width: 100"
        >
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="name"
            label="任务名称"
          />
          <el-table-column
            prop="startTime"
            label="课时开始时间"
          />
           <el-table-column
            prop="startTime"
            label="课时结束时间"
          />
          <el-table-column
            label="操作"
            width="120"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="deleteRow(scope.$index, tableData)"
              >
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <div style="text-align:right">
        <el-button @click="save">保存</el-button>
        <el-button type="primary" @click="submit">保存并提交</el-button>
      </div>
    </el-form>
    
    <el-dialog title="发起审批" :visible.sync="dialogFormVisible">
      <div class="dialog-footer">
        <el-form label-position="right" label-width="100px" :model="popData">
          <el-row>
            <el-col :span="24">
              <el-form-item label="部门">
                <el-select v-model="popData.department" style="width:100%" filterable placeholder="请选择部门" @change="changeDep">
                  <el-option
                    v-for="item in departments"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="审批人">
                <el-select
                  v-model="popData.approver"
                  style="width:100%"
                  multiple
                  filterable
                  default-first-option
                  placeholder="请选择审批人"
                  :disabled="popData.department==''"
                >
                  <el-option
                    v-for="item in approvers"
                    :key="item.key"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align: right">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="commit">确 定</el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      title="预约"
      :visible.sync="dialogReserveVisible"
      width="95%"
      height="70%"
      :before-close="handleClose">

      <el-card class="box-card" style="width:100%">
        <div slot="header">详细任务</div>
        <el-form label-position="right" label-width="80px" :model="taskData">
          <el-row>
            <el-col :span="12">
              <el-form-item label="任务名称">
                <el-input id="task_name" v-model="taskData.name" name="task_name" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="任务选择">
                <el-select v-model="taskData.option" style="width:100%" placeholder="请选择">
                  <el-option
                    v-for="item in task_chooses"
                    :key="item.value"
                    :label="item.lable"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="讲师">
                <el-select
                  v-model="taskData.teachers"
                  style="width:100%"
                  placeholder="请选择"
                  clearable
                  multiple
                  filterable
                >
                  <el-option
                    v-for="item in teacher_data"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="类型">
                <el-select id="task_type" v-model="taskData.type" style="width:100%" placeholder="请选择">
                  <el-option
                    v-for="item in task_types"
                    :key="item.value"
                    :label="item.lable"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="教室">
                <el-select v-model="taskData.classroom" style="width:100%" clearable placeholder="请选择" @change="changeClassroom">
                  <el-option
                    v-for="item in classrooms"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="描述">
                <el-input v-model="taskData.description" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="学员">
                  <el-checkbox 
                    v-for="group in group_data" 
                    :label="group.label"  
                    :key="group.value"
                    :indeterminate="group.isIndeterminate"
                    v-model="group.isCheckAll"
                    border
                    @change="handleGroupChange(group.no)">
                    {{group.label}}
                  </el-checkbox>
                  <el-table
                    ref="traineeTable"
                    :data="people_data"
                    tooltip-effect="dark"
                    style="width: 100%"
                    height="250"
                    @select="handleTraineeChange"
                    @select-all="handleTraineeAll"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                      type="selection">
                  </el-table-column>
                  <el-table-column
                      prop="key"
                      label="id">
                  </el-table-column>
                  <el-table-column
                      prop="label"
                      label="姓名">
                  </el-table-column>
                  </el-table>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:right">
          <el-button type="primary" @click="pushPage">预约该教室设备</el-button>
          <el-button type="primary" @click="addTask">确认新增</el-button>
        </div>
        <el-divider />
      </el-card>

    </el-dialog>
  </div>
</template>

<script>

import * as api from '@/api/training_plan/training_plan' 
import * as api2 from '@/api/training_plan/application'
import * as api3 from '@/api/training_plan/account'
 
 var building_info;

    function initBuildingInfo(i)
    {
      building_info=i;
    }

    function initBuilding(){
      var res=building_info;    //楼的数据

      var newdiv=document.createElement("div");
      var i=1;
      for(var tmp in res[0]){
        newdiv.className='buildings';
        if(tmp!='item')
        {
          var newbut=document.createElement("button");
          newbut.id="building"+tmp;
          // newbut.name="buliding"+tmp;
          newbut.type="button";
          newbut.innerHTML=res[0][tmp]+"楼";
          newbut.style="height:100px; width:200px; margin:30px;";
          newbut.setAttribute("onclick","showFloor('"+res[0][tmp]+"')");

          newdiv.appendChild(newbut);
          if(i%2==0)
            newdiv.innerHTML+="<br>"
         
        }    
         i++;    
      }
      document.getElementById("father").appendChild(newdiv);
    }

export default {
  components: {
    api,
    api2,
    api3,

  },
 mounted(){
      var building_info=this.GLOBAL.BuildingInfo.Info;
      initBuildingInfo(building_info);
      initBuilding();
 },
  data() {
    return {
      building_info:[[]],
      people_data: [],
      teacher_data: [],
      trainee_id2no:{},
      group_data: [],
      formData: {
        name: '',
        speciality: '',
        type: '',
        period: ['',''],
        description: '',
      },
      taskData: {
        name: '',
        option: '',
        // order: '',
        date: null,
        period: [null,null],
        teachers: [],
        people: [],
        type: '',
        //score: '',
        classroom: '',
        description: ''
      },
      popData: {
        department: '',
        approver: []
      },
      kinds: [],
      task_chooses: [],
      task_types: [],
      classrooms: [],
      tableData: [],
      departments: [],
      approvers: [],
      approvers_res: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogReserveVisible: false,
      tags: [],

      first_choose: '',
      periods: [],
      startTimeRange: [],
      endTimeRange: []
    }
  },
  created() {
    this.getSelection(),
    window.showFloor=this.showFloor;
    window.setRoom=this.setRoom;
    window.judgeReserve=window.judgeReserve;
    window.initBuildingInfo=this.initBuildingInfo;
    window.pushPage=this.pushPage;

  },

  computed: {
    taskPeriodOptions() {
      return {
        disabledDate(time) {
          var timeNow = Date.now()
          var before=timeNow-24*60*60*1000
          return !(time.getTime()>=before)
        }
      }
    }
  },
  methods: {

    submit(form) {
      console.log(this.formData)
      this.dialogFormVisible = true
    },
    addTask() {
      var timestamp=new Date().getTime()
      if(this.taskData.name==''||this.taskData.option==''||this.taskData.date==null||this.taskData.period[0]==null||this.taskData.period[1]==null||this.taskData.teachers.length==0||this.taskData.people.length==0||this.taskData.type==''||this.taskData.score==' '||this.taskData.classroom==''||this.taskData.description==''){
        this.$message.error('表单内存在空值！');
      }
      else{
        this.tableData.push({
          classroom: this.taskData.classroom,
          name: this.taskData.name,
          chooseTask: this.taskData.option,
          type: this.taskData.type,
          //scoringFormTemplate: this.taskData.score,
          inPlanTask: null,
          description: this.taskData.description,
          startTime: this.taskData.date+' '+this.taskData.period[0],
          endTime: this.taskData.date+' '+this.taskData.period[1],
          trainers: this.taskData.teachers,
          trainees: this.taskData.people,
          order: timestamp,
          signInNumber: null,
          signOutNumber: null
        })
      }
    },
    deleteRow(index, tableData) {
      this.tableData.splice(index, 1)
    },
    getSelection() {
      let that=this
      api.planTypes().then( res => {
        that.kinds=[]
        if(res.hasOwnProperty('_embedded'))
        {
          for(var i=0;i<res._embedded.planTypes.length;i++)
          {
            that.kinds.push({label:res._embedded.planTypes[i].name,value:res._embedded.planTypes[i].name})
          }
        }
      })
      api.taskTypes().then( res => {
        that.task_types=[]
        if(res.hasOwnProperty('_embedded'))
        {
          for(var i=0;i<res._embedded.taskTypes.length;i++)
          {
            that.task_types.push({label:res._embedded.taskTypes[i].name,value:res._embedded.taskTypes[i].name})
          }
        }
      })
      api.chooseTasks().then( res => {
        that.task_chooses=[]
        if(res.hasOwnProperty('_embedded'))
        {
          for(var i=0;i<res._embedded.chooseTasks.length;i++)
          {
            that.task_chooses.push({label:res._embedded.chooseTasks[i].name,value:res._embedded.chooseTasks[i].name})
          }
        }
      })
      api.classrooms().then( res => {
        that.classrooms=[]
        if(res.hasOwnProperty('_embedded'))
        {
          for(var i=0;i<res._embedded.classrooms.length;i++)
          {
            var temp=res._embedded.classrooms[i]._links.self.href.split("/")
            var classroom_id=temp[temp.length-1]
            that.classrooms.push({label:res._embedded.classrooms[i].name,value:classroom_id})
          }
        }
      })
      api3.getTrainee().then( res => {
        that.people_data=[]
        if(res.hasOwnProperty('_embedded'))
        {
          for(var i=0;i<res._embedded.hashMaps.length;i++)
          {
            that.people_data.push({no:i,label:res._embedded.hashMaps[i].name,key:res._embedded.hashMaps[i].id})
            that.trainee_id2no[res._embedded.hashMaps[i].id]=i
          }
        }
      })
      api3.getTrainer().then( res => {
        that.teacher_data=[]
        for(var i=0;i<res._embedded.hashMaps.length;i++)
        {
          that.teacher_data.push({label:res._embedded.hashMaps[i].name,value:res._embedded.hashMaps[i].id})
        }
      })
      api3.getTraineeGroup().then( res => {
        that.group_data=[]
        if(res.hasOwnProperty('_embedded'))
        {
          var no=0
          for(var i=0;i<res._embedded.hashMaps.length;i++)
          {
            if(res._embedded.hashMaps[i].users.length>0){
              that.group_data.push({
                no:no,
                label:res._embedded.hashMaps[i].name,
                key:res._embedded.hashMaps[i].group_id,
                users:res._embedded.hashMaps[i].users,
                isIndeterminate:false,
                isCheckAll:false,
                selection:[]
              })
              no=no+1
            }
          }   
        }
      })
      api3.getDepts().then( res => {
        that.departments=[]
        if(res.hasOwnProperty('_embedded'))
        {
          for(var i=0;i<res._embedded.dboxVoes.length;i++)
          {
            that.departments.push({label:res._embedded.dboxVoes[i].label,value:res._embedded.dboxVoes[i].key})
          }
        }
      })
    },
    save() {
      this.dialogFormVisible = false;
      var data={
        name: this.formData.name,
        major:this.formData.speciality,
        type: this.formData.type,
        goal:'',
        detailed: this.formData.description,
        status:'未申请',
        searchText: this.formData.name,
        startTime: this.formData.period[0],
        endTime: this.formData.period[1],
        auditors: [],
        tasks: this.tableData,
        user: this.$user.userId
      }

      if(data.name==''||data.major==''||data.type==''||data.detailed==''||data.searchText==''||data.startTime==''||data.endTime==''){
        this.$message.error('表单内存在空值！');
      }
      else{
        api.add(data).then(res => {
            this.$message({
              message: '保存成功！',
              type: 'success'
          });
          this.$router.go(-1)
          console.log("add new plan successfully!")
        })
      }
    },
    commit(){
      this.dialogFormVisible = false;
      var data={
        name: this.formData.name,
        major:this.formData.speciality,
        type: this.formData.type,
        goal:'',
        detailed: this.formData.description,
        status:'未申请',
        searchText: this.formData.name,
        startTime: this.formData.period[0],
        endTime: this.formData.period[1],
        auditors: [],
        tasks: this.tableData,
        user: this.$user.userId
      }
      var auditors=[]
      for(var i=0;i<this.popData.approver.length;i++)
      {
        auditors.push(this.approvers_res[this.popData.approver[i]].id)
      }
      data.auditors=auditors
      if(data.name==''||data.major==''||data.type==''||data.detailed==''||data.searchText==''||data.startTime==''||data.endTime==''||data.auditors.length==0){
        this.$message.error('表单内存在空值！');
      }
      else{
        api.add(data).then(res => {
          var temp=res._links.self.href.split("/")
          var id=temp[temp.length-1]
          api2.submit({
            user:this.$user.userId,
            plan:id
          }).then(res => {
            this.$message({
              message: '保存并提交成功！',
              type: 'success'
            });
            this.$router.go(-1)
            console.log("submit plan successfully!")
          })
        })
      }
    },
    changeDate() {  
      if(this.first_choose=='' || this.first_choose=='period') {
        //清空或未选择
        if(this.taskData.date==null) {
          this.taskData.period=[null,null]
          this.first_choose=''
          this.taskData.classroom=''
          this.startTimeRange=[]
          this.endTimeRange=[]
          var that=this
          api.classrooms().then( res => {
            that.classrooms=[]
            for(var i=0;i<res._embedded.classrooms.length;i++)
            {
              that.classrooms.push({label:res._embedded.classrooms[i].name,value:res._embedded.classrooms[i].id})
            }
          })
        }
        else if(this.taskData.period[0]==null)
        {
          this.taskData.period[1]=null
        }
        else if(this.taskData.date!=null&&this.taskData.period[0]!=null&&this.taskData.period[1]!=null) {
        //选择了日期
          this.first_choose='period'
          var that=this
          api.findClassrooms({
            date: that.taskData.date,
            startTime: that.taskData.period[0],
            endTime: that.taskData.period[1]
          }).then( res => {
            that.classrooms=[]
            for(var i=0;i<res._embedded.classrooms.length;i++)
            {
              that.classrooms.push({label:res._embedded.classrooms[i].name,value:res._embedded.classrooms[i].id})
            }
          })
        }
      }
      else if(this.first_choose=='classroom')
      {
        var that=this
        that.taskData.period=[null,null]
        if (that.taskData.date!=null) {
          api.findAvailableTime({
            id: that.taskData.classroom,
            date: that.taskData.date
          }).then( res => {
            that.periods=[]
            that.startTimeRange=[]
            for(var i=0;i<res._embedded.periods.length;i++)
            {
              that.periods.push({startTime:res._embedded.periods[i].startTime.substr(11,19),endTime:res._embedded.periods[i].endTime.substr(11,19)})
              that.startTimeRange.push(res._embedded.periods[i].startTime.substr(11,19)+' - '+res._embedded.periods[i].endTime.substr(11,19))
            }
          })
        }
      }
    },
    changeStartTime() {

      if(this.first_choose=='' || this.first_choose=='period') {
        //清空或未选择
        if(this.taskData.period[0]==null)
        {
          this.taskData.period[1]=null
        }
        else if(this.taskData.date!=null&&this.taskData.period[0]!=null&&this.taskData.period[1]!=null) {
        //选择了日期
          this.first_choose='period'
          var that=this
          api.findClassrooms({
            date: that.taskData.date,
            startTime: that.taskData.period[0],
            endTime: that.taskData.period[1]
          }).then( res => {
            that.classrooms=[]
            for(var i=0;i<res._embedded.classrooms.length;i++)
            {
              that.classrooms.push({label:res._embedded.classrooms[i].name,value:res._embedded.classrooms[i].id})
            }
          })
        }
      }
      else if(this.first_choose=='classroom')
      {
        var that=this
        that.taskData.period[1]=null
        if (that.taskData.period[0]!=null) {
          for(var i=0;i<that.periods.length;i++)
          {
            // if(new Date(that.taskData.period[0]).getTime() >= new Date(that.periods[i].startTime).getTime() && new Date(that.taskData.period[0]).getTime() <= new Date(that.periods[i].endTime).getTime())
            if(that.taskData.period[0] >= that.periods[i].startTime && that.taskData.period[0] <= that.periods[i].endTime)
            {
              that.endTimeRange=[that.taskData.period[0]+' - '+that.periods[i].endTime]
              break
            }
          }
        }
      }
    },
    changeEndTime() {
      this.judgeReserve();

      if(this.first_choose=='' || this.first_choose=='period') {
        if(this.taskData.date!=null&&this.taskData.period[0]!=null&&this.taskData.period[1]!=null) {
        //选择了日期
        //查看预约情况

          this.first_choose='period'
          var that=this
          api.findClassrooms({
            date: that.taskData.date,
            startTime: that.taskData.period[0],
            endTime: that.taskData.period[1]
          }).then( res => {
            that.classrooms=[]
            for(var i=0;i<res._embedded.classrooms.length;i++)
            {
              that.classrooms.push({label:res._embedded.classrooms[i].name,value:res._embedded.classrooms[i].id})
            }
          })
         }
      }

    },
    changeClassroom() {
      if(this.first_choose=='' || this.first_choose=='classroom') {
        //清空或未选择
        if(this.taskData.classroom=='') {
          this.first_choose=''
          this.taskData.date=null
          this.taskData.period=[null, null]
          this.startTimeRange=[]
          this.endTimeRange=[]
        }
        else{
        //选择了教室或者换了教室
          this.first_choose='classroom'
          this.taskData.date=null
          this.taskData.period=[null, null]
        }
      }
    },
    changeDep(){
      var that=this
      api3.getAuditor(this.popData.department).then( res => {
        that.approvers=[]
        that.approvers_res=res._embedded.auditorVoes
        if(res.hasOwnProperty('_embedded'))
        {
          for(var i=0;i<res._embedded.auditorVoes.length;i++)
          {
            that.approvers.push({label:res._embedded.auditorVoes[i].name,key:res._embedded.auditorVoes[i].id,value:i})
          }
          console.log(that.approvers)
        }
      })
    },
    handleGroupChange(gno){
      if(this.group_data[gno].isIndeterminate)
      {
        this.group_data[gno].isIndeterminate=false
      }
      var users=this.group_data[gno].users
      if(this.group_data[gno].isCheckAll)
      {
        this.group_data[gno].selection=[]
        users.forEach(user => {
          this.group_data[gno].selection.push(user)
        });
      }
      else
      {
        this.group_data[gno].selection=[]
      }
      users.forEach(user => {
        this.$refs.traineeTable.toggleRowSelection(this.people_data[this.trainee_id2no[user]],this.group_data[gno].isCheckAll);
        this.traineeChange(user,this.group_data[gno].isCheckAll,gno)
      });
      //console.log(this.group_data[gno].selection)
    },
    handleSelectionChange(selection){
      this.taskData.people=[]
      for(var i=0;i<selection.length;i++)
      {
        this.taskData.people.push(selection[i].key)
      }
    },
    handleTraineeChange(selection, row){
      this.traineeChange(row.key,selection.indexOf(row)>=0)
    },
    handleTraineeAll(selection){
      for(var i=0;i<this.people_data.length;i++)
      {
        this.traineeChange(this.people_data[i].key,selection.length!=0)
      }
      // for(var j=0;j<this.group_data.length;j++)
      // {
      //   console.log(this.group_data[j].label,this.group_data[j].selection)
      // }
    },
    traineeChange(id,isselect,skip_gno=-1){
      for(var i=0;i<this.group_data.length;i++)
      {
        if(i==skip_gno)
        {
          continue
        }
        if(this.group_data[i].users.indexOf(id)>=0)
        {
          if(isselect&&this.group_data[i].selection.indexOf(id)==-1)
          {
            this.group_data[i].selection.push(id)
            if(this.group_data[i].selection.length==this.group_data[i].users.length)
            {
              this.group_data[i].isIndeterminate=false
              this.group_data[i].isCheckAll=true
            }
            else
            {
              this.group_data[i].isIndeterminate=true
              this.group_data[i].isCheckAll=false
            }
          }
          if(!isselect&&this.group_data[i].selection.indexOf(id)>=0)
          {
            this.group_data[i].selection.splice(this.group_data[i].selection.indexOf(id),1)
            if(this.group_data[i].selection.length==0)
            {
              this.group_data[i].isIndeterminate=false
              this.group_data[i].isCheckAll=false
            }
            else
            {
              this.group_data[i].isIndeterminate=true
              this.group_data[i].isCheckAll=false
            }
          }
        }
      }
    },
    showFloor(building)
    {
      this.GLOBAL.ChosenInfo.Building=building;
    //删除上一次生成的
    var s=document.getElementById("newdiv");
    if(s!=null)
      s.parentNode.removeChild(s);

      var res=building_info;    //楼的数据

      var newdiv=document.createElement("div");
      newdiv.id="newdiv";
      var i=Number(1+building.charCodeAt()-65);

      for(var tmp=0;tmp<res[i].length;tmp++){
          newdiv.className='buildings';
          var newbut=document.createElement("button");
          newbut.id=building+'-'+res[i][tmp];

          newbut.type="button";
          //检查是否能预约状态
          var t=this.GLOBAL.BuildingInfo.Reserve;
          if(t[newbut.id]==null||t[newbut.id][3]==1)
          {
            newbut.innerHTML=res[i][tmp];
            newbut.style="height:80px; width:160px; margin:40px;background-color:rgb(84, 151, 233);border:none;color:white;font-color:white;";
          }
          else
          {
            newbut.innerHTML=res[i][tmp]+"满";
            newbut.style="height:80px; width:160px; margin:40px;background-color:rgb(225, 73, 91);border:none;color:white;font-color:white;";

          }
          newbut.setAttribute("onclick","setRoom('"+res[i][tmp]+"')");

          newdiv.appendChild(newbut);
          if(tmp!=0&&(tmp+1)%4==0)
            newdiv.innerHTML+="<br>";
           
      }
      document.getElementById("son").appendChild(newdiv);
    },
    //变色
    Reserved(if_reserved,room,room_num)
    {
      var btn=document.getElementById(room);
      if(if_reserved)
      {
        btn.innerHTML=room_num+"满";
        btn.style="height:80px; width:160px; margin:40px;background-color:rgb(225, 73, 91);border:none;color:white;font-color:white;";
        this.GLOBAL.BuildingInfo.Reserve[room][3]=0;   //不允许预约
      }
      else
      {
        btn.innerHTML=room_num;
        btn.style="height:80px; width:160px; margin:40px;background-color:rgb(84, 151, 233);border:none;color:white;font-color:white;";
        this.GLOBAL.BuildingInfo.Reserve[room][3]=1;   //允许预约
      }
    },
    //比较开始时间和结束时间
    judgeTime(i,reserve_data)
    {
      var if_reserved=0;
        var start_time=reserve_data[1][i];
        var end_time=reserve_data[2][i];
        var b1=(this.taskData.period[0]<start_time&&this.taskData.period[1]<start_time);
        var b2=(this.taskData.period[0]>end_time&&this.taskData.period[1]>end_time);
        if(b1||b2)
          console.log("该时间未被预约");
        else
        {
          console.log("该时间有预约");
          if_reserved=1;

        }
        return if_reserved;
    },
    judgeReserve()
    {
      var i=Number(1+this.GLOBAL.ChosenInfo.Building.charCodeAt()-65);
      var res=building_info;    //楼的数据
      //遍历选中楼宇的每个房间
      for(var tmp=0;tmp<res[i].length;tmp++)
      {
        //this.GLOBAL.ChosenInfo.Union=room;          
        var room=this.GLOBAL.ChosenInfo.Building+'-'+res[i][tmp];
        var conserve=this.GLOBAL.BuildingInfo.Reserve;
        var reserve_data=conserve[room];
        var if_reserved=0;

        if(reserve_data==null)
          return; 

        //比较年月日
        for(var t in reserve_data[0])
        {
          if(reserve_data[0][t]==this.taskData.date)
          {
            console.log("该日期有预约");
            if_reserved=(this.judgeTime(t,reserve_data));
          }
        }
        this.Reserved(if_reserved,room,res[i][tmp]);
      }
    },
    pushPage()
    {
      this.$router.push({path: 'device_task'})
    },
    setRoom(room)
    {
      this.GLOBAL.ChosenInfo.Room=room;     
      var building=this.GLOBAL.ChosenInfo.Building;
      var Room=building+'-'+room;
      var t=this.GLOBAL.BuildingInfo.Reserve;
      //打开预约资料卡
      if(t[Room]==null||t[Room][3]==1)
          this.dialogReserveVisible=true;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
  }
}
</script>
<style lang="scss" scoped>
  .box-card {
  width: 400px;
  max-width: 100%;
  margin: 20px auto;
 //color:rgb(225, 73, 91)
  }
</style>
