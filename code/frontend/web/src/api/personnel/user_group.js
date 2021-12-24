import request from '@/utils/request'
<<<<<<< HEAD

// 新增用户组
function add(data) {
  return request({
    url: '/tms-account/usergroup/addUsergroup',
    method: 'post',
    data: data
  })
}

// 查询用户组列表
function list(query, page, size) {
  return request({
    url: '/tms-account/usergroup/getAllUsergroup' + '?page=' + page + '&size=' + size,
    method: 'get',
    params: query
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
=======

module.exports = {
  // 新增用户组
  add(data) {
    return request({
      url: '/tms-account/usergroup/addUsergroup',
      method: 'post',
      data: data
    })
  },
  // 查询用户组列表
  list(query, page, size) {
    return request({
      url: '/tms-account/usergroup/getAllUsergroup' + '?page=' + page + '&size=' + size,
      method: 'get',
      params: query
    })
  },
  // 模糊搜索用户组
  search(keyword, page, size) {
    return request({
      url: '/tms-account/usergroup/getUsergroupLike/' + keyword + '?page=' + page + '&size=' + size,
      method: 'get',
    })
  },
  // 查询用户组
  detail(id) {
    return request({
      url: '/tms-account/usergroup/' + id,
      method: 'get',
    })
  },
  // 编辑用户组
  edit(id, data) {
    return request({
      url: '/tms-account/usergroup/editUsergroup/' + id,
      method: 'put',
      data: data
    })
  },
  // 删除用户组
  delete(id) {
    return request({
      url: '/system/dept/' + id,
      method: 'delete'
    })
  },
}
>>>>>>> d064db06b67069b81ecf0c9bb9f27b955cc26b86
