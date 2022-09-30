import request from '../request'
import type {
  loginDataType,
  userInfoType,
  loginResultType,
  infoType,
  menuType,
} from './type'

export function login(data: loginDataType) {
  return request.post<loginResultType>('/login', data)
}

export function getInfo(data: {token: string}) {
  return request.post<infoType<userInfoType, menuType>>('/user/info', data)
}
