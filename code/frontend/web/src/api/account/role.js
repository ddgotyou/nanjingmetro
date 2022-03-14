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
function detail(id) {
  return request({
    url: '/tms-account/role/' + id,
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
function del(id) {
  return request({
    url: '/system/role/' + id,
    method: 'delete'
  })
}

export { add, list, search, detail, edit, del }
