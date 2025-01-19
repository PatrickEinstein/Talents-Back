import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseModel} from "./BaseModel.js";
import { User } from "./User.js";
import { Transaction } from "./Transaction.js";
import { Trade } from "./Trade.js";

export enum AppealStatus {
  Pending = "Pending",
  Resolved = "Resolved",
  Closed = "Closed",
}

@Entity()
export class Appeal extends BaseModel {
  @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" }) // Foreign key relationship
  @JoinColumn({ name: "user_id" }) // Maps this column to the `id` in User
  user!: User;

  @ManyToOne(() => Transaction, (transaction) => transaction.id, { onDelete: "CASCADE" }) // Foreign key relationship
  @JoinColumn({ name: "transaction_id" }) // Maps this column to the `id` in Transaction
  transaction!: Transaction;

  @ManyToOne(() => Trade, (trade) => trade.id, { onDelete: "CASCADE" }) // Foreign key relationship
  @JoinColumn({ name: "trade_id" }) // Maps this column to the `id` in Trade
  trade!: Trade;

  @Column()
  appeal_reason!: string;

  @Column({ type: "enum", enum: AppealStatus })
  appeal_status!: AppealStatus;

  @Column()
  appeal_date!: Date;
}
