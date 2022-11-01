# vue3-ts-admin 项目简介
Vue 3 + TypeScript + Vite +  Vue-Router + pinia + Element-Plus + Axios 后台管理框架;
项目中使用mockjs模拟需要的后端接口请求，实现了路由权限控制功能，可在此项目基础上直接进行二次开发
# 目录结构描述
```
│  .gitignore			git配置文件
|  index.html           项目html模板文件
│  package.json         项目相关依赖
│  README.md			项目说明
|  tsconfig.json        TS配置文件
|  tsconfig.node.json   TS配置文件
│  vite.config.ts 	    vite配置文件
│  yarn.lock            项目相关依赖具体版本
│
├─.vscode				vscode配置文件
│      extensions.json
│
├─node_modules          项目依赖包
├─mock                  mock服务配置文件,接口请求模拟数据
├─public
│      vite.svg
│
└─src
    │  App.vue
    │  main.ts
    │  vite-env.d.ts
    │
    ├─api					api管理模块
    │  │ request.ts			请求入口文件
    │  │-http			      
    |  |    index.ts      axios封装文件
    │  │-login
    |  |    index.ts      请求接口
    |  |    type.ts       接口请求类型
    │  └─···
    │
    ├─assets				静态文件
    │  |
    │  |-css
    │  |-images
    │  |-svg        
    │  |   |-icons     svg 图片
    │  └─ index.vue   
    │
    ├─components			公共组件目录
    │
    ├─hooks
    │
    ├─layout				项目结构布局
    │      components  私有组件
    │      indx.vue
    │
    ├─router 				router目录
    │      index.ts
    │
    ├─store 				存储库目录
    │    └─index.js
    │
    │
    ├─utils					公共方法
    │      index.ts
    │
    └─views         页面
        │  401
        |    index.vue    
        │  404
        |    index.vue    
        │  about
        |    index.vue    
        │  home
        |    index.vue    
        │  login
        |    |
        |    |- menuManage   菜单管理
        |    |       └─ index.vue
        |    |- roleManage   权限管理
        |    |       └─ index.vue
        |    └─ userManage   用户管理
        |            └─ index.vue
        |    index.vue    
        │  power
        |    index.vue    
        │  table
        |    index.vue    
        |  ··· 
```
# 项目预览
:![](/src/assets/images/show/show0.png)
:![](/src/assets/images/show/show1.png)
:![](/src/assets/images/show/show2.png)
:![](/src/assets/images/show/show3.png)
:![](/src/assets/images/show/show4.png)
:![](/src/assets/images/show/show5.png)
# 项目启动
```js
yarn  //安装依赖
yarn dev --host  //启动
```


# 描述
个人开发维护! 遇到问题或项目不足欢迎提出！