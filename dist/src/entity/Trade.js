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
export var TradeType;
(function (TradeType) {
    TradeType["CurrencyExchange"] = "Currency Exchange";
    TradeType["GiftCardSale"] = "Gift Card Sale";
})(TradeType || (TradeType = {}));
export var TradeStatus;
(function (TradeStatus) {
    TradeStatus["Pending"] = "Pending";
    TradeStatus["Completed"] = "Completed";
    TradeStatus["Failed"] = "Failed";
})(TradeStatus || (TradeStatus = {}));
let Trade = class Trade extends BaseModel {
    buyer_user_id;
    seller_user_id;
    trade_type;
    amount;
    status;
    trade_date;
};
__decorate([
    ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" }) // Defines a foreign key relationship
    ,
    JoinColumn({ name: "user_id" }) // Maps this column to the `id` in User
    ,
    __metadata("design:type", User)
], Trade.prototype, "buyer_user_id", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" }) // Defines a foreign key relationship
    ,
    JoinColumn({ name: "seller_user_id" }) // Maps this column to the `id` in User
    ,
    __metadata("design:type", User)
], Trade.prototype, "seller_user_id", void 0);
__decorate([
    Column({ type: "enum", enum: TradeType }),
    __metadata("design:type", String)
], Trade.prototype, "trade_type", void 0);
__decorate([
    Column({ type: "numeric" }),
    __metadata("design:type", Number)
], Trade.prototype, "amount", void 0);
__decorate([
    Column({ type: "enum", enum: TradeStatus }),
    __metadata("design:type", String)
], Trade.prototype, "status", void 0);
__decorate([
    Column(),
    __metadata("design:type", Date)
], Trade.prototype, "trade_date", void 0);
Trade = __decorate([
    Entity()
], Trade);
export { Trade };
