import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { BaseModel } from "./BaseModel.js";
import { User } from "./User.js";

@Entity()
export class Admin extends BaseModel {
  @OneToOne(() => User)
  @JoinColumn()
  user!: User;

  @Column({ nullable: false })
  role!: string;

  @Column({ type: "jsonb", default: [] })
  permissions!: string[];
}
