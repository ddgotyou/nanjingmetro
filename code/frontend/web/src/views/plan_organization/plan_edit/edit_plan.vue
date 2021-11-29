<!--
 * @Author: your name
 * @LastEditors: your name
-->
<template>
  <div class="app-container">
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
                end-placeholder="结束日期">
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
        <div slot="header">人员添加</div>
        <el-tabs v-model="tab_activeName" @tab-click="handleClick">
          <el-tab-pane style="text-align:center;" label="学员" name="students">
            <el-transfer
              v-model="formData.people"
              style="text-align: left; display: inline-block"
              filterable
              filter-placeholder="请输入学员姓名"
              :data="people_data"
              :titles="['候选', '选中']"
              :button-texts="['取消添加', '添加用户']"
            />
          </el-tab-pane>
          <el-tab-pane style="text-align:center;" label="用户组" name="classes">
            <el-transfer
              v-model="formData.classes"
              style="text-align: left; display: inline-block"
              filterable
              filter-placeholder="请输入用户组名称"
              :data="classes_data"
              :titles="['候选', '选中']"
              :button-texts="['取消添加', '添加用户组']"
            />
          </el-tab-pane>
        </el-tabs>
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
                  @change="changePeriod">
                </el-date-picker>
                <el-time-picker
                  style="width:25%;"
                  placeholder="起始时间"
                  format="HH:mm"
                  value-format="HH:mm:ss"
                  :disabled="taskData.date==null"
                  v-model="taskData.period[0]"
                  :picker-options="{
                    selectableRange: ['18:30:00 - 20:30:00', '22:30:00 - 23:30:00']
                  }"
                  @change="changePeriod">
                </el-time-picker>
                <el-time-picker
                  style="width:25%;"
                  placeholder="结束时间"
                  format="HH:mm"
                  value-format="HH:mm:ss"
                  :disabled="taskData.date==null||taskData.period[0]==null"
                  v-model="taskData.period[1]"
                  :picker-options="{
                    selectableRange: ['18:30:00 - 20:30:00', '22:30:00 - 23:30:00']
                  }"
                  @change="changePeriod">
                </el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="顺序">
                <el-input-number style="width:100%;" v-model="taskData.order" :min="1" :max="100"></el-input-number>
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
              <el-form-item label="评分">
                <el-select id="task_type" v-model="taskData.score" style="width:100%" placeholder="请选择">
                  <el-option
                    v-for="item in task_scores"
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
              <el-form-item label="教室">
                <el-select v-model="taskData.classroom" style="width:100%" placeholder="请选择" clearable @change="changeClassroom()">
                  <el-option
                    v-for="item in classrooms"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="描述">
                <el-input v-model="taskData.description" />
              </el-form-item>
            </el-col>
          </el-row>
          <div style="text-align:right"><el-button type="primary" @click="addTask">确认新增</el-button></div>
        </el-form>
        <el-divider />
        <el-table
          :data="tableData"
          style="width: 100"
        >
          <el-table-column
            prop="order"
            label="任务顺序"
          />
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
                <el-select v-model="popData.departmen" style="width:100%" filterable placeholder="请选择部门" @change="changeDep">
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
import api from '@/api/training_plan/training_plan'
import api2 from '@/api/training_plan/application'
import api3 from '@/api/training_plan/account'
export default {
  components: {
    api,
    api2,
    api3
  },
  data() {
    return {
      id: '',
      response: {},
      people_data: [],
      classes_data: [
        {
          label: '普通培训一班',
          key: 0
        },
        {
          label: '普通培训二班',
          key: 1
        },
        {
          label: '特殊培训一班',
          key: 2
        }
      ],
      formData: {
        name: '',
        speciality: '',
        type: '',
        period: ['',''],
        description: '',
        people: [],
        classes: []
      },
      taskData: {
        name: '',
        option: '',
        order: '',
        date: null,
        period: [null,null],
        type: '',
        score: '',
        classroom: '',
        description: ''
      },
      popData: {
        department: '',
        approver: []
      },
      tab_activeName: 'students',
      kinds: [],
      task_chooses: [],
      task_types: [],
      task_scores: [
        {
          value: '评分规则1',
          label: '评分规则1'
        },
        {
          value: '评分规则2',
          label: '评分规则2'
        },
        {
          value: '评分规则3',
          label: '评分规则3'
        }
      ],
      classrooms: [],
      tableData: [],
      departments: [],
      approvers: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      tags: [],

      first_choose: '',
      periods: []
    }
  },
  created() {
    var temp=this.$route.query.self.split("/")
    this.id=temp[temp.length-1]
    this.list()
    this.getSelection()
  },
  // computed: {
  //   taskPeriodOptions() {
  //     var that=this
  //     return {
  //       disabledDate(time) {
  //         var timeNow = Date.now()
  //         var before=timeNow-24*60*60*1000
  //         var flag=false;
  //         if(that.first_choose=='classroom')
  //         {
  //           for(var i=0;i<that.periods.length;i++)
  //           {
  //             if(time>=(new Date(that.periods[i].startTime)).getTime()&&time<=(new Date(that.periods[i].endTime)).getTime())
  //             {
  //               flag=true
  //               // if(time.getTime()>=before)
  //               // {
  //               //   flag=true;
  //               // }
  //             }
  //           }
  //         }
  //         else{
  //           flag=true
  //           // if(time.getTime()>=before)
  //           // {
  //           //   flag=true;
  //           // }
  //         }
  //         return !flag;
  //       }
  //     }
  //   }
  // },
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
          people: res.trainees,
          classes: []
        };
        console.log(re)
        if(res.tasks.length==0)
        {
          that.tableData=[]
        }
        else
        {
          that.tableData=res.tasks;
          that.tableData.sort(function (a,b) {
            return a.order-b.order;
          });
        }
      });
    },
    submit(form) {
      console.log(this.formData)
      this.dialogFormVisible = true
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    addTask() {
      if(this.taskData.name==''||this.taskData.option==''||this.taskData.date==null||this.taskData.period[0]==null||this.taskData.period[1]==null||this.taskData.order==''||this.taskData.type==''||this.taskData.score==' '||this.taskData.classroom==''||this.taskData.description==''){
        this.$message.error('表单内存在空值！');
      }
      else{
        this.tableData.push({
          classroom: this.taskData.classroom,
          name: this.taskData.name,
          chooseTask: this.taskData.option,
          type: this.taskData.type,
          taskScore: this.taskData.score,
          inPlanTask: null,
          description: this.taskData.description,
          startTime: this.taskData.date+' '+this.taskData.period[0],
          endTime: this.taskData.date+' '+this.taskData.period[1],
          order: this.taskData.order,
          signInNumber: null,
          signOutNumber: null
        })
        this.tableData.sort(function (a,b) {
          return a.order-b.order;
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
      api3.getAuditor(this.$user.userId,'').then( res => {
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
    // changePeriod() {
    //   if(this.first_choose=='' || this.first_choose=='period') {
    //     //清空或未选择
    //     if(this.taskData.period==null) {
    //       this.first_choose=''
    //       this.taskData.classroom=''
    //       var that=this
    //       api.classrooms().then( res => {
    //         that.classrooms=[]
    //         for(var i=0;i<res._embedded.classrooms.length;i++)
    //         {
    //           that.classrooms.push({label:res._embedded.classrooms[i].name,value:res._embedded.classrooms[i].id})
    //         }
    //       })
    //     }
    //     else{
    //     //选择了日期
    //       this.first_choose='period'
    //       var that=this
    //       api.findClassrooms({
    //         status:'unused',
    //         startTime:that.taskData.period[0],
    //         endTime:that.taskData.period[1]
    //       }).then( res => {
    //         that.classrooms=[]
    //         for(var i=0;i<res._embedded.classrooms.length;i++)
    //         {
    //           that.classrooms.push({label:res._embedded.classrooms[i].name,value:res._embedded.classrooms[i].id})
    //         }
    //       })
    //     }
    //   }
    // },
    // changeClassroom() {
    //   if(this.first_choose=='' || this.first_choose=='classroom') {
    //     //清空或未选择
    //     if(this.taskData.classroom=='') {
    //       this.first_choose=''
    //       this.taskData.period=null
    //       var that=this
    //       this.periods=[]
    //     }
    //     else{
    //     //选择了教室
    //       this.first_choose='classroom'
    //       var that=this
    //       api.findAvailableTime({
    //         //id:1
    //         id:that.taskData.classroom
    //       }).then( res => {
    //         console.log(res)
    //         that.periods=res._embedded.periods
    //       })
    //     }
    //   }
    // },
    // changeDate(){
    //   if(this.taskData.date==null)
    //   {
    //     this.taskData.startTime=null
    //     this.taskData.endTime=null
    //   }
    //   else
    //   {
    //     let disable_times=[]
    //     for(var i=0;i<this.periods.length;i++)
    //     {
    //       let left_date=new Date(this.periods[i].startTime.slice(0,11)+'00:00:00').getTime()
    //       let right_date=new Date(this.periods[i].endTime.slice(0,11)+'00:00:00').getTime()
    //       let start_date=new Date(this.taskData.date[0].slice(0,11)+'00:00:00').getTime()
    //       let end_date=new Date(this.taskData.date[1].slice(0,11)+'00:00:00').getTime()
    //       if(start_date>=left_date||start_date<=right_date||end_date>=left_date||end_date<=right_date)
    //       {
    //         disable_times.push([this.periods[i].startTime.slice(11,19),this.periods[i].endTime.slice(11,19)])
    //       }
    //     }
    //     console.log(disable_times)
    //   }
    // },
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
        trainees: this.formData.people,
        auditors: [],
        trainers: [],
        tasks: this.tableData,
        user: this.$user.userId
      }

      if(data.name==''||data.major==''||data.type==''||data.detailed==''||data.searchText==''||data.startTime==''||data.endTime==''||data.trainees.length==0){
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
        trainees: this.formData.people,
        auditors: [],
        trainers: [],
        tasks: this.tableData,
      }
      var auditors=[]
      for(var i=0;i<this.popData.approver.length;i++)
      {
        auditors.push(this.approvers_res[this.popData.approver[i]])
      }
      data.auditors=auditors
      if(data.name==''||data.major==''||data.type==''||data.detailed==''||data.searchText==''||data.startTime==''||data.endTime==''||data.trainees.length==0||data.auditors.length==0){
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
    changePeriod() {
      if(this.first_choose=='' || this.first_choose=='period') {
        //清空或未选择
        if(this.taskData.date==null&&this.taskData.period[0]==null&&this.taskData.period[1]==null) {
          this.first_choose=''
          this.taskData.classroom=''
          var that=this
          api.classrooms().then( res => {
            that.classrooms=[]
            for(var i=0;i<res._embedded.classrooms.length;i++)
            {
              that.classrooms.push({label:res._embedded.classrooms[i].name,value:res._embedded.classrooms[i].id})
            }
          })
        }
        else if(this.taskData.date!=null&&this.taskData.period[0]!=null&&this.taskData.period[1]!=null) {
        //选择了日期
          this.first_choose='period'
          var that=this
          api.findClassrooms({
            status:'unused',
            startTime:that.taskData.date+' '+that.taskData.period[0],
            endTime:that.taskData.date+' '+that.taskData.period[1]
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
          this.taskData.period=null
          var that=this
          this.periods=[]
        }
        else{
        //选择了教室
          this.first_choose='classroom'
          var that=this
          api.findAvailableTime({
            //id:1
            id:that.taskData.classroom
          }).then( res => {
            console.log(res)
            that.periods=res._embedded.periods
          })
        }
      }
    },
    changeDep(){
      var that=this
      api3.getAuditor(this.$user.userId,this.popData.department).then( res => {
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
