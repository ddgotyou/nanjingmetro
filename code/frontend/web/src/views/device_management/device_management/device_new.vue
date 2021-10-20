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
              <el-input prop="状态"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所处实验室" prop="deviceClassroom">
              <el-select
                id="deviceClassroom"
                v-model="formData.deviceClassroom"
                name="deviceClassroom"
                placeholder="请选择"
                style="width: 95%"
              >
                <el-option label="一号" value="1"></el-option>
                <el-option label="二号" value="2"></el-option>
                <el-option label="2号" value="3"></el-option>
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
              <el-input id="chargepeople" v-model="formData.chargepeople" name="chargepeople"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="售后联系人" prop="equname">
              <el-input id="afterSale" v-model="formData.afterSale" name="afterSale"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="购买时间" prop="equname">
              <el-input id="deviceName" v-model="formData.deviceName" name="deviceName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
          <el-form-item align="left" label="售后联系方式" prop="equname">
          <el-input id="afterSaleNumber" v-model="formData.afterSaleNumber" name="afterSaleNumber"></el-input>
          <!-- v-model="basicinfo.name" -->
          </el-form-item>
          </el-col>
        </el-row>

        <div style="text-align: right">
          <el-button type="primary" @click="addDevice">保 存</el-button>
        </div>
      </el-form>
    </el-card>
    <div style="margin: 40px"></div>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>维保信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="getRepairSelection">添加维保信息</el-button>
      </div>
      <el-form
        inline="true"
        model="repairData"
        ref="repairData"
        label-width="100px"
        class="form">
        <el-row>
          <el-col span="12">
            <el-form-item label="周期" prop="taskmajor">
              <el-input :disabled = "hasAllowEdit"></el-input>
              <!-- <el-select v-model="repairData.taskmajor">
                <el-option label="一号" value="1"></el-option>
                <el-option label="二号" value="2"></el-option>
              </el-select> -->
            </el-form-item>
          </el-col>
          <el-col span="12">

            <el-form-item label="维保时间" prop="task">
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期"
                :disabled = "hasAllowEdit">
              </el-date-picker>
            </el-form-item>
            <!-- <el-button size="small">导出</el-button> -->
          </el-col>
        </el-row>

        <el-row>
          <el-col span="12">
            <el-form-item label="维护人员" prop="classify" >
              <el-input :disabled = "hasAllowEdit"></el-input>
              <!-- <el-select v-model="repairData.classify">
                <el-option label="一号" value="1"></el-option>
                <el-option label="二号" value="2"></el-option>
              </el-select> -->
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="规程" >
              <el-select id="type" v-model="repairData.type" :disabled = "hasAllowEdit">
                <el-option
                  v-for="item in kinds"
                  :key="item.value"
                  :label="item.lable"
                  :value="item.value"
                />
                <!-- <el-option label="一号" value="1"></el-option>
                <el-option label="二号" value="2"></el-option> -->
              </el-select>
            </el-form-item>
            <!-- <el-button size="small">查看</el-button> -->
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col span="2">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
              style="display: inline-block"
            >
              <el-button size="small">上 传</el-button>
            </el-upload>
          </el-col>
          < <el-col span="2">
            <el-button size="small">导 出</el-button>
          </el-col>
          <el-col span="2">
            <el-button size="small">查 看</el-button>
          </el-col>
        </el-row> -->

        <div style="margin: 20px"></div>
        <div style="text-align: right">
          <!-- <el-button @click="goEqadmin">取 消</el-button> -->
          <el-button>查看</el-button>
          <!-- 前往查看规程界面，并且，查看界面有导出按钮 -->
          <el-button type="primary" @click="goEqadmin" :disabled = "hasAllowEdit">确认添加</el-button>
        </div>
      </el-form>
    </el-card>
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
import api from "@/api/device/device"
import api2 from '@/api/training_plan/application'
export default {
  components: {
    api,
    api2
  },
  data() {
    return {
      formData: {
        deviceName: '',
        description: '',
        type: '',
        period: ['',''],
        description: '',
        people: [],
        classes: []
      },

      tableData: [],
      repairData: {
        name: "",
        state: "",
      },
      value1: '',
      hasAllowEdit:true,
      kinds: [],
    };
  },
  created() {
    this.getSelection()
  },
  methods: {
    allowedit(){
//
    },
    // addDevice(){
    //   this.tableData.push({
    //     classroom: null,
    //     name: this.formData.name,
    //     chooseTask: this.formData.option,
    //     type: this.formData.type,
    //     taskScore: this.formData.standard,
    //     inPlanTask: null,
    //     description: null,
    //     startTime: this.formData.time[0],
    //     endTime: this.formData.time[1],
    //     order: this.sequence,
    //     signInNumber: null,
    //     signOutNumber: null
    //   })
    //   console.log(this.Data)
    // },
    getRepairSelection() {
      this.hasAllowEdit = false
      let that=this
      api.protocols().then( res => {
        that.kinds=[]
        for(var i=0;i<res._embedded.protocols.length;i++)
        {
          that.kinds.push({label:res._embedded.protocols[i].label,value:res._embedded.protocols[i].value})
        }
      })
    },
    getSelection() {
      let that=this
      //
      api.planTypes().then( res => {
        //that.people_data=[]
        that.kinds=[]
        //that.task_types=[]
        //that.task_chooses=[]
        for(var i=0;i<res._embedded.planTypes.length;i++)
        {
          that.kinds.push({label:res._embedded.planTypes[i].name,value:res._embedded.planTypes[i].name})
        }
      })
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
    },
    addDevice(){
      var data={
        deviceName: this.formData.name,
        deviceClassroom:null,
        deviceDescription:null,
        delFlag:null,
        purchaseDate:null,
        afterSale:null,
        afterSaleNumber:null,
        chargepeople:null,
        deviceStatusVO: {
        "name": null,
        "description": null,
        "type": null
        },
      }
      for(var key in data)
      {
        if(data[key]=='')
        {
          delete data[key]
        }
      }
      api.add(data).then(res => {
        var temp=res._links.self.href.split("/")
        var id=temp[temp.length-1]
        api2.submit({
          user:this.$user.userId,
          plan:id
        }).then(res => {
          this.$message({
            message: '新增设备提交成功！',
            type: 'success'
          });
          this.$router.go(-1)
          console.log("submit plan successfully!")
        })
      })
    },
    save() {
      var data={
        name: this.formData.name,
        major:this.formData.speciality,
        type: this.formData.type,
        goal:'',
        detailed: this.formData.description,
        status:'未申请',
        searchText: this.formData.name,
        startTime: this.formData.period[0],
        endTime: this.formData.period[1],
        auditors: [],
        trainers: [],
        tasks: []
      }
      for(var key in data)
      {
        if(data[key]=='')
        {
          delete data[key]
        }
      }
      var auditors=[]
      for(var i=0;i<this.formData.people.length;i++)
      {
        auditors.push({user:this.formData.people[i],username:this.formData.people[i],userRole:null,approved:null})
      }
      data.auditors=auditors
      data.tasks=this.tableData
      api.add(data).then(res => {
        this.$message({
          message: '保存成功！',
          type: 'success'
        });
        this.$router.go(-1)
        console.log("add new device successfully!")
      })
    },
    //定义导出Excel表格事件
    exportExcel() {
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          "sheetjs.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },


    goEqadmin() {
      this.$router.push({ path: "device_management" });
    },
  },
};
</script>
