export interface loginDataType {
  account: string,
  password: string
}
export interface userInfoType {
  name: string,
  avatar: string
}

export interface  loginResultType{
  token: string
}
export interface menuType{
  id: number,
  path: string,
  title: string,
  icon: string,
  children: menuType[] | [],
  isHidden: boolean,
}
export interface infoType<T,F>{
  userInfo: T,
  menu: F[]
}