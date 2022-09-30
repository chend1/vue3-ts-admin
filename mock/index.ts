import Mock from 'mockjs'
import { param2Obj } from '@/utils'
import login from './data/login'
import table from './data/table'

const mocks = [...login, ...table]
export function mockXHR() {
  // 处理参数
  function xhrParams(respond: Function){
    return (options: any) => {
      let result = null
      const { body, type, url } = options
      result = respond({
        method: type,
        body: JSON.parse(body),
        query: param2Obj(url)
      })
      return Mock.mock(result)
    }
  }
  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type, xhrParams(i.response))
  }
}
