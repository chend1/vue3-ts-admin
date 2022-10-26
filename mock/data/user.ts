import { getStorage, setStorage } from '@/utils/storage'
import { timestampChange } from '@/utils'
import type { userType } from '@/api/user/type'
interface paramsType {
  body: any
  method: string
  query: any
}
// 用户列表
export const userList = getStorage('userList', 'object') || [
  {
    id: 1,
    name: '管理员',
    sex: 1,
    account: 'admin',
    password: '123456',
    create_time: '2022-10-26 10:10:10',
    status: 1,
    role: 1,
  },
  {
    id: 2,
    name: '普通用户',
    sex: 1,
    account: 'user',
    password: '123456',
    create_time: '2022-10-26 10:10:10',
    status: 1,
    role: 2,
  },
]
const getUserList = {
  url: '/user/list',
  type: 'get',
  response: (config: paramsType) => {
    let list = []
    const { page, size, keyword } = config.query
    const searchList = userList.filter((item: userType) => {
      return item.name.indexOf(keyword) !== -1 || item.account.indexOf(keyword) !== -1
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
const editUser = {
  url: '/user/edit',
  type: 'post',
  response: (config: paramsType) => {
    const { id } = config.body
    const index = userList.findIndex((item: userType) => {
      return item.id === id
    })
    if (index >= 0) {
      userList[index] = config.body
      setStorage('userList', userList)
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
const addUser = {
  url: '/user/add',
  type: 'post',
  response: (config: paramsType) => {
    const times = new Date()
    const user = Object.assign(config.body, {
      id: userList[userList.length - 1].id + 1,
      create_time: timestampChange(times),
    })
    userList.unshift(user)
    setStorage('userList', userList)
    return {
      result: true,
      code: 200,
      data: {
        message: '新增成功',
      },
    }
  },
}
const deleteUser = {
  url: '/user/delete',
  type: 'post',
  response: (config: paramsType) => {
    const { id } = config.body
    const index = userList.findIndex((item: userType) => {
      return item.id === id
    })
    if (index >= 0) {
      userList.splice(index, 1)
      setStorage('userList', userList)
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
export default [getUserList, editUser, addUser, deleteUser]
