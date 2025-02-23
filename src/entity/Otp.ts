import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { BaseModel } from "./BaseModel.js";
import { User } from "./User.js";



@Entity()
export class Otp {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ nullable: false })
  otp!: string;

  @Column({ nullable: false })
  email!: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

}