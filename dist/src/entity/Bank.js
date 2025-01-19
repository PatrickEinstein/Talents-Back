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
// Enum to define allowed banks
export var BankType;
(function (BankType) {
    BankType["Chase"] = "Chase";
    BankType["WellsFargo"] = "Wells Fargo";
    BankType["BankOfAmerica"] = "Bank of America";
    BankType["Citibank"] = "Citibank";
    BankType["CapitalOne"] = "Capital One";
    // Add more banks as needed
})(BankType || (BankType = {}));
let Bank = class Bank extends BaseModel {
    user;
    type;
    bank_name;
    bank_account_number;
    account_name;
};
__decorate([
    ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" }) // Foreign key relationship
    ,
    JoinColumn({ name: "user_id" }) // Maps this column to the `id` in User
    ,
    __metadata("design:type", User)
], Bank.prototype, "user", void 0);
__decorate([
    Column({ type: "enum", enum: BankType, nullable: false }) // Restricts to allowed bank types
    ,
    __metadata("design:type", String)
], Bank.prototype, "type", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], Bank.prototype, "bank_name", void 0);
__decorate([
    Column({ unique: true, nullable: false }),
    __metadata("design:type", String)
], Bank.prototype, "bank_account_number", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], Bank.prototype, "account_name", void 0);
Bank = __decorate([
    Entity()
], Bank);
export { Bank };
