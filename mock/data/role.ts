import { getStorage, setStorage } from '@/utils/storage'
import { timestampChange } from '@/utils'
import type { roleType } from '@/api/role/type'
interface paramsType {
  body: any
  method: string
  query: any
}
// 角色列表
export const roleList = getStorage('roleList', 'object') || [
  {
    id: 1,
    name: '管理员',
    status: 1,
    menuList: [100, 101, 102, 103, 104, 105, 106, 107],
    create_time: '2022-10-26 10:10:10',
  },
  {
    id: 2,
    name: '普通用户',
    status: 1,
    menuList: [100, 101, 102, 107],
    create_time: '2022-10-26 10:10:10',
  },
]
const getRoleList = {
  url: '/role/list',
  type: 'get',
  response: (config: paramsType) => {
    let list = []
    const { page, size, keyword } = config.query
    const searchList = roleList.filter((item: roleType) => {
      return item.name.indexOf(keyword) !== -1
    })
    list = searchList.slice((page - 1) * size, page * size)
    return {
      result: true,
      code: 200,
      data: {
        count: searchList.length,
        list: list,
      },
    }
  },
}
const editRole = {
  url: '/role/edit',
  type: 'post',
  response: (config: paramsType) => {
    const { id } = config.body
    const index = roleList.findIndex((item: roleType) => {
      return item.id === id
    })
    if (index >= 0) {
      roleList[index] = config.body
      setStorage('roleList', roleList)
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
const addRole = {
  url: '/role/add',
  type: 'post',
  response: (config: paramsType) => {
    const times = new Date()
    const role = Object.assign(config.body, {
      id: roleList[roleList.length - 1].id + 1,
      create_time: timestampChange(times),
    })
    roleList.unshift(role)
    setStorage('roleList', roleList)
    return {
      result: true,
      code: 200,
      data: {
        message: '新增成功',
      },
    }
  },
}
const deleteRole = {
  url: '/role/delete',
  type: 'post',
  response: (config: paramsType) => {
    const { id } = config.body
    const index = roleList.findIndex((item: roleType) => {
      return item.id === id
    })
    if (index >= 0) {
      roleList.splice(index, 1)
      setStorage('roleList', roleList)
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

export default [getRoleList, editRole, addRole, deleteRole]
