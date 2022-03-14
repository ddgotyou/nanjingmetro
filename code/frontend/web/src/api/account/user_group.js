import request from '@/utils/request'


// 新增用户组
function add(data) {
  return request({
    url: '/tms-account/usergroup/addUsergroup',
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
function edit(id, data) {
  return request({
    url: '/tms-account/usergroup/editUsergroup/' + id,
    method: 'put',
    data: data
  })
}

// 删除用户组
function del(id) {
  return request({
    url: '/system/dept/' + id,
    method: 'delete'
  })
}

export { add, list, search, detail, edit, del }
