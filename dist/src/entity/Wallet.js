var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { BaseModel } from "./BaseModel.js";
import { User } from "./User.js";
let Wallet = class Wallet extends BaseModel {
    user;
    balance;
    currency;
};
__decorate([
    OneToOne(() => User),
    JoinColumn(),
    __metadata("design:type", User)
], Wallet.prototype, "user", void 0);
__decorate([
    Column({ type: "numeric", default: 0 }),
    __metadata("design:type", Number)
], Wallet.prototype, "balance", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], Wallet.prototype, "currency", void 0);
Wallet = __decorate([
    Entity('wallet')
], Wallet);
export { Wallet };
