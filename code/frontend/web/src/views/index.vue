<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-row align="center">
          <!-- 人员分析板块 -->
          <el-card style="height: 210px">
            <div slot="header">
              <el-button icon="el-icon-user-solid" type="text"></el-button>
              <el-button class="title-text" type="text">人员分析</el-button>
            </div>
            <el-row :gutter="20">
              <el-col :span="12">
                <number-panel
                  title="讲师人数"
                  :number="numTrainer"
                  background-color="#cceeff"
                ></number-panel>
              </el-col>
              <el-col :span="12">
                <number-panel
                  title="学员人数"
                  :number="numTrainee"
                  background-color="#bbffee"
                ></number-panel>
              </el-col>
            </el-row>
          </el-card>
        </el-row>
        <el-row>
          <!-- 我的待办板块 -->
          <el-card>
            <div slot="header">
              <el-button icon="el-icon-s-claim" type="text"></el-button>
              <el-button class="title-text" type="text">我的待办</el-button>
            </div>
            <el-row>
              <el-card shadow="hover" class="todo-card" style="height: 200px">
                <div slot="header">
                  <!-- <div class="point bgcolor-red"></div> -->
                  <span>待审核申请</span>
                  <el-badge :value="numAppUnAudited" />
                </div>
                <el-col :span="6" align="center">
                  <el-tag type="info">审核中</el-tag>
                </el-col>
                <el-col :span="6" align="center">
                  <el-tag type="success">{{ numAppAuditing }}</el-tag>
                </el-col>
                <el-col :span="6" align="center">
                  <el-tag type="info">已通过</el-tag>
                </el-col>
                <el-col :span="6" align="center">
                  <el-tag type="warning">{{ numAppAudited }}</el-tag>
                </el-col>

                <el-table
                  :data="appList"
                  :default-sort="{ prop: 'date', order: 'descending' }"
                  :row-style="getRowClass"
                  :show-header="false"
                  style="width: 100; background: #f5f5f5"
                  empty-text="暂无待审核申请"
                >
                  <el-table-column
                    :show-overflow-tooltip="true"
                    min-width="70%"
                  >
                    <template slot-scope="scope">
                      {{ getAppContent(scope.row.detail.planFirstTrainer) }}
                    </template>
                  </el-table-column>
                  <el-table-column min-width="30%" align="right">
                    <template slot-scope="scope">
                      <span class="table-date">{{
                        getAppTime(scope.row.detail.planStartTime)
                      }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-card>
            </el-row>
            <el-row>
              <!-- 本周任务 -->
              <el-card shadow="hover" class="todo-card" style="height: 165px">
                <div slot="header">
                  <span>本周任务</span>
                </div>

                <el-table
                  :data="taskList"
                  :default-sort="{ prop: 'name', order: 'descending' }"
                  :row-style="getRowClass"
                  :header-cell-style="getRowClass"
                  :show-header="false"
                  style="width: 100%; background: #f5f5f5"
                  empty-text="暂无本周任务"
                >
                  <el-table-column
                    prop="taskDetails.name"
                    label="名称"
                    min-width="40%"
                    align="center"
                  />
                  <el-table-column
                    prop="taskDetails.description"
                    :show-overflow-tooltip="true"
                    label="任务"
                    min-width="60%"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
              </el-card>
            </el-row>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="16">
        <el-row>
          <!-- 培训计划板块 -->
          <el-card style="height: 370px">
            <div slot="header">
              <el-button icon="el-icon-s-order" type="text"></el-button>
              <el-button class="title-text" type="text">培训计划</el-button>
              <download-excel
                :data="planAllList"
                :fields="fields"
                type="xls"
                header="个人培训计划列表"
                name="个人培训计划列表"
                style="float: right"
              >
                <el-button
                  plain
                  type="primary"
                  size="small"
                  icon="el-icon-download"
                  >导出</el-button
                >
              </download-excel>
            </div>
            <!-- 表格 -->
            <el-table
              border
              :data="planList"
              :default-sort="{ prop: 'date', order: 'descending' }"
              style="width: 100%"
              empty-text="暂无培训计划"
            >
              <el-table-column
                type="index"
                label="序号"
                width=""
                align="center"
              />
              <el-table-column
                prop="name"
                label="名称"
                width=""
                align="center"
              />
<<<<<<< HEAD
              <!-- <el-table-column label="讲师" width="" align="center">
                <template slot-scope="scope">
                  {{ getTrainer(scope.row.planDetails.trainers) }}
                </template>
              </el-table-column> -->
=======
              <!-- <el-table-column label="讲师" width="" align="center">
                <template slot-scope="scope">
                  {{ getTrainer(scope.row.trainers) }}
                </template>
              </el-table-column> -->
>>>>>>> fc1ad1cd531a5f879c36dc02a21776c16812860f
              <el-table-column label="开始时间" width="" align="center">
                <template slot-scope="scope">
                  {{ scope.row.startTime.split(" ")[0] }}
                </template>
              </el-table-column>
              <el-table-column label="结束时间" width="" align="center">
                <template slot-scope="scope">
                  {{ scope.row.endTime.split(" ")[0] }}
                </template>
              </el-table-column>
              <el-table-column
                prop="enabled"
                label="详情"
                width="100px"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="handleDetail(scope.row.id)"
                    >详情</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <!-- 常用功能板块 -->
            <el-card style="height: 320px">
              <div slot="header">
                <el-button icon="el-icon-menu" type="text"></el-button>
                <el-button class="title-text" type="text">常用功能</el-button>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <!-- 消息通知板块 -->
            <el-card style="height: 320px">
              <div slot="header">
                <el-button icon="el-icon-message-solid" type="text"></el-button>
                <el-button class="title-text" type="text">消息通知</el-button>
                <el-button style="float: right" type="text">详情>></el-button>
              </div>
              <el-table
                :data="noticeList"
                :default-sort="{ prop: 'date', order: 'descending' }"
                :show-header="false"
                style="width: 100%"
              >
                <el-table-column min-width="5%" align="center">
                  <template>
                    <div class="point bgcolor-lightgreen"></div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="msg"
                  :show-overflow-tooltip="true"
                  min-width="70%"
                >
                </el-table-column>
                <el-table-column prop="date" min-width="25%" align="right">
                  <template slot-scope="scope">
                    <span class="table-date">{{ scope.row.date }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NumberPanel from "./dashboard/NumberPanel.vue";
import * as trainee from "@/api/account/trainee";
import * as trainer from "@/api/account/trainer";
import * as api from "@/api/index";
import repairVue from "./device_management/repair/repair.vue";

export default {
  components: { NumberPanel },
  name: "DashboardEditor",
  data() {
    return {
      numTrainer: null,
      numTrainee: null,
      numAppUnAudited: 0,
      numAppAudited: 0,
      numAppAuditing: 0,

      fields: {
        姓名: "name",
        讲师: "trainers",
        开始时间: "startTime",
        结束时间: "endTime",
      },

      planAllList: [],
      planList: [],
      appList: [],
      taskList: [],
      noticeList: [
        {
          msg: "十月一日国庆节，为响应国家号召...",
          date: "2021-08-01",
        },
        {
          msg: "十月一日国庆节，为响应国家号召...",
          date: "2021-08-02",
        },
        {
          msg: "十月一日国庆节，为响应国家号召...",
          date: "2021-08-03",
        },
        {
          msg: "十月一日国庆节，为响应国家号召...",
          date: "2021-08-04",
        },
        {
          msg: "十月一日国庆节，为响应国家号召...",
          date: "2021-08-05",
        },
      ],
    };
  },
  computed: {
    getRowClass({ row, rowIndex }) {
      return { backgroundColor: "#f5f5f5" };
    },
  },
  mounted: function () {
    this.loadData();
  },
  methods: {
    loadData() {
      trainee.list().then((response) => {
        this.numTrainee = response.page.totalElements;
      });
      trainer.list().then((response) => {
        this.numTrainer = response.page.totalElements;
      });
      api.plan().then((response) => {
        this.planList = response._embedded.plans.slice(0, 4);
        console.log(this.planList);
        this.planAllList = response._embedded.plans.map((item) => {
          return {
            name: item.name,
            // trainers: item.planDetails.trainers
            //   .map((item) => item.username)
            //   .join("，"),
            startTime: item.startTime,
            endTime: item.endTime,
          };
        });
      });
      api.apply(this.$user.userId, "未审核").then((response) => {
        this.numAppUnAudited = response.page.totalElements;
        this.appList = response._embedded.applications.slice(0, 2);
      });
      api.apply(this.$user.userId, "审核中").then((response) => {
        this.numAppAuditing = response.page.totalElements;
      });
      api.apply(this.$user.userId, "已通过").then((response) => {
        this.numAppAudited = response.page.totalElements;
      });
      api.task(this.$user.userId).then((response) => {
        this.taskList = response._embedded
          ? response._embedded.tasks.slice(0, 2)
          : [];
      });
    },
    getAppContent(trainer) {
      return trainer + "向你提交了培训计划";
    },
    getAppTime(time) {
      return time.split(" ")[0];
    },
    getTrainer(trainers) {
      return trainers.map((item) => item.username).join("，");
    },
    getTimeRange(plan) {
      return plan.startTime + " ~\n" + plan.endTime;
    },
    handleDetail(id) {
      this.$router.push({
        path: "/training_organization/plan_details",
        query: { self: id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  background-color: #e3e3e3;
  min-height: 105vh;
  padding: 40px 50px 0px;
  .pan-info-roles {
    font-size: 12px;
    font-weight: 700;
    color: #333;
    display: block;
  }
  .info-container {
    position: relative;
    margin-left: 190px;
    height: 150px;
    line-height: 200px;
    .display_name {
      font-size: 48px;
      line-height: 48px;
      color: #212121;
      position: absolute;
      top: 25px;
    }
  }
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.title-text {
  color: #000000;
}

.todo-card {
  background: #f5f5f5;
}

.table-date {
  color: gray;
  font-size: 12px;
}

.point {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.bgcolor-lightgreen {
  background-color: lightgreen;
}
.bgcolor-green {
  background-color: green;
}
.bgcolor-red {
  background-color: red;
}
</style>