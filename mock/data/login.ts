import { Random } from 'mockjs'
import { userList } from './user'
import { roleList } from './role'
import { menuList } from './menu'
interface paramsType {
  body: any
  method: string
  query: any
}
const login = {
  url: '/login',
  type: 'post',
  response: (config: paramsType) => {
    const user = userList.filter((user: any) => {
      return config.body.account === user.account
    })
    let token = JSON.stringify(user[0])
    if (user.length <= 0) {
      return {
        result: false,
        code: 400,
        data: {},
        message: '账号或密码错误，请重新登录！',
      }
    }
    if (
      config.body.account === user[0].account &&
      config.body.password === user[0].password
    ) {
      if (user[0].status !== 1) {
        return {
          result: false,
          code: 401,
          data: {},
          message: '账号已被禁用，请联系管理员！',
        }
      } else {
        return {
          result: true,
          code: 200,
          data: {
            token,
          },
        }
      }
    } else {
      return {
        result: false,
        code: 400,
        data: {},
        message: '账号或密码错误，请重新登录！',
      }
    }
  },
}
const getUserInfo = {
  url: '/user/info',
  type: 'post',
  response: (config: paramsType) => {
    const { token } = config.body
    const userInfo = JSON.parse(token)
    const role: any = roleList.filter((role: any) => {
      return role.id === userInfo.role
    })
    const ids = role[0].menuList
    return {
      result: true,
      code: 200,
      data: {
        userInfo: {
          name: userInfo.name,
          avatar: userInfo.avatar || Random.image('100x100'),
        },
        menu: getMyMenuList(ids, menuList),
      },
    }
  },
}

export default [login, getUserInfo]

function getMyMenuList(ids: number[], menuList: any) {
  let menus: any = []
  menuList.forEach((item: any) => {
    if (ids.indexOf(item.id) !== -1) {
      const menu = Object.assign({}, item)
      menus.push(menu)
      menu.children = []
      if (item.children && item.children.length) {
        menu.children = getMyMenuList(ids, item.children)
      }
    }
  })
  return menus
}
