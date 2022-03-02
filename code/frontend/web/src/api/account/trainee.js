import request from '@/utils/request'

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
  let params = {};
  if (page) params["page"] = page;
  if (size) params["size"] = size;
  for (let attr in query) {
    if (query[attr] !== "")
      params[attr] = query[attr];
  }

  return request({
    url: '/tms-account/users/getTrainee',
    method: 'get',
    params: params
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
