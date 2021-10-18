<template>
  <el-autocomplete
    v-model="inputValue"
    :fetch-suggestions="querySearch"
    :readonly="readonly"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  props: ["value", "suggestions", "readonly", "placeholder"],
  data() {
    return {};
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    // 当建议输入框获得焦点时触发，返回建议输入
    querySearch(queryString, cb) {
      let results = this.suggestions;
      results = queryString
        ? results.filter(this.createFilter(queryString))
        : results;
      // cb 是回调函数，返回筛选结果数据到建议列表
      cb(results);
    },
    // 当输入数据时触发，筛选和输入数据匹配的建议输入
    createFilter(queryString) {
      return (item) => {
        return item.value.toUpperCase().match(queryString.toUpperCase());
      };
    },
  },
};
</script>