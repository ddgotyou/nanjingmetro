<template>
  <el-form id="form">
    <el-collapse>
      <el-collapse-item title="人员管理" align="center">
        <el-form-item label="学员管理">
          <auth-radio-group
            :value.sync="authority.staffMgt.stuMgt"
            :options="[true, false, true, true]"
          />
        </el-form-item>
        <el-form-item label="讲师管理">
          <auth-radio-group
            :value.sync="authority.staffMgt.tchMgt"
            :options="[true, false, true, true]"
          />
        </el-form-item>
        <el-form-item label="用户组管理">
          <auth-radio-group
            :value.sync="authority.staffMgt.usrGrpMgt"
            :options="[true, false, false, true]"
          />
        </el-form-item>
        <el-form-item label="角色管理">
          <auth-radio-group
            :value.sync="authority.staffMgt.roleMgt"
            :options="[true, false, false, true]"
          />
        </el-form-item>
        <el-form-item label="信息统计">
          <auth-radio-group
            :value.sync="authority.staffMgt.infoStat"
            :options="[true, false, false, true]"
          />
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="培训组织" align="center">
        <el-form-item label="计划编辑">
          <auth-radio-group
            :value.sync="authority.trainOrg.planEdit"
            :options="[true, true, false, true]"
          />
        </el-form-item>
        <el-form-item label="计划审批">
          <auth-radio-group
            :value.sync="authority.trainOrg.planApproval"
            :options="[true, true, false, true]"
          />
        </el-form-item>
        <el-form-item label="计划实施">
          <auth-radio-group
            :value.sync="authority.trainOrg.planImpl"
            :options="[true, true, false, true]"
          />
        </el-form-item>
        <el-form-item label="计划查询">
          <auth-radio-group
            :value.sync="authority.trainOrg.planQuery"
            :options="[true, true, false, true]"
          />
        </el-form-item>
        <el-form-item label="任务预约">
          <auth-radio-group
            :value.sync="authority.trainOrg.taskAppoint"
            :options="[true, true, false, true]"
          />
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="培训过程" align="center">
        <el-form-item label="计划监控">
          <auth-radio-group
            :value.sync="authority.trainProc.planMonitor"
            :options="[true, false, false, true]"
          />
        </el-form-item>
        <el-form-item label="考勤管理">
          <auth-radio-group
            :value.sync="authority.trainProc.attendMgt"
            :options="[true, false, false, true]"
          />
        </el-form-item>
        <el-form-item label="视频监控">
          <auth-radio-group
            :value.sync="authority.trainProc.videoMonitor"
            :options="[true, false, false, true]"
          />
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="效果评估" align="center">
        <el-form-item label="数据管理">
          <auth-radio-group
            :value.sync="authority.effectEval.dataMgt"
            :options="[true, true, true, true]"
          />
        </el-form-item>
        <el-form-item label="统计分析">
          <auth-radio-group
            :value.sync="authority.effectEval.statAnaly"
            :options="[true, true, false, true]"
          />
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="设备管理" align="center">
        <el-form-item label="设备管理">
          <auth-radio-group
            :value.sync="authority.devMgt.devMgt"
            :options="[true, false, false, true]"
          />
        </el-form-item>
        <el-form-item label="监控管理">
          <auth-radio-group
            :value.sync="authority.devMgt.monitorMgt"
            :options="[true, false, false, true]"
          />
        </el-form-item>
        <el-form-item label="维护保养">
          <auth-radio-group
            :value.sync="authority.devMgt.maintenance"
            :options="[true, false, false, true]"
          />
        </el-form-item>
        <el-form-item label="设备维修">
          <auth-radio-group
            :value.sync="authority.devMgt.devRepair"
            :options="[true, false, false, true]"
          />
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="综合信息展示" align="center">
        <el-form-item label="综合信息展示">
          <auth-radio-group
            :value.sync="authority.synthInfoDisp"
            :options="[true, false, false, true]"
          />
        </el-form-item>
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