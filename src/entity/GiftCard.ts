import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseModel } from "./BaseModel.js";
import { Customer } from "./Customer.js";

export enum GiftCardType {
  eGift = "eGift",
  Physical = "Physical",
}

@Entity()
export class GiftCard extends BaseModel {
  @ManyToOne(() => Customer, (customer) => customer.id, { onDelete: "CASCADE" }) // Foreign key relationship
  @JoinColumn({ name: "customer_id" }) // Maps this column to the `id` in Customer
  customer!: Customer;

  @Column()
  card_number!: string;

  @Column({ type: "enum", enum: GiftCardType })
  card_type!: GiftCardType;

  @Column({ type: "numeric" })
  balance!: number;

  @Column()
  image_url!: string;
}
