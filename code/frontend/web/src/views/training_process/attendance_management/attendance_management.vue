<template>
  <div class="app-container">
    <el-card class="box-card" style="width:100%">
      <el-form label-position="right" label-width="80px">
        <el-form-item label="当前计划">
          <el-input id="search" v-model="plan" name="plan" placeholder="在此输入"/>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card" style="width:100%">
      <div slot="header">实时考勤</div>
      <el-form label-position="right" label-width="80px">
        <el-row>
          <el-col span="20">
            <el-form-item label="模糊搜索">
              <el-input id="search" v-model="search" name="search_value" placeholder="在此输入"/>
            </el-form-item>
          </el-col>
          <el-col span="4">
            <div style="text-align: right">
              <el-button type="primary" @click="search_commit">搜 索</el-button>
              <el-button @click="search_reset">重 置</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="10">
              <el-form-item label="计划名称">
              <el-select
                style="width:100%"
                id="type"
                multiple
                filterable
                default-first-option
                v-model="data1.plan_name"
                placeholder="请选择">
                <el-option
                  v-for="item in plan_name"
                  :key="item.value"
                  :label="item.lable"
                  :value="item.value"
                  />
                </el-select>
              </el-form-item>
          </el-col>
          <el-col span="10">
            <el-form-item label="任务名称">
              <el-select
              style="width:100%"
              v-model="data1.task_name"
              multiple
              filterable
              default-first-option
              placeholder="请选择">
              <el-option
                  v-for="item in task_name"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="4">
            <div style="text-align: right">
              <el-button @click="export1">导 出</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-table v-if="data1.task_name.length == 0"
        :data="tableData1"
        style="width: 100"
        >
        <el-table-column
          prop="ID"
          label="学号"
        />
        <el-table-column
          prop="student"
          label="学员"
        />
        <el-table-column
          prop="late"
          label="迟到"
        />
        <el-table-column
          prop="leave_early"
          label="早退"
        />
        <el-table-column
          prop="absence"
          label="缺勤"
        />
      </el-table>
      <el-table v-else
        :data="tableData1"
        style="width: 100"
        >
        <el-table-column
          prop="ID"
          label="学号"
        />
        <el-table-column
          prop="student"
          label="学员"
        />
        <el-table-column
          prop="attend_time"
          label="签到时间"
        />
        <el-table-column
          prop="leave_time"
          label="签退时间"
        />
      </el-table>
    </el-card>
    <el-card class="box-card" style="width:100%">
      <div slot="header">历史考勤</div>
      <el-form label-position="right" label-width="80px">
        <el-row>
          <el-col span="8">
            <el-form-item label="计划名称">
            <el-select
              style="width:100%"
              id="type"
              multiple
              filterable
              default-first-option
              v-model="data2.plan_name"
              placeholder="请选择">
              <el-option
                v-for="item in plan_name"
                :key="item.value"
                :label="item.lable"
                :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="任务名称">
            <el-select
              style="width:100%"
              id="type"
              multiple
              filterable
              default-first-option
              v-model="data2.task_name"
              placeholder="请选择">
              <el-option
                v-for="item in task_name"
                :key="item.value"
                :label="item.lable"
                :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="实训室">
            <el-select
              style="width:100%"
              id="type"
              multiple
              filterable
              default-first-option
              v-model="data2.room"
              placeholder="请选择">
              <el-option
                v-for="item in rooms"
                :key="item.value"
                :label="item.lable"
                :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="8">
            <el-form-item label="讲师">
            <el-select
              style="width:100%"
              id="type"
              multiple
              filterable
              default-first-option
              v-model="data2.teacher"
              placeholder="请选择">
              <el-option
                v-for="item in teachers"
                :key="item.value"
                :label="item.lable"
                :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="专业">
            <el-select
              style="width:100%"
              id="type"
              multiple
              filterable
              default-first-option
              v-model="data2.subject"
              placeholder="请选择">
              <el-option
                v-for="item in subjects"
                :key="item.value"
                :label="item.lable"
                :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="时间">
            <el-select
              style="width:100%"
              id="type"
              filterable
              default-first-option
              v-model="data2.time"
              placeholder="请选择">
              <el-option
                v-for="item in times"
                :key="item.value"
                :label="item.lable"
                :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div style="text-align: right">
            <el-button @click="export2">导 出</el-button>
          </div>
        </el-row>
      </el-form>
      <el-table
        :data="tableData2"
        style="width: 100"
        >
        <el-table-column
          prop="ID"
          label="序号"
        />
        <el-table-column
          prop="planName"
          label="计划名称"
        />
        <el-table-column
          prop="taskName"
          label="任务名称"
        />
        <el-table-column
          prop="time"
          label="时间"
        />
        <el-table-column
          prop="room"
          label="实训室"
        />
        <el-table-column
          prop="teacher"
          label="讲师"
        />
        <el-table-column
          prop="subject"
          label="专业"
        />
        <el-table-column
          prop="attendance"
          label="出勤率"
        />
        <el-table-column
          label="操作"
          width="120"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click.native.prevent="dialogFormVisible = true"
            >
              详情
            </el-button>
          </template>
        </el-table-column>
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
      plan: '示例计划',
      search: '',
      data1: {
        plan_name: [],
        task_name: []
      },
      data2: {
        plan_name: [],
        task_name: [],
        room: [],
        teascher: [],
        subject: [],
        time: ''
      },
      plan_name: [
        {
          label: '掩体计划',
          value: '掩体计划'
        },
        {
          label: '广播计划',
          value: '广播计划'
        },
        {
          label: '黒域计划',
          value: '黒域计划'
        }
      ],
      task_name: [
        {
          label: '危机纪元',
          value: '危机纪元'
        },
        {
          label: '威摄纪元',
          value: '威摄纪元'
        },
        {
          label: '广播纪元',
          value: '广播纪元'
        },
        {
          label: '掩体纪元',
          value: '掩体纪元'
        }
      ],
      teachers: [
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
      rooms: [
        {
          value: 'A301',
          label: 'A301'
        },
        {
          value: 'A302',
          label: 'A302'
        },
        {
          value: 'A303',
          label: 'A303'
        }
      ],
      subjects: [
        {
          value: '系统维护',
          label: '系统维护'
        },
        {
          value: '人员管理',
          label: '人员管理'
        },
        {
          value: '线路管理',
          label: '线路管理'
        }
      ],
      times: [
        {
          value: '9-19',
          label: '9-19'
        },
        {
          value: '8-30',
          label: '8-30'
        },
        {
          value: '9-10',
          label: '9-10'
        }
      ],
      tableData1: [
        {
          ID: 1852004,
          student: '程专',
          attend_time: '8:01',
          leave_time: '9:30',
          late: 'N',
          leave_early: 'Y',
          absence: 'N'
        },
        {
          ID: 1852024,
          student: '叶茂才',
          attend_time: '8:01',
          leave_time: '9:30',
          late: 'N',
          leave_early: 'Y',
          absence: 'N'
        },
        {
          ID: 1852304,
          student: '藏晗',
          attend_time: '8:01',
          leave_time: '9:30',
          late: 'N',
          leave_early: 'Y',
          absence: 'N'
        },
        {
          ID: 1853006,
          student: '白含文',
          attend_time: '8:01',
          leave_time: '9:30',
          late: 'N',
          leave_early: 'Y',
          absence: 'N'
        },
        {
          planID: 1,
          planName: '计划2',
          period: '周一3-4节',
          applicant: '旁诗丹',
          teacher: '史布',
          approver: '雪永望'
        }
      ],
      tableData2: [
        {
          ID:'1',
          planName: '示例计划',
          taskName: '示例任务',
          time: '2021-9-10',
          room: 'F211',
          teacher: '丁仪',
          subject: '线路调度概论',
          attendance: '98%'
        },
        {
          ID:'2',
          planName: '示例计划',
          taskName: '示例任务',
          time: '2021-9-11',
          room: 'F211',
          teacher: '丁仪',
          subject: '线路调度概论',
          attendance: '98%'
        },
        {
          ID:'3',
          planName: '示例计划',
          taskName: '示例任务',
          time: '2021-9-20',
          room: 'F211',
          teacher: '丁仪',
          subject: '线路调度概论',
          attendance: '98%'
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible: false
    }
  },
  methods: {
    search_commit() {
      console.log(this.search)
    },
    search_reset() {
      this.search = ''
    },
    export1() {
    },
    export2() {
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
