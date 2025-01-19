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
export var CustomerType;
(function (CustomerType) {
    CustomerType["Individual"] = "Individual";
    CustomerType["Company"] = "Company";
})(CustomerType || (CustomerType = {}));
let Customer = class Customer extends BaseModel {
    user;
    customer_type;
    national_id;
    company_name;
};
__decorate([
    OneToOne(() => User),
    JoinColumn(),
    __metadata("design:type", User)
], Customer.prototype, "user", void 0);
__decorate([
    Column({ type: "enum", enum: CustomerType }),
    __metadata("design:type", String)
], Customer.prototype, "customer_type", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "national_id", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "company_name", void 0);
Customer = __decorate([
    Entity()
], Customer);
export { Customer };
