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
export var AdStatus;
(function (AdStatus) {
    AdStatus["Active"] = "Active";
    AdStatus["Busy"] = "Busy";
    AdStatus["Inactive"] = "Inactive";
})(AdStatus || (AdStatus = {}));
let MerchantAd = class MerchantAd extends BaseModel {
    user;
    amount;
    status;
    description;
    workmode;
};
__decorate([
    ManyToOne(() => User, (merchant) => merchant.id, { onDelete: "CASCADE" }) // Foreign key relationship
    ,
    JoinColumn({ name: "user_id" }) // Maps this column to the `id` in Merchant
    ,
    __metadata("design:type", User)
], MerchantAd.prototype, "user", void 0);
__decorate([
    Column({ type: "numeric" }),
    __metadata("design:type", Number)
], MerchantAd.prototype, "amount", void 0);
__decorate([
    Column({ type: "enum", enum: AdStatus }),
    __metadata("design:type", String)
], MerchantAd.prototype, "status", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], MerchantAd.prototype, "description", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], MerchantAd.prototype, "workmode", void 0);
MerchantAd = __decorate([
    Entity()
], MerchantAd);
export { MerchantAd };
