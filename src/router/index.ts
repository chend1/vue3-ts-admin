import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { getStorage } from '@/utils/index'
import NProgress from 'nprogress'
const routes: Array<RouteRecordRaw> = [
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
  { path: '/\*', redirect: '/error/404' }
]

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
router.afterEach(() => {
  NProgress.done()
})
export default router
