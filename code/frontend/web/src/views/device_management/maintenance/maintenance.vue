<template>
  
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="请输入搜索关键词" style="width: 600px;" class="filter-item" v-model="temp.keyword"/>
      <el-button  class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search" @click="refresh()">
        搜索
      </el-button>
      <el-button  class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="resetOption()">
        重置
      </el-button>

      <el-button  class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-upload2" @click="dialogTableVisible3 = true;">
        上传规程
      </el-button>

      <!--el-upload
        class="filter-item"
        style="margin-left: 10px;"
        
        :file-list="filelist"
        :limit="1"
        :show-file-list = "false"
        >
        <el-button type="primary" icon="el-icon-upload2" @click="upload_test">pdf上传</el-button>
      </el-upload-->

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

    <el-dialog title="上传规程" :visible.sync="dialogTableVisible3" center @close='closeDialog'>
      <input type="file" ref="clearFile" @change="getFile($event)" class="add-file-right-input" accept=".docx,.doc,.pdf" style="margin-left: 5%">
      <div></div>
      <el-button  class="filter-item" style="margin-left: 80%; margin-top: 20px; width: 20%" type="primary" icon="el-icon-upload2" @click="submitAddFile()">
        上传
      </el-button>
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

      <a href="https://yz.tongji.edu.cn/2022geyuanxijieshoutuimianshenggongzuolianxirenjijieshoucailiaoqingdan.pdf" download>预览一个pdf</a>
    </el-dialog>

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

    <el-table
      
      empty-text="没有数据了哦"
      :data="list"
      border
      :row-class-name="tableRowClassName"
      highlight-current-row
      style="width: 100%;"
      
    >
      <el-table-column label="序号" align="center" width="80">
        <template slot-scope="scope">
          {{(currentPage - 1)*pageSize + scope.$index + 1}}
        </template>
      </el-table-column>

      <el-table-column label="实训室名称" align="center" property="re_classroomName"></el-table-column>

      <el-table-column label="设备" align="center" property="re_deviceName"></el-table-column>

      <el-table-column label="周期" align="center" property="re_period"></el-table-column>

      <el-table-column label="维护时间" property="re_time"></el-table-column>

      <el-table-column label="维保人员" align="center" property="re_peopleName"></el-table-column>

      <!--el-table-column label="预计维修日期" align="center" property="reminderDay"></el-table-column-->

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
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

    <el-row>
      <el-pagination
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="totalPage"
        layout="prev, pager, next"
        class="pagination"
        @current-change="pagingCurrentChange"
      />
      
    </el-row>

  </div>
</template>

<style>
.el-table .hidden-row {
  display:none;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>

<script>
import * as api from '@/api/device/device_2.js'
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
      dialogTableVisible3:false,

      now_num:0,

      shixunshi_Options:[],
      shebei_Options:[],
      zhouqi_Options:[],
      weihushijian_Options:[],
      weihurenyuan_Options:[],

      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],

      temp: {
        classroom:"",
        device:"",
        period:"",
        user:"",
        keyword:"",
        page:0,
        size:15
      },

      pageSize: 15,
      totalPage: 35,
      currentPage: 1,
      maxPage:2,

      filelist:[],
      formData:new FormData(),
      file:"",

      addArr:[]
      
    }
  },
  created() {
    //console.log("大傻逼"+process.env.VUE_APP_BASE_AP);

    api.listMaintenance(
      this.temp
    ).then((res)=>{
      this.list=res._embedded.workSheets;
      this.pageSize = this.temp.size;

      this.totalPage = res.page.totalElements;
      this.currentPage = res.page.number + 1;
      this.maxPage = res.page.totalPage;
      //console.log(res);
    }).catch((error)=>{
      console.log("1231231231");
      console.log(error);
      this.list = [];
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
    });

  },
  methods: {
    closeDialog(){
      this.dialogTableVisible1 = false;
      this.dialogTableVisible2 = false;
      this.dialogTableVisible3 = false;
    },

    downloadFile(){
      axios({
        method: 'get',
        url: "http://10.8.0.1:9000/tms/2022/01/05/0b5020d5-b575-4703-a523-e4978899dfc6.jpg", // 请求地址
        responseType: 'blob' // 表明返回服务器返回的数据类型
      }).then(
        response => {
        console.log("下载响应",response)
        //resolve(response);
        let blob = new Blob([response.data], {
          type: 'application/vnd.ms-excel'
        })
        let fileName = "test1.jpg"
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
      });
    },

    onDownLoad(){
      this.downloadFile();
    },

    pagingCurrentChange(val) {
      this.temp.page = this.currentPage - 1;

      api.listMaintenance(
        this.temp
      ).then((res)=>{
        this.list=res._embedded.workSheets;

        this.totalPage = res.page.totalElements;
        this.currentPage = res.page.number + 1;
        this.maxPage = res.page.totalPage;
        //console.log(res);
      }).catch((error)=>{
        this.$message({
            message: '没有检索到维修信息',
            type: 'warning'
        });
      });
    },

    /*handleFileChange (e) {
      console.log(this.filelist);
      let inputDOM = this.filelist[0].name;
      this.file = inputDOM.files[0];// 通过DOM取文件数据
      //let size = Math.floor(this.file.size / 1024);//计算文件的大小　
      this.formData=new FormData();//new一个formData事件
      this.formData.append("file",this.file);
    },

    upload_test(){
      this.handleFileChange();

      console.log("this.filelist");
      console.log(this.filelist);

      //console.log(this.formData);
      //console.log(this.file);

    },*/

    getFile(event){
      //console.log(event);
           var file = event.target.files;
           for(var i = 0;i<file.length;i++){
            //    上传类型判断
               var imgName = file[i].name;
                var idx = imgName.lastIndexOf(".");  
                if (idx != -1){
                    var ext = imgName.substr(idx+1).toUpperCase();   
                    ext = ext.toLowerCase( ); 
                     if (ext!='pdf' && ext!='doc' && ext!='docx'){
                      this.$message({
                        type: 'info',
                        message: '您选择的文件格式不正确'
                      });
                    }else{
                        this.addArr.push(file[i]);
                    }   
                }
           }
      console.log(this.addArr);
    },

    submitAddFile(){
           if(0 == this.addArr.length){
             this.$message({
               type: 'info',
               message: '请选择要上传的文件'
             });
             return;
           }

            var formData = new FormData();
            formData.append('num', 1);
            formData.append('linkId', 1);
            formData.append('rfilename', "文件上传");
            console.log(this.addArr[0]);

            formData.append('file',this.addArr[0], "测试上传.pdf");

            console.log(formData);



          axios({
            url: 'http://10.8.0.1:8080/device/protocols/upload',
            method: 'post',
            headers:{
              "Content-Type":"multipart/form-data; boundary=<calculated when request is sent>",
            },
            data: formData
          })

          //api.upload_pdf(formData)
          /*let config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          };
          axios.post('http://10.8.0.1:8080/device/protocols/upload',formData,config)*/
            .then((response) => {
                console.log(response);
                if(response.data.info=="success"){this.$message({
                        type: 'success',
                        message: '附件上传成功!'
                    });
                }
          }).catch((err) => {
            console.log("完蛋了");
            console.log(err);
          })
    },

    previewPDF(index){
      //this.$message.error("pdf预览功能尚未实现~");
      this.dialogTableVisible2 = true; 
      this.now_num=scope.row.xuhao-1;
    },

    show_details(scope){
      //console.log(scope);
      this.dialogTableVisible1 = true; 
      this.now_num=scope.$index;
    },

    refresh(){
      this.temp.page = 0;

      api.listMaintenance(
        this.temp
      ).then((res)=>{

        this.totalPage = res.page.totalElements;
        this.currentPage = res.page.number + 1;
        this.maxPage = res.page.totalPage;

        this.list=res._embedded.workSheets;
      }).catch((error)=>{
        this.$message({
            message: '上述检索条件不存在维修信息',
            type: 'warning'
        });
        this.list=[];
      });
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


    resetOption(){
      this.temp.classroom="";
      this.temp.device="";
      this.temp.period="";
      this.temp.time="";
      this.temp.user="";
      this.temp.keyword="";
      this.temp.page = 0;

      api.listMaintenance(
        this.temp
      ).then((res)=>{

        this.totalPage = res.page.totalElements;
        this.currentPage = res.page.number + 1;
        this.maxPage = res.page.totalPage;

        this.list=res._embedded.workSheets;
        //console.log(this.list);
      }).catch((error)=>{
        this.$message({
            message: '没有检索到维修信息',
            type: 'warning'
        });
      });
    }
  }
}
</script>