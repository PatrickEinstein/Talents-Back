import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { Roles, User } from "../entity/User.js";
import { Otp } from "../entity/Otp.js";
import generateOtp from "../utils/otpGenerator.js";
import { MoreThan } from "typeorm";
import mailer from "../config/Mailer.js";
import AppDataSource from "../data-source.js";
import sendExternalMail from "../config/MailerExt.js";
dotenv.config();
export class UserService {
    async Login(load) {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOneBy({ email: load.email });
            if (!user) {
                return {
                    status: 404,
                    message: "User not found",
                    id: "",
                    token: "",
                    user_verified: false,
                };
            }
            const isPasswordValid = await bcrypt.compare(load.password, user.password);
            if (!isPasswordValid) {
                return {
                    status: 401,
                    message: "Invalid password",
                    id: "",
                    token: "",
                    user_verified: false,
                };
            }
            const token = jwt.sign({ id: user.id, email: user.email, user_type: user.user_type }, process.env.SECRET_KEY, {
                expiresIn: "1h",
            });
            return {
                status: 200,
                message: `Welcome ${user.username}`,
                id: user.id,
                token,
                user_verified: user.is_verified,
                token2: user.personalToken,
            };
        }
        catch (err) {
            return {
                status: 500,
                message: err.message,
            };
        }
    }
    async CreateUser(load) {
        console.log(`CreatingUserLoad-backend`, load);
        let createduserId = 0;
        const userRepository = AppDataSource.getRepository(User);
        const roleRepository = AppDataSource.getRepository(Roles);
        const otpRepository = AppDataSource.getRepository(Otp);
        try {
            const isExistingUser = await userRepository.findOne({
                where: {
                    email: load.email,
                },
            });
            if (isExistingUser) {
                return {
                    status: 400,
                    message: "An account is already associated with this user",
                };
            }
            const firstPart = load.firstName.substring(0, Math.min(5, load.firstName.length));
            const lastPart = load.lastName.length > 5 ? load.lastName.substring(5) : "";
            const username = `${firstPart}${lastPart}`;
            const hashedPassword = await bcrypt.hash(load.password, 10);
            const rawToken = `${hashedPassword}${hashedPassword}`;
            let personalToken = (await bcrypt.hash(rawToken, 10)).toString();
            personalToken = personalToken.replace(/[\\/]/g, "");
            const user = userRepository.create({
                ...load,
                username,
                password: hashedPassword,
                personalToken: personalToken,
            });
            const createdUser = await userRepository.save(user);
            createduserId = +createdUser.id;
            const role = roleRepository.create({
                userid: user.id.toString(),
                isActive: true,
            });
            console.log(role);
            await roleRepository.save(role);
            // Generate and save OTP
            const otpCode = generateOtp();
            const otp = otpRepository.create({
                user: createdUser,
                otp_code: otpCode,
            });
            const subject = "🎉 Welcome to Talented Skills Platform! Verify Your Account";
            const text = `Dear ${createdUser.firstName},

Welcome to **Talented Skills **! We're excited to have you on board.

To complete your registration and secure your account, please verify your email using the One-Time Password (OTP) below:

🔐 **Your OTP Code:** **${otp.otp_code}**

This code is valid for a limited time, so be sure to use it as soon as possible.

#### Why Verify?
✅ Secure your account  
✅ Enable full access to HeartBeat features  
✅ Stay updated with important security notifications  

If you did not sign up for a Talented Skills account, please ignore this email. Your account remains secure.
For any assistance, feel free to reach out to our support team.

**Best regards,**  
The Talented Skills Team`;
            const emailObject = {
                fromUsername: "Talented Skills Network",
                tomail: `${createdUser.email}, mohammedola1234@gmail.com`,
                subject: subject,
                text: text,
                html: "",
            };
            await otpRepository.save(otp);
            try {
                await sendExternalMail(emailObject);
            }
            catch (emailError) {
                console.error("Failed to send email:", emailError);
            }
            return {
                status: 201,
                message: `Welcome ${load.firstName}, login in to confirm your account`,
            };
        }
        catch (err) {
            console.log(`Error creating user==>`, err);
            await this.DeleteUser(createduserId.toString());
            await roleRepository.delete({ userid: createduserId.toString() });
            return {
                status: 500,
                message: err.message,
            };
        }
    }
    async VerifyOtp(load) {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const otpRepository = AppDataSource.getRepository(Otp);
            const user = await userRepository.findOneBy({
                personalToken: load.token2,
            });
            if (!user) {
                return { status: 404, message: "User not found" };
            }
            if (user.is_verified) {
                return { status: 400, message: "User is already verified" };
            }
            const otpRecord = await otpRepository.findOne({
                where: { user: { email: load.email }, otp_code: load.otp },
            });
            if (!otpRecord) {
                return { status: 400, message: "Invalid OTP" };
            }
            otpRecord.is_used = true;
            await otpRepository.save(otpRecord);
            user.is_verified = true;
            await userRepository.save(user);
            const subject = "🎉 Welcome to Talented Skills Platform! Congratualtions on successful verification of your Account";
            const emailObject = {
                fromUsername: "Talented Skills Network",
                tomail: `${load.email}, mohammedola1234@gmail.com`,
                subject: subject,
                text: "Your account has been successfully verified.",
                html: "",
            };
            try {
                await sendExternalMail(emailObject);
            }
            catch (emailError) {
                console.error("Failed to send email:", emailError);
            }
            return { status: 200, message: "OTP verified successfully" };
        }
        catch (err) {
            return { status: 500, message: err.message };
        }
    }
    async GetUser(id) {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({
                where: { id: id },
            });
            if (!user) {
                return { status: 404, message: "User not found" };
            }
            return { status: 200, message: user };
        }
        catch (err) {
            return {
                status: 500,
                message: err.message,
            };
        }
    }
    async GetAllUsers() {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const users = await userRepository.find();
            return { status: 200, message: users };
        }
        catch (err) {
            return {
                status: 500,
                message: err.message,
            };
        }
    }
    async UpdateUser(user) {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const foundUser = await userRepository.findOne({
                where: { id: user.id },
            });
            if (!foundUser) {
                return { status: 404, message: "User not found" };
            }
            // Update fields dynamically
            Object.keys(user).forEach((key) => {
                const typedKey = key;
                if (typedKey !== "id" &&
                    user[typedKey] !== undefined &&
                    user[typedKey] !== null &&
                    user[typedKey] !== "") {
                    foundUser[typedKey] = user[typedKey];
                }
            });
            await userRepository.save(foundUser);
            return { status: 200, message: "User updated successfully" };
        }
        catch (err) {
            return {
                status: 500,
                message: err.message,
            };
        }
    }
    async DeleteUser(id) {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({
                where: { id: id },
            });
            if (!user) {
                return { status: 404, message: "User not found" };
            }
            const roleRepository = AppDataSource.getRepository(Roles);
            await roleRepository.delete({ userid: id });
            await userRepository.delete(id);
            return { status: 200, message: "User deleted successfully" };
        }
        catch (err) {
            return {
                staus: 500,
                message: err.message,
            };
        }
    }
    async SendPasswordResetMail(email) {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOneBy({ email });
            if (!user) {
                return { status: 404, message: "User not found" };
            }
            const resetToken = uuidv4();
            const resetTokenExpiry = new Date(Date.now() + 3600000); // Token expires in 1 hour
            user.resetToken = resetToken;
            user.resetTokenExpiry = resetTokenExpiry;
            await userRepository.save(user);
            const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
            await mailer({
                mail: user.email,
                subject: "Password Reset",
                text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
                html: "",
            });
            return { status: 200, message: "Password reset email sent successfully" };
        }
        catch (err) {
            return { status: 500, message: err.message };
        }
    }
    async ResetPassword(load) {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({
                where: {
                    resetToken: load.token,
                    resetTokenExpiry: MoreThan(new Date()),
                },
            });
            if (!user) {
                return { status: 400, message: "Invalid or expired token" };
            }
            // Check if the new password is the same as the existing password
            const isSamePassword = await bcrypt.compare(load.password, user.password);
            if (isSamePassword) {
                return {
                    status: 400,
                    message: "New password cannot be the same as the existing password",
                };
            }
            const hashedPassword = await bcrypt.hash(load.password, 10);
            user.password = hashedPassword;
            user.resetToken = null;
            user.resetTokenExpiry = null;
            await userRepository.save(user);
            // Send email notification
            await mailer({
                mail: user.email,
                subject: "Password Updated Successfully",
                text: "Your password has been updated successfully.",
                html: "",
            });
            return { status: 200, message: "Password reset successfully" };
        }
        catch (err) {
            return { status: 500, message: err.message };
        }
    }
}
