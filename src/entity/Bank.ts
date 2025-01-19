import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User.js";
import { BaseModel } from "./BaseModel.js";

// Enum to define allowed banks
export enum BankType {
  Chase = "Chase",
  WellsFargo = "Wells Fargo",
  BankOfAmerica = "Bank of America",
  Citibank = "Citibank",
  CapitalOne = "Capital One",
  // Add more banks as needed
}

@Entity()
export class Bank extends BaseModel {
  @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" }) // Foreign key relationship
  @JoinColumn({ name: "user_id" }) // Maps this column to the `id` in User
  user!: User;

  @Column({ type: "enum", enum: BankType, nullable: false }) // Restricts to allowed bank types
  type!: BankType;

  @Column({ nullable: false })
  bank_name!: string;

  @Column({ unique: true, nullable: false })
  bank_account_number!: string;

  @Column({ nullable: false })
  account_name!: string;
}

