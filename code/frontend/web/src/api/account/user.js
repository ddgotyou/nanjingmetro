import request from '@/utils/request'

// 查询用户列表
function list(query) {
  return request({
    url: '/tms-account/usergroup/getAllUser',
    method: 'get',
    params: query
  })
}

// 模糊搜索用户
function search(keyword) {
  return request({
    url: '/tms-account/usergroup/getUserLike/' + keyword,
    method: 'get',
  })
}

export { list, search }
