import { Random } from 'mockjs'
interface loginType {
  account: string,
  password: string
}
export const login = (data: loginType) => {
  return {
    result: true,
    code: 200,
    data: {
      token: Random.string(30,40),
      userInfo: {
        name: Random.cname(),
        avatar: Random.image('100x100')
      }
    }
  }
}