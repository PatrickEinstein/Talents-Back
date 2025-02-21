import "reflect-metadata";
import { DataSource } from "typeorm";
import path from 'path';
import dotenv from 'dotenv';
import { User } from "./entity/User.js";
import { Otp } from "./entity/Otp.js";
import { MerchantAd } from "./entity/Ads.js";
import { Message } from "./entity/Message.js";
dotenv.config();
const __dirname = path.dirname(new URL(import.meta.url).pathname).slice(1);
console.log(`EntitiesPath`, __dirname);
const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSGRES_HOST,
    port: parseInt(process.env.POSGRES_PORT),
    username: process.env.POSGRES_USERNAME,
    password: process.env.POSGRES_PASSWORD,
    database: process.env.POSGRES_DATABASE,
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
