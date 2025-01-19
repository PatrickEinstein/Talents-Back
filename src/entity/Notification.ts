import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseModel } from "./BaseModel.js";
import { User } from "./User.js";

export enum NotificationType {
    Sms = "sms",
    Email = "email",
    PushNotification = "push_notification",
}

export enum NotificationStatus {
    Sent = "Sent",
    Pending = "Pending",
    Failed = "Failed",
}


@Entity()
export class Notification extends BaseModel {
  @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" }) // Foreign key relationship
  @JoinColumn({ name: "user_id" }) // Maps this column to the `id` in User
  user!: User;

  @Column({ type: "enum", enum: NotificationType, nullable: false })
  notification_type!: NotificationType;

  @Column()
  notification_message!: string;

  @Column({ type: "enum", enum: NotificationStatus, nullable: false })
  status!: NotificationStatus;

  @Column({ default: false })
  is_read!: boolean;

  @Column()
  sent_at!: Date;
}
