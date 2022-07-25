<template>
<div>
  <h1 style="text-align:center">{{ChosenBuilding}}楼-{{ChosenClassroom}}教室</h1>
    <div style="margin-top:80px;margin-left:100px;margin-right:100px;">
      <div class="classroom">
        <vue-draggable-resizable
            v-for="(item,index) in DeviceData"
            :key="index"
            :x="item.x"
            :y="item.y"
            :w="SizeMap[item.type]"
            :h="SizeMap[item.type]"
            :resizable="false"
            :draggable="false"
            :parent="true"
            >
            <el-tooltip placement="right" effect="dark">
              <div slot="content">
                  设备编号:{{item.id}}
                  <br>
                  设备类型:{{DeviceMap[item.type]}}
                  <br>
                  设备状态:{{item.DeviceStatus==0?'故障':'正常'}}
                  <br>
                  {{item.DeviceStatus==0?'不可预约':'可预约'}}
              </div>
              <i :class="iconMap[item.type]" :style="{color:item.DeviceStatus==0?'red':'black'}"  @click="ReservDevice(item)"></i>
            </el-tooltip>
        </vue-draggable-resizable>
      </div>
    </div>
    <!-- 预约设备对话框         -->
    <el-dialog
      title="预约设备"
      :visible.sync="dialogReserveVisible"
      width="95%"
      height="70%"
      :before-close="handleClose">

      <el-card class="box-card" style="width:100%">
        <div slot="header">详细任务</div>
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
              <el-form-item label="讲师">
                <el-select
                  v-model="taskData.teachers"
                  style="width:100%"
                  placeholder="请选择"
                  clearable
                  multiple
                  filterable
                >
                  <el-option
                    v-for="item in teacher_data"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
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
              <el-form-item label="教室">
                {{ChosenBuilding}}楼-{{ChosenClassroom}}教室
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="描述">
                <el-input v-model="taskData.description" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="设备种类">
                {{DeviceMap[ChosenDevice.type]}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备编号">
                {{ChosenDevice.id}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="学员">
                  <el-checkbox 
                    v-for="group in group_data" 
                    :label="group.label"  
                    :key="group.value"
                    :indeterminate="group.isIndeterminate"
                    v-model="group.isCheckAll"
                    border
                    @change="handleGroupChange(group.no)">
                    {{group.label}}
                  </el-checkbox>
                  <el-table
                    ref="traineeTable"
                    :data="people_data"
                    tooltip-effect="dark"
                    style="width: 100%"
                    height="250"
                    @select="handleTraineeChange"
                    @select-all="handleTraineeAll"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                      type="selection">
                  </el-table-column>
                  <el-table-column
                      prop="key"
                      label="id">
                  </el-table-column>
                  <el-table-column
                      prop="label"
                      label="姓名">
                  </el-table-column>
                  </el-table>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:right">
          <el-button type="primary" @click="addTask">确认新增</el-button>
        </div>
        <el-divider />
      </el-card>

    </el-dialog>
</div>
</template>

<script>
// import * as api from "@/api/device/device"
import * as api from '@/api/training_plan/training_plan' 
import * as api2 from '@/api/training_plan/application'
import * as api3 from '@/api/training_plan/account'
import VueDraggableResizable from 'vue-draggable-resizable'
export default {
  components: {
    VueDraggableResizable,
    api,
    api2,
    api3,
  },
  data() {
    return {
      ChosenBuilding: null,
      ChosenClassroom: null,
      dialogReserveVisible: false,
      //图标映射
      iconMap: {
        'monitor':'iconfont icon-icon-jiankong' + ' ' + 'monitor',
        'computer':'iconfont icon-diannao' + ' ' + 'computer',
        'device':'iconfont icon-shebeileishebei44' + ' ' + 'device'
      },
      // 名称映射
      DeviceMap: {
        'monitor':'监控',
        'computer':'电脑',
        'device':'教学设备'
      },
      //长宽映射 +10 为了删除等图标的显示
      SizeMap: {
        'monitor':40,
        'computer':50,
        'device':70
      },
      DeviceData: [
        {
            id: 1,
            type: "monitor",
            DeviceStatus: 0,
            x: 0,
            y: 0
        },
        {
            id: 1,
            type: "computer",
            DeviceStatus: 1,
            x: 0,
            y: 100
        },
        {
            id: 2,
            type: "computer",
            DeviceStatus: 1,
            x: 100,
            y: 100
        },
        {
            id: 3,
            type: "computer",
            DeviceStatus: 1,
            x: 150,
            y: 150
        },
        {
            id: 1,
            type: "device",
            DeviceStatus: 1,
            x: 0,
            y: 200
        }
    ], // 设备数据
    //选中的设备
    ChosenDevice: {
      id: null,
      type: null
    },
    taskData: {
        name: '',
        option: '',
        // order: '',
        date: null,
        period: [null,null],
        teachers: [],
        people: [],
        type: '',
        //score: '',
        classroom: '',
        description: ''
      },
    task_chooses: [],
    teacher_data: [],
    task_types: [],
    classrooms: [],
    group_data: [],
    }
  },
  created() {
    this.fetchData(),
    this.ChosenBuilding=this.GLOBAL.ChosenInfo.Building
    this.ChosenClassroom=this.GLOBAL.ChosenInfo.Room
    this.getSelection()
  },
  methods: {
    //获取数据
    fetchData(){
    //   api.listDevice().then((response) => {
    //     console.log(response._embedded.devices);
    //   })
    },
    //获取表单选项
    getSelection() {
      let that=this
      api.planTypes().then( res => {
        that.kinds=[]
        if(res.hasOwnProperty('_embedded'))
        {
          for(var i=0;i<res._embedded.planTypes.length;i++)
          {
            that.kinds.push({label:res._embedded.planTypes[i].name,value:res._embedded.planTypes[i].name})
          }
        }
      })
      api.taskTypes().then( res => {
        that.task_types=[]
        if(res.hasOwnProperty('_embedded'))
        {
          for(var i=0;i<res._embedded.taskTypes.length;i++)
          {
            that.task_types.push({label:res._embedded.taskTypes[i].name,value:res._embedded.taskTypes[i].name})
          }
        }
      })
      api.chooseTasks().then( res => {
        that.task_chooses=[]
        if(res.hasOwnProperty('_embedded'))
        {
          for(var i=0;i<res._embedded.chooseTasks.length;i++)
          {
            that.task_chooses.push({label:res._embedded.chooseTasks[i].name,value:res._embedded.chooseTasks[i].name})
          }
        }
      })
      api.classrooms().then( res => {
        that.classrooms=[]
        if(res.hasOwnProperty('_embedded'))
        {
          for(var i=0;i<res._embedded.classrooms.length;i++)
          {
            var temp=res._embedded.classrooms[i]._links.self.href.split("/")
            var classroom_id=temp[temp.length-1]
            that.classrooms.push({label:res._embedded.classrooms[i].name,value:classroom_id})
          }
        }
      })
      api3.getTrainee().then( res => {
        that.people_data=[]
        if(res.hasOwnProperty('_embedded'))
        {
          for(var i=0;i<res._embedded.hashMaps.length;i++)
          {
            that.people_data.push({no:i,label:res._embedded.hashMaps[i].name,key:res._embedded.hashMaps[i].id})
            that.trainee_id2no[res._embedded.hashMaps[i].id]=i
          }
        }
      })
      api3.getTrainer().then( res => {
        that.teacher_data=[]
        for(var i=0;i<res._embedded.hashMaps.length;i++)
        {
          that.teacher_data.push({label:res._embedded.hashMaps[i].name,value:res._embedded.hashMaps[i].id})
        }
      })
      api3.getTraineeGroup().then( res => {
        that.group_data=[]
        if(res.hasOwnProperty('_embedded'))
        {
          var no=0
          for(var i=0;i<res._embedded.hashMaps.length;i++)
          {
            if(res._embedded.hashMaps[i].users.length>0){
              that.group_data.push({
                no:no,
                label:res._embedded.hashMaps[i].name,
                key:res._embedded.hashMaps[i].group_id,
                users:res._embedded.hashMaps[i].users,
                isIndeterminate:false,
                isCheckAll:false,
                selection:[]
              })
              no=no+1
            }
          }   
        }
      })
      api3.getDepts().then( res => {
        that.departments=[]
        if(res.hasOwnProperty('_embedded'))
        {
          for(var i=0;i<res._embedded.dboxVoes.length;i++)
          {
            that.departments.push({label:res._embedded.dboxVoes[i].label,value:res._embedded.dboxVoes[i].key})
          }
        }
      })
    },
    //表单关闭
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    addTask() {
      var timestamp=new Date().getTime()
      if(this.taskData.name==''||this.taskData.option==''||this.taskData.date==null||this.taskData.period[0]==null||this.taskData.period[1]==null||this.taskData.teachers.length==0||this.taskData.people.length==0||this.taskData.type==''||this.taskData.score==' '||this.taskData.classroom==''||this.taskData.description==''){
        this.$message.error('表单内存在空值！');
      }
      else{
        this.tableData.push({
          classroom: this.taskData.classroom,
          name: this.taskData.name,
          chooseTask: this.taskData.option,
          type: this.taskData.type,
          //scoringFormTemplate: this.taskData.score,
          inPlanTask: null,
          description: this.taskData.description,
          startTime: this.taskData.date+' '+this.taskData.period[0],
          endTime: this.taskData.date+' '+this.taskData.period[1],
          trainers: this.taskData.teachers,
          trainees: this.taskData.people,
          order: timestamp,
          signInNumber: null,
          signOutNumber: null
        })
      }
    },
    handleGroupChange(gno){
      if(this.group_data[gno].isIndeterminate)
      {
        this.group_data[gno].isIndeterminate=false
      }
      var users=this.group_data[gno].users
      if(this.group_data[gno].isCheckAll)
      {
        this.group_data[gno].selection=[]
        users.forEach(user => {
          this.group_data[gno].selection.push(user)
        });
      }
      else
      {
        this.group_data[gno].selection=[]
      }
      users.forEach(user => {
        this.$refs.traineeTable.toggleRowSelection(this.people_data[this.trainee_id2no[user]],this.group_data[gno].isCheckAll);
        this.traineeChange(user,this.group_data[gno].isCheckAll,gno)
      });
      //console.log(this.group_data[gno].selection)
    },
        handleSelectionChange(selection){
      this.taskData.people=[]
      for(var i=0;i<selection.length;i++)
      {
        this.taskData.people.push(selection[i].key)
      }
    },
    handleTraineeChange(selection, row){
      this.traineeChange(row.key,selection.indexOf(row)>=0)
    },
    handleTraineeAll(selection){
      for(var i=0;i<this.people_data.length;i++)
      {
        this.traineeChange(this.people_data[i].key,selection.length!=0)
      }
      // for(var j=0;j<this.group_data.length;j++)
      // {
      //   console.log(this.group_data[j].label,this.group_data[j].selection)
      // }
    },
    //选择预约设备 打开表单
    ReservDevice(item){
      if(item.DeviceStatus==0)//故障设备无法预约
      {
        this.$alert('该设备已故障，无法预约', '提示', {
          confirmButtonText: '确定',
        });
      }
      else{
        this.ChosenDevice.id=item.id;
        this.ChosenDevice.type=item.type;
        this.dialogReserveVisible=true;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.classroom{
    height: 540px;
    width: 100%;
    margin-top: 5px;
    border: 2px solid skyblue;
}
.computer{
    font-size: 50px;
}
.monitor{
    font-size: 30px;
}
.device{
    font-size:70px;
}
</style>