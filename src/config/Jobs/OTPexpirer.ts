import cron from "node-cron";
import { LessThanOrEqual } from "typeorm";
import AppDataSource from "../../data-source.js";
import { Otp } from "../../entity/Otp.js";

export const OTPexpirer = () => {
  cron.schedule("*/5 * * * *", async () => {
    console.log(`--------OTP expirer initiated-------- at ${Date.now().toLocaleDateString()}`);
    const otpRepo = await AppDataSource.getRepository(Otp);
    const thirtyMinutesAgo = new Date(Date.now() - 90 * 60 * 1000);
    const otpExpired = await otpRepo.find({
      where: {
        createdAt: LessThanOrEqual(thirtyMinutesAgo),
      },
    });
    if (otpExpired.length > 0) {
      for (let i = 0; i < otpExpired.length; i++) {
        otpRepo.delete({
          id: otpExpired[i].id,
        });

        console.log(
          `${otpExpired[i].otp} with ${otpExpired[i].email} has been deleted`
        );
      }
    }
  });
};
