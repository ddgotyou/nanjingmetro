import request from '@/utils/request'

<<<<<<< HEAD
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
=======
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
>>>>>>> d064db06b67069b81ecf0c9bb9f27b955cc26b86
