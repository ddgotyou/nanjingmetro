<template>
  <el-form id="form">
    <el-collapse>
      <el-collapse-item title="综合培训管理" align="center">
        <el-collapse>
          <el-collapse-item>
            <template #title>
              <div class="point" />
              <span class="subtitle">人员管理</span>
            </template>
            <el-form-item label="学员管理">
              <auth-radio-group
                :value.sync="authority.synthTrainMgt.staffMgt.stuMgt"
              />
            </el-form-item>
            <el-form-item label="讲师管理">
              <auth-radio-group
                :value.sync="authority.synthTrainMgt.staffMgt.tchMgt"
              />
            </el-form-item>
            <el-form-item label="用户组">
              <auth-radio-group
                :value.sync="authority.synthTrainMgt.staffMgt.usrGrp"
              />
            </el-form-item>
            <el-form-item label="角色管理">
              <auth-radio-group
                :value.sync="authority.synthTrainMgt.staffMgt.roleMgt"
              />
            </el-form-item>
            <el-form-item label="信息统计">
              <auth-radio-group
                :value.sync="authority.synthTrainMgt.staffMgt.infoStat"
              />
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item>
            <template #title>
              <div class="point" />
              <span class="subtitle">培训组织管理</span>
            </template>
            <el-form-item label="计划编辑">
              <auth-radio-group
                :value.sync="authority.synthTrainMgt.trianOrgMgt.planEdit"
              />
            </el-form-item>
            <el-form-item label="计划审批">
              <auth-radio-group
                :value.sync="authority.synthTrainMgt.trianOrgMgt.planApproval"
              />
            </el-form-item>
            <el-form-item label="计划实施">
              <auth-radio-group
                :value.sync="authority.synthTrainMgt.trianOrgMgt.planImpl"
              />
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item>
            <template #title>
              <div class="point" />
              <span class="subtitle">培训过程监控</span>
            </template>
            <el-form-item label="考勤管理">
              <auth-radio-group
                :value.sync="
                  authority.synthTrainMgt.trainProcMonitor.attendanceMgt
                "
              />
            </el-form-item>
            <el-form-item label="计划监控">
              <auth-radio-group
                :value.sync="
                  authority.synthTrainMgt.trainProcMonitor.planMonitor
                "
              />
            </el-form-item>
            <el-form-item label="视频监控">
              <auth-radio-group
                :value.sync="
                  authority.synthTrainMgt.trainProcMonitor.videoMonitor
                "
              />
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item>
            <template #title>
              <div class="point" />
              <span class="subtitle">效果评估管理</span>
            </template>
            <el-form-item label="数据管理">
              <auth-radio-group
                :value.sync="authority.synthTrainMgt.effectEvalMgt.dataMgt"
              />
            </el-form-item>
            <el-form-item label="统计分析">
              <auth-radio-group
                :value.sync="authority.synthTrainMgt.effectEvalMgt.statAnaly"
              />
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
      </el-collapse-item>
      <el-collapse-item title="设备管理" align="center">
        <el-form-item label="设备管理">
          <auth-radio-group :value.sync="authority.devMgt.devMgt" />
        </el-form-item>
        <el-form-item label="状态监控">
          <auth-radio-group :value.sync="authority.devMgt.statusMonitor" />
        </el-form-item>
        <el-form-item label="维护保养">
          <auth-radio-group :value.sync="authority.devMgt.maintenance" />
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="综合信息展示" align="center">
        <auth-radio-group :value.sync="authority.synthInfoDisp" />
      </el-collapse-item>
      <el-collapse-item title="可视化显示系统" align="center">
        <auth-radio-group :value.sync="authority.visualDispSys" />
      </el-collapse-item>
      <el-collapse-item title="系统功能" align="center">
        <el-form-item label="登录系统">
          <auth-radio-group :value.sync="authority.sysFunc.login" />
        </el-form-item>
        <el-form-item label="退出系统">
          <auth-radio-group :value.sync="authority.sysFunc.logout" />
        </el-form-item>
        <el-form-item label="修改密码">
          <auth-radio-group :value.sync="authority.sysFunc.chgPsw" />
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="PAD考评终端" align="center">
        <auth-radio-group :value.sync="authority.padEvalTerm" />
      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>

<script>
import AuthRadioGroup from "@/views/components/AuthRadioGroup.vue";

export default {
  components: {
    AuthRadioGroup,
  },
  props: ["value"],
  data() {
    return {};
  },
  computed: {
    authority: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("update:value", value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.subtitle {
  /* font-size: 12px; */
  color: slategray;
  margin-left: 20px;
}

.point {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: lightgray;
}
</style>