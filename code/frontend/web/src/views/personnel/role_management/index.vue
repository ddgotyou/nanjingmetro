<template>
  <div class="app-container">
    <!-- 筛选栏 -->
    <el-card class="card-box">
      <!-- 标题栏 -->
      <div slot="header">筛选栏</div>

      <!-- 筛选选项 -->
      <el-form label-width="auto" label-position="right" @submit.native.prevent>
        <el-form-item>
          <!-- 搜索框 -->
          <el-input
            v-model="query.key"
            placeholder="模糊搜索框"
            @keyup.enter.native="handleSearch"
          />
        </el-form-item>
        <el-form-item>
          <div style="float: left">
            <!-- 新增按钮 -->
            <el-button
              plain
              type="primary"
              icon="el-icon-plus"
              @click="handleAdd"
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

          <div style="float: right">
            <!-- 搜索按钮 -->
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="handleSearch"
              >搜索</el-button
            >
            <!-- 重置按钮 -->
            <el-button icon="el-icon-refresh" @click="handleReset"
              >重置</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 主体 -->
    <el-card class="card-box">
      <!-- 标题栏 -->
      <div slot="header">角色列表</div>

      <!-- 角色列表 -->
      <div class="box-item">
        <el-table
          v-loading="loading"
          :data="list"
          :default-sort="{ prop: 'date', order: 'descending' }"
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" />
          <!-- 不显示，用来在选择到某个学员时同时获得其 ID -->
          <el-table-column v-if="false" prop="id" />
          <el-table-column type="index" label="序号" width="" align="center" />
          <el-table-column prop="name" label="名称" width="" align="center" />
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
import api from "@/api/personnel/role";

export default {
  data: function () {
    return {
      query: {
        key: "",
      },

      page: {
        size: 0,
        totalElements: 0,
        totalPages: 0,
        number: 0,
      },

      //遮罩层
      loading: true,
      // 当前页面的角色的列表
      list: [],
      // 选中角色的列表
      selection: [],
    };
  },
  mounted: function () {
    this.loadData();
  },
  methods: {
    loadData() {
      this.loading = true;
      api.list(null).then((response) => {
        this.list = response._embedded.groupVoes;
        this.loading = false;
      });
    },
    // 新增角色
    handleAdd() {
      this.$router.push({
        path: "/personnel/add-role",
        query: { option: "add" },
      });
    },
    // 批量导出角色
    handleExport() {},
    // 模糊搜索角色
    handleSearch() {
      if (!this.query.key) return;

      this.loading = true;
      api.search(this.query.key).then((response) => {
        this.list = response._embedded.groupVoes;
        this.loading = false;
      });
    },
    // 重置角色列表
    handleReset() {
      // 清空查询字典
      this.query.key = "";
      // 重新加载数据
      this.loadData();
    },
    // 删除角色
    async handleDelete() {
      let count = this.selection.length; // 选中的角色数量

      // 如果没有选中任何项，则提示并返回
      if (count === 0) {
        this.$message.warning("未选中任何角色！");
        return;
      }

      // 删除确认
      this.$confirm("是否确认删除选中的角色？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 这是个伪并行，虽然删除任务逐个开始，
        // 但是相比于请求的时间，迭代的时间可以忽略不计
        let promises = [];
        // 逐个删除
        for (let i in this.selection) {
          let promise = new Promise((resolve, reject) => {
            api
              .delete(this.selection[i].id)
              .then((response) => resolve(response))
              .catch((error) => reject(error.message));
          });
          promises.push(promise);
        }

        // 保证所有并行任务完成后
        Promise.all(promises)
          .then(
            // resolve
            (values) => {
              let count = values.filter((value) => value.code === 200).length;
              if (count !== 0)
                this.$message.success(`成功删除${count}个角色。`);
            },
            // reject
            (errors) => {
              console.log(errors);
            }
          )
          .finally(() => this.handleReset());
      });
    },
    // 编辑选中角色
    handleEdit(index) {
      let id = this.list[index].id;
      console.log(id);
      this.$router.push({
        path: "/personnel/edit-role",
        query: { option: "edit", id: id },
      });
    },
    // 当选中角色更改时，更新选中角色的列表
    handleSelectionChange(selection) {
      this.selection = selection;
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
