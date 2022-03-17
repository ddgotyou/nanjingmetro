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
                <!-- 用户组类型 -->
                <el-form-item label="用户组类型">
                  <el-select
                    v-model="form.roleType"
                    placeholder="请选择"
                    @change="handleChangeType"
                  >
                    <el-option
                      v-for="type in selection.types"
                      :key="type.key"
                      :label="type.label"
                      :value="type.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <!-- 权限模板 -->
                <el-form-item label="权限模板">
                  <el-select
                    v-model="form.authTemplate"
                    placeholder="请选择"
                    @change="handleChangeRole"
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
                    rows="5"
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
              <auth-card :value.sync="form.authority" />
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
                :titles="['可添加用户', '已添加用户']"
                :button-texts="['取消添加', '添加用户']"
                class="transfer"
                @change="handleChangeUser"
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
import * as api from "@/api/account/user_group";
import * as user from "@/api/account/user";
import * as role from "@/api/account/role";
import AuthCard from "@/views/components/AuthCard.vue";
import { clone, compare } from "@/utils/object";

export default {
  components: {
    AuthCard,
  },
  data: function () {
    return {
      test: "",
      // 用户组 ID
      id: null,

      // 编辑表单
      form: {
        name: "",
        roleType: "",
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
        // 用户组的用户
        users: [],
      },

      // 模板的权限表
      authority: {},

      // 表单中的选项值
      selection: {
        roles: [],
        types: [
          { key: "1", value: "管理员", label: "管理员" },
          { key: "2", value: "讲师", label: "讲师" },
          { key: "3", value: "学员", label: "学员" },
        ],
      },

      // 查询集
      query: {
        key: "",
      },

      // 可添加用户
      usersOptional: [],
      // 已添加用户
      usersAdded: [],
      // 穿梭框内容样式
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
    // 保存上一级菜单传递的用户组 ID
    this.id = this.$route.query.id;
    // 加载数据
    this.loadData();
  },
  methods: {
    // 加载数据
    async loadData() {
      // 获取所有角色模板
      role.list(this.$user.userId, 0, 1000).then((response) => {
        this.selection.roles = response._embedded.groupVoes.map(
          (element, index) => {
            return { key: index, value: element.name, label: element.name };
          }
        );
      });
      // 获取所有用户
      user.list(null).then((response) => {
        this.usersOptional = response._embedded.dboxVoes;
      });
      // 获取用户组详情
      await api.detail(this.id).then((response) => {
        this.form = response;
        for (let i in this.form.users) {
          let user = this.usersOptional.find(
            (element) => element.value === this.form.users[i]
          );
          if (user) this.usersAdded.push(user.key);
        }
        // 处理用户
        if (!this.form.users) this.form.users = [];
      });
    },
    // 用户类型发生改变
    handleChangeType(value) {
      switch (value) {
        case "管理员":
          this.form.authTemplate = "管理员";
          break;
        case "讲师":
          this.form.authTemplate = "讲师";
          break;
        case "学员":
          this.form.authTemplate = "学员";
          break;
      }
      this.handleChangeRole(this.form.authTemplate);
    },
    // 权限模板发生改变
    handleChangeRole(value) {
      // 返回对应 ID 的角色的详细信息
      role.detail(value).then((response) => {
        this.form.authority = clone(response.authority); // 将权限模板填充到对应表单
        this.authority = clone(response.authority); // 记录原权限模板
      });
    },
    // 用户组的用户发生改变
    handleChangeUser(value, direction, movedKeys) {
      if (direction === "left") {
        // 删除
        for (let i in movedKeys) {
          // 找到 key 对应的用户
          let user = this.usersOptional.find(
            (element) => element.key === movedKeys[i]
          );
          // 获取用户在表单的 users 数组中的索引
          let index = this.form.users.findIndex(
            (element) => element === user.value
          );
          // 在表单的 users 数组中删除该用户
          this.form.users.splice(index, 1);
        }
      } else if (direction === "right") {
        // 添加
        for (let i in movedKeys) {
          // 找到 key 对应的用户
          let user = this.usersOptional.find(
            (element) => element.key === movedKeys[i]
          );
          // 将用户名添加到表单的 users 数组中
          if (user) this.form.users.push(user.value);
        }
      }
    },
    // 模糊搜索用户
    handleSearch() {
      user.search(this.query.key).then((response) => {
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
    // 提交编辑表单
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

          api.edit(this.$user.userId, this.id, this.form).then((response) => {
            if (response.code === 200) {
              this.$message.success("编辑成功！");
              this.onCancel();
            } else {
              this.$message.error(response.msg);
            }
          });
        } else {
          this.$message.error("请按提示填写正确内容！");
        }
      });
    },
    // 取消，返回上一级菜单
    onCancel() {
      this.$router.push("/account/user-group");
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
