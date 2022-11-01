import { getStorage, setStorage } from '@/utils/storage'
// import { timestampChange } from '@/utils'
import type { menuType } from '@/api/menu/type'
interface paramsType {
  body: any
  method: string
  query: any
}
// 菜单列表
export let menuList = getStorage('menuList', 'object') || [
  {
    id: 100,
    path: '/home',
    title: '首页',
    icon: 'home',
    isHidden: false,
    children: [],
    parentId: 0,
  },
  {
    id: 101,
    path: '/about',
    title: '关于我们',
    icon: 'about',
    isHidden: false,
    children: [],
    parentId: 0,
  },
  {
    id: 102,
    path: '/table',
    title: 'Table表格',
    icon: 'table',
    children: [],
    isHidden: false,
    parentId: 0,
  },
  {
    id: 103,
    path: '/power',
    title: '权限管理',
    icon: 'power',
    isHidden: false,
    parentId: 0,
    children: [
      {
        id: 104,
        path: '/power/userManage',
        title: '用户管理',
        icon: '',
        children: [],
        isHidden: false,
        parentId: 103,
      },
      {
        id: 105,
        path: '/power/menuManage',
        title: '菜单管理',
        icon: '',
        children: [],
        isHidden: false,
        parentId: 103,
      },
      {
        id: 106,
        path: '/power/roleManage',
        title: '角色管理',
        icon: '',
        children: [],
        isHidden: false,
        parentId: 103,
      },
    ],
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
        list: menuList,
      },
    }
  },
}
const editMenu = {
  url: '/menu/edit',
  type: 'post',
  response: (config: paramsType) => {
    const newList = deleteMenuList(menuList, config.body)
    if (config.body.parentId === 0) {
      const menu = Object.assign(
        {
          id: Date.now(),
        },
        config.body
      )
      newList.unshift(menu)
      setStorage('menuList', newList)
      menuList = newList
      return {
        result: true,
        code: 200,
        data: {
          message: '编辑成功',
        },
      }
    }
    const newMenuList = addMenuList(newList, config.body)
    if (newMenuList.length > 0) {
      setStorage('menuList', newMenuList)
      menuList = newMenuList
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
        message: '编辑错误',
      }
    }
  },
}
const addMenu = {
  url: '/menu/add',
  type: 'post',
  response: (config: paramsType) => {
    const menu = Object.assign(
      {
        id: Date.now(),
      },
      config.body
    )
    if (config.body.parentId === 0) {
      menuList.unshift(menu)
      setStorage('menuList', menuList)
      return {
        result: true,
        code: 200,
        data: {
          message: '新增成功',
        },
      }
    } else {
      const newMenuList = addMenuList(menuList, config.body)
      if (newMenuList.length > 0) {
        setStorage('menuList', newMenuList)
        menuList = newMenuList
        return {
          result: true,
          code: 200,
          data: {
            message: '新增成功',
          },
        }
      } else {
        return {
          result: false,
          code: 400,
          data: {
            message: '新增错误',
          },
          message: '新增错误',
        }
      }
    }
  },
}
const deleteMenu = {
  url: '/menu/delete',
  type: 'post',
  response: (config: paramsType) => {
    const newMenuList = deleteMenuList(menuList, config.body)
    if (newMenuList.length > 0) {
      setStorage('menuList', newMenuList)
      menuList = newMenuList
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
        message: '删除错误',
      }
    }
  },
}
export default [getMenuList, editMenu, addMenu, deleteMenu]

// 编辑菜单
function getMenu(menuList: menuType[], menu: menuType) {
  let menus: menuType[] = []
  menuList.forEach((item) => {
    let newMenu = Object.assign({}, item)
    if (item.id === menu.id) {
      newMenu = menu
    } else {
      if (item.children && item.children.length) {
        newMenu.children = getMenu(item.children, menu)
      }
    }
    menus.push(newMenu)
  })
  return menus
}
// 添加菜单
function addMenuList(menuList: menuType[], menu: menuType) {
  let menus: menuType[] = []
  menuList.forEach((item) => {
    let newMenu: menuType = Object.assign({}, item)
    if (item.id === menu.parentId) {
      if(!menu.id){
        menu.id = Date.now()
      }
      ;(newMenu.children as menuType[]).push(menu)
    } else {
      if (item.children && item.children.length) {
        newMenu.children = addMenuList(item.children, menu)
      }
    }
    menus.push(newMenu)
  })
  return menus
}
// 删除菜单
function deleteMenuList(menuList: menuType[], menu: menuType) {
  let menus: menuType[] = []
  menuList.forEach((item) => {
    let newMenu = Object.assign({}, item)
    if (item.id === menu.id) {
      newMenu = menu
    } else {
      if (item.children && item.children.length) {
        newMenu.children = deleteMenuList(item.children, menu)
      }
      menus.push(newMenu)
    }
  })
  return menus
}
