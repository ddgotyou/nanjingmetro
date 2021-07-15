
const oauthTokens = {
  admin: { // sys admin
    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE1ODE2NTY5OTQsImF1dGhvcml0aWVzIjpbIlNZU19BRE1JTiJdLCJqdGkiOiJmN2M1MjdkYi03NDBmLTQzMzQtYTYyOC1kMzdhMjEyNzBiMWMiLCJ0ZW5hbnQiOiJzeXMiLCJjbGllbnRfaWQiOiJjbGllbnQifQ.yHrJIddxOmm8NLVtAZjeMY3H0zC1_Wf4GkbjKxwqWOs', // Admin only
    token_type: 'bearer',
    refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJhdGkiOiJmN2M1MjdkYi03NDBmLTQzMzQtYTYyOC1kMzdhMjEyNzBiMWMiLCJleHAiOjE1ODQyNDUzOTQsImF1dGhvcml0aWVzIjpbIkFVVEhfVVNFUiIsIkFVVEhfQURNSU4iXSwianRpIjoiNDlmZTBiNmEtN2NiNC00YjM5LTk2NTMtMTNlYjZlODVlNmQyIiwidGVuYW50IjoxLCJjbGllbnRfaWQiOiJjbGllbnQifQ.IojR5EKozd06I5NqAPI5dVwzTcrkgtW_aAawxVUtSZg',
    expires_in: 3599,
    scope: '',
    jti: 'f7c527db-740f-4334-a628-d37a21270b1c'
  },
  hmadmin: {
    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJobWFkbWluIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImV4cCI6MTU4MTY1Njk5NCwiYXV0aG9yaXRpZXMiOlsiSE1fQURNSU4iXSwianRpIjoiZjdjNTI3ZGItNzQwZi00MzM0LWE2MjgtZDM3YTIxMjcwYjFjIiwidGVuYW50IjoiaG0iLCJjbGllbnRfaWQiOiJjbGllbnQifQ.csazI-QqxG98nZgsBkVU3BfPhP0s4zVfrs_owBjvDrQ',
    token_type: 'bearer',
    refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJhdGkiOiJmN2M1MjdkYi03NDBmLTQzMzQtYTYyOC1kMzdhMjEyNzBiMWMiLCJleHAiOjE1ODQyNDUzOTQsImF1dGhvcml0aWVzIjpbIkFVVEhfVVNFUiIsIkFVVEhfQURNSU4iXSwianRpIjoiNDlmZTBiNmEtN2NiNC00YjM5LTk2NTMtMTNlYjZlODVlNmQyIiwidGVuYW50IjoxLCJjbGllbnRfaWQiOiJjbGllbnQifQ.IojR5EKozd06I5NqAPI5dVwzTcrkgtW_aAawxVUtSZg',
    expires_in: 3599,
    scope: '',
    jti: 'f7c527db-740f-4334-a628-d37a21270b1c'
  },
  hmuser: {
    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJobXVzZXIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTgxNjU2OTk0LCJhdXRob3JpdGllcyI6WyJITV9VU0VSIl0sImp0aSI6ImY3YzUyN2RiLTc0MGYtNDMzNC1hNjI4LWQzN2EyMTI3MGIxYyIsInRlbmFudCI6ImhtIiwiY2xpZW50X2lkIjoiY2xpZW50In0.i69YsF5AXQoQpSCj31HPFbVepksyM07TnWPAvlY4rDI', // User only
    token_type: 'bearer',
    refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJhdGkiOiJmN2M1MjdkYi03NDBmLTQzMzQtYTYyOC1kMzdhMjEyNzBiMWMiLCJleHAiOjE1ODQyNDUzOTQsImF1dGhvcml0aWVzIjpbIkFVVEhfVVNFUiIsIkFVVEhfQURNSU4iXSwianRpIjoiNDlmZTBiNmEtN2NiNC00YjM5LTk2NTMtMTNlYjZlODVlNmQyIiwidGVuYW50IjoxLCJjbGllbnRfaWQiOiJjbGllbnQifQ.IojR5EKozd06I5NqAPI5dVwzTcrkgtW_aAawxVUtSZg',
    expires_in: 3599,
    scope: '',
    jti: 'f7c527db-740f-4334-a628-d37a21270b1c'
  },
  aowadmin: {
    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhb3dhZG1pbiIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE1ODE2NTY5OTQsImF1dGhvcml0aWVzIjpbIkFPV19BRE1JTiJdLCJqdGkiOiJmN2M1MjdkYi03NDBmLTQzMzQtYTYyOC1kMzdhMjEyNzBiMWMiLCJ0ZW5hbnQiOiJhb3ciLCJjbGllbnRfaWQiOiJjbGllbnQifQ.3GM97gvDQIkQ4bLbF1Z-h4Itl5Z0eTxp2swDVJU5FiA',
    token_type: 'bearer',
    refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJhdGkiOiJmN2M1MjdkYi03NDBmLTQzMzQtYTYyOC1kMzdhMjEyNzBiMWMiLCJleHAiOjE1ODQyNDUzOTQsImF1dGhvcml0aWVzIjpbIkFVVEhfVVNFUiIsIkFVVEhfQURNSU4iXSwianRpIjoiNDlmZTBiNmEtN2NiNC00YjM5LTk2NTMtMTNlYjZlODVlNmQyIiwidGVuYW50IjoxLCJjbGllbnRfaWQiOiJjbGllbnQifQ.IojR5EKozd06I5NqAPI5dVwzTcrkgtW_aAawxVUtSZg',
    expires_in: 3599,
    scope: '',
    jti: 'f7c527db-740f-4334-a628-d37a21270b1c'
  },
  aowuser: {
    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhb3d1c2VyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImV4cCI6MTU4MTY1Njk5NCwiYXV0aG9yaXRpZXMiOlsiQU9XX1VTRVIiXSwianRpIjoiZjdjNTI3ZGItNzQwZi00MzM0LWE2MjgtZDM3YTIxMjcwYjFjIiwidGVuYW50IjoiYW93IiwiY2xpZW50X2lkIjoiY2xpZW50In0.csmTXEPvC-4804JUmZHa20LWuwu8o2xSgG9L9Je3T6I', // User only
    token_type: 'bearer',
    refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJhdGkiOiJmN2M1MjdkYi03NDBmLTQzMzQtYTYyOC1kMzdhMjEyNzBiMWMiLCJleHAiOjE1ODQyNDUzOTQsImF1dGhvcml0aWVzIjpbIkFVVEhfVVNFUiIsIkFVVEhfQURNSU4iXSwianRpIjoiNDlmZTBiNmEtN2NiNC00YjM5LTk2NTMtMTNlYjZlODVlNmQyIiwidGVuYW50IjoxLCJjbGllbnRfaWQiOiJjbGllbnQifQ.IojR5EKozd06I5NqAPI5dVwzTcrkgtW_aAawxVUtSZg',
    expires_in: 3599,
    scope: '',
    jti: 'f7c527db-740f-4334-a628-d37a21270b1c'
  }
}

const tenants = {
  sys: {
    // 系统租户应该有自己的测试数据
    name: 'sys',
    uiSettings: {
      title: 'AVP前端服务框架',
      logo: 'http://pqtm.hmmachine.com:4080/pqtm/static/lib/image/logo_white_smart_watt.png'
    }
  },
  hm: {
    name: 'hm',
    uiSettings: {
      title: '华铭产品质量跟踪系统',
      logo: 'http://pqtm.hmmachine.com:4080/pqtm/static/lib/image/logo_white_smart_watt.png'
    },
    // routeConfig为数组
    // 设置当前用户的路由配置
    // 客户端定义有完整的路由
    // 1、不同租户有不同的用户路由配置
    // 2、与客户端路由定义不同，路由配置为列表形式，通过路由名称（name属性）进行标识
    // 3、客户端会根据根据name对路由定义进行递归比对，若未从路由配置中发现匹配项，则表示
    //    该项对当前租户是不可用的。客户端会将该项的roles数组设为[]（不通过length设为0的方式，是因为某些路由默认可能未设置roles）
    routeConfigs: [
      {
        name: 'Icons',
        meta: {
          title: '',
          roles: ['HM_ADMIN'] // 设置该项的权限，注意：1、若用户权限为
        }
      },
      {
        name: 'PDF',
        meta: {
          title: '',
          roles: ['HM_ADMIN'] // 设置该项的权限，注意：1、若用户权限为
        }
      },
      {
        name: 'ExportZip',
        meta: {
          title: '',
          roles: ['HM_ADMIN'] // 设置该项的权限，注意：1、若用户权限为
        }
      },
      {
        name: 'Zip',
        meta: {
          title: '',
          roles: ['HM_ADMIN', 'AUTH_USER'] // 设置该项的权限，注意：1、若用户权限为
        }
      }
    ],
    resources: {
      zh: {},
      en: {}
    },
    propertySchema: {}
  },
  aow: {

  }
}

module.exports = [
  // user login
  // {
  //   url: '/vue-element-admin/user/login',
  //   type: 'post',
  //   response: config => {
  //     const { username } = config.body
  //     const token = tokens[username]

  //     // mock error
  //     if (!token) {
  //       return {
  //         code: 60204,
  //         message: 'Account and password are incorrect.'
  //       }
  //     }

  //     return {
  //       code: 20000,
  //       data: token
  //     }
  //   }
  // },

  // get user info
  {
    url: '/tenant-service/tenants/\.*', // '/vue-element-admin/user/info\.*',
    type: 'get',
    response: config => {
      // const { token } = config.query
      const tenant = 'sys'
      const tenantConfig = tenants[tenant]
      // TODO:弄清楚config中路径变量的属性

      // // mock error
      // if (!info) {
      //   return {
      //     code: 50008,
      //     message: 'Login failed, unable to get user details.'
      //   }
      // }

      return tenantConfig
    }
  },

  // user logout
  {
    url: '/vue-element-admin/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  // oauth login
  {
    url: '/oauth/token\.*',
    type: 'post',
    response: config => {
      const { username } = config.query
      const token = oauthTokens[username]
      return token
    }
  },

  // tenant info
  {
    url: '/tenant-service/config\.*',
    type: 'get',
    response: config => {
      return {

      }
    }
  }
]
