<template>
  <div class="app-container">
    <el-card class="box-card" style="width:100%">
      <el-form label-position="right" label-width="80px">
        <el-form-item label="当前计划">
          <el-input
            id="search"
            v-model="plan"
            name="plan"
            placeholder="在此输入"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="goto_edit">监控管理</el-button>
          <el-button type="primary" @click="goto_monitor_wall"
            >监控墙</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <el-collapse
      class="custom-collapse"
      v-model="activeCollapseSurveillance"
      @change="handleCollapse"
    >
      <el-collapse-item title="实时监控" name="0">
        <el-card class="box-card" style="width:100%">
          <div slot="header">实时监控</div>
          <el-form label-position="right" label-width="80px">
            <el-row>
              <el-col :span="20">
                <el-form-item label="模糊搜索">
                  <el-input
                    id="search"
                    v-model="search"
                    name="search_value"
                    placeholder="在此输入"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <div style="text-align: right">
                  <el-button type="primary" @click="search_commit"
                    >搜 索</el-button
                  >
                  <el-button @click="search_reset">重 置</el-button>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7">
                <el-form-item label="计划名称">
                  <el-select
                    style="width:100%"
                    id="type"
                    multiple
                    filterable
                    default-first-option
                    v-model="data1.plan_name"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in plan_name"
                      :key="item.value"
                      :label="item.lable"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="任务名称">
                  <el-select
                    style="width:100%"
                    v-model="data1.task_name"
                    multiple
                    filterable
                    default-first-option
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in task_name"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="实训室">
                  <el-select
                    style="width:100%"
                    v-model="data1.room"
                    multiple
                    filterable
                    default-first-option
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in rooms"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <div style="text-align: right">
                  <el-button @click="confirm">确 认</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
          <el-table :data="cameraIpResult">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="admin" label="账号" />
            <el-table-column prop="password" label="密码" />
            <el-table-column prop="ipport" label="IP地址" />
            <el-table-column prop="wsurl" label="连接url" />
          </el-table>
        </el-card>
      </el-collapse-item>
    </el-collapse>

    <el-collapse
      class="custom-collapse"
      v-model="activeCollapseStorage"
      @change="handleCollapse"
    >
      <el-collapse-item title="监控视频库" name="0">
        <el-card class="box-card" style="width:100%">
          <div slot="header">监控视频库</div>
          <el-form label-position="right" label-width="80px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="计划名称">
                  <el-select
                    style="width:100%"
                    id="type"
                    multiple
                    filterable
                    default-first-option
                    v-model="data2.plan_name"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in plan_name"
                      :key="item.value"
                      :label="item.lable"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="任务名称">
                  <el-select
                    style="width:100%"
                    id="type"
                    multiple
                    filterable
                    default-first-option
                    v-model="data2.task_name"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in task_name"
                      :key="item.value"
                      :label="item.lable"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="实训室">
                  <el-select
                    style="width:100%"
                    id="type"
                    multiple
                    filterable
                    default-first-option
                    v-model="data2.room"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in rooms"
                      :key="item.value"
                      :label="item.lable"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="讲师">
                  <el-select
                    style="width:100%"
                    id="type"
                    multiple
                    filterable
                    default-first-option
                    v-model="data2.teacher"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in teachers"
                      :key="item.value"
                      :label="item.lable"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="时间">
                  <el-select
                    style="width:100%"
                    id="type"
                    filterable
                    default-first-option
                    v-model="data2.time"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in times"
                      :key="item.value"
                      :label="item.lable"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-table :data="tableData" style="width: 100">
            <el-table-column prop="ID" label="序号" />
            <el-table-column prop="planName" label="计划名称" />
            <el-table-column prop="taskName" label="任务名称" />
            <el-table-column prop="time" label="时间" />
            <el-table-column prop="room" label="实训室" />
            <el-table-column prop="teacher" label="讲师" />
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click.native.prevent="
                    monitoring_library(scope.$index, tableData)
                  "
                >
                  监控库
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            style="text-align: center"
            layout="prev, pager, next"
            :total="500"
          >
          </el-pagination>
        </el-card>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import api from "@/api/cameraip/cameraip";

export default {
  data() {
    return {
      cameraIpResult: [],
      plan: "示例计划",
      search: "",
      data1: {
        plan_name: [],
        task_name: [],
        room: []
      },
      data2: {
        plan_name: [],
        task_name: [],
        room: [],
        teacher: [],
        time: []
      },
      plan_name: [
        {
          label: "掩体计划",
          value: "掩体计划"
        },
        {
          label: "广播计划",
          value: "广播计划"
        },
        {
          label: "黒域计划",
          value: "黒域计划"
        }
      ],
      task_name: [
        {
          label: "危机纪元",
          value: "危机纪元"
        },
        {
          label: "威摄纪元",
          value: "威摄纪元"
        },
        {
          label: "广播纪元",
          value: "广播纪元"
        },
        {
          label: "掩体纪元",
          value: "掩体纪元"
        }
      ],
      rooms: [
        {
          value: "A301",
          label: "A301"
        },
        {
          value: "A302",
          label: "A302"
        },
        {
          value: "A303",
          label: "A303"
        }
      ],
      teachers: [
        {
          value: "章北海",
          label: "章北海"
        },
        {
          value: "艾AA",
          label: "艾AA"
        },
        {
          value: "维德",
          label: "维德"
        }
      ],
      times: [
        {
          value: "9-19",
          label: "9-19"
        },
        {
          value: "8-30",
          label: "8-30"
        },
        {
          value: "9-10",
          label: "9-10"
        }
      ],
      tableData: [
        {
          ID: "1",
          planName: "示例计划",
          taskName: "示例任务",
          time: "2021-9-10",
          room: "F211",
          teacher: "丁仪",
          subject: "线路调度概论",
          attendance: "98%"
        },
        {
          ID: "2",
          planName: "示例计划",
          taskName: "示例任务",
          time: "2021-9-11",
          room: "F211",
          teacher: "丁仪",
          subject: "线路调度概论",
          attendance: "98%"
        },
        {
          ID: "3",
          planName: "示例计划",
          taskName: "示例任务",
          time: "2021-9-20",
          room: "F211",
          teacher: "丁仪",
          subject: "线路调度概论",
          attendance: "98%"
        }
      ],
      activeCollapseSurveillance: [],
      activeCollapseStorage: []
    };
  },
  methods: {
    search_commit() {
      console.log(this.search);
    },
    search_reset() {
      this.search = "";
    },
    confirm() {},
    monitoring_library(index, data) {},
    goto_edit() {
      this.$router.push("jiankongguanli");
    },
    goto_monitor_wall() {
      this.$router.push("zidingyi");
    },

    handleCollapse(val) {
      //  console.log(val);
    }
  }
};
</script>
<style lang="scss" scoped>
.box-card {
  width: 400px;
  max-width: 100%;
  margin: 10px auto;
}
.custom-collapse {
  margin: 10px;
}
</style>
