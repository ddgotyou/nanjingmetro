import request from '@/utils/request'

// 查询用户组下拉框选项
export function listUserGroup(query) {
  return request({
    url: '/tms-account/users/getAllUsergroup',
    method: 'get',
    params: query
  })
}

// 查询部门下拉框选项
export function listDept(query) {
  return request({
    url: '/tms-account/depts/getDepts',
    method: 'get',
    params: query
  })
}

// 查询岗位建议框选项
export function listPost(query) {
  return request({
    url: '/tms-account/users/getAllPost',
    method: 'get',
    params: query
  })
}

// 查询学历建议框选项
export function listEdu(query) {
  return request({
    url: '/tms-account/users/getAllEdu',
    method: 'get',
    params: query
  })
}

// 查询专业建议框选项
export function listMajor(query) {
  return request({
    url: '/tms-account/users/getAllMajor',
    method: 'get',
    params: query
  })
}