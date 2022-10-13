import { defineStore } from 'pinia'
import { getStorage, setStorage, removeStorage } from '@/utils/index'
import type { userInfoType, menuType } from '@/api/login/type'
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
    setUserInfo(userInfo: userInfoType) {
      this.userInfo = userInfo
      setStorage('userInfo', userInfo)
    },
    setMenu(menu: menuType[]) {
      this.menu = menu
      this.routerList = generateRoutes(menu)
      console.log(this.routerList);
      
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
