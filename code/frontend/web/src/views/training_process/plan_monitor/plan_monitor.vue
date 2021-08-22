<template>
  <div class="app-container">
    <el-card class="box-card" style="width:100%">
      <div slot="header">筛选</div>
      <el-form label-position="right" label-width="80px" :model="searchData">
        <el-row>
          <el-col span="8">
            <el-form-item label="计划名称">
              <el-select
                id="type"
                v-model="searchData.name"
                style="width:100%"
                multiple
                filterable
                default-first-option
                placeholder="请选择"
              >
                <el-option
                  v-for="item in names"
                  :key="item.value"
                  :label="item.lable"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="计划时间">
              <el-select
                v-model="searchData.period"
                style="width:100%"
                multiple
                filterable
                default-first-option
                placeholder="请选择"
              >
                <el-option
                  v-for="item in periods"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="讲师">
              <el-select
                v-model="searchData.teacher"
                style="width:100%"
                multiple
                filterable
                default-first-option
                placeholder="请选择"
              >
                <el-option
                  v-for="item in teachers"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <el-form-item label="模糊搜索">
              <el-input id="search" v-model="searchData.value" name="search_value" placeholder="在此输入" />
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
      <div slot="header">计划列表</div>
      <el-table
        :data="tableData"
        style="width: 100"
      >
        <el-table-column
          prop="planID"
          label="序号"
        />
        <el-table-column
          prop="planName"
          label="计划名称"
        />
        <el-table-column
          prop="period"
          label="时间"
        />
        <el-table-column
          prop="process"
          label="计划进度"
        />
        <el-table-column
          prop="teacher"
          label="讲师"
        />
        <el-table-column
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click.native.prevent="dialogFormVisible = true"
            >
              监控信息
            </el-button>
            <el-button
              type="text"
              size="small"
              @click.native.prevent="show_plan_details(scope.$index, tableData)"
            >
              计划信息
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="text-align: center"
        layout="prev, pager, next"
        :total="500">
      </el-pagination>
    </el-card>
    <el-dialog title="监控信息" :visible.sync="dialogFormVisible">
      <div class="dialog-footer">
        <div style="text-align: center">
          <el-button @click="attendance_management">考勤管理</el-button>
          <el-button @click="video_monitor">视频监控</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      searchData: {
        name: [],
        period: [],
        teacher: [],
        value: ''
      },
      names: [
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
      periods: [
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
      tableData: [
        {
          planID: 0,
          planName: '计划1',
          period: '周一1-2节',
          process: '10%',
          teacher: '文忆'
        },
        {
          planID: 1,
          planName: '计划2',
          period: '周一3-4节',
          process: '10%',
          teacher: '史布'
        },
        {
          planID: 2,
          planName: '计划3',
          period: '周四1-2节',
          process: '10%',
          teacher: '杞承恩'
        },
        {
          planID: 3,
          planName: '计划4',
          period: '周二5-6节',
          process: '10%',
          teacher: '本清涵'
        },
        {
          planID: 4,
          planName: '计划5',
          period: '周三7-8节',
          process: '10%',
          teacher: '练晗玥'
        },
        {
          planID: 5,
          planName: '计划6',
          period: '周一1-2节',
          process: '10%',
          teacher: '藏晗'
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible: false
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
    show_plan_details(index, data) {
      this.$router.push({ path: 'plan_monitor_details', query: { id: index }})
    },
    attendance_management() {
      this.dialogFormVisible = false
      this.$router.push({ path: 'attendance_management' })
    },
    video_monitor() {
      this.dialogFormVisible = false
      this.$router.push({ path: 'video_monitor' })
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
