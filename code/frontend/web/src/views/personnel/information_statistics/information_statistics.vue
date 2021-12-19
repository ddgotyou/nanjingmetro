<template>
  <div class="app-container">
    <el-card class="card-box" style="width: 100%">
      <div slot="header">
        <span style="margin-right: 20px">统计维度</span>
        <el-select
          v-model="dimensions"
          multiple
          placeholder="请选择统计维度（可多选）"
          @change="drawChart"
          @blur="setMinWidth"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="image-box">
        <el-image
          style="width: 800px; height: 400px"
          :src="url"
          fit="fill"
        ></el-image>
      </div>
      <div class="desc-box">统计信息说明</div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "",
      dimensions: [],
      options: [
        { value: "1", label: "性别" },
        { value: "2", label: "部门" },
        { value: "3", label: "岗位" },
        { value: "4", label: "学历" },
        { value: "5", label: "专业" },
        { value: "6", label: "学员状态" },
      ],
    };
  },
  methods: {
    drawChart() {},
    setMinWidth(val) {
      this.minWidth = val.srcElement.clientWidth;
    },
  },
};
</script>

<style lang="scss" scoped>
.card-box {
  width: 400px;
  max-width: 100%;
  margin: 20px auto;
}

.image-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.desc-box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>