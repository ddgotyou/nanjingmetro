<template>
  <el-card shadow="hover" class="number-card-box" :style="getBackgroundColor">
    <div slot="header">{{ title }}</div>
    <div align="center" class="number-text">{{ number }}</div>
  </el-card>
</template>

<script>
export default {
  props: ["title", "number", "background-color"],
  computed: {
    getBackgroundColor: function () {
      return "background: " + this.backgroundColor;
    },
  },
};
</script>

<style lang="scss">
.number-card-box {
  border-radius: 0%;
}

.number-text {
  font-size: 30px;
}
</style>
