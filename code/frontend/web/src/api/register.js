import request from '@/utils/request'

// 注册方法
export function register(data) {
  return request({
    url: '/tms-account/users/register',
    method: 'post',
    data: data
  })
}