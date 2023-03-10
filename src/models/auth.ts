import { UserInfoInt } from "./user";

export enum RegisterInputsEnum {
  email = "userEmail",
  username = "userName",
  password = "userPassword",
  verify = "verifyPassword",
}

export enum LoginInputsEnum {
  user = "userNameOrEmail",
  password = "userPassword",
}

//? Turn this into a general interface model?
export interface AuthReducerActionInt {
  type: string;
  payload: string;
}

export interface RegisterBodyInt {
  userEmail: string;
  userName: string;
  userPassword: string;
  verifyPassword: string;
}

export interface LoginBodyInt {
  userNameOrEmail: string;
  userPassword: string;
}

export interface AuthResponseInt {
  status: number;
  statusText: string;
  data?: UserInfoInt;
}
