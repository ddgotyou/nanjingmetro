import request from '@/utils/request'

  var title = '/device'
  //获取设备列表
  function listDevice(query) {
    return request({
      url: title+'/devices',
      method: 'get',
      params: query
    })
  }
  //模糊搜索 //to do
  function search(query){
    return request({
      url: title+'/devices/search/findByConditions',
      method: 'get',
      params: query
    })
  }
  //获取规程下拉框
  function protocols(){
    return request({
      url: title+'/protocols',
      method: 'get'
    })
  }
  //新增设备
  function add(data){
    return request({
      url: title+'/devices',
      method: 'post',
      data: data
    })
  }
  //删除设备
  function deldevice(data){
    return request({
      url: title+'/devices',
      method: 'delete',
      params: data
    })
  }
  //查看设备详情
  function details(id){
    return request({
      url: title+'/devices/'+id,
      method: 'get'
    })
  }
  //获取维保信息列表
  function listWorksheet(id){
    return request({
      url: title+'/worksheets/deviceId/'+id,
      method: 'get'
    })
  }
  //修改设备
  function update_device(data,id){
    return request({
      url: title+'/devices',
      method: 'put',
      data: data,
    })
  }
  //新增规程
  function addrule(data){
    return request({
      url: title+'/protocols',
      method: 'post',
      data: data
    })
  }
  //新增维保信息
  function addworksheet(data){
    return request({
      url: title+'/worksheets',
      method: 'post',
      data: data
    })
  }
  //获取实验室下拉框
  function classrooms(){
    return request({
      url: '/training-plan/classrooms',
      method: 'get'
    })
  }
  //新增实验室
  function addClassroom(data){
    return request({
      url: '/training-plan/classrooms',
      method: 'post',
      data: data
    })
  }
  //删除实验室
  function deleteClassroom(data){
    return request({
      url: '/training-plan/classrooms/'+data.id,
      method: 'delete',
      //data: data
    })
  }
  //修改实验室
  function changeClassroom(data){
    return request({
      url: '/training-plan/classrooms/'+data.id,
      method: 'put',
      data: data
    })
  }
  //获取人员列表
  function listPerson() {
    return request({
      url: '/tms-account/usergroup/getAllUser',
      method: 'get'
    })
  }

  export{
    listDevice,
    search,
    protocols,
    add,
    deldevice,
    details,
    listWorksheet,
    update_device,
    addrule,
    addworksheet,
    classrooms,
    addClassroom,
    listPerson,
    deleteClassroom,
    changeClassroom
  }

