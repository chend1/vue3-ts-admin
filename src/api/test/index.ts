import request from '../request'
import { loginData,userMessageType,userType } from './type'

export function login(data: loginData) {
  return request.post('/auth/login', data)
}

export function getList(params?: Object) {
  return request.get<userMessageType<userType>[]>('/list', { params })
}