import { Random } from 'mockjs'
interface paramsType {
  body: any
  method: string
  query: any
}
const login = {
  url: '/login',
  type: 'post',
  response: (config: paramsType) => {
    let token = Random.string(30, 40)
    if (config.body.account.indexOf('power') !== -1) {
      token += 'power'
    }
    return {
      result: true,
      code: 200,
      data: {
        token,
      },
    }
  },
}
const menu1 = [
  {
    id: 101,
    path: '/about',
    title: '关于我们',
    icon: 'about',
    children: [],
    isHidden: false,
  },
  {
    id: 102,
    path: '/table',
    title: 'Table表格',
    icon: 'table',
    children: [],
    isHidden: false,
  },
]
const menu2 = [
  {
    id: 101,
    path: '/about',
    title: '关于我们',
    icon: 'about',
    isHidden: false,
    children: [],
  },
  {
    id: 102,
    path: '/table',
    title: 'Table表格',
    icon: 'table',
    children: [],
    isHidden: false,
  },
  {
    id: 103,
    path: '/power',
    title: '权限页面',
    icon: 'power',
    isHidden: false,
    children: [
      {
        id: 104,
        path: '/power/one',
        title: '权限页面1',
        icon: '',
        children: [],
        isHidden: false,
      },
      {
        id: 105,
        path: '/power/two',
        title: '权限页面2',
        icon: '',
        children: [],
        isHidden: false,
      },
    ],
  },
]
const getUserInfo = {
  url: '/user/info',
  type: 'post',
  response: (config: paramsType) => {
    console.log(config)
    const { token } = config.body
    return {
      result: true,
      code: 200,
      data: {
        userInfo: {
          name: Random.cname(),
          avatar: Random.image('100x100'),
        },
        menu: token.indexOf('power') === -1 ? menu1 : menu2,
      },
    }
  },
}

export default [login, getUserInfo]
