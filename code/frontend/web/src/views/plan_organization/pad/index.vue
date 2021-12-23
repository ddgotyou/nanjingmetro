<template>
  <div class="app-container">
    <!-- 筛选框 -->
    <el-card class="card-box" style="width: 100%">
      <div slot="header">筛选框</div>
      <el-form label-width="auto" label-position="right">
        <el-col :span="5">
          <el-form-item label="培训计划">
            <el-select v-model="query.trainingPlan" class="filter-item mr10">
              <el-option
                v-for="option in trainingPlanList"
                :key="option.key"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="状态">
            <el-select v-model="query.status" class="filter-item mr10">
              <el-option label="已评" value="0" />
              <el-option label="未评" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="学号">
            <el-input
              v-model="query.no"
              placeholder="通过学号搜索"
              class="filter-item mr10"
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="学员">
            <el-input
              v-model="query.name"
              placeholder="通过姓名搜索"
              class="filter-item mr10"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <div style="float: right">
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="handleSearch"
              >搜索</el-button
            >
            <el-button icon="el-icon-refresh" @click="handleReset"
              >重置</el-button
            >
          </div>
        </el-col>
      </el-form>
    </el-card>

    <!-- 培训计划框 -->
    <el-card class="card-box" style="width: 100%">
      <div slot="header">培训计划表</div>

      <el-collapse v-model="actived" @change="handleChange" accordion>
        <el-collapse-item
          v-for="plan in trainingPlanList"
          :key="plan.key"
          :title="plan.label"
          :name="plan.key"
        >
          <!-- 学员列表 -->
          <el-table
            v-loading="loading"
            :data="studentList"
            :default-sort="{ prop: 'id', order: 'descending' }"
            stripe
          >
            <el-table-column v-if="false" prop="id" />
            <el-table-column type="index" label="序号" align="center" />
            <el-table-column prop="name" label="学员" align="center" />
            <el-table-column prop="no" label="学号" align="center" />
            <el-table-column prop="rateStatus" label="评分状态" align="center">
              <template slot-scope="scope">
                {{ getRateStatus(scope.row.rateStatus) }}
              </template>
            </el-table-column>
            <el-table-column prop="grade" label="成绩" align="center" />
            <el-table-column prop="" label="评分表" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="handleDetail(scope.row.id)"
                  >详情</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
      <div align="center" class="mt10">
        <el-button @click="handleCancel">返 回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  listStudent,
  delStudent,
  searchStudent,
} from "@/api/personnel/student";

export default {
  data: function () {
    return {
      // 按条件筛选
      query: {
        trainingPlan: "",
        status: "",
        no: "",
        name: "",
      },

      // 激活折叠板名
      actived: "",
      // 遮罩层
      loading: true,
      // 培训计划列表
      trainingPlanList: [
        { key: "0", label: "培训计划1", value: "1" },
        { key: "1", label: "培训计划2", value: "2" },
      ],
      // 学员列表
      studentList: [
        { id: "1", name: "李四", no: "1855555", rateStatus: "1", grade: "80" },
        { id: "2", name: "王五", no: "1856666", rateStatus: "0", grade: "100" },
      ],
    };
  },
  computed: {},
  mounted: function () {
    this.loadData();
  },
  methods: {
    // 加载学员数据
    loadData() {
      listTrainingPlan(task).then((response) => {
        this.trainingPlanList = response._embedded.dboxVoes;
      });
    },
    // 将 0/1 转化为 “已评/未评”
    getRateStatus(index) {
      return index === "0" ? "已评" : "未评";
    },
    // 根据不同的培训计划填充对应的学员
    handleChange() {
      this.loading = false;
      return;
      this.loading = true;
      listStudent({ trainingPlan: this.actived }).then((response) => {
        if (response) this.studentList = response._embedded.traineeVoes;
        this.loading = false;
      });
    },
    // 根据输入框、选择框和搜索框的条件筛选学员
    handleSearch() {
      this.loading = true;
      listStudent(this.query).then((response) => {
        this.studentList = response._embedded
          ? response._embedded.traineeVoes
          : [];
        this.loading = false;
      });
    },
    // 重置学员列表
    handleReset() {
      // 清空查询字典
      for (var key in this.query) this.query[key] = null;
      // 重新加载数据
      this.loadData();
      // 不激活任何折叠板
      this.actived = "";
    },
    // 为某个学员打分
    handleDetail(index) {},
  },
};
</script>

<style lang="scss" scoped>
.card-box {
  max-width: 100%;
  margin: 20px auto;
}

.filter-item {
  min-width: 100px;
  width: 100%;
}

.mr10 {
  margin-right: 10px;
}

.mt10 {
  margin-top: 10px;
}
</style>
