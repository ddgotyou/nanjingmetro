import request from '@/utils/request'

module.exports = {
  // 查询用户列表
  list(query) {
    return request({
      url: '/tms-account/usergroup/getAllUser',
      method: 'get',
      params: query
    })
  },
  // 模糊搜索用户
  search(keyword) {
    return request({
      url: '/tms-account/usergroup/getUserLike/' + keyword,
      method: 'get',
    })
  },
}