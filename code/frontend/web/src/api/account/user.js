import request from '@/utils/request'

// 部门树
function list(params) {
  return request({
    url: '/tms-account/users/list',
    method: 'get',
    params: params
  })
}

export { list }
