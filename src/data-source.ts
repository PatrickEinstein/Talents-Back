import "reflect-metadata";
import { DataSource } from "typeorm";
import * as fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { User } from "./entity/User.js";
import { Otp } from "./entity/Otp.js";
import { MerchantAd } from "./entity/Ads.js";
import { Message } from "./entity/Message.js";
dotenv.config()


const __dirname = path.dirname(new URL(import.meta.url).pathname).slice(1);
console.log(`EntitiesPath`, __dirname)

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSGRES_HOST as string,
  port: parseInt(process.env.POSGRES_PORT as string),
  username: process.env.POSGRES_USERNAME as string,
  password: process.env.POSGRES_PASSWORD as string,
  database: process.env.POSGRES_DATABASE as string,
  synchronize: true,
  logging: false,
  // ssl: {
  //   rejectUnauthorized: false,
  //   ca: fs.readFileSync("./ca.pem").toString(),
  // },
  entities: [User, Otp, MerchantAd, Message],
  migrations: [`${__dirname}/migration/*.js`],
  subscribers: [`${__dirname}/subscriber/*.js`],
});





export default AppDataSource;