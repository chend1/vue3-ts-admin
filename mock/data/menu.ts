import { getStorage, setStorage } from '@/utils/storage'
import { timestampChange } from '@/utils'
import type { menuType } from '@/api/menu/type'
interface paramsType {
  body: any
  method: string
  query: any
}
// 菜单列表
export const menuList = getStorage('menuList', 'object') || [
  {
    id: 100,
    path: '/home',
    title: '首页',
    icon: 'home',
    isHidden: false,
    children: [],
  },
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
    title: '权限管理',
    icon: 'power',
    isHidden: false,
    children: [
      {
        id: 104,
        path: '/power/userManage',
        title: '用户管理',
        icon: '',
        children: [],
        isHidden: false,
      },
      {
        id: 105,
        path: '/power/menuManage',
        title: '菜单管理',
        icon: '',
        children: [],
        isHidden: false,
      },
      {
        id: 106,
        path: '/power/roleManage',
        title: '角色管理',
        icon: '',
        children: [],
        isHidden: false,
      },
    ],
  },
  {
    id: 107,
    path: '/richText',
    title: '富文本编辑',
    icon: 'rich',
    children: [],
    isHidden: false,
  },
]
const getMenuList = {
  url: '/menu/list',
  type: 'get',
  response: () => {
    return {
      result: true,
      code: 200,
      data: {
        menuList,
      },
    }
  },
}
const editMenu = {
  url: '/menu/edit',
  type: 'post',
  response: (config: paramsType) => {
    const { id } = config.body
    const index = menuList.findIndex((item: menuType) => {
      return item.id === id
    })
    if (index >= 0) {
      menuList[index] = config.body
      setStorage('menuList', menuList)
      return {
        result: true,
        code: 200,
        data: {
          message: '编辑成功',
        },
      }
    } else {
      return {
        result: false,
        code: 400,
        data: {
          message: '编辑错误',
        },
      }
    }
  },
}
const addMenu = {
  url: '/menu/add',
  type: 'post',
  response: (config: paramsType) => {
    const times = new Date()
    const menu = Object.assign(config.body, {
      id: menuList[menuList.length - 1].id + 1,
      create_time: timestampChange(times),
    })
    menuList.unshift(menu)
    setStorage('menuList', menuList)
    return {
      result: true,
      code: 200,
      data: {
        message: '新增成功',
      },
    }
  },
}
const deleteMenu = {
  url: '/menu/delete',
  type: 'post',
  response: (config: paramsType) => {
    const { id } = config.body
    const index = menuList.findIndex((item: menuType) => {
      return item.id === id
    })
    if (index >= 0) {
      menuList.splice(index, 1)
      setStorage('menuList', menuList)
      return {
        result: true,
        code: 200,
        data: {
          message: '删除成功',
        },
      }
    } else {
      return {
        result: false,
        code: 400,
        data: {
          message: '删除错误',
        },
      }
    }
  },
}
export default [getMenuList, editMenu, addMenu, deleteMenu]
