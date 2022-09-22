export interface loginData {
  account: string,
  password: string | number
}

export interface userType{
  id: number,
  sex: number,//性别
  avatar: string,//头像
}
export interface userMessageType<T> {
  id: number,
  name: string,//姓名
  note: string,//别名
  created_at: string,//创建时间
  status: number, //是否启用
  user: T, //基本信息
}