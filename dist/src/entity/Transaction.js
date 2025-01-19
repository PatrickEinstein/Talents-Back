var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User.js";
import { BaseModel } from "./BaseModel.js";
export var TransactionType;
(function (TransactionType) {
    TransactionType["Deposit"] = "Deposit";
    TransactionType["Withdrawal"] = "Withdrawal";
    TransactionType["Trade"] = "Trade";
})(TransactionType || (TransactionType = {}));
export var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["Pending"] = "Pending";
    TransactionStatus["Completed"] = "Completed";
    TransactionStatus["Failed"] = "Failed";
})(TransactionStatus || (TransactionStatus = {}));
let Transaction = class Transaction extends BaseModel {
    sender_user;
    receiver_user;
    amount;
    transaction_type;
    status;
    transaction_date;
};
__decorate([
    ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" }),
    JoinColumn({ name: "sender_user_id" }),
    __metadata("design:type", User)
], Transaction.prototype, "sender_user", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" }),
    JoinColumn({ name: "receiver_user_id" }),
    __metadata("design:type", User)
], Transaction.prototype, "receiver_user", void 0);
__decorate([
    Column({ type: "numeric" }),
    __metadata("design:type", Number)
], Transaction.prototype, "amount", void 0);
__decorate([
    Column({ type: "enum", enum: TransactionType }),
    __metadata("design:type", String)
], Transaction.prototype, "transaction_type", void 0);
__decorate([
    Column({ type: "enum", enum: TransactionStatus }),
    __metadata("design:type", String)
], Transaction.prototype, "status", void 0);
__decorate([
    Column(),
    __metadata("design:type", Date)
], Transaction.prototype, "transaction_date", void 0);
Transaction = __decorate([
    Entity()
], Transaction);
export { Transaction };
