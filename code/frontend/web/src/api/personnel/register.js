import request from '@/utils/request'

module.exports = {
  // 注册用户
  register(data) {
    return request({
      url: '/tms-account/users/register',
      method: 'post',
      data: data
    })
  },
}