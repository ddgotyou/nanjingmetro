import request from '@/utils/request'

// 新增讲师
function add(id, data) {
  return request({
    url: '/tms-account/users/addTrainer' + '?myUserId=' + id,
    method: 'post',
    data: data
  })
}

// 查询讲师列表
function list(id, query, page, size) {
  let params = {};
  params["myUserId"] = id;
  if (page) params["page"] = page;
  if (size) params["size"] = size;
  for (let attr in query) {
    if (query[attr] !== "")
      params[attr] = query[attr];
  }

  return request({
    url: '/tms-account/users/getTrainer',
    method: 'get',
    params: params
  })
}

// 模糊搜索讲师
function search(keyword, page, size) {
  return request({
    url: '/tms-account/users/getTrainerLike/' + keyword + '?page=' + page + '&size=' + size,
    method: 'get',
  })
}

// 查询讲师
function detail(id, query) {
  return request({
    url: '/tms-account/users/getTrainerById/' + id,
    method: 'get',
    params: query
  })
}

// 编辑讲师
function edit(userId, id, data) {
  return request({
    url: '/tms-account/users/editTrainer/' + id + '?myUserId=' + userId,
    method: 'put',
    data: data
  })
}

// 删除讲师
function del(userId, id) {
  return request({
    url: '/tms-account/users/deleteTrainer/' + id + '?myUserId=' + userId,
    method: 'delete'
  })
}

export { add, list, search, detail, edit, del }

