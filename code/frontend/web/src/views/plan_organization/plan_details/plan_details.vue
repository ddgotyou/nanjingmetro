<template>
  <div class="app-container">
    <el-button style="float:right;margin:10px;" icon="el-icon-arrow-left" circle @click="$router.go(-1)"></el-button>
    <el-form label-position="right" label-width="80px" :model="baseData">
      <el-card class="box-card" style="width:100%">
        <div slot="header">基本信息</div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称">
              <el-input id="name" v-model="baseData.name" name="name"  readonly />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="专业">
              <el-input id="speciality" v-model="baseData.speciality" name="speciality" readonly />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="类型">
              <el-input id="type" v-model="baseData.type" style="width:100%" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划周期">
              <el-input id="period" v-model="baseData.period" name="period" readonly />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="描述">
              <el-input
                id="description"
                v-model="baseData.description"
                type="textarea"
                :rows="4"
                readonly
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card" style="width:100%">
        <div slot="header">讲师</div>
          <el-table
            :data="baseData.trainers"
            style="width: 100"
            :default-sort = "{prop: 'user', order: 'ascending'}"
          >
            <el-table-column
              prop="user"
              label="用户"
            />
            <el-table-column
              prop="username"
              label="用户名"
            />
            <el-table-column
              prop="userEmail"
              label="邮箱"
            />
          </el-table>
      </el-card>
      <el-card class="box-card" style="width:100%">
        <div slot="header">学员</div>
        <el-row>
          <el-col :span="24">
            <el-form-item label="模糊搜索">
              <el-input
                id="search"
                v-model="search_value"
                type="text"
                placeholder="在此输入搜索信息"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider />
          <el-table
            :data="baseData.trainees.filter(data => (!search_value || data.user.toString().toLowerCase().includes(search_value.toLowerCase()) || data.username.toLowerCase().includes(search_value.toLowerCase())))"
            style="width: 100"
            height="250"
            :default-sort = "{prop: 'user', order: 'ascending'}"
          >
            <el-table-column
              prop="user"
              label="用户"
            />
            <el-table-column
              prop="username"
              label="用户名"
            />
          </el-table>
      </el-card>
      <el-card class="box-card" style="width:100%">
        <div slot="header">详细任务</div>
        <el-form label-position="right" label-width="80px" :model="tableData_tasks[taskIndex]">
          <el-row>
            <el-col :span="12">
              <el-form-item label="任务名称">
                <el-input id="task_name" v-model="tableData_tasks[taskIndex].name" name="task_name" readonly />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="任务选择">
                <el-input id="task_option" v-model="tableData_tasks[taskIndex].chooseTask" style="width:100%" readonly />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="开始时间">
                <el-input id="task_time" v-model="tableData_tasks[taskIndex].startTime" name="task_time" readonly />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结束时间">
                <el-input id="task_time" v-model="tableData_tasks[taskIndex].endTime" name="task_time" readonly />
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="顺序">
                <el-input id="task_sequence" v-model="tableData_tasks[taskIndex].order" style="width:100%" readonly />
              </el-form-item>
            </el-col> -->
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="类型">
                <el-input id="task_type" v-model="tableData_tasks[taskIndex].type" style="width:100%" readonly />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="评分">
                <el-input id="task_standard" v-model="tableData_scores[tableData_tasks[taskIndex].scoringFormTemplate]" style="width:100%" readonly />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="教室">
                <el-input v-model="tableData_classrooms[tableData_tasks[taskIndex].classroom]" style="width:100%" readonly />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="描述">
                <el-input v-model="tableData_tasks[taskIndex].description" style="width:100%" readonly />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-divider />
        <el-table
          :data="tableData_tasks"
          style="width: 100"
          highlight-current-row
          :cell-class-name="tableCellClassName"
          @cell-click="cellClick"
          :default-sort = "{prop: 'order', order: 'ascending'}"
        >
          <el-table-column
            prop="order"
            width="50"
          />
          <el-table-column
            prop="name"
            label="任务名称"
          />
          <el-table-column
            prop="startTime"
            label="开始时间"
          />
          <el-table-column
            prop="endTime"
            label="结束时间"
          />
        </el-table>
      </el-card>
      <el-card class="box-card" style="width:100%">
        <div slot="header">审批人</div>
          <el-table
            :data="baseData.auditors"
            style="width: 100"
            :default-sort = "{prop: 'user', order: 'ascending'}"
          >
            <el-table-column
              prop="user"
              label="用户"
            />
            <el-table-column
              prop="username"
              label="用户名"
            />
            <el-table-column
              prop="approved"
              label="审批状态"
            />
          </el-table>
      </el-card>
    </el-form>
  </div>
</template>
<script>
import * as api from '@/api/training_plan/training_plan'
import * as api4 from '@/api/training_plan/pad'
export default {
  components: {
    api,
    api4
  },
  data() {
    return {
      id: '',
      search_value: '',
      response: {},
      baseData: {
        name: '',
        speciality: '',
        type: '',
        period: '',
        description: '',
        trainees: [],
        classes: []
      },
      tableData_classrooms: {},
      tableData_scores:{},
      tableData_tasks: [{}],
      taskIndex: 0,
      tab_activeName: 'students',
    }
  },
  created() {
    var temp=this.$route.query.self.split("/")
    this.id=temp[temp.length-1]
    this.list()
  },
  methods: {
    list() {
      let that=this;
      api.details(this.id)
      .then( res => {
        that.response=res;
        that.baseData={
          name: res.name,
          speciality: res.major,
          type: res.type,
          period: res.startTime.substr(0,10)+'至'+res.endTime.substr(0,10),
          description: res.detailed,
          trainees: res.trainees,
          trainers: res.trainers,
          classes: [],
          auditors: res.auditors
        };
        if(res.tasks.length==0)
        {
          that.tableData_tasks=[{}]
        }
        else
        {
          that.tableData_tasks=res.tasks;
        }
      });
      api.classrooms().then( res => {
        that.tableData_classrooms={}
        if(res.hasOwnProperty('_embedded'))
        {
          for(var i=0;i<res._embedded.classrooms.length;i++)
          {
            that.tableData_classrooms[res._embedded.classrooms[i].id]=res._embedded.classrooms[i].name
          }
        }
      })
      api4.list_template().then( res => {
        that.tableData_scores={}
        if(res.hasOwnProperty('_embedded'))
        {
          for(var i=0;i<res._embedded.templates.length;i++)
          {
            that.tableData_scores[res._embedded.templates[i].id]=res._embedded.templates[i].name
          }
        }
      })
    },
    tableCellClassName({row, column, rowIndex, columnIndex}){
      //注意这里是解构
      //利用单元格的 className 的回调方法，给行列索引赋值
      row.index=rowIndex;
      column.index=columnIndex;
    },
    cellClick(row, column, cell, event){
      this.taskIndex=row.index;
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
