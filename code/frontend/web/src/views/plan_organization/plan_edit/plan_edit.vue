<template>
  <div class="app-container">
    <el-card class="box-card" style="width:100%">
      <div slot="header">筛选</div>
      <el-form label-position="right" label-width="80px" :model="searchData">
        <el-row>
          <el-col span="5">
            <el-form-item label="计划名称">
              <el-select
                id="type"
                v-model="searchData.name"
                style="width:100%"
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
          <el-col span="9">
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
          <el-col span="5">
            <el-form-item label="计划状态">
              <el-select
                v-model="searchData.status"
                style="width:100%"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="5">
            <el-form-item label="讲师">
              <el-select
                v-model="searchData.teacher"
                style="width:100%"
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
          <el-col span="12">
            <div style="text-align: left">
              <el-button type="primary" @click="add">新 增</el-button>
              <el-button @click="del">删 除</el-button>
            </div>
          </el-col>
          <el-col span="12">
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
          prop="name"
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
          prop="teacher"
          label="讲师"
        />
        <el-table-column
          prop="status"
          label="状态"
        />
        <el-table-column
          label="操作"
          width=120
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click.native.prevent="show_details(scope.$index, tableData)"
            >
              详情
            </el-button>
            <el-button
              type="text"
              size="small"
              @click.native.prevent="edit(scope.$index, tableData)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="text-align: center"
        layout="prev, pager, next"
        :total="10*response.page.totalPages">
      </el-pagination>
    </el-card>
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
      searchData: {
        name: '',
        period: '',
        status: '',
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
      status: [
        {
          label: '未开始',
          value: '未开始'
        },
        {
          label: '进行中',
          value: '进行中'
        },
        {
          label: '已完成',
          value: '已完成'
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
      response: {},
      tableData: []
      // tableData: [
      //   {
      //     planID: 0,
      //     planName: '计划1',
      //     period: '周一1-2节',
      //     teacher: '文忆',
      //     status: '正在审核'
      //   },
      //   {
      //     planID: 1,
      //     planName: '计划2',
      //     period: '周一3-4节',
      //     teacher: '史布',
      //     status: '正在审核'
      //   },
      //   {
      //     planID: 2,
      //     planName: '计划3',
      //     period: '周四1-2节',
      //     teacher: '杞承恩',
      //     status: '正在审核'
      //   },
      //   {
      //     planID: 3,
      //     planName: '计划4',
      //     period: '周二"5"-6节',
      //     teacher: '本清涵',
      //     status: '审核通过'
      //   },
      //   {
      //     planID: 4,
      //     planName: '计划"5"',
      //     period: '周三7-8节',
      //     teacher: '练晗玥',
      //     status: '审核通过'
      //   },
      //   {
      //     planID: "5",
      //     planName: '计划6',
      //     period: '周一1-2节',
      //     teacher: '藏晗',
      //     status: '审核通过'
      //   }
      // ]
    }
  },
  created() {
    console.log("created",this.tableData)
    this.list();
  },
  methods: {
    list() {
      let that = this;
      api.plans().then( res => {
        that.response = res
        that.tableData = []
        for(var i = 0; i < res._embedded.plans.length; i++)
        {
          let item = {
            planID: i + 1,
            name: res._embedded.plans[i].name,
            startTime: res._embedded.plans[i].startTime,
            endTime: res._embedded.plans[i].endTime,
            teacher: '',
            status: res._embedded.plans[i].status,
            self: res._embedded.plans[i]._links.self.herf
          };
          for(var j = 0; j < res._embedded.plans[i].trainers.length; j++)
          {
            item.teacher = item.teacher + res._embedded.plans[i].trainers[j].username;
          }
          that.tableData.push(item)
        }
      });
    },
    add() {
      this.$router.push({ path: 'new_plan' })
    },
    del() {

    },
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
    },
    edit(index, data) {
      this.$router.push({ path: 'new_plan' })
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
