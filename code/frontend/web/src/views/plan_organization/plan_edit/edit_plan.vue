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
                type="datetimerange"
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
                  style="width:100%;"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="taskData.time"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <!-- <el-form-item label="课时安排">
                <el-input id="task_time" v-model="taskData.time" name="task_time" />
              </el-form-item> -->
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
                <el-input-number style="width:100%;" v-model="taskData.score" :min="1" :max="100"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="教室">
                <el-select v-model="taskData.classroom" style="width:100%" placeholder="请选择">
                  <el-option
                    v-for="item in classrooms"
                    :key="item.value"
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
                <el-select v-model="popData.departmen" style="width:100%" filterable placeholder="请选择部门">
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
export default {
  components: {
    api,
    api2
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
        time: ['',''],
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
      classrooms: [],
      tableData: [],
      departments: [
        {
          value: '古筝部',
          label: '古筝部'
        },
        {
          value: '智子部',
          label: '智子部'
        },
        {
          value: '掩体部',
          label: '掩体部'
        }
      ],
      approvers: [
        {
          value: '章北海',
          label: '章北海'
        },
        {
          value: '艾AA',
          label: '艾AA'
        },
        {
          value: '维德',
          label: '维德'
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      tags: []
    }
  },
  created() {
    var temp=this.$route.query.self.split("/")
    this.id=temp[temp.length-1]
    this.list()
    this.getSelection()
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
        that.tableData_students=res.auditors;
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
      this.tableData.push({
        classroom: this.taskData.classroom,
        name: this.taskData.name,
        chooseTask: this.taskData.option,
        type: this.taskData.type,
        taskScore: this.taskData.score,
        inPlanTask: null,
        description: this.taskData.description,
        startTime: this.taskData.time[0],
        endTime: this.taskData.time[1],
        order: this.taskData.order,
        signInNumber: null,
        signOutNumber: null
      })
      this.tableData.sort(function (a,b) {
        return a.order-b.order;
      })
    },
    deleteRow(index, tableData) {
      this.tableData.splice(index, 1)
    },
    getSelection() {
      let that=this
      api.planTypes().then( res => {
        that.kinds=[]
        for(var i=0;i<res._embedded.planTypes.length;i++)
        {
          that.kinds.push({label:res._embedded.planTypes[i].name,value:res._embedded.planTypes[i].name})
        }
      })
      api.taskTypes().then( res => {
        that.task_types=[]
        for(var i=0;i<res._embedded.taskTypes.length;i++)
        {
          that.task_types.push({label:res._embedded.taskTypes[i].name,value:res._embedded.taskTypes[i].name})
        }
      })
      api.chooseTasks().then( res => {
        that.task_chooses=[]
        for(var i=0;i<res._embedded.chooseTasks.length;i++)
        {
          that.task_chooses.push({label:res._embedded.chooseTasks[i].name,value:res._embedded.chooseTasks[i].name})
        }
      })
     api.classrooms().then( res => {
        that.classrooms=[]
        for(var i=0;i<res._embedded.classrooms.length;i++)
        {
          var temp=res._embedded.classrooms[i]._links.self.href.split("/")
          var classroom_id=temp[temp.length-1]
          that.classrooms.push({label:res._embedded.classrooms[i].name,value:classroom_id})
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
        trainers: [],
        tasks: []
      }
      for(var key in data)
      {
        if(data[key]=='')
        {
          delete data[key]
        }
      }
      var auditors=[]
      for(var i=0;i<this.formData.people.length;i++)
      {
        auditors.push({user:this.formData.people[i],username:this.formData.people[i],userRole:null,approved:null})
      }
      data.auditors=auditors
      data.tasks=this.tableData
      api.update(data,this.id).then(res => {
        this.$message({
          message: '保存成功！',
          type: 'success'
        });
        console.log("update plan successfully!")
      })
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
        trainers: [],
        tasks: []
      }
      for(var key in data)
      {
        if(data[key]=='')
        {
          delete data[key]
        }
      }
      var auditors=[]
      for(var i=0;i<this.formData.people.length;i++)
      {
        auditors.push({user:this.formData.people[i],username:this.formData.people[i],userRole:null,approved:null})
      }
      data.auditors=auditors
      data.tasks=this.tableData
      api.update(data,this.id).then(res => {
        api2.submit({
          user:this.$user.userId,
          plan:this.id
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
