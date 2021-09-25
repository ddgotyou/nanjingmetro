<template>
  <div class="app-container">
    <el-card class="card-box" style="width: 100%">
      <el-row>
        <el-col :span="12">
          <el-card style="margin: 20px">
            <div slot="header">
              <span>基本信息</span>
            </div>
            <div class="form-box">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="名称">
                  <el-input v-model="form.name" class="same-width"></el-input>
                </el-form-item>
                <el-form-item label="权限模板">
                  <el-select v-model="form.permission" placeholder="权限模板" class="same-width">
                    <el-option key="1" label="XX角色" value="1" />
                    <el-option key="2" label="XX角色" value="2" />
                  </el-select>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input
                    type="textarea"
                    rows="5"
                    v-model="form.desc"
                    class="same-width"
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
    </el-card>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
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
    };
  },
  mounted: function () {
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.card-box {
  width: 400px;
  max-width: 100%;
  margin: 20px auto;
}

.same-width {
  width: 400px;
}
</style>
