import { defineStore } from 'pinia'
import { getStorage, setStorage, removeStorage } from '@/utils/storage'
import type { userInfoType, menuType } from '@/api/login/type'
import { getInfo } from '@/api/login'
import { generateRoutes } from './permission'
import router from '@/router'
interface routeType {
  path: string
  name: string
  component: any
  meta: {
    isNav: boolean
    icon: string
    title: string
  }
  children?: routeType[]
}
export const mainStore = defineStore('main', {
  state: () => {
    const userInfo: userInfoType = getStorage('userInfo', 'object') || {
      name: '',
      avatar: '',
    }
    const menu: menuType[] = []
    const routerList: routeType[]  = []
    return {
      token: getStorage('token') || '',
      userInfo: userInfo,
      menu,
      routerList,
    }
  },
  actions: {
    setToken(token: string) {
      setStorage('token', token)
      this.token = token
    },
    async setUserInfo() {
      const result = await getInfo({token: this.token})
      this.userInfo = result.userInfo
      setStorage('userInfo', result.userInfo)
      this.setMenu(result.menu)
      return true
    },
    setMenu(menu: menuType[]) {
      this.menu = menu
      this.routerList = generateRoutes(menu)
      this.routerList.forEach((route: any) => {
        router.addRoute(route)
      })
      // 必须最后加上404跳转路由，不然刷新会直接跳转404
      router.addRoute({ path: '/:pathMatch(.*)', redirect: '/error/404' })
    },
    logOut() {
      this.token = ''
      ;(this.userInfo = {
        name: '',
        avatar: '',
      }),
        removeStorage('token')
      removeStorage('userInfo')
      router.push('/login')
    },
  },
  getters: {
    getRouterList(): routeType[]{
      return this.routerList
    }
  },
})
