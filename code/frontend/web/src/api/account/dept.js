import request from '@/utils/request'

// 部门树
function tree(params) {
  return request({
    url: '/tms-account/depts/tree',
    method: 'get',
    params: params
  })
}

// 新增部门
function append(id, name) {
  return request({
    url: '/tms-account/depts/append/' + id + '?name=' + name,
    method: 'post',
  })
}

// 编辑部门
function edit(id, name) {
  return request({
    url: '/tms-account/depts/edit/' + id + '?name=' + name,
    method: 'put',
  })
}

// 移动部门
function shift(id, action) {
  return request({
    url: '/tms-account/depts/shift/' + id + '?action=' + action,
    method: 'put',
  })
}

// 删除部门
function remove(ids) {
  return request({
    url: '/tms-account/depts/remove/' + ids.join(','),
    method: 'delete',
  })
}

export { tree, append, edit, shift, remove }
