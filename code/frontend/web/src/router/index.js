import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * 提示：仅当包含子路由时才会显示子菜单
 * 详情参考：https://panjiachen.github.io/vue-element-AUTH_ADMIN-site/guide/essentials/router-and-nav.html
 *
 * 路由定义选项如下：
 *
 * hidden: true                   若为true，该路由不会出现在侧边导航栏中（默认为false）
 * alwaysShow: true               若为true，则使用显示该项的根节点（参考稍后的icon路由）
 *                                如未指定alwaysShow属性，当该路由包含多于一个子路由时，将会呈现为嵌套模式，
 *                                若不包含或仅包含一个子路由，将不显示该项的根节点
 * redirect: noRedirect           若将redirect设为noRedirect，该项将不在breadcrumb中重新跳转
 * name:'router-name'             <keep-alive>使用的名称。除以下两种情况外，必须设置：
 *                                         1、该项为父节点且只有一个子节点（此时导航项的属性由子节点决定）
 *                                         2、hidden为true的节点
 * meta : {
    roles: ['AUTH_ADMIN','AUTH_USER']    控制页面权限（可设置多个权限），
                                         注意：1、若用户权限为AUTH_ADMIN，则不论导航项如何设置均对该用户可见
                                              2、若不设置roles，则表示该项无限制（任何人可见）
                                              3、若设为[]（空数组），则除AUTH_ADMIN之外所有人均不可见
    title: 'title'               侧边导航栏和breadcrumb中显示的名称（建议设置）若与语言文件中的键值匹配则应用i18n，若无匹配项则直接设置
    icon: 'svg-name'             侧边导航栏中显示的图标
    noCache: true                若为true则该页面不被缓存（默认为false）
    affix: true                  若为true则该页面标签将在tags-view中黏附
    breadcrumb: false            若为false，该项在breadcrumb中隐藏（默认为true）
    activeMenu: '/example/list'  若设置，侧边导航栏将高亮指定的路径
  }
 */

/**
 * 不受权限限制的常量路由，定义在此处的路由可以被所有已登录用户访问
 * 注意：最终的路由将由constantRoutes与asyncRoutes组合而成，
 * 常量路由（中的非隐藏项）将始终出现在动态路由之前。合成过程不对次序进行调整
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'el-icon-s-home', affix: true }
      }
    ]
  },
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: 'Documentation',
  //       meta: { title: 'documentation', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * 受权限限制的动态路由，会根据用户权限动态加入到最终的路由定义中
 * 具体参看以下各示例路由的meta.roles属性
 */
export const asyncRoutes = [
  {
    path: '/rulechainrepo',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/rule-chain-repo/index'),
        name: 'RuleChainRepo',
        meta: { title: 'ruleChainRepo', icon: 'el-icon-link', noCache: true, roles: ['TENANT_ADMIN'] }
      }
    ]
  },
  {
    path: '/tenants',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/tenant/index'),
        name: 'Tenant',
        meta: { title: 'tenant', icon: 'el-icon-s-custom', noCache: true, roles: ['SYS_ADMIN'] }
      }
    ]
  },
  {
    path: '/users',
    // path: '/:a/:id/users',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/user/index'),
        name: 'User',
        meta: { title: 'user', icon: 'el-icon-s-custom', noCache: true, roles: ['SYS_ADMIN', 'TENANT_ADMIN'] }
      }
    ]
  },

  {
    path: '/customers',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/customer/index'),
        name: 'Customer',
        meta: { title: 'customer', icon: 'peoples', noCache: true, roles: ['TENANT_ADMIN'] }
      }
    ]
  },

  {
    path: '/assets',
    component: Layout,
    // redirect: 'noRedirect',
    // name: 'ErrorPages',
    // meta: {
    //   title: 'asset',
    //   icon: 'table',
    //   noCache: true,
    //   roles: ['TENANT_ADMIN', 'CUSTOMER_USER']
    // },
    children: [
      {
        path: 'index',
        component: () => import('@/views/asset/index'),
        name: 'Asset',
        meta: { title: 'asset', icon: 'table', noCache: true, roles: ['TENANT_ADMIN', 'CUSTOMER_USER'] }
      }
    ]
  },

  {
    path: '/devices',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/device/index'),
        name: 'Device',
        meta: { title: 'device', icon: 'el-icon-mobile', noCache: true, roles: ['TENANT_ADMIN', 'CUSTOMER_USER'] }
      }
    ]
  },

  //   {
  //     path: '/excel',
  //     component: Layout,
  //     redirect: '/excel/export-excel',
  //     name: 'Excel',
  //     meta: {
  //       title: 'entityView',
  //       icon: 'el-icon-view',
  //       noCache: true,
  //       roles: ['TENANT_ADMIN', 'CUSTOMER_USER']
  //     },
  //     children: [
  //       {
  //         path: 'export-excel',
  //         component: () => import('@/views/excel/export-excel'),
  //         name: 'ExportExcel',
  //         meta: { title: 'exportExcel' }
  //       },
  //       {
  //         path: 'export-selected-excel',
  //         component: () => import('@/views/excel/select-excel'),
  //         name: 'SelectExcel',
  //         meta: { title: 'selectExcel' }
  //       },
  //       {
  //         path: 'export-merge-header',
  //         component: () => import('@/views/excel/merge-header'),
  //         name: 'MergeHeader',
  //         meta: { title: 'mergeHeader' }
  //       },
  //       {
  //         path: 'upload-excel',
  //         component: () => import('@/views/excel/upload-excel'),
  //         name: 'UploadExcel',
  //         meta: { title: 'uploadExcel' }
  //       }
  //     ]
  //   },

  //   {
  //     path: '/zip',
  //     component: Layout,
  //     redirect: '/zip/download',
  //     alwaysShow: true,
  //     name: 'Zip',
  //     meta: { title: 'widgetRepo', icon: 'component', noCache: true, roles: ['TENANT_ADMIN', 'SYS_ADMIN'] },
  //     children: [
  //       {
  //         path: 'download',
  //         component: () => import('@/views/zip/index'),
  //         name: 'ExportZip',
  //         meta: { title: 'exportZip' }
  //       }
  //     ]
  //   },

  {
    path: '/scenerepo',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/scene-repo/index'),
        name: 'SceneRepo',
        meta: { title: 'sceneRepo', icon: 'dashboard', noCache: true, roles: ['TENANT_ADMIN', 'CUSTOMER_USER'] }
      }
    ]
  },

  {
    path: '/auditlog',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/audit-log/index'),
        name: 'I18n',
        meta: { title: 'auditLog', icon: 'el-icon-s-claim', noCache: true, roles: ['TENANT_ADMIN'] }
      }
    ]
  },
  {
    path: '/syssetting',
    component: () => import('@/layout'), // 另一种声明方式
    redirect: '/sys-setting/page',
    alwaysShow: true, // 始终显示根节点
    name: 'Permission',
    meta: {
      title: 'sysSetting',
      icon: 'el-icon-setting',
      roles: ['SYS_ADMIN'] // 可为该路由根节点设置权限
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/sys-setting/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['AUTH_ADMIN'] // 或仅为子路由设置权限
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/sys-setting/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // 如未设置权限，则表示该页面没有权限限制
        }
      },
      {
        path: 'role',
        component: () => import('@/views/sys-setting/role'),
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['AUTH_ADMIN']
        }
      }
    ]
  },
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'http://confluence.avantport.com/pages/viewpage.action?pageId=7045148',
  //       meta: { title: 'externalLink', icon: 'link' }
  //     }
  //   ]
  // },

  // 404页面必须位于路由定义最后！！！
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  base: '/',
  mode: 'history', // 需要服务支持
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// 具体参考： https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
