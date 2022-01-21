<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-row align="center">
          <!-- 人员分析板块 -->
          <el-card>
            <div slot="header">
              <el-button icon="el-icon-user-solid" type="text"></el-button>
              <el-button class="title-text" type="text">人员分析</el-button>
            </div>
            <el-row :gutter="20">
              <el-col :span="12">
                <number-panel
                  title="讲师人数"
                  :number="numTeacher"
                  background-color="#cceeff"
                ></number-panel>
              </el-col>
              <el-col :span="12">
                <number-panel
                  title="学员人数"
                  :number="numStudent"
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
              <el-button style="float: right" type="text">详情>></el-button>
            </div>
            <el-row>
              <el-card shadow="hover" class="todo-card">
                <div slot="header">
                  <!-- <div class="point bgcolor-red"></div> -->
                  <span>待审核申请</span>
                  <el-badge :value="numApply" />
                </div>
                <el-col :span="6" align="center">
                  <el-tag type="info">往期审核</el-tag>
                </el-col>
                <el-col :span="6" align="center">
                  <el-tag type="success">{{ numApplyLast }}</el-tag>
                </el-col>
                <el-col :span="6" align="center">
                  <el-tag type="info">已看审核</el-tag>
                </el-col>
                <el-col :span="6" align="center">
                  <el-tag type="warning">{{ numApplyViewed }}</el-tag>
                </el-col>

                <el-table
                  :data="applyList"
                  :default-sort="{ prop: 'date', order: 'descending' }"
                  :row-style="getRowClass"
                  :show-header="false"
                  style="width: 100%"
                >
                  <el-table-column prop="content" min-width="70%">
                    <template slot-scope="scope">
                      {{ getApplyContent(scope.row.content) }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="date" min-width="30%" align="right">
                    <template slot-scope="scope">
                      <span class="table-date">{{ scope.row.date }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-card>
            </el-row>
            <el-row>
              <!-- 本周任务 -->
              <el-card shadow="hover" class="todo-card">
                <div slot="header">
                  <span>本周任务</span>
                </div>
                <el-table
                  :data="taskList"
                  :default-sort="{ prop: 'name', order: 'descending' }"
                  :row-style="getRowClass"
                  :header-cell-style="getRowClass"
                  :show-header="false"
                  style="width: 100%"
                >
                  <el-table-column
                    prop="name"
                    label="名称"
                    min-width="40%"
                    align="center"
                  />
                  <el-table-column
                    prop="content"
                    label="任务"
                    min-width="60%"
                    align="center"
                  >
                    <template slot-scope="scope">
                      {{ getTaskContent(scope.row.content) }}
                    </template>
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
          <el-card>
            <div slot="header">
              <el-button icon="el-icon-s-order" type="text"></el-button>
              <el-button class="title-text" type="text">培训计划</el-button>
              <el-button
                plain
                type="primary"
                size="small"
                icon="el-icon-download"
                style="float: right"
                @click="handleExport"
                >导出</el-button
              >
            </div>
            <!-- 表格 -->
            <el-table
              border
              :data="trainingPlanList"
              style="width: 100%"
              :default-sort="{ prop: 'date', order: 'descending' }"
            >
              <el-table-column type="selection" />
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
              <el-table-column
                prop="teacher"
                label="讲师"
                width=""
                align="center"
              />
              <el-table-column
                prop="date"
                label="时间段"
                width="200px"
                align="center"
              />
              <el-table-column prop="enabled" label="详情" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="handleDetail(scope.$index)"
                    >详情</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <!-- 页码 -->
            <el-pagination
              :current-page="currentPage"
              :page-size="100"
              :total="totalPage"
              layout="prev, pager, next"
              class="pagination"
              @size-change="pagingSizeChange"
              @current-change="pagingCurrentChange"
            />
          </el-card>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <!-- 常用功能板块 -->
            <el-card>
              <div slot="header">
                <el-button icon="el-icon-menu" type="text"></el-button>
                <el-button class="title-text" type="text">常用功能</el-button>
              </div>
              <div style="height: 220px"></div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <!-- 消息通知板块 -->
            <el-card>
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
                <el-table-column prop="msg" min-width="70%">
                  <template slot-scope="scope">
                    <span> {{ getNoticeMsg(scope.row.msg) }} </span>
                  </template>
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
import * as student from "@/api/personnel/student";
import * as teacher from "@/api/personnel/teacher";

export default {
  components: { NumberPanel },
  name: "DashboardEditor",
  data() {
    return {
      currentPage: 4,
      totalPage: 400,

      numTeacher: null,
      numStudent: null,
      numApply: 8,
      numApplyLast: 654,
      numApplyViewed: 656,

      trainingPlanList: [
        {
          name: "劳动关系学培训",
          teacher: "张三丰",
          date: "2021-08-01 14:00-16:00",
        },
        {
          name: "人力资源培训",
          teacher: "胡歌",
          date: "2021-08-02 14:00-16:00",
        },
        {
          name: "薪酬管理培训",
          teacher: "毛不易",
          date: "2021-08-03 14:00-16:00",
        },
        {
          name: "劳动关系学培训",
          teacher: "张三丰",
          date: "2021-08-04 14:00-16:00",
        },
        {
          name: "人力资源培训",
          teacher: "胡歌",
          date: "2021-08-05 14:00-16:00",
        },
      ],
      taskList: [
        {
          name: "劳动关系学培训",
          content: "此处是详情此处是详情",
        },
        {
          name: "劳动关系学培训",
          content: "此处是详情此处是详情",
        },
        {
          name: "劳动关系学培训",
          content: "此处是详情此处是详情",
        },
      ],
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
      applyList: [
        {
          content: "教师张三提交了培训计划，待你审核",
          date: "2021-08-01",
        },
        {
          content: "教师李四提交了培训计划，待你审核",
          date: "2021-08-02",
        },
        {
          content: "教师王五提交了培训计划，待你审核",
          date: "2021-08-03",
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
      student.list(null).then((response) => {
        this.numStudent = response.page.totalElements;
      });
      teacher.list(null).then((response) => {
        this.numTeacher = response.page.totalElements;
      });
    },
    getApplyContent(content) {
      return content.substring(0, 10) + "...";
    },
    getTaskContent(content) {
      return content.substring(0, 10) + "...";
    },
    getNoticeMsg(msg) {
      return msg.substring(0, 13) + "...";
    },
    handleExport() {},
    pagingSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    pagingCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  background-color: #e3e3e3;
  min-height: 120vh;
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
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