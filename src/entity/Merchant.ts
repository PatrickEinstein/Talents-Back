import { Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./BaseModel.js";
import { User } from "./User.js";

export enum MerchantType {
  BureauDeChange = "Bureau de Change",
  GiftCardVendor = "Chinese Gift Card Vendor",
  CurrencySeller = "Foreign Currency Seller",
}

@Entity()
export class Merchant extends BaseModel {
 @OneToOne(() => User)
  @JoinColumn()
  user!: User;

  @Column({ type: "enum", enum: MerchantType })
  merchant_type!: MerchantType;

  @Column({ nullable: false })
  business_name!: string;

  @Column({ nullable: true })
  certificate_document?: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ type: "numeric", default: 0 })
  balance!: number;

}
