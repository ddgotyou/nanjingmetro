<template>
  <div class="app-container">
    <el-card class="box-card" style="width:100%">
      <div slot="header">筛选</div>
      <el-form label-position="right" label-width="80px" :model="searchData">
        <el-row>
          <el-col span="8">
              <el-form-item label="计划名称">
              <el-select
                style="width:100%"
                v-model="searchData.name"
                placeholder="请选择">
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
              <el-date-picker
                v-model="searchData.period"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="讲师">
              <el-select
              style="width:100%"
              v-model="searchData.teacher"
              placeholder="请选择">
              <el-option
                  v-for="item in teachers"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <el-form-item label="模糊搜索">
              <el-input id="search" v-model="searchData.value" name="search_value" placeholder="在此输入"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div style="text-align: right">
            <el-button type="primary" @click="search_commit">搜 索</el-button>
            <el-button @click="search_reset">重 置</el-button>
          </div>
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
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="planName"
          label="计划名称"
        />
        <el-table-column
          prop="startTime"
          label="开始时间"
        />
        <el-table-column
          prop="endTime"
          label="结束时间"
        />
        <el-table-column
          prop="applicant"
          label="申请人"
        />
        <el-table-column
          prop="teacher"
          label="讲师"
        />
        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="show_details(scope.$index, tableData)"
              type="text"
              size="small">
              详情
            </el-button>
            <el-button
              @click.native.prevent="dialogFormVisible = true"
              type="text"
              size="small">
              调整任务
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="text-align: center"
        layout="prev, pager, next"
        :total="500">
      </el-pagination>
    </el-card>
    <el-dialog title="驳回" :visible.sync="dialogFormVisible">
      <div class="dialog-footer">
        <el-form label-position="right" label-width="100px" :model="popData">
          <el-row>
            <el-col span="24">
              <el-form-item label="驳回原因">
                <el-input
                  id="description"
                  v-model="popData.msg"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align: right">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
        name: '',
        period: '',
        teacher: '',
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
          applicant: '程专',
          teacher: '文忆',
          approver: '艾AA'
        },
        {
          planID: 1,
          planName: '计划2',
          period: '周一3-4节',
          applicant: '旁诗丹',
          teacher: '史布',
          approver: '雪永望'
        },
        {
          planID: 2,
          planName: '计划3',
          period: '周四1-2节',
          applicant: '叶茂才',
          teacher: '杞承恩',
          approver: '弥水凡'
        },
        {
          planID: 3,
          planName: '计划4',
          period: '周二5-6节',
          applicant: '司空恨蝶',
          teacher: '本清涵',
          approver: '平友菱'
        },
        {
          planID: 4,
          planName: '计划5',
          period: '周三7-8节',
          applicant: '丰飞烟',
          teacher: '练晗玥',
          approver: '侨国安'
        },
        {
          planID: 5,
          planName: '计划6',
          period: '周一1-2节',
          applicant: '白含文',
          teacher: '藏晗',
          approver: '艾AA'
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      popData: {
        msg: ''
      }
    }
  },
  methods: {
    search_commit() {
      console.log(this.searchData)
    },
    search_reset() {
      this.searchData = {
        name: '',
        period: '',
        teacher: '',
        value: ''
      }
    },
    show_details(index, data) {
      this.$router.push({ path: 'plan_approval_details', query: { id: index }})
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
