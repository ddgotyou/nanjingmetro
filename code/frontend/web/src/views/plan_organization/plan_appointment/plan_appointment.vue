<!--
 * @Author: your name
 * @LastEditors: your name
-->
<template>
  <div class="app-container">
    <el-form label-position="right" label-width="80px">
      <el-card class="box-card" style="width:100%">
        <div slot="header">新增预约</div>
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
      </el-card>
      <el-card class="box-card" style="width:100%">
        <div slot="header">任务列表</div>
        <el-table
          :data="tableData"
          :default-sort = "{prop: 'order', order: 'ascending'}"
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
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      tableData: []
    }
  },
  methods:{
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