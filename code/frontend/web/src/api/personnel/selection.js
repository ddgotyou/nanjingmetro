import request from '@/utils/request'

module.exports = {
  // 查询用户组下拉框选项
  userGroup(query) {
    return request({
      url: '/tms-account/users/getAllUsergroup',
      method: 'get',
      params: query
    })
  },
  // 查询部门下拉框选项
  dept(query) {
    return request({
      url: '/tms-account/depts/getDepts',
      method: 'get',
      params: query
    })
  },
  // 查询岗位下拉框选项
  post(query) {
    return request({
      url: '/tms-account/users/getAllPost',
      method: 'get',
      params: query
    })
  },
  // 查询学历下拉框选项
  edu(query) {
    return request({
      url: '/tms-account/users/getAllEdu',
      method: 'get',
      params: query
    })
  },
  // 查询专业下拉框选项
  major(query) {
    return request({
      url: '/tms-account/users/getAllMajor',
      method: 'get',
      params: query
    })
  },
}