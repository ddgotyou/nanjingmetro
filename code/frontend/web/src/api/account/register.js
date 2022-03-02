import request from '@/utils/request'


  // 注册用户
  function register(data) {
    return request({
      url: '/tms-account/users/register',
      method: 'post',
      data: data
    })
  }

  export{
    register
  }
