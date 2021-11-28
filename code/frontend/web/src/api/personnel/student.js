import request from '@/utils/request'

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
  list(query) {
    return request({
      url: '/tms-account/users/getTrainee',
      method: 'get',
      params: query
    })
  },
  // 模糊搜索学员
  search(keyword) {
    return request({
      url: '/tms-account/users/getTraineeLike/' + keyword,
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