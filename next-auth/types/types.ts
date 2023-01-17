export interface IUSer {
  email: string;
  password: string;
}

export interface IHttpConf<T> {
  method: string;
  url: string;
  data?: T;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}
