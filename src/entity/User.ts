import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../types.js";
import { BaseModel } from "./BaseModel.js";
import { MerchantAd } from "./Ads.js";

export enum UserType {
  SuperAdmin = "SuperAdmin",
  Admin = "Admin",
  User = "User",
}

export enum AccountTier {
  Tier1 = "Tier1",
  Tier2 = "Tier2",
  Tier3 = "Tier3",
}

export enum KYCStatus {
  NotStarted = "Not Started",
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

export enum AccountStatus {
  Pending = "Pending",
  Approved = "Approved",
}

@Entity("user")
export class User extends BaseModel {
  @Column({ nullable: false })
  @IsNotEmpty({ message: "firstName is required" })
  firstName!: string;

  @Column({ nullable: false })
  @IsNotEmpty({ message: "lastName is required" })
  lastName!: string;

  @Column({ unique: true, nullable: false })
  @IsNotEmpty({ message: "email is required" })
  email!: string;

  @Column({ unique: true, nullable: false })
  phone!: string;

  @Column({ nullable: false })
  @IsNotEmpty({ message: "dob - is required" })
  dOB!: Date;

  @Column({ nullable: false, default: "Nigeria" })
  @IsNotEmpty({ message: "nationality is required" })
  nationality!: string;

  @Column({ nullable: false })
  @IsNotEmpty({ message: "state is required" })
  state!: string;

  @Column({ nullable: false })
  @IsNotEmpty({ message: "city is required" })
  city!: string;

  @Column({ unique: true, nullable: false })
  @IsNotEmpty({ message: "username is required" })
  username!: string;

  @Column({ nullable: false })
  @IsNotEmpty({ message: "password is required" })
  password!: string;

  @Column({ type: "enum", enum: AccountStatus, default: AccountStatus.Pending })
  account_status!: AccountStatus;

  @Column({ unique: true, nullable: false })
  personalToken!: string;

  //-------------- KYC DETAILS --------------------------------

  @Column({ unique: true, nullable: true, length: 11 })
  NIN!: string;

  @Column({ unique: true, nullable: true, length: 11 })
  BVN!: string;

  @Column({ unique: true, nullable: true, length: 10 })
  accountNumber!: string;

  @Column({ type: "enum", enum: UserType, default: UserType.User })
  user_type!: UserType;

  @Column({ type: "enum", enum: AccountTier, default: AccountTier.Tier1 })
  account_tier!: AccountTier;

  @Column({ nullable: true })
  address!: string;

  @Column({ nullable: true })
  country_of_residence!: string;

  @Column({ nullable: true })
  profile_image?: string;

  @Column({ default: false })
  is_verified!: boolean;

  @Column({ default: false })
  kyc_verified!: boolean;

  @Column({ type: "enum", enum: KYCStatus, default: KYCStatus.NotStarted })
  KYC_status!: KYCStatus;

  @Column({ type: "uuid", nullable: true })
  resetToken!: string | null;

  @Column({ type: "timestamp", nullable: true })
  resetTokenExpiry!: Date | null;


}

@Entity("roles")
export class Roles extends BaseModel {
  @Column({ unique: true, nullable: false })
  @IsNotEmpty({ message: "userid is required" })
  userid!: string;

  @Column({ type: "enum", enum: Role, default: Role.User })
  role!: Role;

  @Column()
  isActive!: boolean;

}
