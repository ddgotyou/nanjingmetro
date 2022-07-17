<!--
 * @Author: your name
 * @LastEditors: your name
-->
<!--
 * @Author: your name
 * @LastEditors: your name
-->
<template>
  <div class="app-container">
    <el-form label-position="right" label-width="80px">
      <el-dialog title="编辑预约任务" :visible.sync="dialogFormVisible" @closed="closed">
        <el-divider content-position="left">基本信息</el-divider>
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
                v-model="taskData.trainers"
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
            <!-- <el-col :span="12">
              <el-form-item label="顺序">
                <el-input-number style="width:100%;" v-model="taskData.order" :min="1" :max="100"></el-input-number>
              </el-form-item>
            </el-col> -->
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
          <el-divider content-position="left">人员添加</el-divider>
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
          <el-divider />
          <div style="text-align:right"><el-button type="primary" @click="save">保存</el-button></div>
        </el-form>
      </el-dialog>
      <el-card class="box-card" style="width:100%">
        <div slot="header">新增预约</div>
        <el-divider content-position="left">基本信息</el-divider>
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
                v-model="taskData.trainers"
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
            <!-- <el-col :span="12">
              <el-form-item label="顺序">
                <el-input-number style="width:100%;" v-model="taskData.order" :min="1" :max="100"></el-input-number>
              </el-form-item>
            </el-col> -->
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
          <el-divider content-position="left">人员添加</el-divider>
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
          <el-divider />
          <div style="text-align:right"><el-button type="primary" @click="addTask">确认新增</el-button></div>
        </el-form>
      </el-card>
      <el-card class="box-card" style="width:100%">
        <div slot="header">任务列表</div>
        <el-table
          :data="tableData"
          style="width: 100"
        >
          <el-table-column
            prop="name"
            label="任务名称"
          />
          <el-table-column
            prop="chooseTask"
            label="任务选择"
          />
          <el-table-column
            prop="startTime"
            label="课时开始时间"
          />
          <el-table-column
            prop="endTime"
            label="课时结束时间"
          />
          <el-table-column
            prop="type"
            label="类型"
          />
          <el-table-column
            prop="classroom"
            label="教室"
          />
            <el-table-column
            label="讲师"
          >
            <template slot-scope="scope">
              <el-select value="" filterable placeholder="搜索">
                <el-option
                  v-for="item in scope.row.trainers"
                  :key="item.user"
                  :label="item.username"
                  :value="item.user">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="学员"
          >
            <template slot-scope="scope">
              <el-select value="" filterable placeholder="搜索">
                <el-option
                  v-for="item in scope.row.trainees"
                  :key="item.user"
                  :label="item.username"
                  :value="item.user">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述"
          />
          <el-table-column
            label="操作"
            width="120"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="edit(scope.$index)"
              >
                编辑
              </el-button>
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
        <el-pagination style="text-align: center"
          layout="total, sizes, prev, pager, next, jumper"
          :current-page.sync="index"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          :total="response.page.totalElements"
          @size-change="size_change"
          @current-change="index_change()">
        </el-pagination>
      </el-card>
    </el-form>
  </div>
</template>

<script>
import * as api from '@/api/training_plan/training_plan'
import * as api3 from '@/api/training_plan/account'
export default {
  components: {
    api
  },
  data() {
    return {
      chooseId: null,
      taskData: {
        name: '',
        option: '',
        // order: '',
        date: null,
        period: [null,null],
        trainers: [],
        trainees: [],
        type: '',
        classroom: '',
        description: ''
      },
      index: 1,
      pageSize: 10,
      response: {"page": {
        "size": 0,
        "totalElements": 0,
        "totalPages": 0,
        "number": 0
        }
      },
      kinds: [],
      task_chooses: [],
      teacher_data: [],
      task_types: [],
      classrooms: [],
      tableData: [],

      group_data: [],
      people_data: [],
      trainee_id2no:{},

      first_choose: '',
      periods: [],
      startTimeRange: [],
      endTimeRange: [],

      dialogFormVisible: true
    }
  },
  created(){
    this.getSelection()
    this.list()
    this.dialogFormVisible=false
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
  methods:{
    list() {
      var that=this
      var params = {
        module: 'tmp_task_edit',
        page: that.index-1,
        size: that.pageSize
      }
      api.getTempTasks(this.$user.userId,params).then( res => {
        that.response=res
        that.tableData=[]
        for(var i=0;i<res._embedded.tmpTasks.length;i++)
        {
          that.tableData.push({
            id:res._embedded.tmpTasks[i].id,
            name:res._embedded.tmpTasks[i].name,
            chooseTask:res._embedded.tmpTasks[i].chooseTask,
            startTime:res._embedded.tmpTasks[i].startTime,
            endTime:res._embedded.tmpTasks[i].endTime,
            type:res._embedded.tmpTasks[i].type,
            classroom:res._embedded.tmpTasks[i].classroom,
            description:res._embedded.tmpTasks[i].description,
            trainers:res._embedded.tmpTasks[i].trainers,
            trainees:res._embedded.tmpTasks[i].trainees
          })
        }
      })
    },
    addTask() {
      if(this.taskData.name==''||this.taskData.option==''||this.taskData.date==null||this.taskData.period[0]==null||this.taskData.period[1]==null||this.taskData.type==''||this.taskData.classroom==''||this.taskData.description==''||this.taskData.trainers.length==0||this.taskData.trainees.length==0){
        this.$message.error('表单内存在空值！');
      }
      else{
        api.addTempTask({
          classroom: this.taskData.classroom,
          name: this.taskData.name,
          chooseTask: this.taskData.option,
          type: this.taskData.type,
          inPlanTask: null,
          description: this.taskData.description,
          startTime: this.taskData.date+' '+this.taskData.period[0],
          endTime: this.taskData.date+' '+this.taskData.period[1],
          // order: this.taskData.order,
          trainees: this.taskData.trainees,
          trainers: this.taskData.trainers,
          signInNumber: null,
          signOutNumber: null
        }).then( res => {
          this.list()
          this.$message({
            message: '预约临时任务成功！',
            type: 'success'
          });
        })
      }
    },
    save() {
      if(this.taskData.name==''||this.taskData.option==''||this.taskData.date==null||this.taskData.period[0]==null||this.taskData.period[1]==null||this.taskData.type==''||this.taskData.classroom==''||this.taskData.description==''||this.taskData.trainers.length==0||this.taskData.trainees.length==0){
        this.$message.error('表单内存在空值！');
      }
      else{
        api.updateTempTask(this.chooseId,{
          classroom: this.taskData.classroom,
          name: this.taskData.name,
          chooseTask: this.taskData.option,
          type: this.taskData.type,
          inPlanTask: null,
          description: this.taskData.description,
          startTime: this.taskData.date+' '+this.taskData.period[0],
          endTime: this.taskData.date+' '+this.taskData.period[1],
          // order: this.taskData.order,
          trainees: this.taskData.trainees,
          trainers: this.taskData.trainers,
          signInNumber: null,
          signOutNumber: null
        }).then( res => {
          this.list()
          this.$message({
            message: '更新临时任务成功！',
            type: 'success'
          });
        })
      }
      this.dialogFormVisible=false
    },
    edit(index) {
      this.dialogFormVisible=true
      this.chooseId=this.tableData[index].id
      this.taskData={
        name: this.tableData[index].name,
        option: this.tableData[index].chooseTask,
        date: this.tableData[index].startTime.substr(0,10),
        period: [this.tableData[index].startTime.substr(11,19),this.tableData[index].endTime.substr(11,19)],
        trainers: [],
        trainees: [],
        type: this.tableData[index].type,
        classroom: null,
        description: this.tableData[index].description
      }
      for(var i=0;i< this.tableData[index].trainers.length;i++){
        this.taskData.trainers.push(this.tableData[index].trainers[i].user)
      }
      this.$nextTick(() => {
         for(var i=0;i< this.tableData[index].trainees.length;i++){
          this.taskData.trainees.push(this.tableData[index].trainees[i].user)
          this.$refs.traineeTable.toggleRowSelection(this.people_data[this.trainee_id2no[this.tableData[index].trainees[i].user]],true);
          this.traineeChange(this.tableData[index].trainees[i].user,true)
        }
      }) 
      for(var i=0;i< this.classrooms.length;i++){
        if(this.classrooms[i].label==this.tableData[index].classroom){
          this.taskData.classroom=this.classrooms[i].value
        }
      }
    },
    deleteRow(index, tableData) {
      api.deleteTempTask(this.tableData[index].id).then( res => {
        this.index=0
        this.list()
      })
    },
    closed(){
      for(var key in this.trainee_id2no){
        // console.log(key,this.trainee_id2no[key])
        this.$refs.traineeTable.clearSelection();
        this.traineeChange(key,false)
      }

      this.chooseId=null
      this.taskData={
        name: '',
        option: '',
        date: null,
        period: [null,null],
        trainers: [],
        trainees: [],
        type: '',
        classroom: '',
        description: ''
      },
      this.tableData=[]
      this.list()
    },
    getSelection() {
      let that=this
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
    size_change(val){
      this.pageSize=val
      this.index_change()
    },
    index_change(){
      this.list()
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
      this.taskData.trainees=[]
      for(var i=0;i<selection.length;i++)
      {
        this.taskData.trainees.push(selection[i].key)
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