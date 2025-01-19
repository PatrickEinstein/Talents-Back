import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseModel } from "./BaseModel.js";
import { User } from "./User.js";

export enum TradeType {
  CurrencyExchange = "Currency Exchange",
  GiftCardSale = "Gift Card Sale",
}

export enum TradeStatus {
  Pending = "Pending",
  Completed = "Completed",
  Failed = "Failed",
}

@Entity()
export class Trade extends BaseModel{
  @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" }) // Defines a foreign key relationship
  @JoinColumn({ name: "user_id" }) // Maps this column to the `id` in User
  buyer_user_id!: User;

  @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" }) // Defines a foreign key relationship
  @JoinColumn({ name: "seller_user_id" }) // Maps this column to the `id` in User
  seller_user_id!: User;

  @Column({ type: "enum", enum: TradeType })
  trade_type!: TradeType;

  @Column({ type: "numeric" })
  amount!: number;

  @Column({ type: "enum", enum: TradeStatus })
  status!: TradeStatus;

  @Column()
  trade_date!: Date;
}
