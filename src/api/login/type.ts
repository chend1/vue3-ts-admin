export interface loginDataType {
  account: string,
  password: string
}
export interface userInfoType {
  name: string,
  avatar: string
}

export interface  loginResultType<T>{
  token: string,
  userInfo: T
}