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
            <download-excel
              :data="getTable"
              :fields="fields"
              type="xls"
              header="用户组列表"
              name="用户组列表"
              class="export-button"
            >
              <el-button plain type="warning" icon="el-icon-download"
                >导出</el-button
              >
            </download-excel>
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
      <div slot="header">用户组列表</div>

      <!-- 用户组列表 -->
      <el-table
        v-loading="loading"
        :data="list"
        :default-sort="{ prop: 'creatTime', order: 'descending' }"
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
            <el-button type="text" @click="handleEdit(scope.$index)">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 页码 -->
      <el-row>
        <el-pagination
          :current-page="page.number + 1"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="page.size"
          :total="page.totalElements"
          layout="total, sizes, prev, pager, next, jumper"
          class="pagination"
          @size-change="pageSizeChange"
          @current-change="pageCurrentChange"
        />
      </el-row>
    </el-card>
  </div>
</template>

<script>
import * as api from "@/api/account/user_group";

export default {
  data: function () {
    return {
      // 导出Excel表格的表头设置
      fields: {
        名称: "name",
        备注: "remark",
        更新时间: "updateTime",
      },
      table: [],

      // 查询集
      query: {
        key: "",
      },

      //遮罩层
      loading: true,
      // 当前页面的用户组的列表
      list: [],
      // 选中用户组的列表
      selection: [],

      // 页码
      page: {
        size: 10,
        totalElements: 0,
        totalPages: 0,
        number: 0,
      },
    };
  },
  computed: {
    getTable() {
      // 有模糊查询，则返回查询结果
      if (this.query.key) return this.list;
      // 没有，则返回所有学员
      else return this.table;
    },
  },
  mounted: function () {
    this.loadData();
  },
  methods: {
    // 用户组列表
    data(page, size) {
      this.loading = true;
      api.list(page, size).then((response) => {
        this.list = response._embedded.usergroupVoes || [];
        this.page = response.page;
        this.loading = false;
      });
    },
    // 模糊搜索
    search(key, page, size) {
      this.loading = true;
      api.search(key, page, size).then((response) => {
        this.list = response._embedded.usergroupVoes || [];
        this.page = response.page;
        this.loading = false;
      });
    },
    // 加载数据
    loadData() {
      api.list(0, 10000).then((response) => {
        this.table = response._embedded.usergroupVoes || [];
      });
      this.data(0, this.page.size);
    },
    // 当选中用户组更改时，更新选中用户组的列表
    handleSelectionChange(selection) {
      this.selection = selection;
    },
    // 新增用户组
    handleAdd() {
      this.$router.push({ path: "/account/add-usergroup" });
    },
    // 删除某个用户组
    handleDelete() {
      let count = this.selection.length; // 选中的用户组数量

      // 如果没有选中任何项，则提示并返回
      if (count === 0) {
        this.$message.warning("未选中任何用户组！");
        return;
      }

      // 删除确认
      this.$confirm("是否确认删除选中的用户组？", "提示", {
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
              .del(this.selection[i].id)
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
                this.$message.success(`成功删除${count}个用户组。`);
            },
            // reject
            (errors) => {
              console.log(errors);
            }
          )
          .finally(() => this.handleReset());
      });
    },
    // 批量导出用户组
    handleExport() {},
    // 模糊搜索用户组
    handleSearch() {
      if (!this.query.key) return;

      this.search(this.query.key, 0, this.page.size);
    },
    // 重置用户组数据
    handleReset() {
      // 清空查询字典
      this.query.key = null;
      // 重新加载数据
      this.loadData();
    },
    // 编辑某个用户组
    handleEdit(index) {
      this.$router.push({
        path: "/account/edit-usergroup",
        query: { id: this.list[index].id },
      });
    },
    pageSizeChange(size) {
      if (!this.query.key) {
        this.data(0, size);
      } else {
        this.search(this.query.key, 0, size);
      }
    },
    pageCurrentChange(number) {
      if (!this.query.key) {
        this.data(number - 1, this.page.size);
      } else {
        this.search(this.query.key, number - 1, this.page.size);
      }
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

.export-button {
  float: right;
  margin-left: 10px;
}
</style>