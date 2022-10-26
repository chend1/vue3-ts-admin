import request from '../request'
import type { roleListType, roleType, paramsType } from './type'
// 获取角色列表数据
export function getRoleList(params: paramsType) {
  return request.get<roleListType<roleType>>('/role/list', { params })
}
// 修改角色数据
export function editRole(data: roleType) {
  return request.post('/role/edit', data)
}
// 新增角色数据
export function addRole(data: roleType) {
  return request.post('/role/add', data)
}
// 删除角色数据
export function deleteRole(data: { id: number }) {
  return request.post('/role/delete', data)
}
