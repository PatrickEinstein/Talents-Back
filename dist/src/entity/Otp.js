var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column } from "typeorm";
import { BaseModel } from "./BaseModel.js";
let Otp = class Otp extends BaseModel {
    // @ManyToOne(() => User, (user) => user.email, { onDelete: "CASCADE" }) // Foreign key relationship
    // @JoinColumn({ name: "user_email", referencedColumnName: "email" }) // Maps this column to the `email` in User
    // user!: User;
    email;
    otp_code;
    is_used;
};
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], Otp.prototype, "email", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], Otp.prototype, "otp_code", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], Otp.prototype, "is_used", void 0);
Otp = __decorate([
    Entity()
], Otp);
export { Otp };
