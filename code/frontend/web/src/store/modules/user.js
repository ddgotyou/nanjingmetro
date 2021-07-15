// 注意：此处仅负责设置、保存与用户相关的信息（详情、配置等等），具体的获取方式代理给/api/user

import { login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
// import { asyncRoutes } from '@/router'
import { getUserInfo } from '@/utils/jwt'
// import Settings from '@/settings'
// import { configRoutes } from '@/utils/route-config'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 用户登录，此处仅通过/api/user/login方法获取并存储OAuth令牌，令牌的解析由getInfo完成
  login({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password
      })
        .then(response => {
          const data = response
          commit('SET_TOKEN', data.access_token)
          setToken(data.access_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
    })
  },

  // 解析OAuth令牌获取用户名与权限信息
  // 注意：getInfo行为仅在实际发生路由导航时执行一次，其主要目的是获取用户的权限（角色）信息，
  // 其执行时机已在UI初始化之后，故不应在此处执行与UI设置相关的操作
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      const token = getToken()
      const userInfo = getUserInfo(token)

      //   const { tenant } = userInfo

      const data = {
        roles: userInfo.authorities,
        introduction: '',
        avatar: 'http://hbimg.b0.upaiyun.com/c5440470619c6048395d6ebeff4212025414266a29a0-dIo4KG_fw658',
        name: userInfo.user_name
      }

      // roles 必须是非空数组
      if (!data.roles || data.roles.length <= 0) {
        reject('getInfo: roles must be a non-null array!')
      }

      commit('SET_ROLES', data.roles)
      commit('SET_NAME', data.name)
      commit('SET_AVATAR', data.avatar)
      commit('SET_INTRODUCTION', data.introduction)
      resolve(data)
    })
  },

  // user logout
  logout({
    commit,
    state,
    dispatch
  }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()

      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, {
        root: true
      })

      resolve()

      // logout(state.token).then(() => {
      //   commit('SET_TOKEN', '')
      //   commit('SET_ROLES', [])
      //   removeToken()
      //   resetRouter()

      //   // reset visited views and cached views
      //   // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      //   dispatch('tagsView/delAllViews', null, {
      //     root: true
      //   })

      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }

  // dynamically modify permissions
  //   changeRoles({
  //     commit,
  //     dispatch
  //   }, role) {
  //     return new Promise(async resolve => {
  //       const token = role + '-token'

  //       commit('SET_TOKEN', token)
  //       setToken(token)

  //       const {
  //         roles
  //       } = await dispatch('getInfo')

  //       resetRouter()

  //       // generate accessible routes map based on roles
  //       const accessRoutes = await dispatch('permission/generateRoutes', roles, {
  //         root: true
  //       })

  //       // dynamically add accessible routes
  //       router.addRoutes(accessRoutes)

  //       // reset visited views and cached views
  //       dispatch('tagsView/delAllViews', null, {
  //         root: true
  //       })

//       resolve()
//     })
//   }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
