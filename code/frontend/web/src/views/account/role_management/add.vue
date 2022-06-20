<template>
  <div class="app-container">
    <el-card class="card-box" style="width: 100%">
      <el-form ref="form" :model="form" :rules="rules" label-width="auto">
        <el-row :gutter="20">
          <el-col :span="12">
            <!-- 基本信息卡片 -->
            <el-card>
              <div slot="header">
                <span>基本信息</span>
              </div>
              <el-col :span="22">
                <!-- 名称 -->
                <el-form-item label="名称" prop="name">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <!-- 权限模板 -->
                <el-form-item label="权限模板">
                  <el-select
                    v-model="form.authTemplate"
                    placeholder="权限模板"
                    @change="handleChange"
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
import * as api from "@/api/account/role";
import AuthCard from "@/views/components/AuthCard.vue";
import { clone, compare } from "@/utils/object";

export default {
  components: {
    AuthCard,
  },
  data: function () {
    return {
      // 新增表单
      form: {
        name: "",
        authTemplate: null,
        remark: "",
        authority: {
          // 人员管理
          staffMgt: {
            stuMgt: "", // 学员管理
            tchMgt: "", // 讲师管理
            usrGrpMgt: "", // 用户组
            roleMgt: "", // 角色管理
            infoStat: "", // 信息统计
          },
          // 培训组织管理
          trainOrg: {
            planEdit: "", // 计划编辑
            planApproval: "", // 计划审批
            planImpl: "", // 计划实现
            planQuery: "", // 计划查询
            taskAppoint: "", // 任务预约
          },
          // 培训过程监控
          trainProc: {
            planMonitor: "", // 计划监控
            attendMgt: "", // 出勤管理
            videoMonitor: "", // 视频监控
          },
          // 效果评估管理
          effectEval: {
            dataMgt: "", // 数据管理
            statAnaly: "", // 统计分析
          },
          // 设备管理
          devMgt: {
            devMgt: "", // 设备管理
            monitorMgt: "", // 监控管理
            maintenance: "", // 维护保养
            devRepair: "", // 设备维修
          },
          // 综合信息展示
          synthInfoDisp: {
            synthInfoDisp: "", // 综合信息展示
          },
        },
      },
      authority: "",

      // 表单中的选项值
      selection: {
        roles: [],
      },

      rules: {
        name: [
          {
            type: "string",
            required: true,
            message: "请输入名称",
          },
        ],
      },
    };
  },
  mounted: function () {
    this.loadData();
  },
  methods: {
    // 加载数据
    loadData() {
      // 获取所有角色模板
      api.list(0, 1000).then((response) => {
        this.selection.roles = response._embedded.roleVoes.map(
          (element) => {
            return { key: element.id, value: element.name, label: element.name };
          }
        );
      });
    },
    // 权限模板发生改变
    handleChange(value) {
      // 返回对应 ID 的角色的详细信息
      api.detail(this.form.authTemplate).then((response) => {
        this.form.authority = clone(response.authority); // 将权限模板填充到对应表单
        this.authority = clone(response.authority); // 记录原权限模板
      });
    },
    // 提交新增表单
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // 检查是否改动了权限模板
          if (!compare(this.authority, this.form.authority))
            this.form.authTemplate = null;

          // 检查权限模板是否有空项
          let flag = false;
          for (let level1 in this.form.authority) {
            let dict = this.form.authority[level1];
            for (let level2 in dict) {
              if (!dict[level2]) flag = true;
            }
          }
          if (flag) {
            this.$message.warning("请选择未选的权限项！");
            return;
          }

          api.add(this.form).then((response) => {
              this.$message.success("新增成功！");
              this.onCancel();
          });
        } else {
          this.$message.warning("请按提示填写正确内容！");
        }
      });
    },
    // 取消，返回上一级菜单
    onCancel() {
      this.$router.push("/account/role-management");
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
