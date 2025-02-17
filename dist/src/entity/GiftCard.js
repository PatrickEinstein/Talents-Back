var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseModel } from "./BaseModel.js";
import { Customer } from "./Customer.js";
export var GiftCardType;
(function (GiftCardType) {
    GiftCardType["eGift"] = "eGift";
    GiftCardType["Physical"] = "Physical";
})(GiftCardType || (GiftCardType = {}));
let GiftCard = class GiftCard extends BaseModel {
    customer;
    card_number;
    card_type;
    balance;
    image_url;
};
__decorate([
    ManyToOne(() => Customer, (customer) => customer.id, { onDelete: "CASCADE" }) // Foreign key relationship
    ,
    JoinColumn({ name: "customer_id" }) // Maps this column to the `id` in Customer
    ,
    __metadata("design:type", typeof (_a = typeof Customer !== "undefined" && Customer) === "function" ? _a : Object)
], GiftCard.prototype, "customer", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], GiftCard.prototype, "card_number", void 0);
__decorate([
    Column({ type: "enum", enum: GiftCardType }),
    __metadata("design:type", String)
], GiftCard.prototype, "card_type", void 0);
__decorate([
    Column({ type: "numeric" }),
    __metadata("design:type", Number)
], GiftCard.prototype, "balance", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], GiftCard.prototype, "image_url", void 0);
GiftCard = __decorate([
    Entity()
], GiftCard);
export { GiftCard };
