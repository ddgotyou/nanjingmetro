<template>
  <div class="app-container">
    <el-card class="box-card" style="width:100%">
      <div slot="header">
        <span>{{ title }}</span>
        <div style="float:right;padding-bottom:5px">
          <el-button icon="el-icon-search" />
          <el-button icon="el-icon-plus" @click="dialogOpened = true" />
          <el-button icon="el-icon-refresh" @click="getData" />
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
          <el-table-column prop="createdDate" label="创建日期" sortable width="180" />
          <el-table-column prop="username" label="账户名" width="360" />
          <el-table-column prop="enabled" label="已启用">
            <template slot-scope="scope">
              {{ scope.row.enabled ? '是' : '否' }}
            </template>
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
      :size="'50%'"
      style="margin-top:50px;"
      destroy-on-close
    >
      <entity-panel :entity="selectedItem" @entity-deleted="itemDeleted" @entity-updated="itemUpdated">
        <template slot="detail-tab-toolbar" slot-scope="scopeProps">
          <el-row>
            <el-button :type="activateButtonType" plain @click="activateClick(scopeProps.data)">{{ activateButtonText }}</el-button>
            <!-- <el-button type="warning" plain @click="copyIdClick(scopeProps.data)">复制租户ID</el-button> -->
          </el-row>
        </template>
        <template slot="detail-tab-update" slot-scope="scopeProps">
          <el-form label-width="80px">
            <!-- <el-form-item label="创建日期">
              <el-input v-model="scopeProps.data.createdDate"></el-input>
            </el-form-item>-->
            <el-form-item label="用户名">
              <el-input v-model="scopeProps.data.username" class="edit-input" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="scopeProps.data.password" class="edit-input" />
            </el-form-item>
          </el-form>
        </template>
        <template slot="detail-tab-view" slot-scope="scopeProps">
          <el-form label-width="80px">
            <!-- <el-form-item label="创建日期">
              <el-input v-model="scopeProps.data.createdDate" :readonly="true"></el-input>
            </el-form-item>-->
            <el-form-item label="用户名">
              <el-input v-model="scopeProps.data.username" class="edit-input" :readonly="true" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                v-model="scopeProps.data.password"
                class="edit-input"
                :readonly="true"
              />
            </el-form-item>
          </el-form>
        </template>
      </entity-panel>
    </el-drawer>

    <el-dialog
      title="新建账号"
      :visible.sync="dialogOpened"
      width="30%"
      :before-close="beforeDialogClose"
      :show-close="false"
      :destroy-on-close="true"
    >
      <el-form label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="newItem.username" class="edit-input" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="newItem.password" class="edit-input" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogOpened = false">取 消</el-button>
        <el-button type="primary" @click="createEntity">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { toggleClass } from '@/utils'
import '@/assets/custom-theme/index.css' // the theme changed version element-ui css'
// import request from '@/utils/request'
import { update, create, getAll } from '@/api/user'
import EntityPanel from '@/components/EntityPanel'

export default {
  components: { EntityPanel },
  data: function() {
    return {
      id: this.$route.params.id ? this.$route.params.id : '',
      assignment: this.$route.params.a ? this.$route.params.a : '',
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
    title: function() {
      let result = '用户'
      if (this.assignment === 'tenants') {
        result = '租户管理员'
      }

      if (this.assignment === 'customers') {
        result = '用户账户'
      }

      return result
    },
    activateButtonType: function() {
      return this.selectedItem.enabled ? 'warning' : 'info'
    },
    activateButtonText: function() {
      return this.selectedItem.enabled ? '禁用该账号' : '启用该账号'
    }
  },
  mounted: function() {
    // this.getData()
  },
  methods: {
    formatter(row, column) {
      return row.address
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
    tableCurrentChange(val) {
      this.selectedItem = val
    },
    copyIdClick(tenant) {
      alert(tenant._links.self.href)
    },
    getData() {
      const vm = this
      getAll().then((response) => {
        vm.items = response._embedded.userModels
      })
    },
    createEntity() {
      this.dialogOpened = false
      const vm = this
      create(vm.newItem).then(response => {
        vm.getData()
      })
    },
    itemDeleted() {
      this.drawerOpened = false
      this.getData()
    },
    itemUpdated(updatedEntity) {
      this.getData()
      // this.selectedItem = updatedEntity
    },
    activateClick(user) {
      user.enabled = !user.enabled
      const vm = this
      update(user).then((response) => {
        vm.selectedItem.enabled = response.enabled
      })
    }
    // ,
    // request(config) {
    //   const { url } = config

    //   const realUrl = process.env.VUE_APP_BASE_API + url

    //   const headers = {
    //     'Content-Type': 'application/json'
    //   }

    //   config.headers = headers

    //   if (store.getters.token) {
    //     config.headers.Authorization = 'Bearer ' + getToken()
    //   }

    //   return fetch(realUrl, config)
    //     .then(response => {
    //       return response.json()
    //     })
    // // .catch(err => {
    // //   console.log(err)
    // // })
    // },
    // getAll() {
    //   const uri = '/upm-service/users'

    //   return gaiming({
    //     url: uri,
    //     method: 'get'
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
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
