<template>
  <div class="app-container">
    <el-card class="card-box" style="width: 100%">
      <!-- 功能栏 -->
      <div slot="header">
        <div style="float: left">
          <el-button @click="addRole">新增</el-button>
          <el-button @click="exportRole">导出</el-button>
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
          :data="items"
          style="width: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
          @row-click="rowClick"
          @current-change="tableCurrentChange"
        >
          <el-table-column type="selection" />
          <el-table-column type="index" label="序号" width="" align="center" />
          <el-table-column prop="name" label="名称" width="" align="center" />
          <el-table-column prop="note" label="备注" width="" align="center" />
          <el-table-column
            prop="date"
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

    <!-- 新增角色对话框 -->
    <el-dialog title="新增角色" :visible.sync="dialogAddVisible" width="1000px">
      <el-row>
        <el-col :span="12">
          <el-card style="margin: 20px">
            <div slot="header">
              <span>基本信息</span>
            </div>
            <div class="form-box">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="名称">
                  <el-input v-model="form.name" style="width: 220px"></el-input>
                </el-form-item>
                <el-form-item label="权限模板">
                  <el-select v-model="form.permission" placeholder="权限模板">
                    <el-option key="1" label="XX角色" value="1" />
                    <el-option key="2" label="XX角色" value="2" />
                  </el-select>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input
                    type="textarea"
                    rows="5"
                    v-model="form.desc"
                    style="width: 220px"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card style="margin: 20px">
            <div slot="header">
              <span>权限设置</span>
            </div>
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="综合培训管理" name="1">
                <el-form ref="form" :model="form" label-width="100px">
                  <el-form-item
                    v-for="role in roles"
                    :key="role.value"
                    :label="role.label"
                  >
                    <el-radio-group v-model="form.permissions[role.value]">
                      <el-radio
                        v-for="item in options"
                        :key="item.value"
                        :label="item.value"
                        name="type"
                        >{{ item.label }}</el-radio
                      >
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </el-collapse-item>
              <el-collapse-item title="设备管理" name="2"> </el-collapse-item>
              <el-collapse-item title="综合信息展示" name="3">
              </el-collapse-item>
              <el-collapse-item title="可视化显示系统" name="4">
              </el-collapse-item>
              <el-collapse-item title="PAD考评终端" name="5">
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      pageSizes: [100, 200, 300, 400],
      pageSize: 100,
      totalPage: 400,
      currentPage: 1,
      items: [],
      selectedItem: null,
      addVisible: false,

      dialogAddVisible: false,
      form: {
        name: null,
        permission: null,
        desc: null,
        permissions: ["1", "1", "1"],
      },
      roles: [
        { value: "0", label: "学员管理" },
        { value: "1", label: "教师管理" },
        { value: "2", label: "用户组操作" },
      ],
      options: [
        { value: "1", label: "允许" },
        { value: "2", label: "仅查看" },
        { value: "3", label: "禁止访问" },
      ],
      users: [
        { key: 1, label: "丁仪" },
        { key: 2, label: "汪淼" },
        { key: 3, label: "罗辑" },
        { key: 4, label: "章北海" },
      ],
    };
  },
  mounted: function () {
    this.getData();
  },
  methods: {
    getData() {
      this.items = [
        {
          name: "XXX",
          note: null,
          date: "2021-08-01",
        },
        {
          name: "XXX",
          note: null,
          date: "2021-08-02",
        },
        {
          name: "XXX",
          note: null,
          date: "2021-08-03",
        },
      ];
    },
    pagingSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    pagingCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    addRole() {
      // this.$router.push("@/personnel/role_management/new_role");
      this.dialogAddVisible = true;
    },
    delRole() {},
    exportRole() {},
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
.card-box {
  width: 400px;
  max-width: 100%;
  margin: 20px auto;
}

.header-input {
  width: 750px;
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
