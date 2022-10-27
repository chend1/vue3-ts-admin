import request from '../request'
import type { menuListType, menuType, paramsType } from './type'
// 获取菜单列表数据
export function getMenuList(params?: paramsType) {
  return request.get<menuListType<menuType>>('/menu/list', { params })
}
// 修改菜单数据
export function editMenu(data: menuType) {
  return request.post('/menu/edit', data)
}
// 新增菜单数据
export function addMenu(data: menuType) {
  return request.post('/menu/add', data)
}
// 删除菜单数据
export function deleteMenu(data: { id: number }) {
  return request.post('/menu/delete', data)
}
