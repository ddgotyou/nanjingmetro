<template>
  <div class="app-container">
    <el-card class="card-box" style="width: 100%">
      <el-form ref="form" :model="form" label-width="auto">
        <el-row :gutter="20">
          <el-col :span="12">
            <!-- 基本信息卡片 -->
            <el-card>
              <div slot="header">
                <span>基本信息</span>
              </div>
              <el-col :span="22">
                <!-- 名称 -->
                <el-form-item label="名称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <!-- 权限模板 -->
                <el-form-item label="权限模板">
                  <el-select v-model="form.authTemplate" placeholder="权限模板">
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
                    v-model="form.remark"
                    type="textarea"
                    rows="7"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-card>
          </el-col>

          <el-col :span="12">
            <!-- 权限设置卡片 -->
            <el-card>
              <div slot="header">
                <span>权限设置</span>
              </div>
              <auth-card :value="form.authority" />
            </el-card>
          </el-col>
        </el-row>

        <el-row>
          <div align="center">
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="onCancel">取消</el-button>
          </div>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import AuthCard from "@/views/components/AuthCard.vue";

export default {
  components: {
    AuthCard,
  },
  data: function () {
    return {
      // 用户组表单
      form: {
        name: "",
        authTemplate: null,
        remark: "",
        authority: {
          // 标记
          flag: "false",
          // 综合培训管理
          synthTrainMgt: {
            // 人员管理
            staffMgt: {
              stuMgt: "", // 学员管理
              tchMgt: "", // 讲师管理
              usrGrp: "", // 用户组
              roleMgt: "", // 角色管理
              infoStatic: "1", // 信息统计
            },
            // 培训组织管理
            trianOrgMgt: {
              planEdit: "", // 计划编辑
              planApproval: "", // 计划审批
              planImpl: "", // 计划实现
            },
            // 培训过程监控
            trainProcMonitor: {
              attendanceMgt: "", // 出勤管理
              planMonitor: "", // 计划监控
              videoMonitor: "", // 视频监控
            },
            // 效果评估管理
            effectEvalMgt: {
              dataMgt: "", // 数据管理
              staticAnaly: "", // 统计分析
            },
          },
          // 设备管理
          devMgt: {
            devMgt: "", // 设备管理
            statusMonitor: "", // 状态监控
            maintenance: "", // 维护保养
          },
          // 综合信息展示
          synthInfoDisp: "",
          // 可视化显示系统
          visualDispSys: "",
          // 系统功能
          sysFunc: {
            login: "1", // 登录系统
            logout: "2", // 退出系统
            chgPsw: "3", // 修改密码
          },
          // PAD 考评终端
          padEvalTerm: "",
        },
      },

      // 选择框内容
      selection: {
        roles: [
          { key: "1", value: "0", label: "管理员" },
          { key: "2", value: "1", label: "教师" },
          { key: "3", value: "2", label: "学员" },
        ],
      },
    };
  },
  mounted: function () {},
  methods: {
    // 提交新增或修改的表单
    onSubmit() {
      console.log(this.form);
      return;
      this.$refs["form"].validate((valid) => {
        if (valid) {
        } else {
          this.$message.error("请按提示填写正确内容！");
        }
      });
    },
    // 取消，返回上一级菜单
    onCancel() {
      this.$router.push("/personnel/role-management");
    },
  },
};
</script>

<style lang="scss" scoped>
.card-box {
  max-width: 100%;
  margin: 20px auto;
}

.el-row {
  margin-top: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
