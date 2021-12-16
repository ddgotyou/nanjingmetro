<template>
  
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="Message" style="width: 800px;" class="filter-item" v-model="temp.keyword"/>
      <el-button v-waves class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search" @click="refresh()">
        Search
      </el-button>
      <el-button v-waves class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="resetOption()">
        Reset
      </el-button>
      <!-- input type="file" id="fileExport" @change="handleFileChange()" ref="inputer">
      <el-button v-waves class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="upload_test()">
        上传测试
      </el-button-->
      <br/>
      <el-select placeholder="实训室" clearable style="width: 150px" class="filter-item" @change="refresh()" v-model="temp.classroom">
        <el-option v-for="item in shixunshi_Options" :key="item" :label="item" :value="item" />
      </el-select>
      &nbsp;
      <el-select placeholder="设备" clearable style="width: 150px" class="filter-item" @change="refresh()" v-model="temp.device">
        <el-option v-for="item in shebei_Options" :key="item" :label="item" :value="item" />
      </el-select>
      &nbsp;
      <el-select placeholder="周期" clearable style="width: 150px" class="filter-item" @change="refresh()" v-model="temp.period">
        <el-option v-for="item in zhouqi_Options" :key="item" :label="item" :value="item" />
      </el-select>
      &nbsp;

      <el-select placeholder="维保人员" clearable style="width: 250px" class="filter-item" @change="refresh()" v-model="temp.user">
        <el-option v-for="item in weihurenyuan_Options" :key="item" :label="item" :value="item" />
      </el-select>
      &nbsp;
    </div>

    <el-dialog title="详细信息" :visible.sync="dialogTableVisible1">
      <el-form label-position="left" label-width="180px" style="margin-left: 10%;">
        <el-form-item label="实训室名称">
          <label style="font-weight:normal;">classroom123</label>
        </el-form-item>
        <el-form-item label="设备id">
          <label style="font-weight:normal;">{{this.list[this.now_num].re_device}}</label>
        </el-form-item>
        <el-form-item label="设备名称">
          <label style="font-weight:normal;">{{this.list[this.now_num].re_deviceName}}</label>
        </el-form-item>
        <el-form-item label="周期">
           <label style="font-weight:normal;">{{this.list[this.now_num].re_period}}</label>
        </el-form-item>
        <el-form-item label="维护时间">
          <label style="font-weight:normal;">{{this.list[this.now_num].re_time}}</label>
        </el-form-item>
        <el-form-item label="维保人员id">
          <label style="font-weight:normal;">{{this.list[this.now_num].re_people}}</label>
        </el-form-item>
        <el-form-item label="维保人员">
          <label style="font-weight:normal;">{{this.list[this.now_num].re_peopleName}}</label>
        </el-form-item>
        <el-form-item label="规程名">
          <label style="font-weight:normal;">{{this.list[this.now_num].re_ruleName}}</label>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="规程概览" :visible.sync="dialogTableVisible2" center @close='closeDialog'>
      <!--div style="margin-bottom: 15px; text-align: right">
          <el-button type="primary" size="small" @click.stop="previousPage">
            上一页
          </el-button>
          <el-button type="primary" size="small" @click.stop="nextPage">
          下一页
          </el-button>
      <span>当前第{{pdfPage}}页 / 共{{pageCount}}页</span>
      </div-->
      测试一下：{{pdfsrc}}
      <template>
        <pdf
          :src="pdfsrc"
        ></pdf>
      </template>

      <a href="https://yz.tongji.edu.cn/2022geyuanxijieshoutuimianshenggongzuolianxirenjijieshoucailiaoqingdan.pdf" download>这里是个凑活能用的东西</a>
    </el-dialog>

    <el-table
      
      empty-text="没有数据了哦"
      :data="list"
      border
      :row-class-name="tableRowClassName"
      highlight-current-row
      style="width: 100%;"
      
    >
      <el-table-column label="序号" type="index" sortable align="center" style="width: 5%"></el-table-column>

      <el-table-column label="实训室名称" style="width: 20%" align="center" property="re_classroomName">classroom123</el-table-column>

      <el-table-column label="设备" style="width: 15%" align="center" property="re_deviceName"></el-table-column>

      <el-table-column label="周期" style="width: 15%" align="center" property="re_period"></el-table-column>

      <el-table-column label="维护时间" style="width: 15%" property="re_time"></el-table-column>

      <el-table-column label="维保人员" align="center" style="width: 15%" property="re_peopleName"></el-table-column>

      <el-table-column label="预计维修日期" align="center" style="width: 15%" property="reminderDay"></el-table-column>

      <el-table-column label="操作" align="center" style="width: 15%" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="safe" @click="show_details(scope)">
            详情
          </el-button>
          <el-button size="mini" type="safe" @click="previewPDF(scope)">
            查看规程
          </el-button>
          <el-button size="mini" type="safe" @click="onDownLoad();">
            下载规程
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<style>
.el-table .hidden-row {
  display:none;
}
</style>

<script>
import pdf from 'vue-pdf'
import api from '@/api/device/device_2.js'
import axios from 'axios'

export default { 
  name: 'ComplexTable',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  components: {
      pdf,
      api,
      axios
  },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        list:'',
      },
      dialogTableVisible1:false,
      dialogTableVisible2:false,
        pdfsrc: "https://yz.tongji.edu.cn/2022geyuanxijieshoutuimianshenggongzuolianxirenjijieshoucailiaoqingdan.pdf",
        //pdfsrc:"https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00016-3.jpg",
        pdfPage : 1,
        pageCount: 0,
      now_num:0,

      shixunshi_Options:[],
      shebei_Options:[],
      zhouqi_Options:[],
      weihushijian_Options:[],
      weihurenyuan_Options:[],

      //formData,
      //file,

      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],

      temp: {
        classroom:"",
        device:"",
        period:"",
        user:"",
        keyword:""
      },
      
    }
  },
  created() {
    api.listMaintenance(
      this.temp
    ).then((res)=>{
      this.list=res._embedded.workSheets;
      console.log(this.list);
    }).catch((error)=>{
      this.$message({
          message: '没有检索到维修信息',
          type: 'warning'
      });
    });

    api.listOption().then((res)=>{
      this.shixunshi_Options=res.classroomList;
      this.shebei_Options=res.deviceList;
      this.zhouqi_Options=res.periodList;
      this.weihushijian_Options=res.timeList;
      this.weihurenyuan_Options=res.userList;
    })
  },
  methods: {
    downloadFile(){
        this.$message.error("pdf下载功能尚未实现~");
        /*return new Promise((resolve, reject) => {
          // console.log(`${url} 请求数据，参数=>`, JSON.stringify(options))
          // axios.defaults.headers['content-type'] = 'application/json;charset=UTF-8'
          axios({
            method: 'post',
            url: "http://localhost:9002/protocols/download?fileName=test1.pdf", // 请求地址
            responseType: 'blob' // 表明返回服务器返回的数据类型
          }).then(
            response => {
              //console.log("下载响应",response)
              resolve(response.data)
              let blob = new Blob([response.data], {
                type: 'application/vnd.ms-excel'
              })
              // console.log(blob)
              // let fileName = Date.parse(new Date()) + '.xlsx'
              // 切割出文件名
              //let fileNameEncode = response.headers['content-disposition'].split("filename=")[1];
              // 解码
              let fileName = "test1.pdf"
              // console.log("fileName",fileName)
              if (window.navigator.msSaveOrOpenBlob) {
                // console.log(2)
                navigator.msSaveBlob(blob, fileName)
              } else {
                // console.log(3)
                var link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = fileName
                link.click()
                //释放内存
                window.URL.revokeObjectURL(link.href)
              }
            },
            err => {
              reject(err)
            }
          )
        })*/
      },

    tableRowClassName({row,index}){
      var sp=true;
      if(!this.listQuery.shixunshi_key===-1){
        if(!row.shixunshi_key===this.listQuery.shixunshi_key){
          return 'hidden-row';
        }
      }
      
      return '';
    },

    show_details(scope){
      //console.log(scope);
      this.dialogTableVisible1 = true; 
      this.now_num=scope.$index;
    },

    refresh(){
      api.listMaintenance(
        this.temp
      ).then((res)=>{
        console.log("dashabi");
        console.log(res);
        this.list=res._embedded.workSheets;
        //console.log(this.list);
      }).catch((error)=>{
        this.$message({
            message: '上述检索条件不存在维修信息',
            type: 'warning'
        });
        this.list=[];
      });
    },

    resetOption(){
      this.temp.classroom="";
      this.temp.device="";
      this.temp.period="";
      this.temp.time="";
      this.temp.user="";
      this.temp.keyword="";

      api.listMaintenance(
        this.temp
      ).then((res)=>{
        this.list=res._embedded.workSheets;
        //console.log(this.list);
      }).catch((error)=>{
        this.$message({
            message: '没有检索到维修信息',
            type: 'warning'
        });
      });
    },


    onDownLoad() {
      this.download1(this.pdfsrc,"我也不知道这儿下载了个什么东西.pdf");
    },

    download1 (data,fileName) {
        this.downloadFile();
    },

    handleFileChange (e) {
      let inputDOM = this.$refs.inputer;
      this.file = inputDOM.files[0];// 通过DOM取文件数据
      let size = Math.floor(this.file.size / 1024);//计算文件的大小　
      this.formData=new FormData();//new一个formData事件
      this.formData.append("file",this.file);
　　},

    upload_test(){
      console.log(this.formData);
      console.log(this.file);

      /*let params = this.formData;

        axios.post('http://localhost:9002/protocols/upload', {files: params}, {headers: {'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'}}).then(res => {
          console.log(res);
        }).catch(error => {
          alert('更新用户数据失败' + error)
        })*/



      //axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
      this.$http({
        method: 'post',
        url:'http://localhost:9002/protocols/upload',
        headers:{
          "Content-Type":"multipart/form-data; boundary=<calculated when request is sent>",
        },
        files:this.formData, //在此处上传文件
        }).then(function(res){
            console.log(res,"此处应该是请求成功的回调")　　
        })

    },

    previewPDF(scope){
      //this.pdfsrc = pdf.createLoadingTask(this.pdfsrc)
      //this.pdfsrc = pdf.createLoadingTask("https://yz.tongji.edu.cn/2022geyuanxijieshoutuimianshenggongzuolianxirenjijieshoucailiaoqingdan.pdf");
      this.dialogTableVisible2 = true; 
      this.now_num=scope.row.xuhao-1;

    },

    closeDialog(){
      this.pdfPage = 1;
    },

    //PDF改变页数
    previousPage(){
      var p = this.pdfPage
      p = p>1?p-1:this.pageCount
      this.pdfPage = p
    },

    nextPage(){
      var p = this.pdfPage
      p = p<this.pageCount?p+1:1
      this.pdfPage = p
    },

    // handleFilter() {
    //   this.listQuery.page = 1
    //   this.getList()
    // },
    // handleModifyStatus(row, status) {
    //   this.$message({
    //     message: '操作Success',
    //     type: 'success'
    //   })
    //   row.status = status
    // },
    // sortChange(data) {
    //   const { prop, order } = data
    //   if (prop === 'id') {
    //     this.sortByID(order)
    //   }
    // },
    // sortByID(order) {
    //   if (order === 'ascending') {
    //     this.listQuery.sort = '+id'
    //   } else {
    //     this.listQuery.sort = '-id'
    //   }
    //   this.handleFilter()
    // },
    // resetTemp() {
    //   this.temp = {
    //     id: undefined,
    //     importance: 1,
    //     remark: '',
    //     timestamp: new Date(),
    //     title: '',
    //     status: 'published',
    //     type: ''
    //   }
    // },
    // handleCreate() {
    //   this.resetTemp()
    //   this.dialogStatus = 'create'
    //   this.dialogFormVisible = true
    //   this.$nextTick(() => {
    //     this.$refs['dataForm'].clearValidate()
    //   })
    // },

    // handleUpdate(row) {
    //   this.temp = Object.assign({}, row) // copy obj
    //   this.temp.timestamp = new Date(this.temp.timestamp)
    //   this.dialogStatus = 'update'
    //   this.dialogFormVisible = true
    //   this.$nextTick(() => {
    //     this.$refs['dataForm'].clearValidate()
    //   })
    // },
    // handleDelete(row, index) {
    //   this.$notify({
    //     title: 'Success',
    //     message: 'Delete Successfully',
    //     type: 'success',
    //     duration: 2000
    //   })
    //   this.list.splice(index, 1)
    // },
    // formatJson(filterVal) {
    //   return this.list.map(v => filterVal.map(j => {
    //       return v[j]
    //   }))
    // },
    // getSortClass: function(key) {
    //   const sort = this.listQuery.sort
    //   return sort === `+${key}` ? 'ascending' : 'descending'
    // }
  }
}
</script>