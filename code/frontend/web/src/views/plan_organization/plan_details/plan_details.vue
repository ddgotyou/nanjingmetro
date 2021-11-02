<template>
  <div class="app-container">
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
        <div slot="header">人员</div>
        <el-row>
          <el-col :span="20">
            <el-form-item label="模糊搜索">
              <el-input
                id="search"
                v-model="search_value"
                type="text"
                placeholder="在此输入搜索信息"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4" style="text-align: right">
            <el-button type="primary" @click="search_commit">搜 索</el-button>
            <el-button @click="search_reset">重 置</el-button>
          </el-col>
        </el-row>
        <el-divider />
        <el-tabs v-model="tab_activeName" @tab-click="handleClick">
          <el-tab-pane style="text-align:center;" label="学员" name="students">
            <el-table
              :data="tableData_students.filter(data => !search_value || data.username.toLowerCase().includes(search_value.toLowerCase()))"
              style="width: 100"
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
                prop="userRole"
                label="角色"
              />
            </el-table>
          </el-tab-pane>
          <el-tab-pane style="text-align:center;" label="用户组" name="classes">
            <el-table
              :data="tableData_classes"
              style="width: 100"
            >
              <el-table-column
                prop="name"
                label="名称"
              />
              <el-table-column
                label="操作"
                width="120"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click.native.prevent="showDetailes(scope.$index, tableData)"
                  >
                    详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
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
            <el-col :span="6">
              <el-form-item label="开始时间">
                <el-input id="task_time" v-model="tableData_tasks[taskIndex].startTime" name="task_time" readonly />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="结束时间">
                <el-input id="task_time" v-model="tableData_tasks[taskIndex].endTime" name="task_time" readonly />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="顺序">
                <el-input id="task_sequence" v-model="tableData_tasks[taskIndex].order" style="width:100%" readonly />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="类型">
                <el-input id="task_type" v-model="tableData_tasks[taskIndex].type" style="width:100%" readonly />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="评分">
                <el-input id="task_standard" v-model="tableData_tasks[taskIndex].taskScore" style="width:100%" readonly />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="教室">
                <el-input v-model="tableData_tasks[taskIndex].classroom" style="width:100%" readonly />
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
        >
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
    </el-form>
  </div>
</template>
<script>
import api from '@/api/training_plan/training_plan' 
export default {
  components: {
    api
  },
  data() {
    return {
      id: '',
      search_value: '',
      response: {},
      baseData: {},
      tableData_students: [],
      tableData_classes: [
        {
          name: '武装部'
        },
        {
          name: '运营部'
        },
        {
          name: '售票部'
        }
      ],
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
          period: res.startTime+'-'+res.endTime,
          description: res.detailed,
          people: [],
          classes: []
        };
        that.tableData_students=res.auditors;
        if(res.tasks.length==0)
        {
          that.tableData_tasks=[{}]
        }
        else
        {
          that.tableData_tasks=res.tasks;
        }
      });
    },
    search_commit() {
      console.log(this.searchData)
    },
    search_reset() {
      this.search_value = ''
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    showDetailes(index, data) {

    },
    tableCellClassName({row, column, rowIndex, columnIndex}){
      //注意这里是解构
      //利用单元格的 className 的回调方法，给行列索引赋值
      row.index=rowIndex;
      column.index=columnIndex;
    },
    cellClick(row, column, cell, event){
      this.taskIndex=row.index;
    },
    filterHandler(value, row, column) {
      console.log(value, row, column)
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
