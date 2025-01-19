import { UserType } from "./entity/User";



export interface ILogin {
  email: string;
  password: string;
}
export interface ICreateUser {
  first_name: string;
  last_name: string;
  dob: Date;
  email: string;
  password: string;
  username: string;
  user_type: UserType;
}

export interface IUpateUser {
  id: string;
  username: string;
  address:string;
}

export enum Role {
  User = "user",
  Admin = "admin",
  SuperAdmin = "superAdmin",
}

export interface IUpdateRole {
  userid: string;
  role: Role;
}

export interface IVerifyOtp {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  status: number;
  message: string;
}

export interface IResetPassword {
  password: string;
  token: string;
}

