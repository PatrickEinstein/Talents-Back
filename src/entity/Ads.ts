import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseModel } from "./BaseModel.js";
import { User } from "./User.js";

export enum AdStatus {
  Active = "Active",
  Busy = "Busy",
  Inactive = "Inactive",
}

@Entity()
export class MerchantAd extends BaseModel {
  @ManyToOne(() => User, (merchant) => merchant.id, { onDelete: "CASCADE" }) // Foreign key relationship
  @JoinColumn({ name: "user_id" }) // Maps this column to the `id` in Merchant
  user!: User;

  @Column({ type: "numeric" })
  amount!: number;

  @Column({ type: "enum", enum: AdStatus })
  status!: AdStatus;

  @Column({  nullable: false })
  description!: string;

  @Column({  nullable: false })
  workmode!: string;
}
