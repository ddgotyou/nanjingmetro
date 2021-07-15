import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect', '/hello'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // 在页面最顶端（地址栏下方）显示进度条
  NProgress.start()

  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 判断用户是否已经登录
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，且路由路径为/login，直接重定向到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 判断用户是否已经通过user状态的getInfo行为解析并存储了权限信息
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 调用user状态的getInfo行为，解析权限信息
          // 提示： roles必须是一个对象数组，例如['admin']或['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')

          // 根据roles生成当前用户可访问的路由映射
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 将路由映射动态添加到路由中
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // 将replace设为true，以便此次导航不留历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 删除令牌，前往登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* 未登录 */

    if (whiteList.indexOf(to.path) !== -1) {
      // 如果在免登陆白名单中，直接放行
      next()
    } else {
      // 对于其它无权访问的页面，重定向到登录页
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
