var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseModel } from "./BaseModel.js";
import { User } from "./User.js";
export var OtpType;
(function (OtpType) {
    OtpType["UserVerification"] = "user_verification";
    OtpType["TransactionValidation"] = "transaction_validation";
    OtpType["AccountDeletion"] = "account_deletion";
})(OtpType || (OtpType = {}));
let Otp = class Otp extends BaseModel {
    user;
    otp_code;
    expires_at;
    is_used;
    otp_type;
};
__decorate([
    ManyToOne(() => User, (user) => user.email, { onDelete: "CASCADE" }) // Foreign key relationship
    ,
    JoinColumn({ name: "user_email", referencedColumnName: "email" }) // Maps this column to the `email` in User
    ,
    __metadata("design:type", User)
], Otp.prototype, "user", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], Otp.prototype, "otp_code", void 0);
__decorate([
    Column({ type: "timestamp", nullable: false }),
    __metadata("design:type", Date)
], Otp.prototype, "expires_at", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], Otp.prototype, "is_used", void 0);
__decorate([
    Column({ type: "enum", enum: OtpType, nullable: false }),
    __metadata("design:type", String)
], Otp.prototype, "otp_type", void 0);
Otp = __decorate([
    Entity()
], Otp);
export { Otp };
