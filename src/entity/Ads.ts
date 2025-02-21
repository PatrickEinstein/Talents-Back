import {
  Entity,
  Column,
} from "typeorm";
import { BaseModel } from "./BaseModel.js";

export enum AdStatus {
  Available = "Available",
  Unavailable = "Unavailable",
}

export enum WorkMode {
  Remote = "Remote",
  Onsite = "On-site",
  Hybrid = "Hybrid",
}

export enum Remuneration {
  Commission = "Commission",
  Hourly = "Hourly",
  Weekly = "Weekly",
  Monthly = "Monthly",
}


export enum IMilestoneStatus {
  Pending = "Pending",
  Approved = "Approved",
  Completed = "Completed",
}

export interface Milestones{
  title: string
  description: string
  amount: number
  status: IMilestoneStatus
}
@Entity()
export class MerchantAd extends BaseModel {
  @Column({ nullable: false })
  userId!: string;
  @Column({ nullable: false })
  creatorName!: string;
  @Column({ nullable: false })
  country!: string;
  @Column({ nullable: false })
  state!: string;
  @Column({ nullable: false })
  city!: string;
  @Column({ type: "enum", enum: AdStatus, default: AdStatus.Available })
  status!: AdStatus;
  @Column({ nullable: false })
  title!: string;
  @Column({ nullable: false })
  description!: string;
  @Column({ nullable: false })
  by!: string;
  @Column({
    nullable: false,
    type: "enum",
    enum: WorkMode,
    default: WorkMode.Onsite,
  })
  workmode!: string;
  @Column({
    nullable: false,
    type: "enum",
    enum: Remuneration,
    default: Remuneration.Hourly,
  })
  remuneration!: string;
  @Column({ type: "numeric" })
  amount!: number;
  @Column({ nullable: true })
  image!: string;
  @Column({ nullable: false })
  eligibility!: string;
  @Column({ type: "simple-array", nullable: true })
  applied_talent?: string[];
  @Column({ nullable: true })
  hired_talent?: string;
  @Column({ type: "jsonb", nullable: true })
  milestones?: Milestones[];
}
