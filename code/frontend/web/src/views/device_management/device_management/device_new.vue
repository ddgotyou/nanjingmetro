<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form
        label-position="right"
        inline="true"
        :model="formData"
        ref="formData"
        class="form"
        label-width="100px"
      >
        <el-row>
          <el-col span="12">
            <el-form-item label="设备名称">
              <el-input id="" v-model="formData.deviceName" name="deviceName"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="状态">
              <el-input prop="状态" v-model="formData.deviceStatus" name="deviceStatus"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所处实验室" name="deviceClassroom">
              <el-select id="deviceClassroom" v-model="formData.deviceClassroom" style="width: 93%">
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
            <el-form-item label="用途" prop="equname">
              <el-input id="deviceDescription" v-model="formData.deviceDescription" name="deviceDescription"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="负责人">
              <el-select id="chargePeople" v-model="formData.chargePeople" name="chargePeople" style="width: 93%">
                <el-option
                  v-for="item in personlist"
                  :key="item.key"
                  :label="item.label"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="售后联系人">
              <el-input id="afterSale" v-model="formData.afterSale" name="afterSale" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="购买时间">
              <el-date-picker
                v-model="formData.purchaseDate"
                type="date"
                placeholder="选择日期"
                style="width: 88%"
                value-format="yyyy-MM-dd HH:mm:ss"
                >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
          <el-form-item align="left" label="售后联系方式" prop="equname">
          <el-input id="afterSaleNumber" v-model="formData.afterSaleNumber" name="afterSaleNumber"></el-input>

          </el-form-item>
          </el-col>
        </el-row>

        <div style="text-align: right">
          <el-button type="primary" @click="addDevice">保 存</el-button>
        </div>
      </el-form>
    </el-card>
    <div style="margin: 40px"></div>


  </div>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>

<script>
import * as api from "@/api/device/device.js"

export default {
  components: {
    api

  },
  data() {
    return {
      formData: {
        deviceName: '',
        description: '',
        type: '',
        period: ['',''],
        description: '',
      },
      //下拉框
      kinds: [],
      personlist:[],
      classrooms:[],
    };
  },
  created() {
    //获取负责人和实验室【待补充】
    this.getPersonSelection();
    this.getClassSelection();
    //this.getRepairSelection();
  },
  methods: {
    //获取人员下拉框
    getPersonSelection(){
      console.log("获取人员下拉框")
      api.listPerson().then( res => {
        this.personlist = res._embedded.dboxVoes;
        console.log( this.personlist)
      })
    },
    //获取实验室下拉框
    getClassSelection(){
      console.log("获取实验室下拉框")
      api.classrooms().then( res => {
        //实验室列表
        this.classrooms=[]
        for(var i=0;i<res._embedded.classrooms.length;i++)
        {
          var temp=res._embedded.classrooms[i]._links.self.href.split("/")
          var classroom_id=temp[temp.length-1]
          this.classrooms.push({label:res._embedded.classrooms[i].name,value:classroom_id})
        }
        console.log(this.classrooms)
      })
    },

    //新增设备
    addDevice(){
      var data={
        "deviceName": this.formData.deviceName,
        "deviceClassroom":this.formData.deviceClassroom,
        "deviceDescription":this.formData.deviceDescription,
        "delFlag":null,
        "purchaseDate":this.formData.purchaseDate,
        "afterSale":this.formData.afterSale,
        "afterSaleNumber":this.formData.afterSaleNumber,
        "chargePeople":this.formData.chargePeople,
        "deviceStatusVO": {
        "name": null,
        "description": this.formData.deviceStatus,
        "type": null
        },
      }
      api.add(data).then(res => {
        this.$message({
          message: '新增成功！',
          type: 'success'
        });
        this.$router.go(-1)
        console.log("add new device successfully!")
      })
    },
  },
};
</script>
