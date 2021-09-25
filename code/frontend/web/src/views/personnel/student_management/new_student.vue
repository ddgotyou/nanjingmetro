<template>
  <div class="app-container">
    <el-card class="card-box" style="width: 100%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名">
              <el-input v-model="form.name" class="same-width"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select
                v-model="form.sex"
                placeholder="性别"
                class="same-width"
              >
                <el-option key="1" label="男" value="1" />
                <el-option key="2" label="女" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="form.tel" class="same-width"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email" class="same-width"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
              <el-input v-model="form.id" class="same-width"></el-input>
            </el-form-item>
            <el-form-item label="用户组">
              <el-select
                v-model="form.userGroup"
                placeholder="用户组"
                class="same-width"
              >
                <el-option key="1" label="一" value="1" />
                <el-option key="2" label="二" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8"></el-col> -->
          <el-col :span="12">
            <el-form-item label="部门">
              <el-select
                v-model="form.sex"
                placeholder="部门"
                class="same-width"
              >
                <el-option key="1" label="1" value="1" />
                <el-option key="2" label="2" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="岗位">
              <el-select
                v-model="form.sex"
                placeholder="岗位"
                class="same-width"
              >
                <el-option key="1" label="1" value="1" />
                <el-option key="2" label="2" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="学历">
              <el-select
                v-model="form.sex"
                placeholder="学历"
                class="same-width"
              >
                <el-option key="1" label="1" value="1" />
                <el-option key="2" label="2" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="专业">
              <el-select
                v-model="form.sex"
                placeholder="专业"
                class="same-width"
              >
                <el-option key="1" label="1" value="1" />
                <el-option key="2" label="2" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="学员状态">
              <el-select
                v-model="form.sex"
                placeholder="学员状态"
                class="same-width"
              >
                <el-option key="1" label="1" value="1" />
                <el-option key="2" label="2" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button>查看电子档案</el-button>
              <el-button>导出电子档案</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div align="center">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      form: {
        name: null,
        sex: null,
        tel: null,
        email: null,
        id: null,
        userGroup: null,
      },
    };
  },
  computed: {},
  mounted: function () {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.card-box {
  width: 400px;
  max-width: 100%;
  margin: 20px auto;
}

.same-width {
  width: 350px;
}
</style>
