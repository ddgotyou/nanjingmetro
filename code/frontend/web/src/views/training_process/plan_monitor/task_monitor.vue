<template>
  <div class="app-container">
    <el-card class="box-card" style="width:100%">
      <div slot="header">筛选</div>
      <el-form label-position="right" label-width="80px">
        <el-row>
          <el-col span="8">
            <el-form-item label="计划名称">
              {{message.plan_name}}
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="任务名称">
              {{message.task_name}}
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="任务时间">
              {{message.task_time}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <el-form-item label="模糊搜索">
              <el-input id="search" v-model="searchValue" name="search_value" placeholder="在此输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <div style="text-align: right">
              <el-button type="primary" @click="search_commit">搜 索</el-button>
              <el-button @click="search_reset">重 置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="box-card" style="width:100%">
      <div slot="header">学员列表</div>
      <el-table
        :data="tableData"
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
          prop="score"
          label="成绩"
        />
        <el-table-column
          prop="attendance"
          label="签到状况"
        />
        <el-table-column
          prop="study"
          label="学习情况"
        />
      </el-table>
      <el-pagination style="text-align: center"
        layout="prev, pager, next"
        :total="500">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      message: {
        plan_name: '培训计划1',
        task_name: '任务1',
        task_time: '标准时间1'
      },
      searchValue: '',
      tableData: [
        {
          ID: 1852343,
          name: '文忆',
          score: '优',
          attendance: '出勤',
          study: '1-1'
        },
        {
          ID: 1852344,
          name: '史布',
          score: '优',
          attendance: '出勤',
          study: '2-1'
        },
        {
          ID: 1852345,
          name: '杞承恩',
          score: '良',
          attendance: '出勤',
          study: '2-1'
        },
        {
          ID: 1852348,
          name: '本清涵',
          score: '中',
          attendance: '出勤',
          study: '1-1'
        },
        {
          ID: 1852349,
          name: '练晗玥',
          score: '中',
          attendance: '缺勤',
          study: '3-3'
        },
        {
          ID: 1852378,
          name: '藏晗',
          score: '优',
          attendance: '出勤',
          study: '1-1'
        }
      ]
    }
  },
  methods: {
    search_commit() {
      console.log(this.searchData)
    },
    search_reset() {
      this.searchData = {
        name: [],
        period: [],
        teacher: [],
        value: ''
      }
    },
    show_monitor_details(index, data) {
    },
    show_plan_details(index, data) {
        this.$router.push({ path: 'plan_monitor_details', query: { id: index }})
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
