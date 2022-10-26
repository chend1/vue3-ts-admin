import { getStorage } from '../../src/utils/storage'
// 角色列表
export const roleList = getStorage('roleList', 'object') || [
  {
    id: 1,
    name: '管理员',
    status: 1,
    menuList: [100,101,102,103,104,105,106,107],
  },
  {
    id: 2,
    name: '普通用户',
    status: 1,
    menuList: [100,101,102,107],
  }
]
const getRoleList = {
  url: '/role/list',
  type: 'get',
  response: () => {
    return {
      result: true,
      code: 200,
      data: {
        roleList,
      },
    }
  },
}

export default [getRoleList]
