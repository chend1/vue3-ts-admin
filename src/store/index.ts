import { defineStore } from 'pinia'
import { getStorage, setStorage, removeStorage } from '@/utils/index'
export const mainStore = defineStore('main', {
  state: () => {
    return {
      token: getStorage('token') || '',
    }
  },
  actions: {
    setToken(token: string) {
      setStorage('token', token)
      this.token = token
    },
    logOut() {
      this.token = ''
      removeStorage('token')
    },
  },
})
