import request from '../request'
import type { tableDataType,tableItemType,paramsType } from './type'
// 获取列表数据
export function getDataList(params: paramsType) {
  return request.get<tableDataType<tableItemType>>('/table/list', { params })
}
// 修改列表数据
export function editDataList(data: tableItemType) {
  return request.post('/table/edit', data)
}
// 新增列表数据
export function addDataList(data: tableItemType) {
  return request.post('/table/add', data)
}
// 删除列表数据
export function deleteDataList(data: { id: number}) {
  return request.post('/table/delete', data) 
}