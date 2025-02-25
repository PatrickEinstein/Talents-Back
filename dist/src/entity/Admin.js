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
let Admin = class Admin extends BaseModel {
    user;
    role;
    permissions;
};
__decorate([
    OneToOne(() => User),
    JoinColumn(),
    __metadata("design:type", User)
], Admin.prototype, "user", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], Admin.prototype, "role", void 0);
__decorate([
    Column({ type: "jsonb", default: [] }),
    __metadata("design:type", Array)
], Admin.prototype, "permissions", void 0);
Admin = __decorate([
    Entity()
], Admin);
export { Admin };
