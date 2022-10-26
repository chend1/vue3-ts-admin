export interface paramsType{
  page: number,
  size: number,
  keyword?: string
}

export interface menuListType<T>{
  count: number,
  list: T[],
}

export interface menuType{
  id: number,
  path: string,
  title: string,
  icon: string,
  children: menuType[] | [],
  isHidden: boolean,
}