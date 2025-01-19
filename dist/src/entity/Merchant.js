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
export var MerchantType;
(function (MerchantType) {
    MerchantType["BureauDeChange"] = "Bureau de Change";
    MerchantType["GiftCardVendor"] = "Chinese Gift Card Vendor";
    MerchantType["CurrencySeller"] = "Foreign Currency Seller";
})(MerchantType || (MerchantType = {}));
let Merchant = class Merchant extends BaseModel {
    user;
    merchant_type;
    business_name;
    certificate_document;
    location;
    balance;
};
__decorate([
    OneToOne(() => User),
    JoinColumn(),
    __metadata("design:type", User)
], Merchant.prototype, "user", void 0);
__decorate([
    Column({ type: "enum", enum: MerchantType }),
    __metadata("design:type", String)
], Merchant.prototype, "merchant_type", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], Merchant.prototype, "business_name", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Merchant.prototype, "certificate_document", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Merchant.prototype, "location", void 0);
__decorate([
    Column({ type: "numeric", default: 0 }),
    __metadata("design:type", Number)
], Merchant.prototype, "balance", void 0);
Merchant = __decorate([
    Entity()
], Merchant);
export { Merchant };
