<template>
  <div style="margin:10px">
    <el-tabs @tab-click="tabClick">
      <el-tab-pane label="详情">
        <span slot="label">
          <i class="el-icon-reading" /> 详情
        </span>
        <div>
          <el-row>
            <div v-if="!updating">
              <el-button type="info" plain @click="updating = !updating">修改</el-button>
              <el-button type="danger" plain @click="deleteDialogVisible = true">删除</el-button>
            </div>
            <div v-if="updating">
              <el-button type="info" plain @click="confirmUpdatingClick">保存</el-button>
              <el-button type="danger" plain @click="cancelUpdatingClick">取消</el-button>
            </div>
          </el-row>
          <el-row style="margin-top:10px">
            <slot v-if="!updating" name="detail-tab-toolbar" :data="data" />
          </el-row>
        </div>
        <div style="margin-top:30px">
          <template v-if="updating">
            <slot name="detail-tab-update" :data="data" />
          </template>
          <template v-if="!updating">
            <slot name="detail-tab-view" :data="data" />
          </template>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="attributeTabVisible" label="属性">
        <span slot="label">
          <i class="el-icon-tickets" /> 属性
        </span>
        <el-table :data="properties" stripe style="width: 100%">
          <el-table-column prop="name" label="属性名" width="180" />
          <el-table-column prop="value" label="值" width="180" />
          <el-table-column prop="scope" label="作用域" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane v-if="relationTabVisible" label="关系">
        <span slot="label">
          <i class="el-icon-connection" /> 关系
        </span>
      </el-tab-pane>
      <el-tab-pane v-if="eventTabVisible" label="事件">角色管理</el-tab-pane>
      <!-- <el-badge :value="200" :max="99" class="item">
        <el-tab-pane v-if="alarmTabVisible" label="警报">定时任务补偿</el-tab-pane>
      </el-badge> -->
      <el-tab-pane v-if="alarmTabVisible" label="警报">
        <span slot="label">
          <i class="el-icon-bell" /> 报警
          <el-badge :value="200" :max="99" />
        </span>
      </el-tab-pane>
      <el-tab-pane v-if="acquisitionTabVisible" label="最新数据">
        <span slot="label">
          <i class="el-icon-time" /> 最新数据
        </span>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      title="提示"
      :visible.sync="deleteDialogVisible"
      width="30%"
      :before-close="beforeDialogClose"
      append-to-body
    >
      <span>确定要删除吗？注意该操作是不可恢复的。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteButtonClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 组件EntityPanel
 * 用于呈现单个IoT实体。
 * 注意：该组件仅适用于
 *
 * 属性：
 *   entity：要呈现的实体对象
 *
 * 事件：
 *   entity-deleted：当前实体已删除。父组件可监听该事件，以便在实体被删除时做出反应
 *
 * 插槽：
 *   detail-tab-toolbar：EntityPanel默认会提供“修改”和“删除”两个操作按钮，父组件可向该插槽插入模板，以提供额外的操作选项。
 *   detail-tab-view：父组件提供模板，用于呈现当前实体的详情。注意，该插槽的内容应仅做呈现用。当用户点击“修改”按钮时，该插槽内容会被隐藏
 *   detail-tab-update：父组件提供模板，用于呈现当前实体的修改界面。该插槽内容默认是隐藏的，当用户点击修改按钮后才会呈现
 *
 * 插槽变量：
 *   以上插槽均定义了名为data的变量供父组件使用。data即传入该组件的实体对象。
 */

// import Vue from 'vue'
// import updateEntity from '@/api/entity-crud'
import request from '@/utils/request'

export default {
  name: 'EntityPanel',
  props: {
    entity: {}
  },
  data() {
    return {
      data: JSON.parse(JSON.stringify(this.entity)),
      updating: false,
      deleteDialogVisible: false,
      properties: [{ 'name': '温度阈值', 'value': '27', 'scope': '服务器' },
        { 'name': '当前固件版本', 'value': '1.0.0', 'scope': '设备' },
        { 'name': '最新固件版本', 'value': '1.0.5', 'scope': '服务器' },
        { 'name': '经度', 'value': '1.0.5', 'scope': '服务器' },
        { 'name': '纬度', 'value': '1.0.5', 'scope': '服务器' }]
    }
  },
  computed: {
    // data: function() { return JSON.parse(JSON.stringify(this.entity)) },
    attributeTabVisible: function() {
      return true
      // return this.data._links.attributes != null
    },
    eventTabVisible: function() {
      return this.data._links.events != null
    },

    relationTabVisible: function() {
      return true
      // return this.data._links.relations != null
    },
    alarmTabVisible: function() {
      return true
      // return this.data._links.alarms != null
    },
    acquisitionTabVisible: function() {
      return true
      // return this.data._links.acquisitions != null
    }
  },
  methods: {
    tabClick(tab, event) {
      console.log(tab, event)
    },
    // saveEntity() {
    //   updateEntity(this.data).then(() => {})
    // },
    cancelUpdatingClick() {
      this.data = JSON.parse(JSON.stringify(this.entity))
      this.updating = false
    },
    confirmUpdatingClick() {
      const vm = this
      request({
        url: this.data._links.self.href,
        method: 'PUT',
        data: this.data
      }).then((response) => {
        vm.updating = false
        vm.$emit('entity-updated', response.data)
      })
    },
    deleteButtonClick() {
      const vm = this
      request({
        url: this.data._links.self.href,
        method: 'DELETE'
      }).then((response) => {
        vm.deleteDialogVisible = false
        vm.$emit('entity-deleted')
      })
    },
    beforeDialogClose() {}
  }
}
</script>
