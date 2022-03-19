import request from '@/utils/request'

// 新增角色
function add(id, data) {
  return request({
    url: '/tms-account/role/addRole' + '?myUserId=' + id,
    method: 'post',
    data: data
  })
}

// 查询角色列表
function list(id, page, size) {
  return request({
    url: '/tms-account/role/getAllRole' + '?myUserId=' + id + '&page=' + page + '&size=' + size,
    method: 'get',
  })
}

// 模糊搜索角色
function search(keyword, page, size) {
  return request({
    url: '/tms-account/role/getRoleLike/' + keyword + '?page=' + page + '&size=' + size,
    method: 'get',
  })
}

// 查询角色
function detail(name) {
  return request({
    url: '/tms-account/role/getRoleByName/' + name,
    method: 'get',
  })
}

// 编辑角色
function edit(userId, id, data) {
  return request({
    url: '/tms-account/role/editRole/' + id + '?myUserId=' + userId,
    method: 'put',
    data: data
  })
}

// 删除角色
function del(userId, id) {
  return request({
    url: '/tms-account/role/deleteRole/' + id + '?myUserId=' + userId,
    method: 'delete'
  })
}

export { add, list, search, detail, edit, del }
