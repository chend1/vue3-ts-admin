import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { getStorage } from '@/utils/index'
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
      icon: 'home'
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/about/index.vue'),
    meta: {
      isNav: true,
      icon: 'about'
    },
  },
  {
    path: '/error/401',
    name: 'Error401',
    component: () => import('../views/401/index.vue'),
    meta: {
      isNav: true,
      icon: 'error'
    },
  },
  {
    path: '/error/404',
    name: 'Error404',
    component: () => import('../views/404/index.vue'),
    meta: {
      isNav: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(), //process.env.BASE_URL
  routes,
})
// 路由守卫
router.beforeEach((to, from, next) => {
  const token = getStorage('token')
  if (to.path === '/login' && token) {
    next('/')
    return
  }
  if(to.path !== '/login' && !token){
    next('/login')
    return
  }
  next()
})
export default router
