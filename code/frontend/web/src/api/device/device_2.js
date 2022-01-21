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

  function find_devices(query){
    return request({
      url: '/device/devices/search/findByConditions',
      method: 'get',
      params: query
  });
  }

  function upload_pdf(data) {
    return request({
      url: '/device/protocols/upload',
      method: 'post',
      headers:{
        "Content-Type":"multipart/form-data; boundary=<calculated when request is sent>",
      },
      data: data
    })
  }


  export{
    listMaintenance,
    listOption,
    listRepair,
    listRepairOption,
    changeStatus,
    find_devices,
    upload_pdf
  }

