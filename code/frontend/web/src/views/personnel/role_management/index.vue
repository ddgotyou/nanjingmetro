<template>
  <div class="app-container">
    <el-card class="card-box" style="width: 100%">
      <!-- 功能栏 -->
      <div slot="header">
        <div style="float: left">
          <!-- 新增按钮 -->
          <el-button plain type="primary" icon="el-icon-plus" @click="handleAdd"
            >新增</el-button
          >
          <!-- 导出按钮 -->
          <el-button
            plain
            type="warning"
            icon="el-icon-download"
            @click="handleExport"
            >导出</el-button
          >
        </div>

        <span>
          <!-- 搜索框 -->
          <el-input
            v-model="query.key"
            placeholder="模糊搜索框"
            style="width: 825px"
            class="header-input"
            @keyup.enter.native="handleSearch"
          />
        </span>

        <div style="float: right">
          <!-- 搜索按钮 -->
          <el-button type="primary" icon="el-icon-search" @click="handleSearch"
            >搜索</el-button
          >
          <!-- 重置按钮 -->
          <el-button icon="el-icon-refresh" @click="handleReset"
            >重置</el-button
          >
        </div>
      </div>

      <!-- 角色表格 -->
      <div class="box-item">
        <el-table
          v-loading="loading"
          :data="roleList"
          :default-sort="{ prop: 'date', order: 'descending' }"
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" />
          <!-- 不显示，用来在选择到某个学员时同时获得其 ID -->
          <el-table-column v-if="false" prop="roleId" />
          <el-table-column type="index" label="序号" width="" align="center" />
          <el-table-column
            prop="roleName"
            label="名称"
            width=""
            align="center"
          />
          <el-table-column prop="remark" label="备注" width="" align="center" />
          <el-table-column
            prop="updateTime"
            label="更新时间"
            width=""
            align="center"
          />
          <el-table-column prop="enabled" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="handleEdit(scope.$index)"
                >编辑</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <!-- 页码 -->
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
import { listRole } from "@/api/personnel/role";

export default {
  data: function () {
    return {
      query: {
        key: undefined,
      },

      page: {
        size: 0,
        totalElements: 0,
        totalPages: 0,
        number: 0,
      },

      roleList: [],
      selectedItem: null,
      //遮罩层
      loading: true,
      // 当前页面的角色的列表
      roleList: [],
      // 选中角色的列表
      roleSelection: null,
    };
  },
  mounted: function () {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      listRole(null).then((response) => {
        console.log(response);
        this.roleList = response.rows;
        this.loading = false;
      });
    },
    // 新增角色
    handleAdd() {
      this.$router.push("/personnel/add-role");
    },
    // 批量导出角色
    handleExport() {},
    // 模糊搜索角色
    handleSearch() {},
    // 重置角色列表
    handleReset() {},
    // 编辑选中角色
    handleEdit() {},
    // 当选中角色更改时，更新选中角色的列表
    handleSelectionChange(selection) {
      this.roleSelection = selection;
    },
    pagingSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    pagingCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-box {
  width: 400px;
  max-width: 100%;
  margin: 20px auto;
}

.header-input {
  display: inline-block;
  margin-left: 10px;
  margin-right: 10px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
