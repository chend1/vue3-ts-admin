import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { getStorage } from '@/utils/storage'
import NProgress from 'nprogress'
import { mainStore } from '@/store'
export const asyncRoutes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/index.vue'),
    meta: {
      isNav: true,
      icon: 'home',
      title: '首页',
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/about/index.vue'),
    meta: {
      isNav: true,
      icon: 'about',
      title: '关于我们',
    },
  },
  {
    path: '/table',
    name: 'Table',
    component: () => import('../views/table/index.vue'),
    meta: {
      isNav: true,
      icon: 'table',
      title: 'Table表格',
    },
  },
  {
    path: '/power',
    name: 'Power',
    component: () => import('../views/power/index.vue'),
    meta: {
      isNav: true,
      icon: 'power',
      title: '权限管理',
    },
    children: [
      {
        path: '/power/userManage',
        name: 'UserManage',
        component: () => import('../views/power/userManage/index.vue'),
        meta: {
          title: '用户管理',
          icon: '',
        },
      },
      {
        path: '/power/menuManage',
        name: 'MenuManage',
        component: () => import('../views/power/menuManage/index.vue'),
        meta: {
          title: '菜单管理',
          icon: '',
        },
      },
      {
        path: '/power/roleManage',
        name: 'RoleManage',
        component: () => import('../views/power/roleManage/index.vue'),
        meta: {
          title: '角色管理',
          icon: '',
        },
      },
    ],
  },
]
// 常用路由
export const constantRoutes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
    meta: {
      icon: '',
      title: '登录',
    },
  },
  {
    path: '/error/401',
    name: 'Error401',
    component: () => import('../views/401/index.vue'),
    meta: {
      icon: 'error',
      title: '401',
    },
  },
  {
    path: '/error/404',
    name: 'Error404',
    component: () => import('../views/404/index.vue'),
    meta: {
      icon: 'error',
      title: '404',
    },
  }
]
const routes: Array<RouteRecordRaw> = [...constantRoutes]

const router = createRouter({
  history: createWebHistory(), //createWebHashHistory,createWebHistory
  routes,
})
// 路由守卫
router.beforeEach(async (to, from, next) => {
  const token = getStorage('token')
  NProgress.start()
  const store = mainStore()
  const menu = store.routerList
  if (to.path === '/login' && token) {
    next('/')
    return
  }
  if (to.path !== '/login' && !token) {
    next('/login')
    return
  }
  if (to.path !== '/login' && token) {
    if (menu && menu.length) {
      next()
    } else {
      await store.setUserInfo()
      // 第一次进入页面，addRoute刚添加路由未生效，需要重进一次
      next({ ...to, replace: true })
    }
    return
  }
  next()
})
// 重置路由
export const resetRouter = () => {
  const asyncRoutesName = asyncRoutes.map((item) => {
    return item.name
  })
  asyncRoutesName.forEach((name) => {
    if (router.hasRoute(name)) {
      router.removeRoute(name)
    }
  })
}
router.afterEach(() => {
  NProgress.done()
})
export default router
