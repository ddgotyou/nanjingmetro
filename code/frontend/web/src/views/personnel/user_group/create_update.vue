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
          <!-- 人员添加卡片 -->
          <el-card>
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
                  @keyup.enter.native="handleSearch"
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
import { listUser, searchUser } from "@/api/personnel/user_group";
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
        // 用户组的用户
        users: [],
      },

      // 选择框内容
      selection: {
        roles: [
          { key: "1", value: "0", label: "管理员" },
          { key: "2", value: "1", label: "教师" },
          { key: "3", value: "2", label: "学员" },
        ],
      },

      // 查询字典
      query: {
        key: undefined,
      },

      // 可选的用户
      usersOptional: [],
      // 缓存的用户
      usersAdded: [],
      renderContent(h, option) {
        return (
          <span>
            {option.key} : {option.label}
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
    loadData() {
      listUser(null).then((response) => {
        this.usersOptional = response._embedded.dboxVoes;
      });
    },
    handleChange() {},
    // 模糊搜索用户
    handleSearch() {
      searchUser(this.query.key).then((response) => {
        this.usersOptional = response._embedded.dboxVoes;
      });
    },
    // 重置用户列表
    handleReset() {
      this.query.key = "";
      this.usersOptional = []; // 不是冗余，为了视觉上先清空再出现列表
      this.usersAdded = [];
      this.loadData();
    },
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

.el-row {
  margin-top: 20px;
  &:last-child {
    margin-bottom: 0;
  }
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
