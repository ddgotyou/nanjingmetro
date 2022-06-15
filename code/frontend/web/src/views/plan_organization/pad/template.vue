<template>
   <div class="app-container">
    <el-card class="box-card" style="width:100%">
      <div slot="header">筛选</div>
      <el-form label-position="right" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="模糊搜索">
              <el-input id="search" v-model="search_value" clearable name="search_value" placeholder="在此输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div style="text-align: left">
              <el-button type="primary" @click="add">新 增</el-button>
              <el-button @click="del">删 除</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="box-card" style="width:100%">
      <div slot="header">模板列表</div>
      <el-table
        :data="templates.filter(data => (!search_value || data.name.toLowerCase().includes(search_value.toLowerCase())))"
        ref="multipleTable"
        tooltip-effect="dark"
        style="width: 100"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table
              :data="props.row.details"
              show-summary
              style="width: 100"
            >
              <el-table-column
                prop="content"
                label="考核内容"
              />
              <el-table-column
                prop="point"
                label="考核要点"
              />
              <el-table-column
                prop="totalScore"
                label="单项分值"
              />
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        
        <el-table-column
          prop="id"
          label="模板ID"
        />
        <el-table-column
          prop="name"
          label="模板名称"
        />
        <el-table-column
          prop="lastModifiedDate"
          label="修改时间"
        />
        <el-table-column
          label="操作"
          width=120
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click.native.prevent="edit(scope.$index)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :title="pop_title" :visible.sync="dialogFormVisible" @closed="closed">
      <el-form label-position="right" label-width="80px" :model="formData">
        <div slot="header">模板信息</div>
        <el-row>
          <el-col :span="24">
            <el-form-item label="模板名称">
              <el-input id="name" v-model="formData.name" name="name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider />
        <el-form label-position="right" label-width="80px" :model="itemData">
          <el-row>
            <el-col :span="12">
              <el-form-item label="考核内容">
                <el-input v-model="itemData.content" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单项分值">
                <el-input-number style="width:100%;" v-model="itemData.totalScore" :min="0" :max="100" :step="5"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="考核要点">
                <el-input v-model="itemData.point" />
              </el-form-item>
            </el-col>
          </el-row>
          <div style="text-align:right"><el-button type="primary" @click="addItem">确认新增</el-button></div>
        </el-form>
        <el-divider />
        <el-table
          :data="tableData"
          style="width: 100"
        >
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="content"
            label="考核内容"
          />
          <el-table-column
            prop="point"
            label="考核要点"
          />
          <el-table-column
            prop="totalScore"
            label="单项分值"
          />
          <el-table-column
            label="操作"
            width="120"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="deleteRow(scope.$index, tableData)"
              >
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align:right">
          <el-button type="primary" @click="save">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/api/training_plan/pad'
export default {
  components: {
    api
  },
  data() {
    return {
      search_value: '',
      dialogFormVisible: false,
      multipleSelection:[],

      templates:[],
      select_id:0,
      
      pop_title:'',
      formData: {
        name: ''
      },
      itemData: {
        content:'',
        totalScore: 0,
        point:''
      },
      tableData:[]
    }
  },
  created(){
    this.list()
  },
  methods: {
    list() {
      api.list_template().then( res => {
        this.templates=res._embedded.templates
      })
    },
    add() {
      this.select_id=0
      this.dialogFormVisible=true
      this.pop_title='新增打分模板'
    },
    edit(index) {
      this.select_id=this.templates[index].id
      this.dialogFormVisible=true
      this.pop_title='编辑模板'
      this.formData={
        name: this.templates[index].name
      }
      this.tableData=this.templates[index].details
    },
    async del() {
      var that=this;
      await new Promise((resolve, reject) => {
        this.$confirm('此操作将删除所有选中的打分模板, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(that.multipleSelection)
          for(var i=0;i<that.multipleSelection.length;i++)
          {
            var id=that.multipleSelection[i].id
            api.del_template(id).then(
              this.$message({
                type: 'success',
                message: '已删除打分模板'+that.multipleSelection[i].name+'!'
              })
            ).catch( err => {
              console.log('删除打分模板'+that.multipleSelection[i].name+'失败', err);
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除操作'
          });          
        }).finally(()=>{resolve()}); 
      });
      setTimeout(() => {that.list();},500);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    addItem() {
      if(this.itemData.content==''||this.itemData.point==''){
        this.$message.error('表单内存在空值！');
      }
      else{
        this.tableData.push({
          content:this.itemData.content,
          totalScore:this.itemData.totalScore,
          point:this.itemData.point
        })
      }
    },
    deleteRow(index, tableData) {
      this.tableData.splice(index, 1)
    },
    save() {
      var data={
        name: this.formData.name,
        details: this.tableData
      }
      if(data.name==''||data.details.length==0){
        this.$message.error('表单内存在空值！');
      }
      else{
        if(this.select_id!=0)
        {
          api.update_template(this.select_id,data).then( res => {
            this.$message({
              message: '更新成功！',
              type: 'success'
            });
            this.list()
            this.dialogFormVisible=false
          })
        }
        else
        {
          api.upload_template(data).then( res => {
            this.$message({
              message: '保存成功！',
              type: 'success'
            });
            this.list()
            this.dialogFormVisible=false
          })
        }
      }
    },
    closed(){
      this.select_id=0
      this.formData={
        name: ''
      }
      this.itemData={
        content:'',
        totalScore: 0,
        point:''
      }
      this.tableData=[]
      this.list()
    }
  }
}
</script>
<style lang="scss" scoped>
  .box-card {
  width: 400px;
  max-width: 100%;
  margin: 20px auto;
  }
</style>
