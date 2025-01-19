import { Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./BaseModel.js";
import { User } from "./User.js";

@Entity('wallet')
export class Wallet extends BaseModel {
  @OneToOne(() => User)
  @JoinColumn()
  user!: User;

  @Column({ type: "numeric", default: 0 })
  balance!: number;

  @Column({ nullable: false })
  currency!: string;
}
