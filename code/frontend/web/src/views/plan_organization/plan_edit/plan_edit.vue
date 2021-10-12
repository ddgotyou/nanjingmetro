<template>
  <div class="app-container">
    <el-card class="box-card" style="width:100%">
      <div slot="header">筛选</div>
      <el-form label-position="right" label-width="80px" :model="searchData">
        <el-row>
          <el-col span="12">
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
          <el-col span="12">
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
          type="index"
          width="50">
        </el-table-column>
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
      search_status: false,
      index: 1,
      pageSize: 10,
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
      console.log(this.searchData);
      var params = {
        status: '未申请',
        page: this.index-1,
        size: this.pageSize
      };
      let that=this;
      api.search(params).then( res => {
        that.response = res;
        that.tableData = [];
        for(var i = 0; i < res._embedded.plans.length; i++)
        {
          let item = {
            name: res._embedded.plans[i].name,
            startTime: res._embedded.plans[i].startTime,
            endTime: res._embedded.plans[i].endTime,
            teacher: '',
            status: res._embedded.plans[i].status,
            self: res._embedded.plans[i]._links.self.href
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
    search_commit()
    {
      this.index=1
      this.search_list()
    },
    search_list() {
      console.log(this.searchData);
      var params = {
        name: this.searchData.name,
        startTime: this.searchData.period[0],
        endTime: this.searchData.period[1],
        status: '未申请',
        trainer: this.searchData.teacher,
        keyword: this.searchData.value,
        page: this.index-1,
        size: this.pageSize
      };
      let that=this;
      api.search(params).then( res => {
        that.response = res;
        that.tableData = [];
        for(var i = 0; i < res._embedded.plans.length; i++)
        {
          let item = {
            name: res._embedded.plans[i].name,
            startTime: res._embedded.plans[i].startTime,
            endTime: res._embedded.plans[i].endTime,
            teacher: '',
            status: res._embedded.plans[i].status,
            self: res._embedded.plans[i]._links.self.href
          };
          for(var j = 0; j < res._embedded.plans[i].trainers.length; j++)
          {
            item.teacher = item.teacher + res._embedded.plans[i].trainers[j].username;
          }
          that.tableData.push(item)
        }
      });
      this.search_status = true;
    },
    search_reset() {
      this.searchData = {
        name: '',
        period: ['',''],
        status: '',
        teacher: '',
        value: ''
      };
      this.search_status = false;
      this.index=1;
      this.list();
    },
    show_details(index, data) {
      console.log(this.tableData[index])
      this.$router.push({ path: 'plan_details', query: { self: this.tableData[index].self }})
    },
    edit(index, data) {
      this.$router.push({ path: 'edit_plan', query: { self: this.tableData[index].self }})
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
