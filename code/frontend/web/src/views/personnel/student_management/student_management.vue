<template>
  <div class="app-container">
    <!-- 顶部筛选栏 -->
    <div>
      <el-input placeholder="姓名" class="mr10" style="width: 150px" />
      <el-input placeholder="身份证号" class="mr10" style="width: 200px" />
      <el-select
        v-model="dimensions"
        multiple
        collapse-tags
        placeholder="请选择筛选项（可多选）"
        style="width: 200px"
        class="mr10"
        @change="addOption"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select
        v-if="selSexVisible"
        v-model="selSex"
        ref="sex"
        placeholder="请选择"
        style="width: 100px"
        class="mr10"
      >
        <el-option label="男" value="1" />
        <el-option label="女" value="2" />
      </el-select>
    </div>
    <el-card class="card-box" style="width: 100%">
      <!-- 功能栏 -->
      <div slot="header">
        <div style="float: left">
          <el-button @click="addStudent">新增</el-button>
          <el-button @click="delStudent">删除</el-button>
          <el-button @click="importStudent">导入</el-button>
          <el-button @click="exportStudent">导出</el-button>
        </div>

        <span>
          <el-input placeholder="模糊搜索框" class="header-input" />
        </span>

        <div style="float: right">
          <el-button @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </div>
      </div>
      <!-- 表项 -->
      <div class="box-item">
        <el-table
          stripe
          :data="items"
          style="width: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
          @row-click="rowClick"
          @current-change="tableCurrentChange"
        >
          <el-table-column type="selection" />
          <el-table-column prop="name" label="姓名" width="" align="center" />
          <el-table-column prop="sex" label="性别" width="" align="center" />
          <el-table-column
            prop="tel"
            label="联系电话"
            width=""
            align="center"
          />
          <el-table-column prop="dept" label="部门" width="" align="center" />
          <el-table-column prop="post" label="岗位" width="" align="center" />
          <el-table-column prop="edu" label="学历" width="" align="center" />
          <el-table-column prop="major" label="专业" width="" align="center" />
          <el-table-column
            prop="status"
            label="学员状态"
            width=""
            align="center"
          />
          <el-table-column prop="enabled" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="handleDetail(scope.$index)"
                >详情</el-button
              >
              <el-button type="text" @click="handleEdit(scope.$index)"
                >编辑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <el-pagination
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            :total="totalPage"
            layout="total, sizes, prev, pager, next, jumper"
            class="pagination"
            @size-change="pagingSizeChange"
            @current-change="pagingCurrentChange"
          />
        </el-row>
      </div>
    </el-card>
    
    <!-- 新增学员对话框 -->
    <el-dialog title="新增学员" :visible.sync="dialogAddVisible" width="1000px">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="form.sex" placeholder="性别">
                <el-option key="1" label="男" value="1" />
                <el-option key="2" label="女" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="form.tel"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
              <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="用户组">
              <el-select v-model="form.userGroup" placeholder="用户组">
                <el-option key="1" label="一" value="1" />
                <el-option key="2" label="二" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8"></el-col> -->
          <el-col :span="12">
            <el-form-item label="部门">
              <el-select v-model="form.sex" placeholder="部门">
                <el-option key="1" label="1" value="1" />
                <el-option key="2" label="2" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="岗位">
              <el-select v-model="form.sex" placeholder="岗位">
                <el-option key="1" label="1" value="1" />
                <el-option key="2" label="2" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="学历">
              <el-select v-model="form.sex" placeholder="学历">
                <el-option key="1" label="1" value="1" />
                <el-option key="2" label="2" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="专业">
              <el-select v-model="form.sex" placeholder="专业">
                <el-option key="1" label="1" value="1" />
                <el-option key="2" label="2" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="学员状态">
              <el-select v-model="form.sex" placeholder="学员状态">
                <el-option key="1" label="1" value="1" />
                <el-option key="2" label="2" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button>查看电子档案</el-button>
              <el-button>导出电子档案</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div align="center">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </div>
    </el-dialog>

    <!-- 导入学员对话框 -->
    <el-dialog title="导入学员" :visible.sync="dialogImportVisible" width="1000px">
      <div class="step-box">
        <el-steps direction="vertical" :active="1" :space="200">
          <el-step>
            <template slot="description">
              <p>
                请按照模板样式填写
                <br />
                为确保您的学员数据导入正常，建议下载新的模板导入
              </p>
            </template>
            <template slot="title">
              <el-row>
                <el-col :span="12">
                  <p>下载模板，填写学员信息</p>
                </el-col>
                <el-col :span="12">
                  <el-button>下载最新模板</el-button>
                </el-col>
              </el-row>
            </template>
          </el-step>
          <el-step>
            <template slot="title">
              <el-row>
                <el-col :span="12">
                  <p>上传填写好的模板</p>
                </el-col>
                <el-col :span="12">
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
                  >
                    <el-button type="primary">上传</el-button>
                  </el-upload>
                </el-col>
              </el-row>
            </template>
          </el-step>
        </el-steps>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      pageSizes: [100, 200, 300, 400],
      pageSize: 100,
      totalPage: 400,
      currentPage: 1,

      query: {
        sex: null,
        status: null,
      },

      items: [],
      selectedItem: null,

      dimensions: [],
      options: [
        { value: "1", label: "性别" },
        { value: "2", label: "部门" },
        { value: "3", label: "岗位" },
        { value: "4", label: "学历" },
        { value: "5", label: "专业" },
        { value: "6", label: "学员状态" },
      ],

      selSex: null,
      selSexVisible: false,

      dialogAddVisible: false,
      dialogImportVisible: false,
      form: {
        name: null,
        sex: null,
        tel: null,
        email: null,
        id: null,
        userGroup: null,
      },
    };
  },
  computed: {},
  mounted: function () {
    this.getData();
  },
  methods: {
    getData() {
      this.items = [
        {
          name: "XXX",
          sex: "XXX",
          tel: "XXX",
          dept: "XXX",
          post: "XXX",
          edu: "XXX",
          major: "XXX",
          status: "XXX",
        },
      ];
    },
    addOption() {
      if (this.dimensions.indexOf("1") != -1) {
        const that = this;
        this.selSex = false;
        this.$nextTick(() => {
          that.selSex = true;
        });
      }
    },
    pagingSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    pagingCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    addStudent() {
      // this.$router.push("/staff/student/add");
      this.dialogAddVisible = true;
    },
    delStudent() {},
    importStudent() {
      // this.$router.push("/staff/student/import");
      this.dialogImportVisible = true;
    },
    exportStudent() {},
    handleSearch() {},
    handleReset() {},
  },
};
</script>

<style lang="scss" scoped>
.header-input {
  width: 750px;
  display: inline-block;
  margin-left: 10px;
  margin-right: 10px;
}

.mr10 {
  margin-right: 10px;
}

.card-box {
  width: 400px;
  max-width: 100%;
  margin: 20px auto;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.el-input {
  width: 220px;
}

.step-box {
  width: 100%;
  margin: 50px;
}
</style>
