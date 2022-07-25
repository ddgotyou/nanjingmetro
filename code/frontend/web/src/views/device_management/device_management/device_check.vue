<template>
<div>
  <h1 style="text-align:center">{{ChosenClassroom}}</h1>
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
    Chosenid: 0
    }
  },
  created() {
    // 接受 设备管理 页面传递的参数，并保存
    this.Chosenid = this.$route.query.id;
    this.ChosenClassroom = this.$route.query.classroom;
    this.fetchData()
  },
  methods: {
    //获取数据
    fetchData(){
    //   api.listDevice().then((response) => {
    //     console.log(response._embedded.devices);
    //   })
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