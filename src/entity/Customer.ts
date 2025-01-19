import { Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./BaseModel.js";
import { User } from "./User.js";

export enum CustomerType {
  Individual = "Individual",
  Company = "Company",
}

@Entity()
export class Customer extends BaseModel {    
    @OneToOne(() => User)
    @JoinColumn()
    user!: User;
  
    @Column({ type: "enum", enum: CustomerType })
    customer_type!: CustomerType;
  
    @Column({ nullable: true })
    national_id?: string;
  
    @Column({ nullable: true })
    company_name?: string;
}
