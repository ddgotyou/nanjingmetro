import request from '@/utils/request'


  function listMaintenance(query) {
    return request({
      url: '/device/worksheets/search/getMaintenceList',
      method: 'get',
      params: query
    })
  }

  function listOption(query) {
    return request({
      url: '/device/worksheets/getList',
      method: 'get',
      params: query
    })
  }

  function listRepair(query){
    return request({
        url: '/device/devices/search/getRepairList',
        method: 'get',
        params: query
      })
  }

  function listRepairOption(query) {
    return request({
      url: '/device/devices/getList',
      method: 'get',
      params: query
    })
  }

  function changeStatus(query){
    return request({
        url: '/device/devices/updateStatus',
        method: 'put',
        params: query
    });
  }


  export{
    listMaintenance,
    listOption,
    listRepair,
    listRepairOption,
    changeStatus
  }

