<template>
  <el-radio-group v-model="checked">
    <el-radio v-for="item in authoritys" :key="item.key" :label="item.value">
      {{ item.label }}
    </el-radio>
  </el-radio-group>
</template>

<script>
const authoritys = [
  { key: 0, value: "true", label: "允许" },
  { key: 1, value: "false", label: "禁止" },
];

export default {
  props: ["value"],
  data() {
    return {
      authoritys: authoritys,
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
