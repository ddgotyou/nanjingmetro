import request from '@/utils/request'


// 新增用户组
function add(id, data) {
  return request({
    url: '/tms-account/usergroup/addUsergroup' + '?myUserId=' + id,
    method: 'post',
    data: data
  })
}

// 查询用户组列表
function list(id, page, size) {
  return request({
    url: '/tms-account/usergroup/getAllUsergroup' + '?myUserId=' + id + '&page=' + page + '&size=' + size,
    method: 'get',
  })
}

// 模糊搜索用户组
function search(keyword, page, size) {
  return request({
    url: '/tms-account/usergroup/getUsergroupLike/' + keyword + '?page=' + page + '&size=' + size,
    method: 'get',
  })
}

// 查询用户组
function detail(id) {
  return request({
    url: '/tms-account/usergroup/' + id,
    method: 'get',
  })
}

// 编辑用户组
function edit(userId, id, data) {
  return request({
    url: '/tms-account/usergroup/editUsergroup/' + id + '?myUserId=' + userId,
    method: 'put',
    data: data
  })
}

// 删除用户组
function del(userId, id) {
  return request({
    url: '/tms-account/usergroup/deleteUsergroup/' + id + '?myUserId=' + userId,
    method: 'delete'
  })
}

export { add, list, search, detail, edit, del }
