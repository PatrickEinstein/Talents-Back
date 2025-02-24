var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, } from "typeorm";
import { BaseModel } from "./BaseModel.js";
export var AdStatus;
(function (AdStatus) {
    AdStatus["Available"] = "Available";
    AdStatus["Unavailable"] = "Unavailable";
})(AdStatus || (AdStatus = {}));
export var WorkMode;
(function (WorkMode) {
    WorkMode["Remote"] = "Remote";
    WorkMode["Onsite"] = "On-Site";
    WorkMode["Hybrid"] = "Hybrid";
})(WorkMode || (WorkMode = {}));
export var Remuneration;
(function (Remuneration) {
    Remuneration["Commission"] = "Commission";
    Remuneration["Hourly"] = "Hourly";
    Remuneration["Weekly"] = "Weekly";
    Remuneration["Monthly"] = "Monthly";
})(Remuneration || (Remuneration = {}));
export var IMilestoneStatus;
(function (IMilestoneStatus) {
    IMilestoneStatus["Pending"] = "Pending";
    IMilestoneStatus["Approved"] = "Approved";
    IMilestoneStatus["Completed"] = "Completed";
})(IMilestoneStatus || (IMilestoneStatus = {}));
let MerchantAd = class MerchantAd extends BaseModel {
    userId;
    creatorName;
    country;
    state;
    city;
    status;
    title;
    description;
    by;
    workmode;
    remuneration;
    amount;
    image;
    eligibility;
    applied_talent;
    hired_talent;
    milestones;
};
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], MerchantAd.prototype, "userId", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], MerchantAd.prototype, "creatorName", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], MerchantAd.prototype, "country", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], MerchantAd.prototype, "state", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], MerchantAd.prototype, "city", void 0);
__decorate([
    Column({ type: "enum", enum: AdStatus, default: AdStatus.Available }),
    __metadata("design:type", String)
], MerchantAd.prototype, "status", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], MerchantAd.prototype, "title", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], MerchantAd.prototype, "description", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], MerchantAd.prototype, "by", void 0);
__decorate([
    Column({
        nullable: false,
        type: "enum",
        enum: WorkMode,
        default: WorkMode.Onsite,
    }),
    __metadata("design:type", String)
], MerchantAd.prototype, "workmode", void 0);
__decorate([
    Column({
        nullable: false,
        type: "enum",
        enum: Remuneration,
        default: Remuneration.Hourly,
    }),
    __metadata("design:type", String)
], MerchantAd.prototype, "remuneration", void 0);
__decorate([
    Column({ type: "numeric" }),
    __metadata("design:type", Number)
], MerchantAd.prototype, "amount", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], MerchantAd.prototype, "image", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], MerchantAd.prototype, "eligibility", void 0);
__decorate([
    Column({ type: "simple-array", nullable: false, default: "" }),
    __metadata("design:type", Array)
], MerchantAd.prototype, "applied_talent", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], MerchantAd.prototype, "hired_talent", void 0);
__decorate([
    Column({ type: "jsonb", nullable: true }),
    __metadata("design:type", Array)
], MerchantAd.prototype, "milestones", void 0);
MerchantAd = __decorate([
    Entity()
], MerchantAd);
export { MerchantAd };
