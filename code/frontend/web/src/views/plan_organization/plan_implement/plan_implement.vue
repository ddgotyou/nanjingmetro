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
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="show_details(scope.$index, tableData)"
              type="text"
              size="small">
              详情
            </el-button>
            <el-button
              @click.native.prevent="modify_tasks(scope.$index, tableData)"
              type="text"
              size="small">
              调整任务
            </el-button>
            <el-button
              @click.native.prevent="score(scope.$index, tableData)"
              type="text"
              size="small">
              评分
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
    <el-dialog title="调整任务" :visible.sync="dialogFormVisible">
      <div class="dialog-footer">
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
        <el-divider />
        <el-table
          :data="taskTableData"
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
                @click.native.prevent="deleteRow(scope.$index, taskTableData)"
              >
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-divider />
        <div style="text-align: right">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">保 存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/api/training_plan/training_plan' 
export default {
  components: {
    api
  },
  data() {
    return {
      searchData: {
        period: ['',''],
        teacher: '',
        value: ''
      },
      search_status: false,
      index: 1,
      pageSize: 10,
      teachers: [],
      response: {"page": {
        "size": 0,
        "totalElements": 0,
        "totalPages": 0,
        "number": 0
        }
      },
      tableData: [],
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
      taskResponse:{},
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
      taskID:'',
      taskTableData: [],
      
      dialogTableVisible: false,
      dialogFormVisible: false
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
        status: '进行中',
        page: this.index-1,
        size: this.pageSize
      };
      let that=this;
      api.search(params).then( res => {
        that.response = res;
        that.tableData = [];
        if(res.hasOwnProperty('_embedded'))
        {
          if(res.hasOwnProperty('_embedded'))
          {
            for(var i = 0; i < res._embedded.plans.length; i++)
            {
              let item = {
                name: res._embedded.plans[i].name,
                startTime: res._embedded.plans[i].startTime,
                endTime: res._embedded.plans[i].endTime,
                teacher: '',
                self: res._embedded.plans[i]._links.self.href,
                teacher: res._embedded.plans[i].trainers[0]
              };
              that.tableData.push(item)
            }
          }
        }
      });
    },
    search_list() {
      console.log(this.searchData);
      var params = {
        startTime: this.searchData.period[0],
        endTime: this.searchData.period[1],
        status: '进行中',
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
          for(var i = 0; i < res._embedded.plans.length; i++)
          {
            let item = {
              name: res._embedded.plans[i].name,
              startTime: res._embedded.plans[i].startTime,
              endTime: res._embedded.plans[i].endTime,
              teacher: '',
              self: res._embedded.plans[i]._links.self.href,
              teacher: res._embedded.plans[i].trainers[0]
            };
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
        name: '',
        period: '',
        teacher: '',
        value: ''
      }
      this.search_status = false;
      this.index=1;
      this.list();
    },
    show_details(index, data) {
      this.$router.push({ path: 'plan_details', query: { self: this.tableData[index].self }})
    },
    score(index, data) {
      this.$router.push({ path: 'pad' })
    },
    size_change(val){
      this.pageSize=val
      this.index_change()
    },
    index_change(){
      this.fresh()
    },
    modify_tasks(index, data){
      var temp=this.tableData[index].self.split("/")
      this.taskID=temp[temp.length-1]
      this.taskData={
        name: '',
        option: '',
        order: '',
        time: ['',''],
        type: '',
        score: '',
        classroom: '',
        description: ''
      }
      let that=this;
      api.details(this.taskID)
      .then( res => {
        that.task_response=res;
        if(res.tasks.length==0)
        {
          that.taskTableData=[]
        }
        else
        {
          that.taskTableData=res.tasks;
          that.taskTableData.sort(function (a,b) {
            return a.order-b.order;
          });
        }
      });
      this.dialogFormVisible = true;
    },
    addTask() {
      this.taskTableData.push({
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
      this.taskTableData.sort(function (a,b) {
        return a.order-b.order;
      })
    },
    deleteRow(index, taskTableData) {
      this.taskTableData.splice(index, 1)
    },
    getSelection() {
      let that=this
      api.taskTypes().then( res => {
        that.task_types=[]
        for(var i=0;i<res._embedded.taskTypes.length;i++)
        {
          that.task_types.push({label:res._embedded.taskTypes[i].name,value:res._embedded.taskTypes[i].name})
        }
      })
      api.chooseTasks().then( res => {
        that.task_chooses=[]
        for(var i=0;i<res._embedded.chooseTasks.length;i++)
        {
          that.task_chooses.push({label:res._embedded.chooseTasks[i].name,value:res._embedded.chooseTasks[i].name})
        }
      })
     api.classrooms().then( res => {
        that.classrooms=[]
        for(var i=0;i<res._embedded.classrooms.length;i++)
        {
          var temp=res._embedded.classrooms[i]._links.self.href.split("/")
          var classroom_id=temp[temp.length-1]
          that.classrooms.push({label:res._embedded.classrooms[i].name,value:classroom_id})
        }
      })
    },
    save() {
      this.dialogFormVisible = false;
      var data=this.taskResponse;
      for(var key in data)
      {
        if(data[key]=='')
        {
          delete data[key]
        }
      }
      data.tasks=this.taskTableData
      api.update(data,this.taskID).then(res => {
        this.$message({
          message: '保存成功！',
          type: 'success'
        });
        console.log("update plan successfully!")
      })
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
