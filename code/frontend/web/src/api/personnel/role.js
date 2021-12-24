import request from '@/utils/request'
<<<<<<< HEAD

// 新增角色
function add(data) {
  return request({
    url: '/tms-account/role/addRole',
    method: 'post',
    data: data
  })
}

// 查询角色列表
function list(query, page, size) {
  return request({
    url: '/tms-account/role/getAllRole' + '?page=' + page + '&size=' + size,
    method: 'get',
    params: query
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
function edit(id, data) {
  return request({
    url: '/tms-account/role/editRole/' + id,
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
=======

module.exports = {
  // 新增角色
  add(data) {
    return request({
      url: '/tms-account/role/addRole',
      method: 'post',
      data: data
    })
  },
  // 查询角色列表
  list(query, page, size) {
    return request({
      url: '/tms-account/role/getAllRole' + '?page=' + page + '&size=' + size,
      method: 'get',
      params: query
    })
  },
  // 模糊搜索角色
  search(keyword, page, size) {
    return request({
      url: '/tms-account/role/getRoleLike/' + keyword + '?page=' + page + '&size=' + size,
      method: 'get',
    })
  },
  // 查询角色
  detail(id) {
    return request({
      url: '/tms-account/role/' + id,
      method: 'get',
    })
  },
  // 编辑角色
  edit(id, data) {
    return request({
      url: '/tms-account/role/editRole/' + id,
      method: 'put',
      data: data
    })
  },
  // 删除角色
  delete(id) {
    return request({
      url: '/system/role/' + id,
      method: 'delete'
    })
  },
}
>>>>>>> d064db06b67069b81ecf0c9bb9f27b955cc26b86
