import { defineStore } from 'pinia'
import { getStorage, setStorage, removeStorage } from '@/utils/index'
import type { userInfoType } from '@/api/login/type'
import router from '@/router'
export const mainStore = defineStore('main', {
  state: () => {
    return {
      token: getStorage('token') || '',
      userInfo: {
        name: '',
        avatar: ''
      }
    }
  },
  actions: {
    setToken(token: string) {
      setStorage('token', token)
      this.token = token
    },
    setUserInfo(userInfo: userInfoType){
      this.userInfo = userInfo
      setStorage('userInfo', userInfo)
    },
    logOut() {
      this.token = ''
      this.userInfo = {
        name: '',
        avatar: ''
      },
      removeStorage('token')
      removeStorage('userInfo')
      router.push('/login')
    },
  },
})
