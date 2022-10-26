import { getStorage } from '../../src/utils/storage'
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
  }
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

export default [getMenuList]
