<template>
  
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="Message" style="width: 800px;" class="filter-item"/>
      <el-button v-waves class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search">
        Search
      </el-button>
      <el-button v-waves class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
        Reset
      </el-button>
      <br/>
      <el-select placeholder="实训室" clearable style="width: 150px" class="filter-item" @change="refresh">
        <el-option v-for="item in shixunshi_Options" :key="item" :label="item.display_name" :value="item.key" />
      </el-select>
      &nbsp;
      <el-select placeholder="设备" clearable style="width: 150px" class="filter-item">
        <el-option v-for="item in shebei_Options" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      &nbsp;
      <el-select placeholder="周期" clearable style="width: 150px" class="filter-item">
        <el-option v-for="item in zhouqi_Options" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      &nbsp;
      <el-select placeholder="维护时间" clearable style="width: 150px" class="filter-item">
        <el-option v-for="item in weihushijian_Options" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      &nbsp;
      <el-select placeholder="维保人员" clearable style="width: 250px" class="filter-item">
        <el-option v-for="item in weihurenyuan_Options" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      &nbsp;
    </div>

    <el-dialog title="详细信息" :visible.sync="dialogTableVisible1">
      <el-form label-position="left" label-width="180px" style="margin-left: 10%;">
        <el-form-item label="实训室名称">
          <label style="font-weight:normal;">{{list[now_num].shixunshi}}</label>
        </el-form-item>
        <el-form-item label="设备">
          <label style="font-weight:normal;">{{list[now_num].shebei}}</label>
        </el-form-item>
        <el-form-item label="周期">
           <label style="font-weight:normal;">{{list[now_num].zhouqi}}</label>
        </el-form-item>
        <el-form-item label="维护时间">
          <label style="font-weight:normal;">{{list[now_num].weihushijian}}</label>
        </el-form-item>
        <el-form-item label="维保人员">
          <label style="font-weight:normal;">{{list[now_num].weihurenyuan}}</label>
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
      <el-table-column label="序号" prop="xuhao" sortable align="center" style="width: 5%">
        <template slot-scope="{row}">
          <span>{{ row.xuhao }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实训室名称" style="width: 20%" align="center"
        :filters="[
          {text:'实训室1',value:1},
          {text:'实训室2',value:2},
          {text:'实训室3',value:3},
          {text:'实训室4',value:4},
        ]"
        :filter-method="filterHandler_1"
        column-key="shixunshi_key" prop="shixunshi_key">
        <template slot-scope="{row}">
          <span>{{ row.shixunshi}}</span>
        </template>
      </el-table-column>

      <el-table-column label="设备" style="width: 15%"
      :filters="[
          {text:'1号设备',value:1},
          {text:'2号设备',value:2},
          {text:'3号设备',value:3},
          {text:'4号设备',value:4},
        ]"
        :filter-method="filterHandler_2"
        column-key="shebei_key" prop="shebei_key">
        <template slot-scope="{row}">
          <span>{{ row.shebei }}</span>
        </template>
      </el-table-column>

      <el-table-column label="周期" style="width: 15%" align="center"
      :filters="[
          {text:'周期一',value:1},
          {text:'周期二',value:2},
          {text:'周期三',value:3},
          {text:'周期四',value:4},
        ]"
        :filter-method="filterHandler_3"
        column-key="zhouqi_key" prop="zhouqi_key">
        <template slot-scope="{row}">
          <span>{{ row.zhouqi}}</span>
        </template>
      </el-table-column>

      <el-table-column label="维护时间" style="width: 15%"
      :filters="[
          {text:'2021-01-01',value:1},
          {text:'2021-04-01',value:2},
          {text:'2021-07-01',value:3},
          {text:'2021-10-01',value:4},
        ]"
        :filter-method="filterHandler_4"
        column-key="weihushijian_key" prop="weihushijian_key">
        <template slot-scope="{row}">
          <span>{{ row.weihushijian }}</span>
        </template>
      </el-table-column>

      <el-table-column label="维保人员" align="center" style="width: 15%"
      :filters="[
          {text:'维护人员001',value:1},
          {text:'维护人员002',value:2},
          {text:'维护人员003',value:3},
          {text:'维护人员004',value:4},
        ]"
        :filter-method="filterHandler_5"
        column-key="weihurenyuan_key" prop="weihurenyuan_key">
        <template slot-scope="{row}">
          <span>{{ row.weihurenyuan }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" style="width: 15%" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="safe" @click="dialogTableVisible1 = true; now_num=scope.row.xuhao-1;">
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

// const calendarTypeOptions = [
//   { key: 'CN', display_name: 'China' },
//   { key: 'US', display_name: 'USA' },
//   { key: 'JP', display_name: 'Japan' },
//   { key: 'EU', display_name: 'Eurozone' }
// ]

// // arr to obj, such as { CN : "China", US : "USA" }
// const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
//   acc[cur.key] = cur.display_name
//   return acc
// }, {})

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
      pdf
  },
  data() {
    return {
      tableKey: 0,
      list: [
        {xuhao:1,shixunshi_key:3,shixunshi:"实训室3",shebei_key:3,shebei:"3号设备",zhouqi_key:1,zhouqi:"周期一",weihushijian_key:3,weihushijian:"2021-07-01",weihurenyuan_key:4,weihurenyuan:"维护人员004"},
        {xuhao:2,shixunshi_key:4,shixunshi:"实训室4",shebei_key:4,shebei:"4号设备",zhouqi_key:2,zhouqi:"周期二",weihushijian_key:3,weihushijian:"2021-07-01",weihurenyuan_key:3,weihurenyuan:"维护人员003"},
        {xuhao:3,shixunshi_key:4,shixunshi:"实训室4",shebei_key:4,shebei:"4号设备",zhouqi_key:4,zhouqi:"周期四",weihushijian_key:1,weihushijian:"2021-01-01",weihurenyuan_key:3,weihurenyuan:"维护人员003"},
        {xuhao:4,shixunshi_key:3,shixunshi:"实训室3",shebei_key:3,shebei:"3号设备",zhouqi_key:3,zhouqi:"周期三",weihushijian_key:1,weihushijian:"2021-01-01",weihurenyuan_key:2,weihurenyuan:"维护人员002"},
        {xuhao:5,shixunshi_key:2,shixunshi:"实训室2",shebei_key:4,shebei:"4号设备",zhouqi_key:3,zhouqi:"周期三",weihushijian_key:3,weihushijian:"2021-07-01",weihurenyuan_key:2,weihurenyuan:"维护人员002"},
        {xuhao:6,shixunshi_key:4,shixunshi:"实训室4",shebei_key:4,shebei:"4号设备",zhouqi_key:3,zhouqi:"周期三",weihushijian_key:3,weihushijian:"2021-07-01",weihurenyuan_key:1,weihurenyuan:"维护人员001"},
        {xuhao:7,shixunshi_key:1,shixunshi:"实训室1",shebei_key:3,shebei:"3号设备",zhouqi_key:4,zhouqi:"周期四",weihushijian_key:1,weihushijian:"2021-01-01",weihurenyuan_key:3,weihurenyuan:"维护人员003"},
        {xuhao:8,shixunshi_key:3,shixunshi:"实训室3",shebei_key:1,shebei:"1号设备",zhouqi_key:4,zhouqi:"周期四",weihushijian_key:3,weihushijian:"2021-07-01",weihurenyuan_key:1,weihurenyuan:"维护人员001"},
        {xuhao:9,shixunshi_key:4,shixunshi:"实训室4",shebei_key:4,shebei:"4号设备",zhouqi_key:1,zhouqi:"周期一",weihushijian_key:4,weihushijian:"2021-10-01",weihurenyuan_key:1,weihurenyuan:"维护人员001"},
        {xuhao:10,shixunshi_key:3,shixunshi:"实训室3",shebei_key:2,shebei:"2号设备",zhouqi_key:1,zhouqi:"周期一",weihushijian_key:1,weihushijian:"2021-01-01",weihurenyuan_key:4,weihurenyuan:"维护人员004"},
        {xuhao:11,shixunshi_key:3,shixunshi:"实训室3",shebei_key:2,shebei:"2号设备",zhouqi_key:3,zhouqi:"周期三",weihushijian_key:3,weihushijian:"2021-07-01",weihurenyuan_key:1,weihurenyuan:"维护人员001"},
        {xuhao:12,shixunshi_key:1,shixunshi:"实训室1",shebei_key:3,shebei:"3号设备",zhouqi_key:1,zhouqi:"周期一",weihushijian_key:2,weihushijian:"2021-04-01",weihurenyuan_key:4,weihurenyuan:"维护人员004"},
        {xuhao:13,shixunshi_key:2,shixunshi:"实训室2",shebei_key:3,shebei:"3号设备",zhouqi_key:3,zhouqi:"周期三",weihushijian_key:2,weihushijian:"2021-04-01",weihurenyuan_key:1,weihurenyuan:"维护人员001"},
        {xuhao:14,shixunshi_key:3,shixunshi:"实训室3",shebei_key:4,shebei:"4号设备",zhouqi_key:4,zhouqi:"周期四",weihushijian_key:4,weihushijian:"2021-10-01",weihurenyuan_key:1,weihurenyuan:"维护人员001"},
        {xuhao:15,shixunshi_key:1,shixunshi:"实训室1",shebei_key:2,shebei:"2号设备",zhouqi_key:2,zhouqi:"周期二",weihushijian_key:3,weihushijian:"2021-07-01",weihurenyuan_key:2,weihurenyuan:"维护人员002"},
        {xuhao:16,shixunshi_key:3,shixunshi:"实训室3",shebei_key:3,shebei:"3号设备",zhouqi_key:3,zhouqi:"周期三",weihushijian_key:2,weihushijian:"2021-04-01",weihurenyuan_key:4,weihurenyuan:"维护人员004"},
        {xuhao:17,shixunshi_key:1,shixunshi:"实训室1",shebei_key:4,shebei:"4号设备",zhouqi_key:3,zhouqi:"周期三",weihushijian_key:3,weihushijian:"2021-07-01",weihurenyuan_key:3,weihurenyuan:"维护人员003"},
        {xuhao:18,shixunshi_key:3,shixunshi:"实训室3",shebei_key:1,shebei:"1号设备",zhouqi_key:3,zhouqi:"周期三",weihushijian_key:3,weihushijian:"2021-07-01",weihurenyuan_key:3,weihurenyuan:"维护人员003"},
        {xuhao:19,shixunshi_key:4,shixunshi:"实训室4",shebei_key:4,shebei:"4号设备",zhouqi_key:1,zhouqi:"周期一",weihushijian_key:3,weihushijian:"2021-07-01",weihurenyuan_key:2,weihurenyuan:"维护人员002"},
        {xuhao:20,shixunshi_key:3,shixunshi:"实训室3",shebei_key:4,shebei:"4号设备",zhouqi_key:3,zhouqi:"周期三",weihushijian_key:2,weihushijian:"2021-04-01",weihurenyuan_key:4,weihurenyuan:"维护人员004"},
        {xuhao:21,shixunshi_key:2,shixunshi:"实训室2",shebei_key:3,shebei:"3号设备",zhouqi_key:2,zhouqi:"周期二",weihushijian_key:1,weihushijian:"2021-01-01",weihurenyuan_key:3,weihurenyuan:"维护人员003"},
        {xuhao:22,shixunshi_key:3,shixunshi:"实训室3",shebei_key:3,shebei:"3号设备",zhouqi_key:3,zhouqi:"周期三",weihushijian_key:2,weihushijian:"2021-04-01",weihurenyuan_key:1,weihurenyuan:"维护人员001"},
        {xuhao:23,shixunshi_key:3,shixunshi:"实训室3",shebei_key:4,shebei:"4号设备",zhouqi_key:2,zhouqi:"周期二",weihushijian_key:3,weihushijian:"2021-07-01",weihurenyuan_key:1,weihurenyuan:"维护人员001"},
        {xuhao:24,shixunshi_key:3,shixunshi:"实训室3",shebei_key:1,shebei:"1号设备",zhouqi_key:4,zhouqi:"周期四",weihushijian_key:4,weihushijian:"2021-10-01",weihurenyuan_key:3,weihurenyuan:"维护人员003"},
        {xuhao:25,shixunshi_key:2,shixunshi:"实训室2",shebei_key:3,shebei:"3号设备",zhouqi_key:2,zhouqi:"周期二",weihushijian_key:4,weihushijian:"2021-10-01",weihurenyuan_key:1,weihurenyuan:"维护人员001"},
        {xuhao:26,shixunshi_key:2,shixunshi:"实训室2",shebei_key:3,shebei:"3号设备",zhouqi_key:4,zhouqi:"周期四",weihushijian_key:1,weihushijian:"2021-01-01",weihurenyuan_key:4,weihurenyuan:"维护人员004"},
        {xuhao:27,shixunshi_key:2,shixunshi:"实训室2",shebei_key:1,shebei:"1号设备",zhouqi_key:2,zhouqi:"周期二",weihushijian_key:4,weihushijian:"2021-10-01",weihurenyuan_key:2,weihurenyuan:"维护人员002"},
        {xuhao:28,shixunshi_key:4,shixunshi:"实训室4",shebei_key:3,shebei:"3号设备",zhouqi_key:4,zhouqi:"周期四",weihushijian_key:4,weihushijian:"2021-10-01",weihurenyuan_key:2,weihurenyuan:"维护人员002"},
        {xuhao:29,shixunshi_key:1,shixunshi:"实训室1",shebei_key:2,shebei:"2号设备",zhouqi_key:1,zhouqi:"周期一",weihushijian_key:4,weihushijian:"2021-10-01",weihurenyuan_key:4,weihurenyuan:"维护人员004"},
        {xuhao:30,shixunshi_key:2,shixunshi:"实训室2",shebei_key:2,shebei:"2号设备",zhouqi_key:4,zhouqi:"周期四",weihushijian_key:2,weihushijian:"2021-04-01",weihurenyuan_key:4,weihurenyuan:"维护人员004"},
      ],
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
      shixunshi_Options:[
        {key:1,display_name:"实训室1"},
        {key:2,display_name:"实训室2"},
        {key:3,display_name:"实训室3"},
        {key:4,display_name:"实训室4"}
      ],
      shebei_Options:[
        {key:1,display_name:"1号设备"},
        {key:2,display_name:"2号设备"},
        {key:3,display_name:"3号设备"},
        {key:4,display_name:"4号设备"}
      ],
      zhouqi_Options:[
        {key:1,display_name:"周期一"},
        {key:2,display_name:"周期二"},
        {key:3,display_name:"周期三"},
        {key:4,display_name:"周期四"}
      ],
      weihushijian_Options:[
        {key:1,display_name:"2021-01-01"},
        {key:2,display_name:"2021-04-01"},
        {key:3,display_name:"2021-07-01"},
        {key:4,display_name:"2021-10-01"}
      ],
      weihurenyuan_Options:[
        {key:1,display_name:"维护人员001"},
        {key:2,display_name:"维护人员002"},
        {key:3,display_name:"维护人员003"},
        {key:4,display_name:"维护人员004"}
      ],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    //this.getList()
  },
  methods: {
    tableRowClassName({row,index}){
      var sp=true;
      if(!this.listQuery.shixunshi_key===-1){
        if(!row.shixunshi_key===this.listQuery.shixunshi_key){
          return 'hidden-row';
        }
      }
      
      return '';
    },

    onDownLoad() {
      this.download1(this.pdfsrc,"我也不知道这儿下载了个什么东西.pdf");
    },

    download1 (data,fileName) {
        if (!data) {
            return
        }
        let url = window.URL.createObjectURL(new Blob([data]));
        let link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
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

    filterHandler_1(value, row, column) {
        return row.shixunshi_key === value;
    },
    filterHandler_2(value, row, column) {
        return row.shebei_key === value;
    },
    filterHandler_3(value, row, column) {
        return row.zhouqi_key === value;
    },
    filterHandler_4(value, row, column) {
        return row.weihushijian_key === value;
    },
    filterHandler_5(value, row, column) {
        return row.weihurenyuan_key === value;
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
