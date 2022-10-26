import request from '../request'
import type { menuListType, menuType, paramsType } from './type'
// 获取菜单列表数据
export function getRoleList(params: paramsType) {
  return request.get<menuListType<menuType>>('/role/list', { params })
}
// 修改菜单数据
export function editRole(data: menuType) {
  return request.post('/role/edit', data)
}
// 新增菜单数据
export function addRole(data: menuType) {
  return request.post('/role/add', data)
}
// 删除菜单数据
export function deleteRole(data: { id: number }) {
  return request.post('/role/delete', data)
}
