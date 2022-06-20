import request from '@/utils/request'

// 查询用户组下拉框选项
function userGroup(query) {
  return request({
    url: '/tms-account/dbox/getAllUsergroup',
    method: 'get',
    params: query
  })
}

// 查询用户组下拉框选项
function userGroupByType(key) {
  switch (key) {
    case 'admin': key = "0"; break
    case 'trainer': key = "1"; break
    case 'trainee': key = "2"; break
    default: break
  }
  return request({
    url: '/tms-account/dbox/getUsergroupByType/' + key,
    method: 'get',
  })
}

// 查询部门下拉框选项
function dept(query) {
  return request({
    url: '/tms-account/dbox/getDepts',
    method: 'get',
    params: query
  })
}

// 查询岗位下拉框选项
function post(query) {
  return request({
    url: '/tms-account/dbox/getAllPost',
    method: 'get',
    params: query
  })
}

// 查询学历下拉框选项
function edu(query) {
  return request({
    url: '/tms-account/dbox/getAllEdu',
    method: 'get',
    params: query
  })
}

// 查询专业下拉框选项
function major(query) {
  return request({
    url: '/tms-account/dbox/getAllMajor',
    method: 'get',
    params: query
  })
}

// 查询用户列表
function userList(query) {
  return request({
    url: '/tms-account/dbox/getAllUser',
    method: 'get',
    params: query
  })
}

// 模糊搜索用户
function userSearch(keyword) {
  return request({
    url: '/tms-account/dbox/getUserLike/' + keyword,
    method: 'get',
  })
}

export { userGroup, userGroupByType, dept, post, edu, major, userList, userSearch }
