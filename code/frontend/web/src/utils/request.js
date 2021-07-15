/**
 * author Hongfei
 * created on 2021-02-05
 */

import store from '@/store'
import { getToken } from '@/utils/auth'
import { MessageBox, Message } from 'element-ui'

export default function request(config) {
  let url = config.url

  if (!isAbsoluteUrl(url)) {
    url = process.env.VUE_APP_BASE_API + url
  }

  if (!config.headers) {
    config.headers = {}
  }

  config.headers['Content-Type'] = 'application/json'

  if (store.getters.token) {
    config.headers.Authorization = 'Bearer ' + getToken()
  }

  if (config.body) {
    config.body = JSON.stringify(config.body)
  }

  return fetch(url, config)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else { // 返回4xx或5xx
        checkErrorStatus(response)
        return abortSignal()
      }
    })
    // 只有在网络不可用，或回调方法本身出错时，返回的Promise才会是reject的，否则只要有响应，不管是2xx还是4xx，都是resolve的，
    // 区别仅在于ok属性是true还是false。因此catch语句仅在网络不可用时执行
    .catch(error => {
      console.log(error)
      Message({
        message:
              '无法连接至服务器，您可以稍后再试。如果持续出现此问题，请与系统管理员确认。',
        type: 'error',
        duration: 10 * 1000
      })

      // catch执行时客户代码的回调将会作为finally块。终止回调链以避免可能引发的新的异常。
      return abortSignal()
    })
}

function isAbsoluteUrl(url) {
  const u = url.toLowerCase()
  return u.startsWith('http://') || u.startsWith('https://')
}

/**
 * 用一个状态为Pending的Promise组织回调链继续执行。由于catch只在网络不可用时执行，故应该不会有太大的负面影响
 */
function abortSignal() {
  return (new Promise((resolve, reject) => {}))
}

function checkErrorStatus(response) {
  // console.log('错误：' + response.status)
  const url = response.url
  const status = response.status

  let errorMessage = response.status + ' ' + response.statusText

  let error = ''
  let error_description = ''

  let errorResponse = {}
  response.json().then(res => {
    errorResponse = res
  })

  if (errorResponse) {
    // 不能确保每一次错误响应都包含消息体
    error = errorResponse.error
    error_description = errorResponse.error_description
    // const logMessage = JSON.stringify(resData)
    // console.log(logMessage)
  }

  if (status === 400) {
    // 400 Bad Request
    if (isLoginUrl(url)) {
      if (error.toLowerCase() === 'invalid_grant') {
        // 用户名存在，但登录不成功
        switch (error_description.toLowerCase()) {
          case 'bad credentials': // 密码错误
            errorMessage = '密码错误'
            break
          case 'user is disabled':
            errorMessage = '账户未启用'
            break
          case 'user account is locked':
            errorMessage = '账户已锁定'
            break
          case 'user account has expired':
            errorMessage = '账户已过期'
            break
          case 'user credentials have expired':
            errorMessage = '密码已过期'
            break
          default:
        }
      }
    }
  } else if (status === 401) {
    // 401 Unauthorized

    if (isLoginUrl(url)) {
      errorMessage = '用户不存在'
    } else {
      MessageBox.confirm(
        '您已登出应用，可以点击“取消”留在此页面，或重新登录',
        '确认',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    }
  } else if (status === 403) {
    // 403 Forbidden
    // 当用户登录时返回403，表示应用程序的OAUTH凭据不再有效
    if (isLoginUrl(url)) {
      errorMessage =
        '当前应用向认证服务提交了无效的OAUTH凭据，请与系统管理员确认此问题'
    } else {
      // 其余url均表示用户无权执行操作
    }
  } else if (status === 404) {
    // 404 Not found
    errorMessage = '请求的资源不存在'
  } else if (status === 405) {
    // 405 Method not allowed
    errorMessage
  } else if (status === 500) {
    // 500 Internal server error
    errorMessage
  }

  Message({
    message: errorMessage,
    type: 'error',
    duration: 5 * 1000
  })
  // return Promise.reject(err)
}

function isLoginUrl(url) {
  return url.startsWith(
    process.env.VUE_APP_BASE_API + '/auth-service/oauth/token'
  )
}
