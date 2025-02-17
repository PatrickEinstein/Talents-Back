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
import { Transaction } from "./Transaction.js";
export var AppealStatus;
(function (AppealStatus) {
    AppealStatus["Pending"] = "Pending";
    AppealStatus["Resolved"] = "Resolved";
    AppealStatus["Closed"] = "Closed";
})(AppealStatus || (AppealStatus = {}));
let Appeal = class Appeal extends BaseModel {
    user;
    transaction;
    appeal_reason;
    appeal_status;
    appeal_date;
};
__decorate([
    ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" }) // Foreign key relationship
    ,
    JoinColumn({ name: "user_id" }) // Maps this column to the `id` in User
    ,
    __metadata("design:type", User)
], Appeal.prototype, "user", void 0);
__decorate([
    ManyToOne(() => Transaction, (transaction) => transaction.id, { onDelete: "CASCADE" }) // Foreign key relationship
    ,
    JoinColumn({ name: "transaction_id" }) // Maps this column to the `id` in Transaction
    ,
    __metadata("design:type", Transaction)
], Appeal.prototype, "transaction", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Appeal.prototype, "appeal_reason", void 0);
__decorate([
    Column({ type: "enum", enum: AppealStatus }),
    __metadata("design:type", String)
], Appeal.prototype, "appeal_status", void 0);
__decorate([
    Column(),
    __metadata("design:type", Date)
], Appeal.prototype, "appeal_date", void 0);
Appeal = __decorate([
    Entity()
], Appeal);
export { Appeal };
