<template>
  <el-radio-group v-model="checked">
    <el-radio v-for="item in authoritys" :key="item.key" :label="item.value">{{
      item.label
    }}</el-radio>
  </el-radio-group>
</template>

<script>
const allAuthoritys = [
  { key: 0, value: "permit", label: "允许" },
  { key: 1, value: "private", label: "仅允许与本人相关" },
  { key: 2, value: "view", label: "仅查看" },
  { key: 3, value: "forbidden", label: "禁止访问" },
];

export default {
  props: ["value", "options"],
  data() {
    return {
      authoritys: [],
    };
  },
  computed: {
    checked: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("update:value", value);
      },
    },
  },
  mounted: function () {
    allAuthoritys.forEach((item) => {
      if (this.options[item.key]) this.authoritys.push(item);
    });
  },
};
</script>
