<template>
  <div class="app-container">
    <!-- 筛选栏 -->
    <el-card class="card-box">
      <!-- 标题栏 -->
      <div slot="header">筛选栏</div>

      <!-- 筛选选项 -->
      <el-form label-width="auto" label-position="right" @submit.native.prevent>
        <el-form-item>
          <!-- 搜索框 -->
          <el-input
            v-model="query.key"
            placeholder="模糊搜索框"
            @keyup.enter.native="() => search"
          />
        </el-form-item>
        <el-form-item>
          <div style="float: left">
            <!-- 删除按钮 -->
            <el-button
              :disabled="perm.delete"
              plain
              type="danger"
              icon="el-icon-delete"
              @click="() => remove()"
              >删除</el-button
            >
          </div>
          <div style="float: right">
            <!-- 搜索按钮 -->
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="() => search(keyword)"
              >搜索</el-button
            >
            <!-- 重置按钮 -->
            <el-button icon="el-icon-refresh" @click="() => reset"
              >重置</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 主体 -->
    <el-card class="card-box">
      <!-- 标题栏 -->
      <div slot="header">部门列表</div>

      <!-- 部门树 -->
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        ref="tree"
        size="large"
        default-expand-all
        :expand-on-click-node="false"
        @check="handleCheck"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span v-if="!data.showInput">{{ data.label }}</span>
          <span v-if="data.showInput"
            ><el-input
              v-model="form.name"
              size="mini"
              @blur="() => submit(node, data)"
            ></el-input
          ></span>
          <span>
            <el-button type="text" @click="() => append(data)">
              新增
            </el-button>
            <el-button type="text" @click="() => edit(node, data)">
              编辑
            </el-button>
            <el-button type="text" @click="() => up(node, data)">
              上移
            </el-button>
            <el-button type="text" @click="() => down(node, data)">
              下移
            </el-button>
            <el-button type="text" @click="() => top(node, data)">
              置顶
            </el-button>
            <el-button type="text" @click="() => bottom(node, data)">
              置底
            </el-button>
          </span>
        </span>
      </el-tree>
    </el-card>
  </div>
</template>

<script>
import * as api from "@/api/account/dept";

export default {
  data: function () {
    return {
      // 权限
      perm: {
        add: false,
        delete: false,
        edit: false,
      },

      // 查询集
      query: {
        keyword: "",
      },

      // 新增/编辑表单
      form: {
        name: "",
      },

      // 操作标识符
      isAppend: false,
      isEdit: false,
      selection: [],

      // 树状数据
      data: [
        {
          id: 1,
          label: "南京地铁运营有限公司",
          children: [
            {
              id: 2,
              label: "总经理室",
            },
            {
              id: 4,
              label: "工会工作部",
              children: [
                {
                  id: 9,
                  label: "生产保护科",
                },
                {
                  id: 10,
                  label: "文体教育科",
                },
                {
                  id: 11,
                  label: "工会新入职",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  computed: {},
  mounted: function () {
    this.loadData();
  },
  methods: {
    appendShowInput(root) {
      for (let item of root) {
        item.showInput = false;
        if (item.children) this.appendShowInput(item.children);
      }
    },
    removeNode(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },
    handleCheck(nodeObj, SelectedObj) {
      console.log(nodeObj);
      console.log(SelectedObj.checkedKeys); // 这是选中的节点的key数组
      console.log(SelectedObj.checkedNodes); // 这是选中的节点数组
      this.selection = SelectedObj.checkedNodes;
      // this.selection = SelectedObj.checkedKeys;
    },

    // 加载部门树
    loadData() {
      // api.tree().then((response) => {
      //   console.log(response);
      // });
      this.appendShowInput(this.data);
    },
    // 删除部门
    remove() {
      console.log(this.selection);
      if (this.selection.length === 0) return;

      this.$confirm(
        "是否确认删除选中的部门（包括这些部门的下属部门）？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        this.data[0].children.splice(0, 1);
        // api
        //   .remove(this.$user.userId, this.selection[i].id)
        //   .then((response) => {})
        //   .catch((error) => {});
      });
    },
    // 搜索部门
    search() {},
    // 重置部门树
    reset() {
      this.loadData();
    },
    // 新增部门
    append(data) {
      this.isAppend = true;
      if (!data.children) this.$set(data, "children", []);
      data.children.push({ label: "", showInput: true });
    },
    // 编辑部门
    edit(node, data) {
      this.isEdit = true;
      this.form.name = data.label;
      data.showInput = true;

      // 我不理解，但是可以重新渲染
      data.label = "";
      data.label = this.form.name;
    },
    // 新增/编辑部门完成
    submit(node, data) {
      setTimeout(() => {
        data.showInput = false;

        if (this.isAppend) {
          this.isAppend = false;

          // 新增成功
          data.label = this.form.name;

          // 取消新增
          if (!this.form.name) this.removeNode(node, data);

          this.form.name = "";
        } else if (this.isEdit) {
          console.log("1");
          this.isEdit = false;

          if (this.form.name) data.label = this.form.name;
          this.form.name = "";
        }
      }, 100);
    },
    // 位置移动
    moveNode(node, data, option) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const length = children.length;
      const index = children.findIndex((d) => d.id === data.id);
      const nodeMoved = children.splice(index, 1)[0];
      let indexMoved = -1;
      if (option == "up") indexMoved = index - 1;
      else if (option == "down") indexMoved = index + 1;
      else if (option == "top") indexMoved = 0;
      else if (option == "bottom") indexMoved = length;
      setTimeout(() => {
        children.splice(indexMoved, 0, nodeMoved);
      }, 100);
      console.log(this.data);
    },
    // 上移
    up(node, data) {
      this.moveNode(node, data, "up");
    },
    // 下移
    down(node, data) {
      this.moveNode(node, data, "down");
    },
    // 置顶
    top(node, data) {
      this.moveNode(node, data, "top");
    },
    // 置底
    bottom(node, data) {
      this.moveNode(node, data, "bottom");
    },
  },
};
</script>

<style lang="scss" scoped>
.card-box {
  max-width: 100%;
  margin: 20px auto;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
