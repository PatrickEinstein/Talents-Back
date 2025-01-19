import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseModel } from "./BaseModel.js";
import { User } from "./User.js";

export enum CardType {
  Debit = "Debit",
  Credit = "Credit",
}

@Entity()
export class Card extends BaseModel {
  @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" }) // Foreign key relationship
  @JoinColumn({ name: "user_id" }) // Maps this column to the `id` in User
  user!: User;

  @Column()
  card_number!: string;

  @Column({ type: "enum", enum: CardType })
  card_type!: CardType;

  @Column()
  expiry_date!: string;

  @Column()
  cvv!: string;
}
