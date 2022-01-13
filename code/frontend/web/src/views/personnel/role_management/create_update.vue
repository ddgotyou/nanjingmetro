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
import * as api from "@/api/personnel/role";
import AuthCard from "@/views/components/AuthCard.vue";

export default {
  components: {
    AuthCard,
  },
  data: function () {
    return {
      // 操作类型，“提交”或“编辑”
      option: "",
      // 要“编辑”的角色 ID
      id: undefined,

      // 角色表单
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

      // 选择框内容
      selection: {
        roles: [],
      },
    };
  },
  mounted: function () {
    // 接受 index 页面传递的参数，并保存
    this.option = this.$route.query.option;
    this.id = this.$route.query.id;
    // 获取所有角色，填入穿梭框
    this.loadData();
  },
  methods: {
    // 加载数据
    loadData() {
      // 获取所有角色模板
      api.list(null).then((response) => {
        this.selection.roles = response._embedded.groupVoes.map(
          (element, index) => {
            return { key: index, value: element.id, label: element.name };
          }
        );
      });

      // 如果是“编辑”，还需要填入角色信息
      if (this.option === "edit") {
        api.detail(this.id).then((response) => {
          this.form = response;
        });
      }
    },
    // 权限模板发生改变
    handleChange(value) {
      // 返回对应 id 的角色的详细信息
      api.detail(this.form.authTemplate).then((response) => {
        // 将权限模板填充到对应表单
        this.form.authority = response.authority;
        // 保存原模板
        this.template = response.authority;
      });
    },
    // 提交新增用户组的表单
    optionAdd() {
      api.add(this.form).then((response) => {
        if (response.code === 200) {
          this.$message.success("添加成功！");
          this.onCancel();
        } else {
          this.$message.error(response.msg);
        }
      });
    },
    // 提交修改用户组的表单
    optionEdit() {
      api.edit(this.id, this.form).then((response) => {
        if (response.code === 200) {
          this.$message.success("修改成功！");
          this.onCancel();
        } else {
          this.$message.error(response.msg);
        }
      });
    },
    // 提交新增或修改的表单
    onSubmit() {
      this.form.authTemplate = null;

      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.option === "add") this.optionAdd();
          else if (this.option === "edit") this.optionEdit();
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
