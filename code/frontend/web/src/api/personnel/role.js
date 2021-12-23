import request from '@/utils/request'

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