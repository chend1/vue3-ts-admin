import { defineStore } from 'pinia'
import { getStorage, setStorage, removeStorage } from '@/utils/index'
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
      console.log(33);
      
      return true
    },
    setMenu(menu: menuType[]) {
      this.menu = menu
      this.routerList = generateRoutes(menu)
      this.routerList.forEach((route: any) => {
        router.addRoute(route)
      })
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
