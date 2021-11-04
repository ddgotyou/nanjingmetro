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
        { key: "1", value: "1", label: "允许" },
        { key: "2", value: "2", label: "仅查看" },
        { key: "3", value: "3", label: "仅本人" },
        { key: "4", value: "4", label: "禁止访问" },
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
