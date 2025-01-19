var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column } from "typeorm";
import { BaseModel } from "./BaseModel.js";
export var MessageType;
(function (MessageType) {
    MessageType["Text"] = "Text";
    MessageType["Image"] = "Image";
    MessageType["Document"] = "Document";
})(MessageType || (MessageType = {}));
let Message = class Message extends BaseModel {
    room_id;
    appeal_id;
    sender_user_id;
    message_text;
    message_type;
    sent_at;
};
__decorate([
    Column(),
    __metadata("design:type", String)
], Message.prototype, "room_id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Message.prototype, "appeal_id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Message.prototype, "sender_user_id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Message.prototype, "message_text", void 0);
__decorate([
    Column({ type: "enum", enum: MessageType }),
    __metadata("design:type", String)
], Message.prototype, "message_type", void 0);
__decorate([
    Column(),
    __metadata("design:type", Date)
], Message.prototype, "sent_at", void 0);
Message = __decorate([
    Entity()
], Message);
export { Message };
