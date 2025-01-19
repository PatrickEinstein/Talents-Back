var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsNotEmpty } from "class-validator";
import { Column, Entity } from "typeorm";
import { Role } from "../types.js";
import { BaseModel } from "./BaseModel.js";
export var UserType;
(function (UserType) {
    UserType["SuperAdmin"] = "SuperAdmin";
    UserType["Admin"] = "Admin";
    UserType["User"] = "User";
})(UserType || (UserType = {}));
export var AccountTier;
(function (AccountTier) {
    AccountTier["Tier1"] = "Tier1";
    AccountTier["Tier2"] = "Tier2";
    AccountTier["Tier3"] = "Tier3";
})(AccountTier || (AccountTier = {}));
export var KYCStatus;
(function (KYCStatus) {
    KYCStatus["NotStarted"] = "Not Started";
    KYCStatus["Pending"] = "Pending";
    KYCStatus["Approved"] = "Approved";
    KYCStatus["Rejected"] = "Rejected";
})(KYCStatus || (KYCStatus = {}));
let User = class User extends BaseModel {
    first_name;
    last_name;
    dob;
    username;
    email;
    phone_number;
    nationality;
    NIN;
    BVN;
    accountNumber;
    password;
    user_type;
    account_tier;
    address;
    country_of_residence;
    profile_image;
    is_verified;
    kyc_verified;
    KYC_status;
    resetToken;
    resetTokenExpiry;
};
__decorate([
    Column({ nullable: false }),
    IsNotEmpty({ message: "first_name is required" }),
    __metadata("design:type", String)
], User.prototype, "first_name", void 0);
__decorate([
    Column({ nullable: false }),
    IsNotEmpty({ message: "last_name is required" }),
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    Column({ nullable: false }),
    IsNotEmpty({ message: "dob - is required" }),
    __metadata("design:type", Date)
], User.prototype, "dob", void 0);
__decorate([
    Column({ unique: true, nullable: false }),
    IsNotEmpty({ message: "username is required" }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    Column({ unique: true, nullable: false }),
    IsNotEmpty({ message: "email is required" }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column({ unique: true, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone_number", void 0);
__decorate([
    Column({ nullable: false, default: "Nigeria" }),
    IsNotEmpty({ message: "nationality is required" }),
    __metadata("design:type", String)
], User.prototype, "nationality", void 0);
__decorate([
    Column({ unique: true, nullable: true, length: 11 }),
    __metadata("design:type", String)
], User.prototype, "NIN", void 0);
__decorate([
    Column({ unique: true, nullable: true, length: 11 }),
    __metadata("design:type", String)
], User.prototype, "BVN", void 0);
__decorate([
    Column({ unique: true, nullable: true, length: 10 }),
    __metadata("design:type", String)
], User.prototype, "accountNumber", void 0);
__decorate([
    Column({ nullable: false }),
    IsNotEmpty({ message: "password is required" }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Column({ type: "enum", enum: UserType, default: UserType.User }),
    __metadata("design:type", String)
], User.prototype, "user_type", void 0);
__decorate([
    Column({ type: "enum", enum: AccountTier, default: AccountTier.Tier1 }),
    __metadata("design:type", String)
], User.prototype, "account_tier", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "country_of_residence", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "profile_image", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "is_verified", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "kyc_verified", void 0);
__decorate([
    Column({ type: "enum", enum: KYCStatus, default: KYCStatus.NotStarted }),
    __metadata("design:type", String)
], User.prototype, "KYC_status", void 0);
__decorate([
    Column({ type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "resetToken", void 0);
__decorate([
    Column({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "resetTokenExpiry", void 0);
User = __decorate([
    Entity('user')
], User);
export { User };
let Roles = class Roles extends BaseModel {
    userid;
    role;
    isActive;
    canAssignAdmin;
    canDeleteAdmin;
    canUpload;
};
__decorate([
    Column({ unique: true, nullable: false }),
    IsNotEmpty({ message: "userid is required" }),
    __metadata("design:type", String)
], Roles.prototype, "userid", void 0);
__decorate([
    Column({ type: "enum", enum: Role, default: Role.User }),
    __metadata("design:type", String)
], Roles.prototype, "role", void 0);
__decorate([
    Column(),
    __metadata("design:type", Boolean)
], Roles.prototype, "isActive", void 0);
__decorate([
    Column(),
    __metadata("design:type", Boolean)
], Roles.prototype, "canAssignAdmin", void 0);
__decorate([
    Column(),
    __metadata("design:type", Boolean)
], Roles.prototype, "canDeleteAdmin", void 0);
__decorate([
    Column(),
    __metadata("design:type", Boolean)
], Roles.prototype, "canUpload", void 0);
Roles = __decorate([
    Entity('roles')
], Roles);
export { Roles };
