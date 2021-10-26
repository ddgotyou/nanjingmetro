<template>
  <div class="app-container">
    <!-- 顶部筛选栏 -->
    <div>
      <!-- 姓名筛选框 -->
      <el-input
        v-model="query.name"
        placeholder="姓名"
        style="width: 150px"
        class="mr10"
      />
      <!-- 身份证号筛选框 -->
      <el-input
        v-model="query.idcard"
        placeholder="身份证号"
        style="width: 200px"
        class="mr10"
      />
      <!-- 其他选择类筛选框 -->
      <el-select
        v-model="dimensions"
        multiple
        collapse-tags
        placeholder="请选择筛选项（可多选）"
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
    </div>

    <!-- 主体 -->
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

        <span>
          <!-- 搜索框 -->
          <el-input
            v-model="query.key"
            placeholder="模糊搜索框"
            style="width: 600px"
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

      <!-- 学员列表 -->
      <el-table
        v-loading="loading"
        :data="studentList"
        :default-sort="{ prop: 'id', order: 'descending' }"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" />
        <!-- 不显示，用来在选择到某个学员时同时获得其 ID -->
        <el-table-column v-if="false" prop="id" />
        <el-table-column prop="name" label="姓名" width="" align="center" />
        <el-table-column prop="sex" label="性别" width="" align="center">
          <template slot-scope="scope">
            {{ getStudentSex(scope.row.sex) }}
          </template>
        </el-table-column>
        <el-table-column prop="tel" label="联系电话" width="" align="center" />
        <el-table-column prop="dept" label="部门" width="" align="center">
          <template slot-scope="scope">
            {{ getStudentDept(scope.row.dept) }}
          </template>
        </el-table-column>
        <el-table-column prop="post" label="岗位" width="" align="center" />
        <el-table-column prop="edu" label="学历" width="" align="center" />
        <el-table-column prop="major" label="专业" width="" align="center" />
        <el-table-column prop="status" label="学员状态" width="" align="center">
          <template slot-scope="scope">
            {{ getStudentStatus(scope.row.status) }}
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
import {
  listStudent,
  delStudent,
  searchStudent,
} from "@/api/personnel/student";
import {
  listDept,
  listPost,
  listEdu,
  listMajor,
} from "@/api/personnel/personnel";

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
          key: "0",
          label: "性别",
          visible: false,
          value: undefined,
          options: [
            { key: "1", label: "男", value: "0" },
            { key: "2", label: "女", value: "1" },
          ],
        },
        dept: {
          key: "1",
          label: "部门",
          visible: false,
          value: undefined,
          options: [],
        },
        post: {
          key: "2",
          label: "岗位",
          visible: false,
          value: undefined,
          options: [],
        },
        edu: {
          key: "3",
          label: "学历",
          visible: false,
          value: undefined,
          options: [],
        },
        major: {
          key: "4",
          label: "专业",
          visible: false,
          value: undefined,
          options: [],
        },
        status: {
          key: "5",
          label: "学员状态",
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
      // 当前页面的学员的列表
      studentList: [],
      // 选中学员的列表
      studentSelection: [],

      // 页码
      page: {
        size: 0,
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
    // 加载学员数据
    loadData() {
      listDept(null).then((response) => {
        this.items.dept.options = response._embedded.dboxVoes;
      });
      listPost(null).then((response) => {
        this.items.post.options = response._embedded.dboxVoes;
        console.log(this.items.post.options);
      });
      listEdu(null).then((response) => {
        this.items.edu.options = response._embedded.dboxVoes;
      });
      listMajor(null).then((response) => {
        this.items.major.options = response._embedded.dboxVoes;
      });

      this.loading = true;
      listStudent(null).then((response) => {
        if (response._embedded)
          this.studentList = response._embedded.traineeVoes;
        // this.page = response.page;
        this.loading = false;
      });
    },
    // 当筛选选择框更改时，更新所有筛选选项的可见控制开关
    handleItemChange() {
      for (var key in this.items) {
        let selected = this.dimensions.indexOf(key) !== -1;
        this.items[key].visible = selected ? true : false;
      }
    },
    // 当某个选择框更改时，将其值绑定到查询字典 query 中的对应字段
    handleOptionChange() {
      for (var key in this.items) {
        this.query[key] = this.items[key].value;
      }
    },
    // 将“0/1”转换为“男/女”
    getStudentSex(sex) {
      return sex === "0" ? "男" : "女";
    },
    // 将部门数组转换为字符串
    getStudentDept(dept) {
      return dept.join("，");
    },
    // 将“0/1”转换为“正式/临时”
    getStudentStatus(status) {
      return status === "0" ? "正式" : "临时";
    },
    // 当选中学员更改时，更新选中学员列表
    handleSelectionChange(selection) {
      this.studentSelection = selection;
    },
    // 新增学员
    handleAdd() {
      this.$router.push({
        path: "/personnel/add-student",
        query: { option: "add" },
      });
    },
    // 删除学员
    async handleDelete() {
      let stuNum = this.studentSelection.length; // 选中的学员数量

      // 如果没有选中任何项，则提示并返回
      if (stuNum === 0) {
        this.$message.warning("未选中任何学员！");
        return;
      }

      // 逐个删除
      let flags = new Array(stuNum).fill(false); // 用来记录删除是否成功的标志
      for (var i = 0; i < stuNum; i++) {
        await delStudent(this.studentSelection[i].id).then((response) => {
          let code = response._embedded.responses[0].code;
          if (code === "200") flags[i] = true;
        });
      }

      // 提示或刷新数据
      // 如果标志数组中没有 false，则提示删除成功并重置数据
      let success = (await flags.indexOf(false)) === -1;
      if (success) {
        this.$message.success(`删除成功！共删除 ${stuNum} 位学员。`);
        this.loadData();
      } else {
        this.$message.error("删除失败！");
      }
    },
    // 批量导入学员
    handleImport() {
      this.$router.push("/personnel/import-student");
    },
    // 批量导出学员
    handleExport() {
      return;
    },
    // 根据输入框、选择框和搜索框的条件筛选学员
    handleSearch() {
      // 如果关键词为空，则说明不是模糊搜索
      if (!this.query.key) {
        this.loading = true;
        listStudent(this.query).then((response) => {
          this.studentList = response._embedded
            ? response._embedded.traineeVoes
            : [];
          this.loading = false;
        });
      } // 否则，说明是模糊搜索
      else {
        this.loading = true;
        searchStudent(this.query.key).then((response) => {
          this.studentList = response._embedded
            ? response._embedded.traineeVoes
            : [];
          this.loading = false;
        });
      }
    },
    // 重置学员列表
    handleReset() {
      // 清空查询字典
      for (var key in this.query) this.query[key] = undefined;
      // 清空选择框值并隐藏
      for (var key in this.items) {
        this.items[key].value = undefined;
        this.items[key].visible = false;
      }
      // 清空筛选维度选择框
      this.dimensions = [];
      // 重新加载数据
      this.loadData();
    },
    // 编辑某个学员
    handleEdit(index) {
      let id = this.studentList[index].id;
      this.$router.push({
        path: "/personnel/edit-student",
        query: { option: "edit", id: id },
      });
    },
    // 查看某个学员详情
    handleDetail(index) {
      let id = this.studentList[index].id;
      this.$router.push({
        path: "/personnel/student-detail",
        query: { id: id },
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
.mr10 {
  margin-right: 10px;
}

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
