import { createApp } from 'vue'
// 引入pinia
import { createPinia } from 'pinia'
// 创建 Pinia 实例
const pinia = createPinia()
// 导入路由
import router from './router'
// 引入 ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//引入基本样式
import 'normalize.css/normalize.css'
import '@/assets/css/base.css'
// svg引入
import svgIcon from '@/assets/svg/index.vue'
import 'virtual:svg-icons-register'
// mock拦截请求
import { mockXHR } from '../mock/index'
import.meta.env.VITE_APP_NODE_ENV === 'development' ? mockXHR() : ''
// 加载进度样式 nprogress样式
import 'nprogress/nprogress.css'
import App from './App.vue'
const app = createApp(App)
app.component('svg-icon', svgIcon)
app.use(pinia)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')
