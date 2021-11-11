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
      <el-select placeholder="状态" clearable style="width: 150px" class="filter-item">
        <el-option v-for="item in zhuangtai_Options" :key="item.key" :label="item.display_name" :value="item.key" />
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
        <el-form-item label="状态">
          <label v-if="list[now_num].zhuangtai_key==1" style="font-weight:normal; color:green;">{{list[now_num].zhuangtai}}</label>
          <label v-if="list[now_num].zhuangtai_key==2" style="font-weight:normal; color:red;">{{list[now_num].zhuangtai}}</label>
          <label v-if="list[now_num].zhuangtai_key==3" style="font-weight:normal; color:orange;">{{list[now_num].zhuangtai}}</label>
        </el-form-item>
        <el-form-item label="负责人">
          <label style="font-weight:normal;">{{list[now_num].fuzeren}}</label>
        </el-form-item>
        <el-form-item label="负责人联系方式">
          <label style="font-weight:normal;">{{list[now_num].lianxifangshi}}</label>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="设备状态修改" :visible.sync="dialogTableVisible2">
      <el-form label-position="left" label-width="180px" style="margin-left: 5%;">


        <label>请选择需要将 {{list[now_num].shixunshi}} 中的 {{list[now_num].shebei}} 修改为的状态</label>
        <div style="margin-top:5%"></div>
        <el-select v-model="temp_statue" style="margin-left: 5%;">
          <el-option
            v-for="item in zhuangtai_Options"
            :key="item.key"
            :label="item.display_name"
            :value="item.key">
          </el-option>
        </el-select>

        <div style="margin-top:5%;"></div>
        
          <el-button type="primary" @click="change_this()">确认修改</el-button>
          <el-button @click="dialogTableVisible2 = false;">取消</el-button>
        
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

      <el-table-column label="状态" style="width: 15%" align="center"
      :filters="[
          {text:'正常',value:1},
          {text:'故障',value:2},
          {text:'占用',value:3}
        ]"
        :filter-method="filterHandler_3"
        column-key="zhuangtai_key" prop="zhuangtai_key">
        <template slot-scope="{row}">
          <span v-if="row.zhuangtai_key==1" style="color:green">{{ row.zhuangtai}}</span>
          <span v-if="row.zhuangtai_key==2" style="font-weight:bold;color:red;">{{ row.zhuangtai}}</span>
          <span v-if="row.zhuangtai_key==3" style="color:orange">{{ row.zhuangtai}}</span>
        </template>
      </el-table-column>

      <el-table-column label="负责人" style="width: 15%"
      :filters="[
          {text:'负责人001',value:1},
          {text:'负责人002',value:2},
          {text:'负责人003',value:3},
          {text:'负责人004',value:4},
        ]"
        :filter-method="filterHandler_4"
        column-key="fuzeren_key" prop="fuzeren_key">
        <template slot-scope="{row}">
          <span>{{ row.fuzeren }}</span>
        </template>
      </el-table-column>

      <el-table-column label="负责人联系方式" align="center" style="width: 15%"
        column-key="lianxifangshi_key" prop="lianxifangshi_key">
        <template slot-scope="{row}">
          <span>{{ row.lianxifangshi }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" style="width: 15%" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="safe" @click="dialogTableVisible1 = true; now_num=scope.row.xuhao-1;">
            详情
          </el-button>

            <el-button slot="reference" size="mini" type="safe" @click="change_it(scope);">
              报修
            </el-button>

          <el-button size="mini" type="safe" @click="dialogTableVisible2 = true; now_num=scope.row.xuhao-1; temp_statue=list[now_num].zhuangtai_key">
            修改状态
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
  data() {
    return {
      tableKey: 0,
      list: [
        {xuhao:1,shixunshi_key:2,shixunshi:"实训室2",shebei_key:1,shebei:"1号设备",zhuangtai_key:3,zhuangtai:"占用",fuzeren_key:3,fuzeren:"负责人003",lianxifangshi_key:3,lianxifangshi:"18900003333"},
        {xuhao:2,shixunshi_key:3,shixunshi:"实训室3",shebei_key:2,shebei:"2号设备",zhuangtai_key:1,zhuangtai:"正常",fuzeren_key:2,fuzeren:"负责人002",lianxifangshi_key:2,lianxifangshi:"18900002222"},
        {xuhao:3,shixunshi_key:2,shixunshi:"实训室2",shebei_key:4,shebei:"4号设备",zhuangtai_key:3,zhuangtai:"占用",fuzeren_key:4,fuzeren:"负责人004",lianxifangshi_key:4,lianxifangshi:"18900004444"},
        {xuhao:4,shixunshi_key:3,shixunshi:"实训室3",shebei_key:1,shebei:"1号设备",zhuangtai_key:3,zhuangtai:"占用",fuzeren_key:4,fuzeren:"负责人004",lianxifangshi_key:4,lianxifangshi:"18900004444"},
        {xuhao:5,shixunshi_key:4,shixunshi:"实训室4",shebei_key:1,shebei:"1号设备",zhuangtai_key:3,zhuangtai:"占用",fuzeren_key:2,fuzeren:"负责人002",lianxifangshi_key:2,lianxifangshi:"18900002222"},
        {xuhao:6,shixunshi_key:2,shixunshi:"实训室2",shebei_key:1,shebei:"1号设备",zhuangtai_key:3,zhuangtai:"占用",fuzeren_key:2,fuzeren:"负责人002",lianxifangshi_key:2,lianxifangshi:"18900002222"},
        {xuhao:7,shixunshi_key:1,shixunshi:"实训室1",shebei_key:3,shebei:"3号设备",zhuangtai_key:2,zhuangtai:"故障",fuzeren_key:1,fuzeren:"负责人001",lianxifangshi_key:1,lianxifangshi:"18900001111"},
        {xuhao:8,shixunshi_key:2,shixunshi:"实训室2",shebei_key:1,shebei:"1号设备",zhuangtai_key:1,zhuangtai:"正常",fuzeren_key:1,fuzeren:"负责人001",lianxifangshi_key:1,lianxifangshi:"18900001111"},
        {xuhao:9,shixunshi_key:3,shixunshi:"实训室3",shebei_key:4,shebei:"4号设备",zhuangtai_key:2,zhuangtai:"故障",fuzeren_key:4,fuzeren:"负责人004",lianxifangshi_key:4,lianxifangshi:"18900004444"},
        {xuhao:10,shixunshi_key:3,shixunshi:"实训室3",shebei_key:2,shebei:"2号设备",zhuangtai_key:2,zhuangtai:"故障",fuzeren_key:2,fuzeren:"负责人002",lianxifangshi_key:2,lianxifangshi:"18900002222"},
        {xuhao:11,shixunshi_key:3,shixunshi:"实训室3",shebei_key:3,shebei:"3号设备",zhuangtai_key:1,zhuangtai:"正常",fuzeren_key:2,fuzeren:"负责人002",lianxifangshi_key:2,lianxifangshi:"18900002222"},
        {xuhao:12,shixunshi_key:4,shixunshi:"实训室4",shebei_key:1,shebei:"1号设备",zhuangtai_key:2,zhuangtai:"故障",fuzeren_key:3,fuzeren:"负责人003",lianxifangshi_key:3,lianxifangshi:"18900003333"},
        {xuhao:13,shixunshi_key:1,shixunshi:"实训室1",shebei_key:2,shebei:"2号设备",zhuangtai_key:1,zhuangtai:"正常",fuzeren_key:4,fuzeren:"负责人004",lianxifangshi_key:4,lianxifangshi:"18900004444"},
        {xuhao:14,shixunshi_key:3,shixunshi:"实训室3",shebei_key:3,shebei:"3号设备",zhuangtai_key:1,zhuangtai:"正常",fuzeren_key:2,fuzeren:"负责人002",lianxifangshi_key:2,lianxifangshi:"18900002222"},
        {xuhao:15,shixunshi_key:3,shixunshi:"实训室3",shebei_key:2,shebei:"2号设备",zhuangtai_key:1,zhuangtai:"正常",fuzeren_key:1,fuzeren:"负责人001",lianxifangshi_key:1,lianxifangshi:"18900001111"},
        {xuhao:16,shixunshi_key:4,shixunshi:"实训室4",shebei_key:3,shebei:"3号设备",zhuangtai_key:1,zhuangtai:"正常",fuzeren_key:4,fuzeren:"负责人004",lianxifangshi_key:4,lianxifangshi:"18900004444"},
        {xuhao:17,shixunshi_key:3,shixunshi:"实训室3",shebei_key:2,shebei:"2号设备",zhuangtai_key:2,zhuangtai:"故障",fuzeren_key:1,fuzeren:"负责人001",lianxifangshi_key:1,lianxifangshi:"18900001111"},
        {xuhao:18,shixunshi_key:3,shixunshi:"实训室3",shebei_key:3,shebei:"3号设备",zhuangtai_key:2,zhuangtai:"故障",fuzeren_key:4,fuzeren:"负责人004",lianxifangshi_key:4,lianxifangshi:"18900004444"},
        {xuhao:19,shixunshi_key:4,shixunshi:"实训室4",shebei_key:3,shebei:"3号设备",zhuangtai_key:2,zhuangtai:"故障",fuzeren_key:2,fuzeren:"负责人002",lianxifangshi_key:2,lianxifangshi:"18900002222"},
        {xuhao:20,shixunshi_key:2,shixunshi:"实训室2",shebei_key:3,shebei:"3号设备",zhuangtai_key:2,zhuangtai:"故障",fuzeren_key:1,fuzeren:"负责人001",lianxifangshi_key:1,lianxifangshi:"18900001111"},
        {xuhao:21,shixunshi_key:1,shixunshi:"实训室1",shebei_key:3,shebei:"3号设备",zhuangtai_key:1,zhuangtai:"正常",fuzeren_key:2,fuzeren:"负责人002",lianxifangshi_key:2,lianxifangshi:"18900002222"},
        {xuhao:22,shixunshi_key:4,shixunshi:"实训室4",shebei_key:1,shebei:"1号设备",zhuangtai_key:1,zhuangtai:"正常",fuzeren_key:4,fuzeren:"负责人004",lianxifangshi_key:4,lianxifangshi:"18900004444"},
        {xuhao:23,shixunshi_key:2,shixunshi:"实训室2",shebei_key:2,shebei:"2号设备",zhuangtai_key:3,zhuangtai:"占用",fuzeren_key:3,fuzeren:"负责人003",lianxifangshi_key:3,lianxifangshi:"18900003333"},
        {xuhao:24,shixunshi_key:4,shixunshi:"实训室4",shebei_key:3,shebei:"3号设备",zhuangtai_key:1,zhuangtai:"正常",fuzeren_key:3,fuzeren:"负责人003",lianxifangshi_key:3,lianxifangshi:"18900003333"},
        {xuhao:25,shixunshi_key:1,shixunshi:"实训室1",shebei_key:4,shebei:"4号设备",zhuangtai_key:3,zhuangtai:"占用",fuzeren_key:2,fuzeren:"负责人002",lianxifangshi_key:2,lianxifangshi:"18900002222"},
        {xuhao:26,shixunshi_key:3,shixunshi:"实训室3",shebei_key:1,shebei:"1号设备",zhuangtai_key:1,zhuangtai:"正常",fuzeren_key:3,fuzeren:"负责人003",lianxifangshi_key:3,lianxifangshi:"18900003333"},
        {xuhao:27,shixunshi_key:2,shixunshi:"实训室2",shebei_key:1,shebei:"1号设备",zhuangtai_key:3,zhuangtai:"占用",fuzeren_key:4,fuzeren:"负责人004",lianxifangshi_key:4,lianxifangshi:"18900004444"},
        {xuhao:28,shixunshi_key:2,shixunshi:"实训室2",shebei_key:4,shebei:"4号设备",zhuangtai_key:1,zhuangtai:"正常",fuzeren_key:3,fuzeren:"负责人003",lianxifangshi_key:3,lianxifangshi:"18900003333"},
        {xuhao:29,shixunshi_key:3,shixunshi:"实训室3",shebei_key:4,shebei:"4号设备",zhuangtai_key:2,zhuangtai:"故障",fuzeren_key:4,fuzeren:"负责人004",lianxifangshi_key:4,lianxifangshi:"18900004444"},
        {xuhao:30,shixunshi_key:4,shixunshi:"实训室4",shebei_key:4,shebei:"4号设备",zhuangtai_key:2,zhuangtai:"故障",fuzeren_key:2,fuzeren:"负责人002",lianxifangshi_key:2,lianxifangshi:"18900002222"},
      ],
      total: 0,
      dialogTableVisible1: false,
      dialogTableVisible2: false,
      listLoading: true,
      temp_statue:0,
      listQuery: {
        list:'',
      },
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
      zhuangtai_Options:[
        {key:1,display_name:"正常"},
        {key:2,display_name:"故障"},
        {key:3,display_name:"占用"}
      ],
      fuzeren_Options:[
        {key:1,display_name:"负责人001"},
        {key:2,display_name:"负责人002"},
        {key:3,display_name:"负责人003"},
        {key:4,display_name:"负责人004"}
      ],
      lianxifangshi_Options:[
        {key:1,display_name:"18900001111"},
        {key:2,display_name:"18900002222"},
        {key:3,display_name:"18900003333"},
        {key:4,display_name:"18900004444"}
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

    change_it(scope){
      this.$confirm('确认要对 '+scope.row.shixunshi+' 中的 '+scope.row.shebei+' 进行报修操作么？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            scope.row.zhuangtai_key=2;
            scope.row.zhuangtai="故障";
          }).catch(() => {
            //几点取消的提示
          });
    },

    change_this(){
      this.list[this.now_num].zhuangtai_key=this.temp_statue;
      this.list[this.now_num].zhuangtai=this.zhuangtai_Options[this.temp_statue-1].display_name;
      this.dialogTableVisible2 = false;
    },

    filterHandler_1(value, row, column) {
        return row.shixunshi_key === value;
    },
    filterHandler_2(value, row, column) {
        return row.shebei_key === value;
    },
    filterHandler_3(value, row, column) {
        return row.zhuangtai_key === value;
    },
    filterHandler_4(value, row, column) {
        return row.fuzeren_key === value;
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
