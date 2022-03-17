import request from '@/utils/request'

// 判断是否有编辑权限
function auth(id, authName) {
  return request({
    url: '/tms-account/auth/checkUserAuth/' + id + '/' + authName,
    method: 'get'
  })
}

export { auth }
