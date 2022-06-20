<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="7">
        <el-card class="card-box dept-tree">
          <!-- 标题栏 -->
          <span slot="header">部门</span>

          <span>
            <el-input v-model="query.keyword" @keyup.enter.native="handleDeptSearch">
              <template #append>
                <el-button icon="el-icon-search" type="primary" @click="handleDeptSearch" ></el-button>
              </template>
            </el-input>
          </span>
          <el-tree
            :data="tree"
            show-checkbox
            node-key="id"
            ref="DeptTree"
            @node-click="handleNodeClick"
            class="tree"
          >
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="17">
        <!-- 筛选栏 -->
        <el-card class="card-box">
          <!-- 标题栏 -->
          <div slot="header">筛选框</div>

          <!-- 筛选选项 -->
          <el-form
            label-width="auto"
            label-position="right"
            @submit.native.prevent
          >
            <el-row :gutter="10">
              <el-col :span="3">
                <el-form-item>
                  <!-- 姓名筛选框 -->
                  <el-input
                    v-model="query.name"
                    placeholder="姓名"
                    @keyup.enter.native="handleSearch"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                  <!-- 身份证号筛选框 -->
                  <el-input
                    v-model="query.idcard"
                    placeholder="身份证号"
                    @keyup.enter.native="handleSearch"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item>
                  <!-- 其他选择类筛选框 -->
                  <el-select
                    v-model="dimensions"
                    multiple
                    collapse-tags
                    placeholder="请选择筛选项（多选）"
                    style="width: 180px"
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
                      style="width: 100px"
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
              <el-col :span="8">
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
              </el-col>
            </el-row>
            <el-form-item>
              <div style="float: left">
                <!-- 新增按钮 -->
                <el-button
                  :disabled="perm.add"
                  plain
                  type="primary"
                  icon="el-icon-plus"
                  @click="handleAdd"
                  >新增</el-button
                >
                <!-- 删除按钮 -->
                <el-button
                  :disabled="perm.delete"
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
                <download-excel
                  :data="table"
                  :fields="fields"
                  type="xls"
                  header="学员列表"
                  name="学员列表"
                  class="export-button"
                >
                  <el-button
                    plain
                    type="warning"
                    icon="el-icon-download"
                    @click="handleExport"
                    >导出</el-button
                  >
                </download-excel>
              </div>
            </el-form-item>
          </el-form>
        </el-card>

        <!-- 主体 -->
        <el-card class="card-box table-section">
          <!-- 标题栏 -->
          <div slot="header">人员列表</div>

          <!-- 人员列表 -->
          <el-table
            v-loading="loading"
            :data="data"
            :default-sort="{ prop: 'id', order: 'descending' }"
            stripe
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" />
            <!-- 不显示，用来在选择到某个学员时同时获得其 ID -->
            <el-table-column v-if="false" prop="id" />
            <el-table-column prop="no" label="工号" width="70" align="center" />
            <el-table-column
              prop="nickname"
              label="姓名"
              width="70"
              align="center"
            />
            <el-table-column
              prop="name"
              label="用户名"
              :show-overflow-tooltip="true"
              align="center"
            />
            <el-table-column
              :show-overflow-tooltip="true"
              label="部门"
              align="center"
            >
              <template slot-scope="scope">
                {{ getDept(scope.row.dept) }}
              </template>
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              label="岗位"
              align="center"
            >
              <template slot-scope="scope">
                {{ getPost(scope.row.post) }}
              </template>
            </el-table-column>
            <el-table-column label="状态" width="50" align="center">
              <template slot-scope="scope">
                {{ getType(scope.row.type) }}
              </template>
            </el-table-column>
            <el-table-column prop="enabled" label="操作" align="center">
              <template slot-scope="scope">
                <!-- 单条详情按钮 -->
                <el-button type="text" @click="handleDetail(scope.$index)">
                  详情
                </el-button>
                <!-- 单条编辑按钮 -->
                <el-button
                  :disabled="perm.edit"
                  type="text"
                  @click="handleEdit(scope.$index)"
                >
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as api from "@/api/account/user";
import * as dept from "@/api/account/dept";
import * as sel from "@/api/account/selection";
import JsonExcel from "vue-json-excel";
import { param } from "../../../utils";

export default {
  components: {
    DownloadExcel: JsonExcel,
  },
  data: function () {
    return {
      // 权限
      perm: {
        add: false,
        delete: false,
        edit: false,
      },

      // 部门树
      tree: [],

      // 导出Excel表格的表头设置
      fields: {
        姓名: "name",
        性别: "sex",
        联系电话: "tel",
        部门: "dept",
        学历: "edu",
        专业: "major",
        学员状态: "status",
      },
      table: [],

      // 查询集
      query: {
        keyword: "",
        dept: "",
        // key: "",
        // name: "",
        // idcard: "",
        // sex: "",
        // post: "",
        // edu: "",
        // major: "",
        // status: "",
      },
      // 查询类型
      queryType: "list",

      // 选中筛选维度的列表
      dimensions: [],
      // 所有筛选维度的列表
      items: {
        sex: {
          key: "0",
          label: "性别",
          visible: false,
          value: "",
          options: [
            { key: "1", label: "男", value: "0" },
            { key: "2", label: "女", value: "1" },
          ],
        },
        dept: {
          key: "1",
          label: "部门",
          visible: false,
          value: "",
          options: [],
        },
        post: {
          key: "2",
          label: "岗位",
          visible: false,
          value: "",
          options: [],
        },
        edu: {
          key: "3",
          label: "学历",
          visible: false,
          value: "",
          options: [],
        },
        major: {
          key: "4",
          label: "专业",
          visible: false,
          value: "",
          options: [],
        },
        type: {
          key: "5",
          label: "学员状态",
          visible: false,
          value: "",
          options: [
            { key: "1", label: "正式", value: "0" },
            { key: "2", label: "临时", value: "1" },
          ],
        },
      },

      // 遮罩层
      loading: true,
      // 当前页面的学员的列表
      data: [],
      // 选中学员的列表
      selection: [],

      // 页码
      page: {
        size: 10,
        totalElements: 0,
        totalPages: 0,
        number: 0,
      },
      // 总数量
      totalElements: 0,
    };
  },
  computed: {
    getTable() {
      // 有模糊/严格查询，则返回查询结果
      if (this.queryType !== "list") return this.list;
      // 没有，则返回所有学员
      else return this.table;
    },
  },
  mounted: function () {
    dept.tree(null).then((response) => {
      this.tree = response._embedded.linkedHashMaps;
    });
    this.loadData({}, 0, this.page.size);
  },
  methods: {
    // 搜索部门
    handleDeptSearch() {},
    // 加载人员数据
    loadData(query, page, size) {
      let params = query;
      if (page !== null) params['page'] = page;
      if (size !== null) params['size'] = size;
      
      console.log(params);

      this.loading = true;
      api
        .list(params)
        .then((response) => {
          console.log(response)
          this.data = response._embedded.userNewVoes || [];
          this.page = response.page;
          this.loading = false;
        })
        .catch((error) => {
          this.data = [];
          this.loading = false;
        });
    },
    // 点击部门，加载对应人员
    handleNodeClick(data, node, obj) {
      console.log(data.label);
      this.loadData({ dept: data.label }, 0, this.page.size);
    },
    // 将部门数组转换为字符串
    getDept(dept) {
      return (dept || []).join('，');
    },
    // 将岗位数组转换为字符串
    getPost(post) {
      return (post || []).join('，');
    },
    // 将“0/1”转换为“正式/临时”
    getType(type) {
      return type === "0" ? "正式" : "临时";
    },
    
    // 当筛选选择框更改时，更新所有筛选选项的可见控制开关
    handleItemChange() {
      for (let key in this.items) {
        let selected = this.dimensions.indexOf(key) !== -1;
        this.items[key].visible = selected ? true : false;

        // 所有未选中的字段置 ""
        if (!selected) this.query[key] = this.items[key].value = "";
      }
    },
    // 当某个选择框更改时，将其值绑定到查询字典 query 中的对应字段
    handleOptionChange() {
      for (let key in this.items) {
        this.query[key] = this.items[key].value;
      }
    },

    // 判断查询字典是否为空
    getQueryType() {
      let query = {}
      for (let attr in this.query) {
        let value = this.query[attr];
        if (value) query[attr] = value;
      }
      return query;
    },
    // 当选中学员更改时，更新选中学员列表
    handleSelectionChange(selection) {
      this.selection = selection;
    },
    // 新增学员
    handleAdd() {
      this.$router.push({ path: "/account/add-trainee" });
    },
    // 删除学员
    handleDelete() {
      let count = this.selection.length; // 选中的学员数量

      // 如果没有选中任何项，则提示并返回
      if (count === 0) {
        this.$message.warning("未选中任何学员！");
        return;
      }

      // 删除确认
      this.$confirm("是否确认删除选中的学员？", "提示", {
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
              .del(this.$user.userId, this.selection[i].id)
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
                this.$message.success(`成功删除${count}位学员。`);
            },
            // reject
            (errors) => {
              console.log(errors);
            }
          )
          .finally(() => this.handleReset());
      });
    },
    // 批量导入学员
    handleImport() {
      this.$router.push("/account/import-trainee");
    },
    // 批量导出学员
    handleExport() {},
    // 根据输入框、选择框和搜索框的条件筛选学员
    handleSearch() {
      this.queryType = this.getQueryType();
      if (this.queryType === "search") {
        // 模糊查询
        this.search(this.query.key, 0, this.page.size);
      } else if (this.queryType === "query") {
        // 严格查询
        this.data(this.query, 0, this.page.size);
      } else {
        // 无查询
        this.data({}, 0, this.page.size);
      }
    },
    // 重置学员列表
    handleReset() {
      // 清空查询字典
      for (var key in this.query) this.query[key] = "";
      // 清空选择框值并隐藏
      for (var key in this.items) {
        this.items[key].value = "";
        this.items[key].visible = false;
      }
      // 清空筛选维度选择框
      this.dimensions = [];
      // 重新加载数据
      this.loadData();
    },
    // 编辑某个学员
    handleEdit(index) {
      this.$router.push({
        path: "/account/edit-trainee",
        query: { id: this.list[index].id },
      });
    },
    // 查看某个学员详情
    handleDetail(index) {
      let id = this.list[index].id;
      this.$router.push({
        path: "/account/personnel-detail",
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

.table-section {
  height: 745px;
}

.mr10 {
  margin-right: 10px;
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

.dept-tree {
  height: 960px;
  .tree {
    margin-top: 10px;
    height: 300px;
    overflow: auto;
  }
}
</style>
