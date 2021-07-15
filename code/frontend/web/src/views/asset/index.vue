<template>
  <div class="app-container">
    <el-card class="box-card" style="width:100%">
      <div slot="header">
        <span>{{ $t('route.asset') }}</span>
        <div style="float:right;padding-bottom:5px">
          <el-button icon="el-icon-search" />
          <el-button icon="el-icon-plus" @click="dialogOpened = true" />
          <el-button icon="el-icon-refresh" />
        </div>
      </div>
      <div class="box-item">
        <el-table
          stripe
          :data="items"
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
          @row-click="rowClick"
          @current-change="tableCurrentChange"
        >
          <el-table-column prop="createdDate" label="创建时间" sortable width="180" />
          <el-table-column prop="name" label="设备名" sortable width="180" />
          <el-table-column prop="type" label="类型" />
          <el-table-column prop="customer" label="客户" :formatter="formatter">
            <!-- <template slot-scope="scope">
              {{ customerFormatter(scope.row.customer) }}
            </template> -->
          </el-table-column>
        </el-table>

        <el-row>
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
            @size-change="pagingSizeChange"
            @current-change="pagingCurrentChange"
          />
        </el-row>
      </div>
    </el-card>
    <el-drawer
      :title="drawerTitle"
      :visible.sync="drawerOpened"
      :with-header="true"
      :modal-append-to-body="true"
      :wrapper-closable="false"
      :show-close="true"
      :size="'40%'"
      style="margin-top:50px;"
      destroy-on-close
      @close="drawerClose"
    >
      <entity-panel :entity="selectedItem" @entity-deleted="itemDeleted" @entity-updated="itemUpdated">
        <template slot="detail-tab-toolbar" slot-scope="scopeProps">
          <el-row>
            <el-button type="info" plain @click="assignToCustomer(selectedItem)">分配给客户</el-button>
            <el-button type="warning" plain @click="unassign(scopeProps.data)">取消分配</el-button>
          </el-row>
        </template>
        <template slot="detail-tab-update" slot-scope="scopeProps">
          <el-form label-width="80px">
            <el-form-item label="名称">
              <el-input v-model="scopeProps.data.name" class="edit-input" />
            </el-form-item>
            <el-form-item label="类型">
              <el-input v-model="scopeProps.data.type" class="edit-input" />
            </el-form-item>
            <el-form-item label="客户">
              <el-input v-model="scopeProps.data.customer" class="edit-input" />
            </el-form-item>
            <!-- <el-form-item label="描述">
              <el-input v-model="scopeProps.data.description" type="textarea" class="edit-textarea" />
            </el-form-item> -->
          </el-form>
        </template>
        <template slot="detail-tab-view" slot-scope="scopeProps">
          <el-form label-width="80px">
            <!-- <el-form-item label="创建日期">
              <el-input v-model="scopeProps.data.createdDate" :readonly="true"></el-input>
            </el-form-item>-->
            <el-form-item label="名称">
              <el-input v-model="scopeProps.data.name" class="edit-input" :readonly="true" />
            </el-form-item>
            <el-form-item label="类型">
              <el-input v-model="scopeProps.data.type" class="edit-input" :readonly="true" />
            </el-form-item>
            <el-form-item label="客户">
              <el-input v-model="scopeProps.data.customer" class="edit-input" :readonly="true" />
            </el-form-item>
            <!-- <el-form-item label="描述">
              <el-input
                v-model="scopeProps.data.description"
                type="textarea"
                class="edit-textarea"
                :readonly="true"
              />
            </el-form-item> -->
          </el-form>
        </template>
      </entity-panel>
    </el-drawer>

    <el-dialog
      title="新建租户"
      :visible.sync="dialogOpened"
      width="30%"
      :before-close="beforeDialogClose"
      :show-close="false"
    >
      <el-form label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="newItem.name" class="edit-input" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="newItem.description" class="edit-input" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogOpened = false">取 消</el-button>
        <el-button type="primary" @click="create">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { toggleClass } from '@/utils'
import '@/assets/custom-theme/index.css' // the theme changed version element-ui css'
// import request from '@/utils/request'
import EntityPanel from '@/components/EntityPanel'
// import MDinput from '@/components/MDinput'
import { getId } from '@/utils/objects'
import { getToken } from '@/utils/auth'
import { getUserInfo } from '@/utils/jwt'
import { getAssets, createAsset } from '@/api/asset'

export default {
  components: { EntityPanel },
  data() {
    return {
      currentPage: 4,

      drawerOpened: false,
      dialogOpened: false,

      items: [],
      selectedItem: null,
      newItem: {
        //   name: '',
        //   description: ''
      },
      drawerTitle: '租户信息'
    }
  },
  computed: {
    tenant: function() {
      const token = getToken()
      const userInfo = getUserInfo(token)
      return { 'id': userInfo.tenant, 'name': userInfo.tenantName }
    }
  },
  mounted: function() {
    this.getAll()
  },
  methods: {
    formatter(row, column) {
      const customerId = row.customer

      if (customerId == null) {
        return '未分配'
      }
      return customerId
    },
    customerFormatter(customerId) {
      if (customerId == null) {
        return '未分配'
      }
      return customerId
    },
    pagingSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    pagingCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    rowClick(row, column, event) {
      this.drawerOpened = true
    },
    tabClick(tab, event) {
      console.log(tab, event)
    },
    beforeDialogClose() {
      alert('close')
    },
    drawerClose() {
      // this.selectedItem = null
    },
    tableCurrentChange(val) {
      this.selectedItem = val
    },
    unassign(tenant) {
      alert(tenant._links.self.href)
    },
    getAll() {
      const vm = this
      getAssets().then((response) => {
        vm.items = response.data._embedded.assets
      })
    },
    create() {
      this.dialogOpened = false
      const vm = this
      vm.newItem.tenant = this.tenant.id
      createAsset(vm.newItem).then((response) => {
        getAssets().then((response) => {
          vm.items = response.data._embedded.assets
          vm.newItem = {}
        })
      })
    },
    itemDeleted() {
      this.drawerOpened = false
      this.selectedItem = null
      this.getAll()
    },
    itemUpdated(updatedEntity) {
      this.$message({
        message: '客户信息已修改',
        type: 'success'
      })
      this.getAll()
      // this.selectedItem = updatedEntity
    },
    assignToCustomer(selectedItem) {
      // const url = '/tenants/'
      const id = getId(selectedItem)

      const url = '/customers/' + id + '/users'

      this.$router.push({ path: url })
    }
  }
}
</script>

<style  lang="scss" scoped>
.field-label {
  vertical-align: middle;
}
.box-card {
  width: 400px;
  max-width: 100%;
  margin: 20px auto;
}

.block {
  padding: 30px 24px;
}

.tag-item {
  margin-right: 15px;
}

.edit-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}

.edit-input ::v-deep {
  input {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
