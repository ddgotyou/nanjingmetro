<template>
  <el-radio-group v-model="checked">
    <el-radio
      v-for="item in authoritys"
      :key="item.value"
      :label="item.value"
      >{{ item.label }}</el-radio
    >
  </el-radio-group>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      authoritys: [
        { key: "1", value: "permit", label: "允许" },
        { key: "2", value: "private", label: "仅允许与本人相关" },
        { key: "3", value: "view", label: "仅查看" },
        { key: "4", value: "forbidden", label: "禁止访问" },
      ],
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
};
</script>
