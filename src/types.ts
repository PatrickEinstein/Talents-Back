import { User, UserType } from "./entity/User";

export interface ILogin {
  email: string;
  password: string;
}
export interface ICreateUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dOB: Date;
  nationality: string;
  state: string;
  city: string;
  username: string;
  password: string;
}

export interface ICreateOTP {
  email: string;
}

export interface IVerifyOTP {
  email: string;
  otp: string;
}

export interface IChangePassword {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
}
export interface IUpateUser {
  id: string;
  username: string;
  address: string;
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
  token2: string;
  email: string;
  otp: string;
}

export interface IApplyToAds {
  email: string;
  gigId: string;
}

export interface IHireToAds {
  email: string;
  gigId: string;
  userId: string;
}

export interface ICreateAds {
  jobTitle: string;
  jobDescription: string;
  workmode: string;
  remuneration: string;
  image: string;
  date: Date;
  eligibility: string;
}

export interface VerifyOtpResponse {
  status: number;
  message: string;
}

export interface IResetPassword {
  password: string;
  token: string;
}
