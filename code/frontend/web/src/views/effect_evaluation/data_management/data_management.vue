<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      v-show="showSearch"
      :inline="true"
    >
      <el-form-item label="培训计划" prop="roleName">
        <!-- v-model="queryParams.roleName" -->
        <el-input
          placeholder="请输入培训计划"
          clearable
          size="small"
          style="width: 240px"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="任务名称" prop="roleKey">
        <el-input
          placeholder="请输入任务名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="140"> </el-table-column>
      <el-table-column prop="plan" label="培训计划" width="120" key="plan">
      </el-table-column>
      <el-table-column prop="name" label="任务名称"> </el-table-column>
      <el-table-column prop="time" label="任务时间"> </el-table-column>
      <el-table-column prop="teacher" label="讲师"> </el-table-column>
      <el-table-column label="操作" width="200">
        <template>
          <el-button @click="goDetail" type="text">详情</el-button>
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
</style>

<script>
export default {
  data() {
    const item = {
      plan: "一号",
      name: "一号任务",
      time: "2021-01-01",
      teacher: "王一二",
    };
    return {
      tableData: Array(20).fill(item),
      showSearch: true,
      pageSizes: [100, 200, 300, 400],
      pageSize: 100,
      totalPage: 400,
      currentPage: 1,
    };
  },
  methods: {
    goDetail() {
      this.$router.push("/detailresult");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      //this.queryParams.pageNum = 1;
      //this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      //this.dateRange = [];
      //this.resetForm("queryForm");
      //this.handleQuery();
    },
  },
};
</script>

<style>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
