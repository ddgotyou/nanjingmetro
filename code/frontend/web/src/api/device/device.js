import request from '@/utils/request'

module.exports={
  //获取设备列表
  listDevice() {
    return request({
      url: '/device/devices',
      method: 'get'
    })
  },
  //模糊搜索 //to do
  search(query){
    return request({
      url: '/device/devices/search/findByConditions',
      method: 'get',
      params: query
    })
  },
  //获取规程下拉框
  protocols(){
    return request({
      url: '/device/protocols',
      method: 'get'
    })
  },
  //新增设备
  add(data){
    return request({
      url: '/device/devices',
      method: 'post',
      data: data
    })
  },
  //删除设备
  deldevice(data){
    return request({
      url: '/device/devices',
      method: 'delete',
      params: data
    })
  },
  //查看设备详情
  details(id){
    return request({
      url: '/device/devices/'+id,
      method: 'get'
    })
  },
  //获取维保信息列表
  listWorksheet(id){
    return request({
      url: '/device/worksheets/deviceId/'+id,
      method: 'get'
    })
  },
  //修改设备
  update_device(data,id){
    return request({
      url: '/device/devices',
      method: 'put',
      data: data,
    })
  },
  //新增规程
  addrule(data){
    return request({
      url: '/device/protocols',
      method: 'post',
      data: data
    })
    },
  //新增维保信息
  addworksheet(data){
    return request({
      url: '/device/worksheets',
      method: 'post',
      data: data
    })
  },
  //获取实验室下拉框
  classrooms(){
    return request({
      url: '/training-plan/classrooms',
      method: 'get'
    })
  },
  //新增实验室
  addClassroom(data){
    return request({
      url: '/training-plan/classrooms',
      method: 'post',
      data: data
    })
  },
  //获取人员列表
  listPerson() {
    return request({
      url: '/tms-account/usergroup/getAllUser',
      method: 'get'
    })
  },
}
