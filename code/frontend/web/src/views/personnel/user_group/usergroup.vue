<template>
  <div class="app-container">
    <el-card class="card-box" style="width: 100%">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :span="12">
            <!-- 基本信息卡片 -->
            <el-card class="card-margin">
              <div slot="header">
                <span>基本信息</span>
              </div>
              <div>
                <!-- 名称 -->
                <el-form-item label="名称">
                  <el-input v-model="form.name" class="same-width"></el-input>
                </el-form-item>
                <!-- 权限模板 -->
                <el-form-item label="权限模板">
                  <el-select
                    v-model="form.authTemplate"
                    placeholder="权限模板"
                    class="same-width"
                  >
                    <el-option
                      v-for="role in selection.roles"
                      :key="role.key"
                      :label="role.label"
                      :value="role.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <!-- 描述 -->
                <el-form-item label="描述">
                  <el-input
                    v-model="form.desc"
                    type="textarea"
                    rows="5"
                    class="same-width"
                  ></el-input>
                </el-form-item>
              </div>
            </el-card>
          </el-col>

          <el-col :span="12">
            <!-- 权限设置卡片 -->
            <el-card class="card-margin">
              <div slot="header">
                <span>权限设置</span>
              </div>
              <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="综合培训管理" name="1">
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

        <el-row>
          <!-- 人员添加卡片 -->
          <el-card class="card-margin">
            <div slot="header">
              <span>人员添加</span>
            </div>

            <!-- 模糊搜索框 -->
            <el-row>
              <span>
                <el-input
                  v-model="query.key"
                  placeholder="模糊搜索框"
                  style="width: 900px"
                  class="header-input"
                />
              </span>

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
            </el-row>

            <!-- 穿梭框 -->
            <el-row style="margin-top: 20px">
              <el-transfer
                v-model="usersAdded"
                :data="usersOptional"
                :render-content="renderContent"
                :titles="['可添加用户', '暂存添加用户']"
                :button-texts="['取消添加', '添加用户']"
                class="transfer"
              ></el-transfer>
            </el-row>
          </el-card>
        </el-row>

        <el-row>
          <el-form-item align="center">
            <el-button type="primary" :disabled="disabled" @click="onSubmit"
              >提交</el-button
            >
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      // 用户组表单
      form: {
        name: undefined,
        authTemplate: undefined,
        desc: undefined,
        permissions: ["1", "1", "1"],
      },

      // 选择框内容
      selection: {
        roles: [
          { key: "1", value: "0", label: "管理员" },
          { key: "2", value: "1", label: "教师" },
          { key: "3", value: "2", label: "学员" },
        ],
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

      // 查询字典
      query: {
        key: undefined,
      },

      usersAdded: [],
      usersOptional: [
        { key: 1, label: "丁仪" },
        { key: 2, label: "汪淼" },
        { key: 3, label: "罗辑" },
        { key: 4, label: "章北海" },
      ],
      renderContent(h, option) {
        return (
          <span>
            {option.key} . {option.label}
          </span>
        );
      },
    };
  },
  mounted: function () {
    // 获取所有用户，填入穿梭框
    this.loadData();
  },
  methods: {
    // 加载某个用户组数据
    loadData() {},
    // 提交新增或修改的表单
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
        } else {
          this.$message.error("请按提示填写正确内容！");
        }
      });
    },
    // 取消，返回上一级菜单
    onCancel() {
      this.$router.push("/personnel/user-group");
    },
  },
};
</script>

<style lang="scss" scoped>
.card-box {
  max-width: 100%;
  margin: 20px auto;
}

.card-margin {
  margin: 15px;
}

.same-width {
  width: 400px;
}

.header-input {
  display: inline-block;
  margin-left: 10px;
  margin-right: 10px;
}

.transfer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
