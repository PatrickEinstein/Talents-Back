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
export var CardType;
(function (CardType) {
    CardType["Debit"] = "Debit";
    CardType["Credit"] = "Credit";
})(CardType || (CardType = {}));
let Card = class Card extends BaseModel {
    user;
    card_number;
    card_type;
    expiry_date;
    cvv;
};
__decorate([
    ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" }) // Foreign key relationship
    ,
    JoinColumn({ name: "user_id" }) // Maps this column to the `id` in User
    ,
    __metadata("design:type", User)
], Card.prototype, "user", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Card.prototype, "card_number", void 0);
__decorate([
    Column({ type: "enum", enum: CardType }),
    __metadata("design:type", String)
], Card.prototype, "card_type", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Card.prototype, "expiry_date", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Card.prototype, "cvv", void 0);
Card = __decorate([
    Entity()
], Card);
export { Card };
