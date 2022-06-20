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
        check-strictly
        node-key="id"
        ref="tree"
        default-expand-all
        :expand-on-click-node="false"
        @check="handleCheck"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span v-if="!data.showInput">{{ data.label }}</span>
          <span v-if="data.showInput">
            <el-input v-model="form.name" size="mini" style="width:300px">
              <el-button slot="suffix" size="mini" type="text" @click="() => submit(node, data)" >提交</el-button>
              <el-button slot="suffix" size="mini" type="text" @click="() => cancel(node, data)" >取消</el-button>
            </el-input>
          </span>
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
      data: [],
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
      this.selection = SelectedObj.checkedNodes;
    },

    // 加载部门树
    loadData() {
      api.tree(null).then((response) => {
        this.data = response._embedded.linkedHashMaps;
      });
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
        let ids = this.selection.map(item => item.id);
        api
          .remove(ids)
          .then((response) => {
            this.data = response._embedded.linkedHashMaps;
            this.$message.success(`删除成功！`);
          })
          .catch((error) => {});
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
      if (this.isAppend || this.isEdit) return;

      this.isAppend = true;
      if (!data.children) this.$set(data, "children", []);
      data.children.push({ label: "", showInput: true });
    },
    // 编辑部门
    edit(node, data) {
      if (this.isAppend || this.isEdit) return;

      this.isEdit = true;
      this.form.name = data.label;
      data.showInput = true;

      // 我不理解，但是可以重新渲染
      data.label = "";
      data.label = this.form.name;
    },
    // 新增/编辑部门取消
    cancel(node, data) {
      if (this.isAppend) {
        this.isAppend = false;
        this.removeNode(node, data);
      } else if (this.isEdit) {
        this.isEdit = false;
        data.showInput = false;
      }
      this.form.name = "";
    },
    // 新增/编辑部门完成
    submit(node, data) {
      data.showInput = false;

      if (this.isAppend) {
        this.isAppend = false;
        api.append(node.parent.data.id, this.form.name).then(response => {
          this.data = response._embedded.linkedHashMaps;
          this.$message.success(`新增成功！`);
        });
      } else if (this.isEdit) {
        this.isEdit = false;
        api.edit(data.id, this.form.name).then(response => {
          this.data = response._embedded.linkedHashMaps;
          this.$message.success(`编辑成功！`);
        });
      }

      this.form.name = "";
    },
    // 位置移动
    moveNode(node, data, option) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const length = children.length;
      const index = children.findIndex((child) => child.id === data.id);
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
    // 移动
    shift(id, action) {
      if (this.isAppend || this.isEdit) return;

      api.shift(id, action).then((response) => {
        console.log(response)
        this.data = response._embedded.linkedHashMaps;
      })
    },
    // 上移
    up(node, data) {
      this.shift(data.id, "up");
    },
    // 下移
    down(node, data) {
      this.shift(data.id, "down");
    },
    // 置顶
    top(node, data) {
      this.shift(data.id, "top");
    },
    // 置底
    bottom(node, data) {
      this.shift(data.id, "bottom");
    },
  },
};
</script>

<style lang="scss">
.card-box {
  max-width: 100%;
  margin: 20px auto;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.el-tree-node__content {
  height: 28px;
}
</style>
