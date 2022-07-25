<template>
  <div class="app-container">
    <el-card class="card-box" style="width: 100%">
      <div slot="header">
        <span style="margin-right: 20px">统计维度</span>
        <el-select
          v-model="dimensions"
          multiple
          placeholder="请选择统计维度（可多选）"
          @change="drawChart"
          @blur="setMinWidth"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="image-box">
        <div class="echart" id="mychart" :style="myChartStyle" ></div>
        <!-- <el-image
          style="width: 800px; height: 400px"
          :src="url"
          fit="fill"
        ></el-image> -->
      </div>
      <el-button style="margin-left:90%;" @click="download">导出图表</el-button>
      <!-- <div class="desc-box">统计信息说明</div> -->
    </el-card>
  </div>
</template>

<script>
//引入图表
import * as echarts from "echarts";
export default {
  data() {
    return {
      url: "",
      dimensions: [],
      options: [
        { value: "1", label: "性别" },
        //{ value: "2", label: "部门" },  部门作为默认选项
        { value: "2", label: "岗位" },
        { value: "3", label: "学历" },
        { value: "4", label: "专业" },
        { value: "5", label: "学员状态" },
      ],
      //图表测试数据,后面的各个维度的统计数据基于的都是每个部门的人数进行百分比计算
      //部门
      departMemData:[
        {value:20,name:"一部"},
        {value:15,name:"二部"},
        {value:30,name:"三部"},
      ],
      //性别
      depart1Sex:[
        {value:10,name:"男"},
        {value:10,name:"女"}
      ],
      depart2Sex:[
        {value:10,name:"男"},
        {value:5,name:"女"}
      ],
      depart3Sex:[
        {value:20,name:"男"},
        {value:10,name:"女"}
      ],
      //学历
      depart1Deg:[
        {value:10,name:"本科"},
        {value:10,name:"研究生"},
        {value:0,name:"博士"}
      ],
      depart2Deg:[
        {value:10,name:"本科"},
        {value:2,name:"研究生"},
        {value:3,name:"博士"}
      ],
      depart3Deg:[
        {value:16,name:"本科"},
        {value:10,name:"研究生"},
        {value:4,name:"博士"}
      ],
      //岗位
      depart1Pos:[
        {value:5,name:"销售"},
        {value:5,name:"策划"},
        {value:10,name:"技术"}
      ],
      depart2Pos:[
        {value:5,name:"销售"},
        {value:10,name:"策划"},
        {value:0,name:"技术"}
      ],
      depart3Pos:[
        {value:15,name:"销售"},
        {value:5,name:"策划"},
        {value:10,name:"技术"}
      ],
       //专业
      depart1Maj:[
        {value:12,name:"专业1"},
        {value:8,name:"专业2"},
      ],
      depart2Maj:[
        {value:7,name:"专业1"},
        {value:8,name:"专业2"},
      ],
      depart3Maj:[
        {value:12,name:"专业1"},
        {value:18,name:"专业2"},
      ],
      //学员状态
      depart1Stat:[
        {value:10,name:"通过"},
        {value:10,name:"未通过"}
      ],
      depart2Stat:[
        {value:10,name:"通过"},
        {value:5,name:"未通过"}
      ],
      depart3Stat:[
        {value:20,name:"通过"},
        {value:10,name:"未通过"}
      ],
      seriesData:[],
      seriesType:[],
      myChartStyle: { float: "left", width: "100%", height: "600px" },//图表样式
      dataList:null
    }
  },
  mounted(){
    this.drawChart();
  },
  methods: {
    mapOption(keygen){
      const dist={
        '1':'Sex',
        '2':'Pos',
        '3':'Deg',
        '4':'Maj',
        '5':'Stat'
      };
      return dist[keygen];
    },
    initData(){
      
      this.seriesType.splice(0);
      this.seriesData.splice(0);
      this.seriesData.push(this.departMemData);
      this.seriesType.push(//初始化
        {
            name: '部门',
            type: 'pie',
            radius: [60,80] ,
            center: ['50%', '60%'],
            data:this.seriesData[0],
            label:{
              normal:{
                position:'inner',
                show:true
              }
            },
            itemStyle: {
                emphasis: {
                    shadowBlur: 1,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
         } 
      );
      
      //每次调用重新来过
      if(this.dimensions.length!=0){//默认值
        //读取
        for(var i=0;i<this.dimensions.length;i++){
          var str=this.mapOption(this.dimensions[i]);//返回字符串
          var varName=['this.depart1'+str,'this.depart2'+str,'this.depart3'+str];//获得变量名,eval获取变量
          //构造seriesData
          var ser=[]
          for(var j=0;j<varName.length;j++){
            var that=eval(varName[j]);
            for(var z=0;z<that.length;z++){
              if(that[z].value!=0)//如果value为零无需在图表上标注
                ser.push(that[z]);
            }
          }
          this.seriesData.push(ser);
          //console.log(this.seriesData);
          //构造seriesType
          this.seriesType.push(
          {
            name:  this.options[Number(this.dimensions[i])].label,
            type: 'pie',
            radius: [60+30*(i+1),80+30*(i+1)] ,
            center: ['50%', '60%'],
            data:this.seriesData[i+1],
            label:{
              normal:{
                position:'inner',
                show:true
              }
            },
            itemStyle: {
                emphasis: {
                    shadowBlur: 1,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
           } 
          );   
          console.log(this.seriesType);
        }
      }
      
    },
    drawChart() {
          this.initData();
          console.log(this.seriesType);
          const option={
            // title : {
            //     text: '某站点用户访问来源',
            //     subtext: '纯属虚构',
            //     x:'center'
            // },
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            series : this.seriesType
          };
          const myChart = echarts.init(document.getElementById("mychart"));
           myChart.clear();
          myChart.setOption(option);
          //随着屏幕大小调节图表
          window.addEventListener("resize", () => {
            myChart.resize();
          });
        
    },
    download(){
      let mycanvas=document.getElementsByTagName('canvas')[0]
      let image=mycanvas.toDataURL("image/png");
      let $a = document.createElement('a');
      $a.setAttribute("href", image);
      $a.setAttribute("download", "echarts图片下载.png");
      $a.click();
    },
    setMinWidth(val) {
      this.minWidth = val.srcElement.clientWidth;
    },
  },
};
</script>

<style lang="scss" scoped>
.card-box {
  width: 400px;
  max-width: 100%;
  margin: 20px auto;
}

.image-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.desc-box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>