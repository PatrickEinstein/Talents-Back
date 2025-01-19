import { Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import { User } from "./User.js";
import { BaseModel} from "./BaseModel.js";

export enum TransactionType {
  Deposit = "Deposit",
  Withdrawal = "Withdrawal",
  Trade = "Trade",
}

export enum TransactionStatus {
  Pending = "Pending",
  Completed = "Completed",
  Failed = "Failed",
}

@Entity()
export class Transaction extends BaseModel {
@ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "sender_user_id" })
  sender_user!: User;

  @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "receiver_user_id" })
  receiver_user!: User;

  @Column({ type: "numeric" })
  amount!: number;

  @Column({ type: "enum", enum: TransactionType })
  transaction_type!: TransactionType;

  @Column({ type: "enum", enum: TransactionStatus })
  status!: TransactionStatus;

  @Column()
  transaction_date!: Date;
}
