export interface paramsType{
  page: number,
  size: number,
  keyword?: string
}

export interface userListType<T>{
  count: number,
  list: T[],
}

export interface userType{
  id?: number,
  name: string,
  sex: number,
  account: string,
  password: string,
  create_time: string,
  status: number,
  role: number,
  avatar?: string
}