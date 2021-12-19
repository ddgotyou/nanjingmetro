<template>
  <div class="app-container">
    <!-- 筛选栏 -->
    <el-card class="card-box">
      <!-- 标题栏 -->
      <div slot="header">筛选框</div>

      <!-- 筛选选项 -->
      <el-form label-width="auto" label-position="right" @submit.native.prevent>
        <el-row :gutter="10">
          <el-col :span="3">
            <el-form-item>
              <!-- 姓名筛选框 -->
              <el-input v-model="query.name" placeholder="姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <!-- 身份证号筛选框 -->
              <el-input v-model="query.idcard" placeholder="身份证号" />
            </el-form-item>
          </el-col>
          <el-col :span="17">
            <el-form-item>
              <!-- 其他选择类筛选框 -->
              <el-select
                v-model="dimensions"
                multiple
                collapse-tags
                placeholder="请选择筛选项（多选）"
                style="width: 200px"
                class="mr10"
                @change="handleItemChange"
              >
                <el-option
                  v-for="(item, key) in items"
                  :key="item.key"
                  :label="item.label"
                  :value="key"
                >
                </el-option>
              </el-select>
              <template v-for="item in items">
                <el-select
                  v-model="item.value"
                  v-if="item.visible"
                  :key="item.key"
                  :placeholder="item.label"
                  style="width: 150px"
                  class="mr10"
                  @change="handleOptionChange"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.key"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
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
            <!-- 导入按钮 -->
            <el-button
              plain
              type="info"
              icon="el-icon-upload2"
              @click="handleImport"
              >导入</el-button
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
      <div slot="header">讲师列表</div>

      <!-- 讲师列表 -->
      <el-table
        v-loading="loading"
        :data="list"
        :default-sort="{ prop: 'id', order: 'descending' }"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" />
        <!-- 不显示，用来在选择到某个讲师时同时获得其 ID -->
        <el-table-column v-if="false" prop="id" />
        <el-table-column prop="name" label="姓名" width="" align="center" />
        <el-table-column prop="sex" label="性别" width="" align="center">
          <template slot-scope="scope">
            {{ getSex(scope.row.sex) }}
          </template>
        </el-table-column>
        <el-table-column prop="tel" label="联系电话" width="" align="center" />
        <el-table-column prop="dept" label="部门" width="" align="center">
          <template slot-scope="scope">
            {{ getDept(scope.row.dept) }}
          </template>
        </el-table-column>
        <el-table-column prop="post" label="岗位" width="" align="center" />
        <el-table-column prop="status" label="讲师状态" width="" align="center">
          <template slot-scope="scope">
            {{ getStatus(scope.row.status) }}
          </template>
        </el-table-column>
        <el-table-column prop="enabled" label="操作" align="center">
          <template slot-scope="scope">
            <!-- 单条详情按钮 -->
            <el-button type="text" @click="handleDetail(scope.$index)"
              >详情</el-button
            >
            <!-- 单条编辑按钮 -->
            <el-button type="text" @click="handleEdit(scope.$index)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 页码 -->
      <el-row>
        <el-pagination
          :current-page="page.number + 1"
          :page-sizes="[4, 5]"
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
import api from "@/api/personnel/teacher";
import all from "@/api/personnel/selection";

export default {
  data: function () {
    return {
      // 按条件筛选
      query: {
        name: undefined,
        idcard: undefined,
        key: undefined,
        sex: undefined,
        dept: undefined,
        post: undefined,
        edu: undefined,
        major: undefined,
        status: undefined,
      },

      // 选中筛选维度的列表
      dimensions: [],
      // 所有筛选维度的列表
      items: {
        sex: {
          key: "1",
          label: "性别",
          visible: false,
          value: undefined,
          options: [
            { key: "1", label: "男", value: "0" },
            { key: "2", label: "女", value: "1" },
          ],
        },
        dept: {
          key: "2",
          label: "部门",
          visible: false,
          value: undefined,
          options: [],
        },
        post: {
          key: "3",
          label: "岗位",
          visible: false,
          value: undefined,
          options: [],
        },
        status: {
          key: "4",
          label: "讲师状态",
          visible: false,
          value: undefined,
          options: [
            { key: "1", label: "正式", value: "0" },
            { key: "2", label: "临时", value: "1" },
          ],
        },
      },

      // 遮罩层
      loading: true,
      // 当前页面的讲师的列表
      list: [],
      // 选中讲师的列表
      selection: [],

      // 页码
      page: {
        size: 4,
        totalElements: 0,
        totalPages: 0,
        number: 0,
      },
    };
  },
  computed: {},
  mounted: function () {
    this.loadData();
  },
  methods: {
    // 学员列表
    data(query, page, size) {
      this.loading = true;
      api.list(query, page, size).then((response) => {
        this.list = response._embedded ? response._embedded.trainerVoes : [];
        this.page = response.page;
        this.loading = false;
      });
    },
    // 模糊搜索
    search(key, page, size) {
      this.loading = true;
      api.search(key, page, size).then((response) => {
        this.list = response._embedded ? response._embedded.trainerVoes : [];
        this.page = response.page;
        this.loading = false;
      });
    },
    // 加载讲师数据
    loadData() {
      all.dept(null).then((response) => {
        this.items.dept.options = response._embedded.dboxVoes;
      });
      all.post(null).then((response) => {
        this.items.post.options = response._embedded.dboxVoes;
      });

      this.data(null, 0, this.page.size);
    },
    // 当筛选选择框更改时，更新所有筛选选项的可见控制开关
    handleItemChange() {
      for (let key in this.items) {
        let selected = this.dimensions.indexOf(key) !== -1;
        this.items[key].visible = selected ? true : false;
      }
    },
    // 当某个选择框更改时，将其值绑定到查询字典 query 中的对应字段
    handleOptionChange() {
      for (let key in this.items) {
        this.query[key] = this.items[key].value;
      }
    },
    // 将“0/1”转换为“男/女”
    getSex(sex) {
      return sex === "0" ? "男" : "女";
    },
    // 将部门数组转换为字符串
    getDept(dept) {
      return dept.join("，");
    },
    // 将“0/1”转换为“正式/临时”
    getStatus(status) {
      return status === "0" ? "正式" : "临时";
    },
    // 当选中讲师更改时，更新选中讲师列表
    handleSelectionChange(selection) {
      this.selection = selection;
    },
    // 新增讲师
    handleAdd() {
      this.$router.push({
        path: "/personnel/add-teacher",
        query: { option: "add" },
      });
    },
    // 删除讲师
    async handleDelete() {
      let count = this.selection.length; // 选中的讲师数量

      // 如果没有选中任何项，则提示并返回
      if (count === 0) {
        this.$message.warning("未选中任何讲师！");
        return;
      }

      // 删除确认
      await this.$confirm("是否确认删除选中的讲师？", "提示", {
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
                this.$message.success(`成功删除${count}位讲师。`);
            },
            // reject
            (errors) => {
              console.log(errors);
            }
          )
          .finally(() => this.handleReset());
      });
    },
    // 批量导入讲师
    handleImport() {
      this.$router.push("/personnel/import-teacher");
    },
    // 批量导出讲师
    handleExport() {
      return;
    },
    // 根据输入框、选择框和搜索框的条件筛选讲师
    handleSearch() {
      // 如果关键词为空，则说明不是模糊搜索
      if (!this.query.key) {
        this.data(this.query, 0, this.page.size);
      } // 否则，说明是模糊搜索
      else {
        this.search(this.query.key, 0, this.page.size);
      }
    },
    // 重置讲师列表
    handleReset() {
      // 清空查询字典
      for (let key in this.query) this.query[key] = undefined;
      // 清空选择框值并隐藏
      for (let key in this.items) {
        this.items[key].value = undefined;
        this.items[key].visible = false;
      }
      // 清空筛选维度选择框
      this.dimensions = [];
      // 重新加载数据
      this.loadData();
    },
    // 编辑某个讲师
    handleEdit(index) {
      let id = this.list[index].id;
      this.$router.push({
        path: "/personnel/edit-teacher",
        query: { option: "edit", id: id },
      });
    },
    // 查看某个讲师详情
    handleDetail(index) {
      let id = this.list[index].id;
      this.$router.push({
        path: "/personnel/teacher-detail",
        query: { id: id },
      });
    },
    pageSizeChange(size) {
      if (!this.query.key) {
        this.data(this.query, 0, size);
      } else {
        this.search(this.query.key, 0, size);
      }
    },
    pageCurrentChange(number) {
      console.log(number);
      if (!this.query.key) {
        this.data(this.query, number - 1, this.page.size);
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
</style>
