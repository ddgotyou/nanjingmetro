<template>
  <div class="app-container">
    <el-form
      label-position="right"
      inline="true"
      :model="formData"
      label-width="100px"
    >
    <el-card class="box-card">
      <div slot="header">基本信息</div>
        <el-row>
          <el-col span="12">
            <el-form-item label="设备名称">
              <el-input id="deviceName" v-model="formData.deviceName" name="deviceName"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="状态">
              <el-input id="deviceStatus" v-model="formData.deviceStatus" name="deviceStatus"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所处实验室">
              <el-select v-model="formData.deviceClassroom" style="width:93%" placeholder="请选择" @change="change()">
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
            <el-form-item label="用途">
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
                  :value="item.value"
                />
              </el-select>
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

            <el-form-item label="购买时间" >
              <el-date-picker
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="formData.purchaseDate"
                type="date"
                placeholder="选择日期"
                style="width: 87%"
                >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
          <el-form-item label="售后联系方式">
          <el-input id="afterSaleNumber" v-model="formData.afterSaleNumber" name="afterSaleNumber"></el-input>
          </el-form-item>
          </el-col>
        </el-row>
        <div style="text-align: right">
          <el-button type="primary" @click="change_device">保 存</el-button>
        </div>
      </el-card>
    </el-form>

    <div style="margin: 40px"></div>
    <el-card class="box-card" style="width:100%">
        <div slot="header">维保信息</div>
        <el-form
          inline="true"
          model="repairData"
          label-width="100px"
          class="form">
        <el-row>
          <el-col span="12">
            <el-form-item label="周期">
              <el-input v-model="repairData.re_period"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="维保时间">
              <el-date-picker
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="repairData.re_time"
                type="date"
                placeholder="选择日期"
                >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col span="12">
            <el-form-item label="维护人员" >
              <el-select  v-model="repairData.re_people" style="width:95%" @change="change()">
                <el-option
                  v-for="item in repersonlist"
                  :key="item.key"
                  :label="item.label"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="规程">
              <el-select id="re_rule" v-model="repairData.re_rule" @change="change()">
                <el-option
                  v-for="item in ruleslist"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <!-- <el-button size="small">查看</el-button> -->
          </el-col>
        </el-row>
        <div style="margin: 20px"></div>
        <div style="text-align: right">
          <!-- <el-button @click="goEqadmin">取 消</el-button> -->
          <el-button  @click="dialogFormVisible = true">新增规程</el-button>
          <!-- 新增规程对话框 -->
          <el-button type="primary" @click="addWorksheet" >添加维保信息</el-button>
        </div>
      </el-form>

      <el-divider/>

      <el-table
        :data="tableData_repair"
        style="width: 100"
        highlight-current-row
      >
        <el-table-column prop="re_period" label="周期"/>
        <el-table-column prop="re_time" label="维保时间"/>
        <el-table-column prop="re_people" label="维护人员"/>
        <el-table-column prop="re_rule" label="规程"/>
      </el-table>
      <div style="margin: 20px">
        <el-dialog title="新增规程" :visible.sync="dialogFormVisible" >
            <el-form :model="newruleForm"  label-width="100px" label-position="right">
              <el-row>
                <el-col span="24">
              <el-form-item label="名称">
                <el-input v-model="newruleForm.ruleName" style="width:100%"></el-input>
              </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addRule">确 定</el-button
              >
            </div>
          </el-dialog>
      </div>
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
import * as api from "@/api/device/device.js"

export default {
  components: {
    api
  },
  data() {
    return {
      formData: {
        deviceName: '',
        deviceDescription: '',
        deviceClassroom:'',
        chargePeople: '',
        afterSale:'',
        afterSaleNumber:'',
        purchaseDate:'',
      },
      classrooms: [],
      newruleForm:{ruleName: ''},
      dialogFormVisible:false,
      tableData: [],
      tableData_repair:[],
      repairData: {
        re_rule: "",
        re_people: "",
        re_time: "",
        re_period:"",
      },
      re_time: '',
      ruleslist: [],
      personlist:[],
      repersonlist:[],
      perid:{},
      ruleid:{},
    };
  },
  created() {
    // 接受 设备管理 页面传递的参数，并保存
    this.id = this.$route.query.id;
    console.log(this.id)
    this.getPersonSelection()
    this.getRepairSelection()
    this.list()
    this.listworksheet()
  },
  methods: {
    //获取人员下拉框
    getPersonSelection(){
      console.log("获取人员下拉框，account正常")
      api.listPerson().then( res => {
        this.personlist = res._embedded.dboxVoes;
        this.repersonlist = res._embedded.dboxVoes;
        this.perid={}
        for(var i=0;i<res._embedded.dboxVoes.length;i++)
        {
          var person_id=res._embedded.dboxVoes[i].key;
          this.perid[person_id]=res._embedded.dboxVoes[i].label;
        }

      })
    },
    change(){
      this.$forceUpdate()
    },
    //新增规程,【待错误处理】
    addRule(){
      this.dialogFormVisible = false
      var data={
        "label": this.newruleForm.ruleName,
      }
      //api.addrule(data).then(response => {
        //let code = response.code;
        //console.log(code);
        // if (code === "200") {
        //   this.$message.success("新增规程成功！");
        //   //this.onCancel();
        // } else {
        //   this.$message.error("规程name已经存在！！！！");
        // }
        // this.getRepairSelection();
      //});
      api.addrule(data).then(response => {
        this.$message.success("新增规程成功！")
      });
    },
    //添加维保信息
    addWorksheet(){
      var data={
        re_device: this.id,
        re_status: this.repairData.re_time,
        re_period: this.repairData.re_period,
        re_people: this.repairData.re_people,
        re_rule:this.repairData.re_rule,
      }
      api.addworksheet(data)
      this.$message.success("新增维保信息成功！")
      //console.log("add worksheet successfully!")
      this.listworksheet()
    },
    //获取设备详细信息，[错误处理]
    list() {

      api.details(this.id).then( response => {
        api.classrooms().then( res => {
          console.log("plan获取正常")
          this.classrooms=[]
          for(var i=0;i<res._embedded.classrooms.length;i++)
          {
            var temp=res._embedded.classrooms[i]._links.self.href.split("/")
            var classroom_id=temp[temp.length-1]
            this.classrooms.push({label:res._embedded.classrooms[i].name,value:classroom_id})
          }
          this.formData={
            deviceName: response.deviceName,
            deviceStatus: response.deviceStatusVO.name,
            deviceDescription: response.deviceDescription,
            purchaseDate:response.purchaseDate,
            //deviceClassroom:"111",
            deviceClassroom:response.deviceClassroomName ,//{label:res._embedded.classrooms[i].name,value:classroom_id},
            chargePeople:response.chargePeopleName,
            afterSale:response.afterSale,
            afterSaleNumber:response.afterSaleNumber,
          };
          console.log(this.formData)
        })
      });
    },
    //获取维保工单列表，放到table
    listworksheet(){

      api.listWorksheet(this.id).then( res => {
        console.log("获取维保工单！！！")
        this.tableData_repair = [];
        for(var i = 0; i < res._embedded.workSheets.length; i++)
        {
          let item = {
            re_period: res._embedded.workSheets[i].re_period,
            re_time: res._embedded.workSheets[i].re_time,
            re_rule: this.ruleid[res._embedded.workSheets[i].re_rule],
            re_people: this.perid[res._embedded.workSheets[i].re_people],
          };
          this.tableData_repair.push(item)
        }
        //        <el-table-column prop="re_period" label="周期"/>
        //<el-table-column prop="re_time" label="维保时间"/>
        //<el-table-column prop="perid[re_people]" label="维护人员"/>
        //<el-table-column prop="re_rule" label="规程"/>
        console.log("获取维保工单成功！！！")
      });

    },
    //维保信息下拉框（规程）
    getRepairSelection() {
      api.protocols().then( res => {
        this.ruleslist=[]
        this.ruleid={}
        for(var i=0;i<res._embedded.protocols.length;i++)
        {
          this.ruleid[res._embedded.protocols[i].value]=res._embedded.protocols[i].label;
          this.ruleslist.push({label:res._embedded.protocols[i].label,value:res._embedded.protocols[i].value})
        }
      })
    },
    // 修改设备，提交修改的表单
    change_device(){
      var data={
        "deviceId":this.id,
        "deviceName": this.formData.deviceName,
        "deviceClassroom":this.formData.deviceClassroom,
        "deviceDescription":this.formData.deviceDescription,
        //"deviceStatus": this.formData.deviceStatus,
        "purchaseDate":this.formData.purchaseDate,
        "afterSale":this.formData.afterSale,
        "afterSaleNumber":this.formData.afterSaleNumber,
        "chargePeople":this.formData.chargePeople,
        "deviceStatusVO": {
          //"device": this.id,
          "name": this.formData.deviceStatus,
        },
      }
      api.update_device(data,this.id).then((response) => {
        this.$message.success("修改成功！");
      });
    },

    //实验室下拉框
    // getClassSelection(){
    //   console.log("获取实验室下拉框")
    //   api.classrooms().then( res => {
    //     //实验室列表
    //     this.classrooms=[]
    //     for(var i=0;i<res._embedded.classrooms.length;i++)
    //     {
    //       var temp=res._embedded.classrooms[i]._links.self.href.split("/")
    //       var classroom_id=temp[temp.length-1]
    //       this.classrooms.push({label:res._embedded.classrooms[i].name,value:classroom_id})
    //     }
    //     //console.log(this.classrooms)
    //   })
    // },
  },
};
</script>
