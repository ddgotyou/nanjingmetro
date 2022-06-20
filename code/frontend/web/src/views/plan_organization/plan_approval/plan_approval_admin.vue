<!--
 * @Author: your name
 * @LastEditors: your name
-->
<template>
  <div class="app-container">
    <el-card class="box-card" style="width:100%">
      <div slot="header">筛选</div>
      <el-form label-position="right" label-width="80px" :model="searchData">
        <el-row>
          <el-col :span="12">
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
          <el-col :span="12">
            <el-form-item label="状态">
              <el-select
                style="width:100%"
                v-model="searchData.status"
                placeholder="请选择"
                clearable>
                <el-option
                    key="未审核"
                    label="未审核"
                    value="未审核">
                </el-option>
                <el-option
                    key="审核中"
                    label="审核中"
                    value="审核中">
                </el-option>
                <el-option
                    key="已通过"
                    label="已通过"
                    value="已通过">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="模糊搜索">
              <el-input id="search" v-model="searchData.value" name="search_value" placeholder="在此输入" @change="search_commit"/>
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
        :default-sort = "{prop: 'index', order: 'descending'}"
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
          sortable
          prop="startTime"
          label="开始时间"
        />
        <el-table-column
          sortable
          prop="endTime"
          label="结束时间"
        />
        <el-table-column
          prop="teacher"
          label="第一讲师"
        />
        <el-table-column
          prop="approver"
          label="第一审批人"
        />
        <el-table-column
          prop="status"
          label="审批状态"
        />
        <el-table-column
          prop="isAuditor"
          label="是否参与"
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
import * as api from '@/api/training_plan/training_plan'
import * as api2 from '@/api/training_plan/application'
export default {
  components: {
    api,
    api2
  },
  data() {
    return {
      searchData: {
        status: '',
        period: ['',''],
        value: ''
      },
      search_status: false,
      index: 1,
      pageSize: 10,
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
    fresh(){
      if(this.search_status)
      {
        this.search_list()
      }
      else{
        this.list()
      }
    },
    list() {
      var params = {
        userId: this.$user.userId,
        page: this.index-1,
        size: this.pageSize
      };
      var that=this;
      api2.findByAdmin(params).then(res=>{
        that.response=res;
        that.tableData = [];
        if(res.hasOwnProperty('_embedded'))
        {
          for(var i=0;i<res._embedded.applications.length;i++)
          {
            let item={
              isAuditor:res._embedded.applications[i].isAuditor? '参与':'不参与',
              id:res._embedded.applications[i].detail.id,
              planName: res._embedded.applications[i].detail.planName,
              planId:res._embedded.applications[i].detail.plan,
              startTime: res._embedded.applications[i].detail.planStartTime,
              endTime: res._embedded.applications[i].detail.planEndTime,
              status: res._embedded.applications[i].detail.status,
              //userName: res._embedded.applications[i].user,
              teacher: res._embedded.applications[i].detail.planFirstTrainer,
              approver: res._embedded.applications[i].detail.planFirstAuditor
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
        keyword: this.searchData.value,
        userId: this.$user.userId,
        page: this.index-1,
        size: this.pageSize
      };
      let that=this;
      api2.findByAdmin(params).then( res => {
        that.response = res;
        that.tableData = [];
        if(res.hasOwnProperty('_embedded'))
        {
          for(var i = 0; i < res._embedded.applications.length; i++)
          {
            let item={
               isAuditor:res._embedded.applications[i].isAuditor? '参与':'不参与',
              id:res._embedded.applications[i].detail.id,
              planName: res._embedded.applications[i].detail.planName,
              planId:res._embedded.applications[i].detail.plan,
              startTime: res._embedded.applications[i].detail.planStartTime,
              endTime: res._embedded.applications[i].detail.planEndTime,
              status: res._embedded.applications[i].detail.status,
              //userName: res._embedded.applications[i].user,
              teacher: res._embedded.applications[i].detail.planFirstTrainer,
              approver: res._embedded.applications[i].detail.planFirstAuditor
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
    size_change(val){
      this.pageSize=val
      this.index_change()
    },
    index_change(){
      this.fresh()
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
