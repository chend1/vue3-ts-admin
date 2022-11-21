# vue3-ts-admin 项目简介
Vue 3 + TypeScript + Vite +  Vue-Router + pinia + Element-Plus + Echarts + Axios 后台管理框架
项目中使用mockjs模拟需要的后端接口请求，实现了路由权限控制,富文本编辑等功能
*** 
master主分支 包含富文本编辑等功能
*** 
auth-template分支 仅添加了路由权限控制
*** 
base-template分支 基本后台框架，无权限控制
```js
// 登录账号
admin 
123456
```
# 项目预览
![](/src/assets/images/%E9%A6%96%E9%A1%B5.png)
![](/src/assets/images/%E8%A1%A8%E5%8D%95.png)
![](/src/assets/images/%E6%9D%83%E9%99%90.png)
![](/src/assets/images/%E6%9D%83%E9%99%901.png)
![](/src/assets/images/%E6%9D%83%E9%99%902.png)
![](/src/assets/images/%E6%9D%83%E9%99%903.png)
![](/src/assets/images/%E6%9D%83%E9%99%904.png)
![](/src/assets/images/%E5%AF%8C%E6%96%87%E6%9C%AC.png)

# 功能说明
* 1.表单使用element-plus的table，pagination组件，实现了编辑，新增，删除，分页功能
* 2.富文本编辑使用的是 tinymce， @tinymce/tinymce-vue
* 3.路由权限控制 给用户设置角色，再给角色分配菜单权限，通过菜单权限展示对应路由页面
# 项目启动
```js
yarn  //安装依赖
yarn dev --host  //启动
```

# 描述
个人开发维护! 遇到问题或项目不足欢迎交流提出 535413064！