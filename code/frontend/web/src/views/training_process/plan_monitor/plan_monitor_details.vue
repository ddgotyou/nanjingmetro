<template>
  <div class="app-container">
    <el-form label-position="right" label-width="80px" :model="baseData">
      <el-card class="box-card" style="width:100%">
        <div slot="header">基本信息</div>
        <el-row>
          <el-col span="12">
            <el-form-item label="名称">
              <el-input id="name" v-model="baseData.name" name="name" disabled />
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="专业">
              <el-input id="speciality" v-model="baseData.speciality" name="speciality" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="类型">
              <el-input id="type" v-model="baseData.type" style="width:100%" disabled />
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="计划周期">
              <el-input id="period" v-model="baseData.period" name="period" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <el-form-item label="描述">
              <el-input
                id="description"
                v-model="baseData.description"
                type="textarea"
                :rows="4"
                disabled
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card" style="width:100%">
        <div slot="header">人员</div>
        <el-row>
          <el-col span="20">
            <el-form-item label="模糊搜索">
              <el-input
                id="search"
                v-model="search_value"
                type="text"
                placeholder="在此输入搜索信息"
              />
            </el-form-item>
          </el-col>
          <el-col span="4" style="text-align: right">
            <el-button type="primary" @click="search_commit">搜 索</el-button>
            <el-button @click="search_reset">重 置</el-button>
          </el-col>
        </el-row>
        <el-divider />
        <el-tabs v-model="tab_activeName" @tab-click="handleClick">
          <el-tab-pane style="text-align:center;" label="学员" name="students">
            <el-table
              :data="tableData_students"
              style="width: 100"
            >
              <el-table-column
                prop="ID"
                label="学号"
              />
              <el-table-column
                prop="name"
                label="姓名"
              />
              <el-table-column
                prop="class"
                label="所在用户组"
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
                    @click.native.prevent="show_group_detailes(scope.$index, tableData)"
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
        <el-form label-position="right" label-width="80px" :model="taskData">
          <el-row>
            <el-col span="12">
              <el-form-item label="任务名称">
                <el-input id="task_name" v-model="taskData.name" name="task_name" disabled />
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="任务选择">
                <el-input id="task_option" v-model="taskData.option" style="width:100%" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="课时安排">
                <el-input id="task_time" v-model="taskData.time" name="task_time" disabled />
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="顺序">
                <el-input id="task_sequence" v-model="taskData.sequence" style="width:100%" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="类型">
                <el-input id="task_type" v-model="taskData.type" style="width:100%" disabled />
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="评分表">
                <el-input id="task_standard" v-model="taskData.standard" style="width:100%" disabled />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-divider />
        <el-table
          :data="tableData"
          style="width: 100"
        >
          <el-table-column
            prop="taskID"
            label="任务号"
          />
          <el-table-column
            prop="taskName"
            label="任务名称"
          />
          <el-table-column
            prop="taskArrange"
            label="课时安排"
          />
           <el-table-column
            prop="taskStatus"
            label="任务状态"
          />
          <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="show_details(scope.$index, tableData)"
              type="text"
              size="small">
              查看任务详情
            </el-button>
          </template>
        </el-table-column>
        </el-table>
      </el-card>
      <div style="text-align:right"><el-button type="primary" @click="submit">提交</el-button></div>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: '',
      search_value: '',
      baseData: {
        name: '测试工程',
        speciality: '计算机科学与技术',
        type: '类型1',
        period: '三个月',
        description: '123456',
        people: [],
        classes: [],
        approver: []
      },
      tableData_students: [
        {
          ID: '1852001',
          name: '范德萨',
          class: 'G1'
        },
        {
          ID: '1852002',
          name: '水月',
          class: 'G2'
        }
      ],
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
      taskData: {
        name: '1',
        option: '2',
        sequence: '3',
        time: '4',
        type: '5',
        standard: '6'
      },
      tab_activeName: 'students',
      tableData: [
        {
          taskID: 0,
          taskName: '任务1',
          taskArrange: '周一1-2节',
          taskStatus: '未开始'
        },
        {
          taskID: 1,
          taskName: '任务1',
          taskArrange: '周一1-2节',
          taskStatus: '已结束'
        }
      ]
    }
  },
  created() {
    this.id = this.$route.query.id
  },
  methods: {
    search_commit() {
      console.log(this.searchData)
    },
    search_reset() {
      this.search_value = ''
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    show_group_detailes(index, data) {

    },
    submit() {

    },
    show_details(index, data) {
      this.$router.push({ path: 'task_monitor', query: { id: index }})
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
