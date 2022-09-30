import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { getStorage } from '@/utils/index'
import NProgress from 'nprogress'

export const asyncRoutes = [
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
      title: '权限页面',
    },
    children: [
      {
        path: 'one',
        name: 'PowerOne',
        component: () => import('../views/power/one/index.vue'),
        meta: {
          title: '权限页面1',
          icon: '',
        },
      },
      {
        path: 'two',
        name: 'PowerTwo',
        component: () => import('../views/power/two/index.vue'),
        meta: {
          title: '权限页面2',
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
      isNav: true,
      icon: 'error',
      title: '401',
    },
  },
  {
    path: '/error/404',
    name: 'Error404',
    component: () => import('../views/404/index.vue'),
    meta: {
      isNav: true,
      icon: 'error',
      title: '404',
    },
  },
  { path: '/*', redirect: '/error/404' },
]
const routes: Array<RouteRecordRaw> = [...constantRoutes]

const router = createRouter({
  history: createWebHistory(), //process.env.BASE_URL
  routes,
})
// 路由守卫
router.beforeEach((to, from, next) => {
  const token = getStorage('token')
  NProgress.start()
  if (to.path === '/login' && token) {
    next('/')
    return
  }
  if (to.path !== '/login' && !token) {
    next('/login')
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
