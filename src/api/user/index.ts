import request from '../request'
import type { userListType, userType, paramsType } from './type'
// 获取用户列表数据
export function getUserList(params: paramsType) {
  return request.get<userListType<userType>>('/user/list', { params })
}
// 修改用户数据
export function editUser(data: userType) {
  return request.post('/user/edit', data)
}
// 新增用户数据
export function addUser(data: userType) {
  return request.post('/user/add', data)
}
// 删除用户数据
export function deleteUser(data: { id: number }) {
  return request.post('/user/delete', data)
}
