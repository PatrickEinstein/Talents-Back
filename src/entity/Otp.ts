import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseModel } from "./BaseModel.js";
import { User } from "./User.js";



@Entity()
export class Otp extends BaseModel {
  @ManyToOne(() => User, (user) => user.email, { onDelete: "CASCADE" }) // Foreign key relationship
  @JoinColumn({ name: "user_email", referencedColumnName: "email" }) // Maps this column to the `email` in User
  user!: User;

  @Column({ nullable: false })
  otp_code!: string;


  @Column({ default: false })
  is_used!: boolean;

}