<!--
 * @Author: your name
 * @LastEditors: your name
-->
<template>
  <div class="app-container">
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
            <!-- <el-form-item label="计划周期">
              <el-input id="period" v-model="formData.period" name="period" />
            </el-form-item> -->
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
              <el-form-item label="课时安排">
                <el-date-picker
                  style="width:50%;"
                  value-format="yyyy-MM-dd"
                  v-model="taskData.date"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="taskPeriodOptions"
                  @change="changeDate">
                </el-date-picker>
                <el-time-picker
                  style="width:25%;"
                  placeholder="起始时间"
                  format="HH:mm"
                  value-format="HH:mm:00"
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
                  value-format="HH:mm:00"
                  :disabled="taskData.date==null||taskData.period[0]==null"
                  v-model="taskData.period[1]"
                  :picker-options="{
                    selectableRange: endTimeRange
                  }"
                  @change="changeEndTime">
                </el-time-picker>
              </el-form-item>
            </el-col>
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
                <el-select v-model="taskData.classroom" style="width:100%" placeholder="请选择" clearable @change="changeClassroom()">
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
          <div style="text-align:right">
            <el-button type="primary" @click="saveTask" :disabled="taskIndex<0">修改任务</el-button>
            <el-button type="primary" @click="addTask">确认新增</el-button>
          </div>
        </el-form>
      </el-card>
      <el-card>
        <div slot="header">任务列表</div>
        <el-table
          :data="tableData"
          style="width: 100"
          highlight-current-row
          :cell-class-name="tableCellClassName"
          @cell-click="cellClick"
        >
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <!-- <el-table-column
            prop="order"
            label="任务顺序"
          /> -->
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
                    :key="item.value"
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
  </div>
</template>

<script>
import * as api from '@/api/training_plan/training_plan'
import * as api2 from '@/api/training_plan/application'
import * as api3 from '@/api/training_plan/account'
export default {
  components: {
    api,
    api2,
    api3
  },
  data() {
    return {
      fake: {
        "id" : 15,
        "name" : "test",
        "major" : "321",
        "type" : "新职",
        "goal" : "",
        "detailed" : "321",
        "status" : "未申请",
        "searchText" : "test  321 321",
        "startTime" : "2022-07-03 00:00:00",
        "endTime" : "2022-07-11 00:00:00",
        "auditors" : [ ],
        "tasks" : [ {
          "classroom" : 7,
          "name" : "321",
          "chooseTask" : "理论",
          "type" : "练习",
          "inPlanTask" : null,
          "description" : "312",
          "startTime" : "2022-06-23 15:31:00",
          "endTime" : "2022-06-23 16:31:00",
          "order" : 1655278281670,
          "signInNumber" : null,
          "signOutNumber" : null,
          "trainers" : [ {
            "plan" : 15,
            "taskOrder" : 1655278281670,
            "user" : 5,
            "username" : "测试讲师1",
            "userEmail" : "hahaha@gmail.com"
          } ],
          "trainees" : [ {
            "plan" : 15,
            "taskOrder" : 1655278281670,
            "user" : 6,
            "username" : "测试学员3"
          }, {
            "plan" : 15,
            "taskOrder" : 1655278281670,
            "user" : 13,
            "username" : "测试学员6"
          }, {
            "plan" : 15,
            "taskOrder" : 1655278281670,
            "user" : 3,
            "username" : "测试学员1"
          }, {
            "plan" : 15,
            "taskOrder" : 1655278281670,
            "user" : 11,
            "username" : "测试学员4"
          }, {
            "plan" : 15,
            "taskOrder" : 1655278281670,
            "user" : 4,
            "username" : "测试学员2"
          }, {
            "plan" : 15,
            "taskOrder" : 1655278281670,
            "user" : 18,
            "username" : "20220330"
          }, {
            "plan" : 15,
            "taskOrder" : 1655278281670,
            "user" : 12,
            "username" : "测试学员5"
          } ]
        } ],
        "_links" : {
          "self" : {
            "href" : "http://10.8.0.1:8080/training-plan/plans/15"
          }
        }
      },

      id: '',
      response: {},
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
        //classes: []
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
      taskIndex: -1,

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
      dialogTableVisible: false,
      dialogFormVisible: false,
      tags: [],

      first_choose: '',
      periods: [],
      startTimeRange: [],
      endTimeRange: []
    }
  },
  created() {
    var temp=this.$route.query.self.split("/")
    this.id=temp[temp.length-1]
    this.getSelection()
    this.list()
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
    list() {
      let that=this;
      api.details(this.id)
      .then( res => {
        that.response=res;
        that.formData={
          name: res.name,
          speciality: res.major,
          type: res.type,
          period: [res.startTime,res.endTime],
          description: res.detailed,
          people: [],
          classes: []
        };
        if(res.tasks.length==0)
        {
          that.tableData=[]
        }
        else
        {
          that.tableData=[]
          for(var i=0;i<res.tasks.length;i++)
          {
            var data={
              classroom: res.tasks[i].classroom,
              name: res.tasks[i].name,
              chooseTask: res.tasks[i].chooseTask,
              type: res.tasks[i].type,
              inPlanTask: null,
              description: res.tasks[i].description,
              startTime: res.tasks[i].startTime,
              endTime: res.tasks[i].endTime,
              trainers: [],
              trainees: [],
              order: res.tasks[i].order,
              signInNumber: null,
              signOutNumber: null
            }
            for(var j=0;j<res.tasks[i].trainers.length;j++) {
              data.trainers.push(res.tasks[i].trainers[j].user)
            }
            for(var k=0;k<res.tasks[i].trainees.length;k++) {
              data.trainees.push(res.tasks[i].trainees[k].user)
            }
            that.tableData.push(data)
          }
          that.tableData.sort(function (a,b) {
            return a.order-b.order;
          });
        }
      });
    },
    submit(form) {
      this.dialogFormVisible = true
    },
    saveTask() {
      if(this.taskData.name==''||this.taskData.option==''||this.taskData.date==null||this.taskData.period[0]==null||this.taskData.period[1]==null||this.taskData.teachers.length==0||this.taskData.people.length==0||this.taskData.type==''||this.taskData.score==' '||this.taskData.classroom==''||this.taskData.description==''){
        this.$message.error('表单内存在空值！');
      }
      else{
        var data={
          classroom: this.taskData.classroom,
          name: this.taskData.name,
          chooseTask: this.taskData.option,
          type: this.taskData.type,
          inPlanTask: null,
          description: this.taskData.description,
          startTime: this.taskData.date+' '+this.taskData.period[0],
          endTime: this.taskData.date+' '+this.taskData.period[1],
          trainers: this.taskData.teachers,
          trainees: this.taskData.people,
          order: this.tableData[this.taskIndex].timestamp,
          signInNumber: null,
          signOutNumber: null
        }
        this.$set(this.tableData,this.taskIndex,data)
      }
      console.log(this.tableData)
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
            that.people_data.push({label:res._embedded.hashMaps[i].name,key:res._embedded.hashMaps[i].id})
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
        //user: this.$user.userId
      }
      if(data.name==''||data.major==''||data.type==''||data.detailed==''||data.searchText==''||data.startTime==''||data.endTime==''){
        this.$message.error('表单内存在空值！');
      }
      else{
        api.update(data,this.id).then(res => {
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
        //user: this.$user.userId
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
        let that=this
        api.update(data,that.id).then(res => {
          var temp=res._links.self.href.split("/")
          var id=temp[temp.length-1]
          api2.submit({
            user:that.$user.userId,
            plan:that.id
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
      if(this.first_choose=='' || this.first_choose=='period') {
        if(this.taskData.date!=null&&this.taskData.period[0]!=null&&this.taskData.period[1]!=null) {
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
          //console.log(that.approvers)
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
      this. taskData.people=[]
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
    tableCellClassName({row, column, rowIndex, columnIndex}){
      //注意这里是解构
      //利用单元格的 className 的回调方法，给行列索引赋值
      row.index=rowIndex;
      column.index=columnIndex;
    },
    cellClick(row, column, cell, event){
      this.taskIndex = row.index

      this.taskData.people.forEach(user => {
        this.traineeChange(user, false)
        this.$refs.traineeTable.toggleRowSelection(this.people_data[this.trainee_id2no[user]],false);
      })
      this.taskData={
        name: this.tableData[row.index].name,
        option: this.tableData[row.index].chooseTask,
        date: this.tableData[row.index].startTime.substr(0,10),
        period: [this.tableData[row.index].startTime.substr(11,19),this.tableData[row.index].endTime.substr(11,19)],
        teachers: [],
        people: this.taskData.people,
        type: this.tableData[row.index].type,
        classroom: this.tableData[row.index].classroom,
        description: this.tableData[row.index].description
      }
      for(var i=0; i < this.tableData[row.index].trainers.length; i++) {
        this.taskData.teachers.push(this.tableData[row.index].trainers[i])
      }
      for(var i=0;i<this.tableData[row.index].trainees.length;i++) {
        this.traineeChange(this.tableData[row.index].trainees[i], true)
        this.$refs.traineeTable.toggleRowSelection(this.people_data[this.trainee_id2no[this.tableData[row.index].trainees[i]]],true);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .box-card {
  width: 400px;
  max-width: 100%;
  margin: 20px auto;
  }
</style>
