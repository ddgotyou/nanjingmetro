<template>
  <div class="app-container">
    <el-card class="box-card" style="width:100%">
      <div slot="header">筛选</div>
      <el-form label-position="right" label-width="80px" :model="searchData">
        <el-row>
          <el-col :span="10">
            <el-form-item label="计划时间">
              <el-date-picker
                style="width:50%"
                v-model="searchData.period[0]"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="date"
                placeholder="开始日期">
              </el-date-picker>
              <el-date-picker
                style="width:50%"
                v-model="searchData.period[1]"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="date"
                placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="审批状态">
              <el-select
              style="width:100%"
              v-model="searchData.status"
              placeholder="请选择">
              <el-option
                  v-for="item in statuses"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
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
          <el-col :span="24">
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
          prop="status"
          label="申请状态"
        />
        <el-table-column
          prop="userName"
          label="申请人"
        />
        <el-table-column
          prop="teacher"
          label="讲师"
        />
        <el-table-column
          prop="approver"
          label="第一审批人"
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
              @click.native.prevent="approve(scope.$index, tableData)"
              type="text"
              size="small">
              通过
            </el-button>
            <el-button
              @click.native.prevent="reject(scope.$index, tableData)"
              type="text"
              size="small">
              驳回
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="text-align: center"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page.sync="index"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="response.page.totalElements"
        @size-change="size_change"
        @current-change="index_change()">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import api from '@/api/training_plan/application'
export default {
  components: {
    api
  },
  data() {
    return {
      searchData: {
        period: ['',''],
        status: '',
        teacher: '',
        value: ''
      },
      search_status: false,
      index: 1,
      pageSize: 10,
      statuses: [
        {
          value: '未审核',
          label: '未审核'
        },
        {
          value: '审核中',
          label: '审核中'
        },
        {
          value: '已通过',
          label: '已通过'
        },
        {
          value: '未通过',
          label: '未通过'
        }
      ],
      teachers: [],
      response: {"page": {
        "size": 0,
        "totalElements": 0,
        "totalPages": 0,
        "number": 0
        }
      },
      tableData: []
    }
  },
  created(){
    this.list()
  },
  methods: {
    list() {
      var params = {
        page: this.index-1,
        size: this.pageSize
      };
      var that=this;
      api.list(params).then(res=>{
        that.response=res;
        that.tableData = [];
        if(res.hasOwnProperty('_embedded'))
        {
          for(var i=0;i<res._embedded.applications.length;i++)
          {
            let item={
              planName: res._embedded.applications[i].planName,
              planId:res._embedded.applications[i].plan,
              startTime: res._embedded.applications[i].planStartTime,
              endTime: res._embedded.applications[i].planEndTime,
              status: res._embedded.applications[i].status,
              userName: res._embedded.applications[i].user,
              teacher: res._embedded.applications[i].planFirstTrainer,
              approver: res._embedded.applications[i].planFirstAuditor,
              self: res._embedded.applications[i]._links.self.href
            }
            that.tableData.push(item);
          }
        }
      })
    },
    search_list() {
      console.log(this.searchData);
      var params = {
        startTime: this.searchData.period[0],
        endTime: this.searchData.period[1],
        status: this.searchData.status,
        trainer: this.searchData.teacher,
        keyword: this.searchData.value,
        page: this.index-1,
        size: this.pageSize
      };
      let that=this;
      api.search(params).then( res => {
        that.response = res;
        that.tableData = [];
        if(res.hasOwnProperty('_embedded'))
        {
          for(var i = 0; i < res._embedded.applications.length; i++)
          {
            let item={
              planName: res._embedded.applications[i].planName,
              planId:res._embedded.applications[i].plan,
              startTime: res._embedded.applications[i].planStartTime,
              endTime: res._embedded.applications[i].planEndTime,
              status: res._embedded.applications[i].status,
              userName: res._embedded.applications[i].user,
              teacher: res._embedded.applications[i].planFirstTrainer,
              approver: res._embedded.applications[i].planFirstAuditor,
              self: res._embedded.applications[i]._links.self.href
            }
            that.tableData.push(item)
          }
        }
      });
      this.search_status = true;
    },
    search_commit() {
      this.index=1
      this.search_list()
    },
    search_reset() {
      this.searchData = {
        period: ['',''],
        status: '',
        teacher: '',
        value: ''
      }
      this.search_status = false;
      this.index=1;
      this.list();
    },
    show_details(index, data) {
      this.$router.push({ path: 'plan_details', query: { self: this.tableData[index].planId }})
    },
    approve(index, data) {
      var that=this;
      var temp=that.tableData[index].self.split("/")
      var id=temp[temp.length-1]
      this.$confirm('此操作将通过计划'+that.tableData[index].planName+', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.approve(id, { auditor:this.$user.userId }).then(
          this.$message({
          type: 'success',
          message: '审批通过成功!'
          })
        )
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消审批'
        });          
      });
    },
    reject(index, data) {
      var that=this;
      var temp=that.tableData[index].self.split("/")
      var id=temp[temp.length-1]
      this.$prompt('请输入驳回原因', '驳回', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        api.reject(id,{ auditor: this.$user.userId, reason: value}).then(
          this.$message({
            type: 'success',
            message: '审批驳回成功！'
          })
        )
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消审批'
        });       
      });
    },
    size_change(val){
      this.pageSize=val
      this.index_change()
    },
    index_change(){
      if(this.search_status)
      {
        this.search_list()
      }
      else{
        this.list()
      }
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
