<template>
  <el-form label-width="80px">
    <el-select
      v-model="value"
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="getCustomers"
      :loading="loading"
    >
      <el-option v-for="item in options" :key="item.name" :label="item.name" :value="item.name" />
    </el-select>
  </el-form>
</template>

<script>
import { findCustomersByTenantAndName } from '@/api/customer'
import { getToken } from '@/utils/auth'
import { getUserInfo } from '@/utils/jwt'

export default {
  name: 'CustomerSelector',
  data() {
    return {
      options: [],
      loading: false,
      value: {}
    }
  },
  computed: {
    tenant: function() {
      const token = getToken()
      const userInfo = getUserInfo(token)
      return { 'id': userInfo.tenant, 'name': userInfo.tenantName }
    }
  },
  methods: {
    getCustomers(query) {
      const vm = this

      if (query !== '') {
        findCustomersByTenantAndName(this.tenant.id, query).then((response) => {
          vm.options = response.data._embedded.customers
        })
      } else {
        vm.options = []
      }
    }
  }
}
</script>
