export interface paramsType{
  page: number,
  size: number,
  keyword?: string
}

export interface roleListType<T>{
  count: number,
  list: T[],
}

export interface roleType{
  id?: number,
  name: string,
  status: number,
  menuList: number[],
  create_time: string,
}