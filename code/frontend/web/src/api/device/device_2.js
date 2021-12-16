import request from '@/utils/request'

module.exports={
  listMaintenance(query) {
    return request({
      url: '/device/worksheets/search/getMaintenceList',
      method: 'get',
      params: query
    })
  },

  listOption(query) {
    return request({
      url: '/device/worksheets/getList',
      method: 'get',
      params: query
    })
  },

  listRepair(query){
    return request({
        url: '/device/devices/search/getRepairList',
        method: 'get',
        params: query
      })
  },

  listRepairOption(query) {
    return request({
      url: '/device/devices/getList',
      method: 'get',
      params: query
    })
  },

  changeStatus(query){
    return request({
        url: '/device/devices/updateStatus',
        method: 'put',
        params: query
    });
  }
}
