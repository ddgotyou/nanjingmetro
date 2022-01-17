<template>
  <div class="app-container">
    <el-form label-position="right" label-width="80px" :model="formData">
      <el-card class="box-card" style="width:100%">
        <div slot="header">模板信息</div>
        <el-row>
          <el-col :span="24">
            <el-form-item label="模板名称">
              <el-input id="name" v-model="formData.name" name="name" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card" style="width:100%">
        <div slot="header">考核内容</div>
        <el-form label-position="right" label-width="80px" :model="itemData">
          <el-row>
            <el-col :span="12">
              <el-form-item label="考核项">
                <el-input id="task_name" v-model="itemData.name" name="task_name" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="分值">
                <el-input-number style="width:100%;" v-model="itemData.score" :min="0" :max="100"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="考核要点">
                <el-input v-model="itemData.description" />
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
            prop="name"
            label="评分项"
          />
          <el-table-column
            prop="description"
            label="考核要点"
          />
          <el-table-column
            prop="score"
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
      </el-card>
      <div style="text-align:right">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      formData: {
        name: ''
      },
      itemData: {
        name:'',
        score: 0,
        description:''
      },
      tableData:[]
    }
  },
  methods: {
    addItem() {
      if(this.itemData.name==''||this.itemData.description==''){
        this.$message.error('表单内存在空值！');
      }
      else{
        this.tableData.push({
          name:this.itemData.name,
          score:this.itemData.score,
          description:this.itemData.description
        })
      }
    },
    deleteRow(index, tableData) {
      this.tableData.splice(index, 1)
    },
    save() {
      var data={
        name: this.formData.name,
        items: this.tableData
      }

      if(data.name==''||data.items.length==0){
        this.$message.error('表单内存在空值！');
      }
      else{
      }
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
