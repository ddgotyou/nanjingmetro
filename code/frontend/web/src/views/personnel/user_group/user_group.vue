<template>
  <div class="app-container">
    <el-card class="card-box" style="width: 100%">
      <!-- 功能栏 -->
      <div slot="header">
        <div style="float: left">
          <el-button @click="handleAdd">新增</el-button>
          <el-button @click="handleDelete">删除</el-button>
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
          v-loading="loading"
          stripe
          :data="userGroupList"
          style="width: 100%"
          :default-sort="{ prop: 'creatTime', order: 'descending' }"
          @row-click="rowClick"
          @current-change="tableCurrentChange"
        >
          <el-table-column type="selection" />
          <el-table-column type="index" label="序号" width="" align="center" />
          <el-table-column
            prop="deptName"
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
                >修改</el-button
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
  </div>
</template>

<script>
import { listUserGroup } from "@/api/personnel/user_group";

export default {
  data: function () {
    return {
      //遮罩层
      loading: true,

      pageSizes: [100, 200, 300, 400],
      pageSize: 100,
      totalPage: 400,
      currentPage: 1,

      userGroupList: [],
      selectedItem: null,
    };
  },
  mounted: function () {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      listUserGroup(null).then((response) => {
        console.log(response);
        this.userGroupList = response.data;
        this.loading = false;
      });
    },
    pagingSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    pagingCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleAdd() {
      this.$router.push("/personnel/new_usergroup");
    },
    handleDelete() {},
    handleExport() {},
    handleSearch() {},
    handleReset() {},
    handleEdit() {},
    tableCurrentChange(val) {
      this.selectedItem = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.header-input {
  width: 67%;
  display: inline-block;
  margin-left: 10px;
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
</style>
