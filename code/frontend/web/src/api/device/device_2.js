import request from '@/utils/request'

  var title = '/device'
  function listMaintenance(query) {
    return request({
      url: title+'/worksheets/search/getMaintenceList',
      method: 'get',
      params: query
    })
  }

  function listOption(query) {
    return request({
      url: title+'/worksheets/getList',
      method: 'get',
      params: query
    })
  }

  function listRepair(query){
    return request({
        url: title+'/devices/search/getRepairList',
        method: 'get',
        params: query
      })
  }

  function listRepairOption(query) {
    return request({
      url: title+'/devices/getList',
      method: 'get',
      params: query
    })
  }

  function changeStatus(query){
    return request({
        url: title+'/devices/updateStatus',
        method: 'put',
        params: query
    });
  }

  function find_devices(query){
    return request({
      url: title+'/devices/search/findByConditions',
      method: 'get',
      params: query
  });
  }

  function upload_pdf(data) {
    return request({
      url: title+'/protocols/upload',
      method: 'post',
      headers:{
        "Content-Type":"multipart/form-data; boundary=<calculated when request is sent>",
      },
      data: data
    })
  }

  function type_get(query){
    return request({
        url: title+'/devices/type/getTypes',
        method: 'get',
        params: query
    });
  }

  function type_new(query){
    return request({
        url: title+'/devices/type',
        method: 'post',
        params: query
    });
  }

  function type_change(query){
    return request({
        url: title+'/devices/type/' + query.id,
        method: 'put',
        params: query
    });
  }

  function type_delete(query){
    return request({
        url: title+'/devices/type/' + query.id,
        method: 'delete'
    });
  }

  


  export{
    listMaintenance,
    listOption,
    listRepair,
    listRepairOption,
    changeStatus,
    find_devices,
    upload_pdf,

    type_get,
    type_new,
    type_delete,
    type_change
  }

