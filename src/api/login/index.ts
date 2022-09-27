import request from '../request'
import type { loginDataType,userInfoType,loginResultType } from './type'

export function login(data: loginDataType) {
  return request.post<loginResultType<userInfoType>>('/login', data)
}