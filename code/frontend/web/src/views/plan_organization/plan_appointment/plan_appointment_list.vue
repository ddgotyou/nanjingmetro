<!--
 * @Author: your name
 * @LastEditors: your name
-->
<template>
  <div class="app-container">
    <el-form label-position="right" label-width="80px">
      <el-card class="box-card" style="width:100%">
        <div slot="header">任务列表</div>
        <el-table
          :data="tableData"
          style="width: 100"
        >
          <el-table-column
            prop="name"
            label="任务名称"
          />
          <el-table-column
            prop="chooseTask"
            label="任务选择"
          />
          <el-table-column
            prop="startTime"
            label="课时开始时间"
          />
          <el-table-column
            prop="endTime"
            label="课时结束时间"
          />
          <el-table-column
            prop="type"
            label="类型"
          />
          <el-table-column
            prop="classroom"
            label="教室"
          />
            <el-table-column
            label="讲师"
          >
            <template slot-scope="scope">
              <el-select value="" filterable placeholder="搜索">
                <el-option
                  v-for="item in scope.row.trainers"
                  :key="item.user"
                  :label="item.username"
                  :value="item.user">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="学员"
          >
            <template slot-scope="scope">
              <el-select value="" filterable placeholder="搜索">
                <el-option
                  v-for="item in scope.row.trainees"
                  :key="item.user"
                  :label="item.username"
                  :value="item.user">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述"
          />
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
    </el-form>
  </div>
</template>

<script>
import * as api from '@/api/training_plan/training_plan'
import * as api3 from '@/api/training_plan/account'
export default {
  components: {
    api
  },
  data() {
    return {
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
  computed: {
    taskPeriodOptions() {
      return {
        disabledDate(time) {
          var timeNow = Date.now()
          var before=timeNow-24*60*60*1000
          return !(time.getTime()>=before)
        }
      }
    }
  },
  methods:{
    list() {
      var that=this
      var params = {
        module: 'tmp_task_list',
        page: that.index-1,
        size: that.pageSize
      }
      api.getTempTasks(this.$user.userId,params).then( res => {
        that.response=res
        that.tableData=[]
        for(var i=0;i<res._embedded.tmpTasks.length;i++)
        {
          that.tableData.push({
            id:res._embedded.tmpTasks[i].id,
            name:res._embedded.tmpTasks[i].name,
            chooseTask:res._embedded.tmpTasks[i].chooseTask,
            startTime:res._embedded.tmpTasks[i].startTime,
            endTime:res._embedded.tmpTasks[i].endTime,
            type:res._embedded.tmpTasks[i].type,
            classroom:res._embedded.tmpTasks[i].classroom,
            description:res._embedded.tmpTasks[i].description,
            trainers:res._embedded.tmpTasks[i].trainers,
            trainees:res._embedded.tmpTasks[i].trainees
          })
        }
      })
    },
    size_change(val){
      this.pageSize=val
      this.index_change()
    },
    index_change(){
      this.list()
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