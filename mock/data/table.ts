import Mock from 'mockjs'
import type { tableItemType } from '@/api/table/type'
import { timestampChange } from '@/utils'
interface paramsType {
  body: any
  method: string
  query: any
}
const data = Mock.mock({
  'list|50-100': [
    {
      'id|+1': 1,
      name: '@cword(2,4)',
      sex: '@natural(1,2)',
      'account|11': '@natural(0,9)',
      'password|8-12': '@natural(0,9)',
      create_time: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
      status: '@natural(0,1)',
    },
  ],
})
const getDataList = {
  url: '/table/list',
  type: 'get',
  response: (config: paramsType) => {
    let list = []
    const { page, size, keyword } = config.query
    const searchList = data.list.filter((item: tableItemType) => {
      const str = item.account.toString()
      return item.name.indexOf(keyword) !== -1 || str.indexOf(keyword) !== -1
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
const editDataList = {
  url: '/table/edit',
  type: 'post',
  response: (config: paramsType) => {
    const { id } = config.body
    const index = data.list.findIndex((item: tableItemType) => {
      return item.id === id
    })
    if (index >= 0) {
      data.list[index] = config.body
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
const addDataList = {
  url: '/table/add',
  type: 'post',
  response: (config: paramsType) => {
    const times = new Date()
    const user = Object.assign(config.body, {
      id: data.list[data.list.length - 1].id + 1,
      create_time: timestampChange(times),
    })
    data.list.unshift(user)
    return {
      result: true,
      code: 200,
      data: {
        message: '新增成功',
      },
    }
  },
}
const deleteDataList = {
  url: '/table/delete',
  type: 'post',
  response: (config: paramsType) => {
    const { id } = config.body
    const index = data.list.findIndex((item: tableItemType) => {
      return item.id === id
    })
    if (index >= 0) {
      data.list.splice(index, 1)
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
export default [getDataList, editDataList, addDataList, deleteDataList]
