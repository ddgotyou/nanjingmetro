import request from '@/utils/request'
<<<<<<< HEAD

// 新增学员
function add(data) {
  return request({
    url: '/tms-account/users/addTrainee',
    method: 'post',
    data: data
  })
}

// 查询学员列表
function list(query, page, size) {
  return request({
    url: '/tms-account/users/getTrainee' + '?page=' + page + '&size=' + size,
    method: 'get',
    params: query
  })
}

// 模糊搜索学员
function search(keyword, page, size) {
  return request({
    url: '/tms-account/users/getTraineeLike/' + keyword + '?page=' + page + '&size=' + size,
    method: 'get',
  })
}

// 查询学员
function detail(id, query) {
  return request({
    url: '/tms-account/users/getTraineeById/' + id,
    method: 'get',
    params: query
  })
}

// 编辑学员
function edit(id, data) {
  return request({
    url: '/tms-account/users/editTrainee/' + id,
    method: 'put',
    data: data
  })
}

// 删除学员
function del(id) {
  return request({
    url: '/tms-account/users/deleteTrainee/' + id,
    method: 'delete'
  })
}

export { add, list, search, detail, edit, del }
=======

module.exports = {
  // 新增学员
  add(data) {
    return request({
      url: '/tms-account/users/addTrainee',
      method: 'post',
      data: data
    })
  },
  // 查询学员列表
  list(query, page, size) {
    return request({
      url: '/tms-account/users/getTrainee' + '?page=' + page + '&size=' + size,
      method: 'get',
      params: query
    })
  },
  // 模糊搜索学员
  search(keyword, page, size) {
    return request({
      url: '/tms-account/users/getTraineeLike/' + keyword + '?page=' + page + '&size=' + size,
      method: 'get',
    })
  },
  // 查询学员
  detail(id, query) {
    return request({
      url: '/tms-account/users/getTraineeById/' + id,
      method: 'get',
      params: query
    })
  },
  // 编辑学员
  edit(id, data) {
    return request({
      url: '/tms-account/users/editTrainee/' + id,
      method: 'put',
      data: data
    })
  },
  // 删除学员
  delete(id) {
    return request({
      url: '/tms-account/users/deleteTrainee/' + id,
      method: 'delete'
    })
  },
}
>>>>>>> d064db06b67069b81ecf0c9bb9f27b955cc26b86
