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
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="9">
            <el-form-item label="计划时间">
              <el-date-picker
                value-format="yyyy-MM-dd HH:mm:ss"
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
                  v-for="item in statuses"
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
        :current-page.sync="index"
        :page-size="pageSize"
        :total="response.page.totalElements"
        @current-change="list()">
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
        period: ['',''],
        status: '',
        teacher: '',
        value: ''
      },
      index: 1,
      pageSize: 2,
      names: [],
      statuses: [],
      teachers: [],
      response: {},
      tableData: []
    }
  },
  created() {
    console.log("created",this.tableData)
    this.list();
  },
  methods: {
    isInArray(arr, value) {
      for(var i = 0; i < arr.length; i++){
        if(value === arr[i].value){
          return true;
        }
      }
      return false;
    },
    list() {
      let that = this;
      api.plans({
        page: that.index-1,
        size: that.pageSize
      }).then( res => {
        that.response = res
        that.tableData = []
        that.names = [{label: '（任意）', value: ''}]
        that.statuses = [{label: '（任意）', value: ''}]
        that.teachers = [{label: '（任意）', value: ''}]
        for(var i = 0; i < res._embedded.plans.length; i++)
        {
          let item = {
            planID: i + 1,
            name: res._embedded.plans[i].name,
            startTime: res._embedded.plans[i].startTime,
            endTime: res._embedded.plans[i].endTime,
            teacher: '',
            status: res._embedded.plans[i].status,
            self: res._embedded.plans[i]._links.self.href
          };

          if(!that.isInArray(that.names,item.name))
          {
            that.names.push({label: item.name, value: item.name});
          }
          if(!that.isInArray(that.statuses,item.status))
          {
            that.statuses.push({label: item.status, value: item.status});
          }

          for(var j = 0; j < res._embedded.plans[i].trainers.length; j++)
          {
            item.teacher = item.teacher + res._embedded.plans[i].trainers[j].username;
            if(!that.isInArray(that.teachers,res._embedded.plans[i].trainers[j].username))
            {
              that.teachers.push({label: res._embedded.plans[i].trainers[j].username, vlaue: res._embedded.plans[i].trainers[j].username})
            }
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
      console.log(this.searchData);
      var params = {
        name: this.searchData.name,
        startTime: this.searchData.period[0],
        endTime: this.searchData.period[1],
        status: this.searchData.status,
        trainer: this.searchData.teacher,
        keyword: this.searchData.value
      };
      let that=this;
      api.search(params).then( res => {
        //that.response = res;
        that.tableData = [];
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
    search_reset() {
      this.searchData = {
        name: '',
        period: ['',''],
        status: '',
        teacher: '',
        value: ''
      };
      this.list();
    },
    show_details(index, data) {
      this.$router.push({ path: 'plan_approval_details', query: { self: this.tableData[index].self }})
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
