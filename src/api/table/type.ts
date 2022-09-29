export interface paramsType{
  page: number,
  size: number,
  keyword?: string
}

export interface tableDataType<T>{
  count: number,
  list: T[],
}

export interface tableItemType{
  id?: number,
  name: string,
  sex: number,
  account: number,
  password: string,
  create_time: string,
  status: number
}