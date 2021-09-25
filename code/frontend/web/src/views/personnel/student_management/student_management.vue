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
        @change="optionChange"
      >
        <el-option
          v-for="item in options"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        >
        </el-option>
      </el-select>
      <template v-for="item in options">
        <el-select
          :key="item.key"
          v-if="item.visible"
          v-model="item.value"
          :placeholder="item.label"
          style="width: 100px"
          class="mr10"
        >
          <el-option label="男" value="1" />
          <el-option label="女" value="2" />
        </el-select>
      </template>
    </div>

    <el-card class="card-box" style="width: 100%">
      <!-- 功能栏 -->
      <div slot="header">
        <div style="float: left">
          <el-button @click="handleAdd">新增</el-button>
          <el-button @click="handleDeletet">删除</el-button>
          <el-button @click="handleImport">导入</el-button>
          <el-button @click="handleExport">导出</el-button>
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
          v-loading="loading"
          :data="studentList"
          style="width: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
          @row-click="rowClick"
          @current-change="tableCurrentChange"
        >
          <el-table-column type="selection" />
          <el-table-column prop="name" label="姓名" width="" align="center" />
          <el-table-column prop="sex" label="性别" width="" align="center">
            <template slot-scope="scope">
              {{ getStudentSex(scope.row.sex) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="tel"
            label="联系电话"
            width=""
            align="center"
          />
          <el-table-column prop="dept" label="部门" width="" align="center">
            <template slot-scope="scope">
              {{ scope.row.dept[0] }}
            </template>
          </el-table-column>
          <el-table-column prop="post" label="岗位" width="" align="center" />
          <el-table-column prop="edu" label="学历" width="" align="center" />
          <el-table-column prop="major" label="专业" width="" align="center" />
          <el-table-column
            prop="status"
            label="学员状态"
            width=""
            align="center"
          >
            <template slot-scope="scope">
              {{ getStudentStatus(scope.row.sex) }}
            </template>
          </el-table-column>
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
            :current-page="page.number"
            :page-sizes="[]"
            :page-size="page.size"
            :total="page.totalPages"
            layout="total, sizes, prev, pager, next, jumper"
            class="pagination"
            @size-change="pagingSizeChange"
            @current-change="pagingCurrentChange"
          />
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import { listStudent } from "@/api/personnel/student";

export default {
  data: function () {
    return {
      // 遮罩层
      loading: true,

      page: {
        size: 0,
        totalElements: 0,
        totalPages: 0,
        number: 0,
      },

      query: {
        sex: null,
        status: null,
      },

      studentList: [],

      dimensions: [],
      options: [
        { key: "0", label: "性别", visible: false, value: null },
        { key: "1", label: "部门", visible: false, value: null },
        { key: "2", label: "岗位", visible: false, value: null },
        { key: "3", label: "学历", visible: false, value: null },
        { key: "4", label: "专业", visible: false, value: null },
        { key: "5", label: "学员状态", visible: false, value: null },
      ],
    };
  },
  computed: {},
  mounted: function () {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      listStudent(null).then((response) => {
        this.studentList = response.data;
        // this.page = response.page;
        this.loading = false;
      });
    },
    getStudentSex(sex) {
      return sex === "1" ? "男" : "女";
    },
    getStudentStatus(status) {
      return status === "1" ? "正式" : "临时";
    },
    optionChange() {
      for (var i = 0; i < this.options.length; i++) {
        this.options[i].visible = false;
        if (this.dimensions.indexOf(i.toString()) != -1) {
          this.options[i].visible = true;
        }
      }
    },
    pagingSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    pagingCurrentChange(val) {
      -console.log(`当前页: ${val}`);
    },
    handleAdd() {
      this.$router.push("/personnel/new_student");
    },
    handleDelete() {},
    handleImport() {
      this.$router.push("/personnel/import_student");
    },
    handleExpor() {},
    handleSearch() {},
    handleReset() {},
  },
};
</script>

<style lang="scss" scoped>
.header-input {
  width: 800px;
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
