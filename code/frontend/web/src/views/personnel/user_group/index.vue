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
          <!-- 删除按钮 -->
          <el-button
            plain
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete"
            >删除</el-button
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
            style="width: 700px"
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

      <!-- 用户组列表 -->
      <el-table
        v-loading="loading"
        :data="userGroupList"
        :default-sort="{ prop: 'creatTime', order: 'descending' }"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" />
        <!-- 不显示，用来在选择到某个学员时同时获得其 ID -->
        <el-table-column v-if="false" prop="deptId" />
        <el-table-column type="index" label="序号" width="" align="center" />
        <el-table-column prop="deptName" label="名称" width="" align="center" />
        <el-table-column prop="remark" label="备注" width="" align="center" />
        <el-table-column
          prop="updateTime"
          label="更新时间"
          width=""
          align="center"
        />
        <el-table-column prop="enabled" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.$index)">
              编辑</el-button
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
    </el-card>
  </div>
</template>

<script>
import { deleteUserGroup, listUserGroup } from "@/api/personnel/user_group";

export default {
  data: function () {
    return {
      // 查询字典
      query: {
        key: undefined,
      },

      //遮罩层
      loading: true,
      // 当前页面的用户组的列表
      userGroupList: [],
      // 选中用户组的列表
      userGroupSelection: null,

      // 页码
      page: {
        size: 0,
        totalElements: 0,
        totalPages: 0,
        number: 0,
      },
    };
  },
  mounted: function () {
    this.loadData();
  },
  methods: {
    // 加载一页用户组数据
    loadData() {
      this.loading = true;
      listUserGroup(null).then((response) => {
        this.userGroupList = response.data;
        this.loading = false;
      });
    },
    // 当选中用户组更改时，更新选中用户组的列表
    handleSelectionChange(selection) {
      this.userGroupSelection = selection;
    },
    // 新增用户组
    handleAdd() {
      this.$router.push("/personnel/add-usergroup");
    },
    // 删除某个用户组
    async handleDelete() {
      let userGroupNum = this.userGroupSelection.length; // 选中的讲师数量

      // 如果没有选中任何项，则提示并返回
      if (userGroupNum === 0) {
        this.$message.warning("未选中任何讲师！");
        return;
      }

      // 逐个删除
      let flags = new Array(userGroupNum).fill(false); // 用来记录删除是否成功的标志
      for (var i = 0; i < userGroupNum; i++) {
        await deleteUserGroup(this.userGroupSelection[i].deptId).then(
          (response) => {
            if (response.code === 200) flags[i] = true;
            else this.$message.error(response.msg);
          }
        );
      }

      // 提示或刷新数据
      let successNum = await flags.filter((element) => element === true).length;
      if (successNum > 0) {
        this.$message.success(`成功删除 ${successNum} 个用户组。`);
      }

      this.handleReset();
    },
    // 批量导出用户组
    handleExport() {},
    // 模糊搜索用户组
    handleSearch() {},
    // 重置用户组数据
    handleReset() {
      // 清空查询字典
      this.query.key = undefined;
      // 重新加载数据
      this.loadData();
    },
    // 编辑某个用户组
    handleEdit(index) {
      let id = this.userGroupList[index].deptId;
      this.$router.push({
        path: "/personnel/edit-usergroup",
        query: { option: "edit", id: id },
      });
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
