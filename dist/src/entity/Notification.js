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
export var NotificationType;
(function (NotificationType) {
    NotificationType["Sms"] = "sms";
    NotificationType["Email"] = "email";
    NotificationType["PushNotification"] = "push_notification";
})(NotificationType || (NotificationType = {}));
export var NotificationStatus;
(function (NotificationStatus) {
    NotificationStatus["Sent"] = "Sent";
    NotificationStatus["Pending"] = "Pending";
    NotificationStatus["Failed"] = "Failed";
})(NotificationStatus || (NotificationStatus = {}));
let Notification = class Notification extends BaseModel {
    user;
    notification_type;
    notification_message;
    status;
    is_read;
    sent_at;
};
__decorate([
    ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" }) // Foreign key relationship
    ,
    JoinColumn({ name: "user_id" }) // Maps this column to the `id` in User
    ,
    __metadata("design:type", User)
], Notification.prototype, "user", void 0);
__decorate([
    Column({ type: "enum", enum: NotificationType, nullable: false }),
    __metadata("design:type", String)
], Notification.prototype, "notification_type", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Notification.prototype, "notification_message", void 0);
__decorate([
    Column({ type: "enum", enum: NotificationStatus, nullable: false }),
    __metadata("design:type", String)
], Notification.prototype, "status", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], Notification.prototype, "is_read", void 0);
__decorate([
    Column(),
    __metadata("design:type", Date)
], Notification.prototype, "sent_at", void 0);
Notification = __decorate([
    Entity()
], Notification);
export { Notification };
