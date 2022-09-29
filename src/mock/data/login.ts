import { Random } from 'mockjs'
interface paramsType {
  body: null | object,
  method: string,
  query: object
}
const login = {
  url: '/login',
  type: 'post',
  response: (config: paramsType) => {
    console.log(config)
    return {
      result: true,
      code: 200,
      data: {
        token: Random.string(30, 40),
        userInfo: {
          name: Random.cname(),
          avatar: Random.image('100x100'),
        },
      },
    }
  },
}

export default [login]
