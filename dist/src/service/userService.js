import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { Roles, User } from "../entity/User.js";
import { Otp } from "../entity/Otp.js";
import generateOtp from "../utils/otpGenerator.js";
import mailer from "../config/Mailer.js";
import AppDataSource from "../data-source.js";
import sendExternalMail from "../config/MailerExt.js";
import { GetRandomInit } from "../config/Random.js";
dotenv.config();
export class UserService {
    async Login(load) {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOneBy({ email: load.email });
            if (!user) {
                return {
                    status: 400,
                    message: "User not found",
                    id: "",
                    token: "",
                    user_verified: false,
                };
            }
            const isPasswordValid = await bcrypt.compare(load.password, user.password);
            if (!isPasswordValid) {
                return {
                    status: 400,
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
        let error = [];
        // I want to check if any the fields in the load is empty string
        const allaluesinLoad = Object.entries(load); // convert each key/values in the load to array
        for (let i = 0; i < allaluesinLoad.length; i++) {
            // loop and see if any  value is empty
            if (!allaluesinLoad[i][1]) {
                error.push(`${allaluesinLoad[i][0]}`); // push the key into the error array
            }
        }
        if (error.length > 0) {
            return {
                status: 400,
                message: `please provide a valid  ${error.join(",")}`, // join the array to string
            };
        }
        let createduserId = 0;
        const userRepository = AppDataSource.getRepository(User);
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
            //First delete all existing otp for this user
            otpRepository.delete({ email: user.email });
            // Generate and save OTP
            const otpCode = generateOtp();
            const otp = otpRepository.create({
                email: createdUser.email,
                otp: otpCode,
            });
            const subject = "🎉 Welcome to Talented Skills Platform! Verify Your Account";
            const text = `Dear ${createdUser.firstName},

Welcome to **Talented Skills **! We're excited to have you on board.

To complete your registration and secure your account, please verify your email using the One-Time Password (OTP) below:

🔐 **Your OTP Code:** **${otp.otp}**

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
            return {
                status: 500,
                message: err.message,
            };
        }
    }
    async GetUser(email) {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({
                where: { email: email },
            });
            if (!user) {
                return { status: 404, message: "User not found" };
            }
            const { KYC_status, accountNumber, account_status, account_tier, address, city, country_of_residence, firstName, is_verified, kyc_verified, profile_image, username, lastName, phone, } = user;
            const userMap = {
                KYC_status,
                lastName,
                accountNumber,
                account_status,
                account_tier,
                address,
                city,
                country_of_residence,
                firstName,
                is_verified,
                kyc_verified,
                profile_image,
                username,
                email: email,
                phone,
            };
            return { status: 200, message: userMap };
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
    CreateOTP = async (load) => {
        const userRepo = AppDataSource.getRepository(User);
        const otpRepo = AppDataSource.getRepository(Otp);
        try {
            // Check if user exists
            const user = await userRepo.findOneBy({ email: load.email });
            if (!user) {
                return {
                    message: "User not found",
                    status: 404,
                    user: {
                        username: null,
                    },
                    otpCreated: null,
                };
            }
            // Delete all previous otp by this same user
            const otps = await otpRepo.find({ where: { email: user.email } });
            if (otps.length > 0) {
                for (let otp of otps) {
                    await otpRepo.delete({ email: otp.email });
                }
            }
            // Generate OTP and save
            const otpCreated = otpRepo.create({
                email: load.email,
                otp: GetRandomInit(5),
            });
            await otpRepo.save(otpCreated);
            return {
                user: {
                    username: user.username,
                },
                status: 200,
                otpCreated,
                message: "",
            };
        }
        catch (err) {
            return {
                user: {
                    username: "",
                },
                status: 500,
                otpCreated: null,
                message: "",
            };
        }
    };
    async VerifyOTP(load) {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const otpRepository = AppDataSource.getRepository(Otp);
            const user = await userRepository.findOneBy({
                personalToken: load.token2,
            });
            if (!user) {
                return { status: 404, message: "User not found" };
            }
            const otpRecord = await otpRepository.findOne({
                where: { email: load.email, otp: load.otp },
            });
            if (!otpRecord) {
                return { status: 400, message: "Invalid OTP" };
            }
            await otpRepository.delete({
                otp: load.otp,
                email: load.email,
            });
            return { status: 200, message: "OTP verified successfully" };
        }
        catch (err) {
            return { status: 500, message: err.message };
        }
    }
    async VerifyUser(load) {
        const userRepository = AppDataSource.getRepository(User);
        try {
            const { status, message } = await this.VerifyOTP(load);
            if (status === 200) {
                const subject = "🎉 Welcome to Talented Skills Platform! Congratualtions on successful verification of your Account";
                const emailObject = {
                    fromUsername: "Talented Skills Network",
                    tomail: `${load.email}, mohammedola1234@gmail.com`,
                    subject: subject,
                    text: "Your account has been successfully verified.",
                    html: "",
                };
                try {
                    const user = await userRepository.findOneBy({
                        personalToken: load.token2,
                    });
                    if (user) {
                        await sendExternalMail(emailObject);
                        user.is_verified = true;
                        await userRepository.save(user);
                    }
                }
                catch (emailError) {
                    console.error("Failed to send email:", emailError);
                }
                return { status: 200, message: "OTP verified successfully" };
            }
            return { status: 400, message: "Verification failed" };
        }
        catch (err) {
            return { status: 500, message: err.message };
        }
    }
    async RequestPasswordChange(load) {
        try {
            const { status, user, otpCreated } = await this.CreateOTP(load);
            if (status === 200) {
                const subject = "🔐 Talented Skills Network Security: Password Reset Request";
                const text = `Dear ${user?.username},
        
        We received a request to reset the password for your Talented Skills account associated with this email.
        
        Your One-Time Password (OTP) is: **${otpCreated?.otp}**
        
        ⚠️ **Important:** This OTP is valid for a limited time. Do **not** share this code with anyone.
        
        If you **did not request a password reset**, please ignore this email. Your account remains secure.
        
        For further assistance, contact our support team.
        
        Best regards,  
        The Talented Security Team
        `;
                const emailObject = {
                    fromUsername: "Talented Skills ",
                    tomail: `${load.email}, mohammedola1234@gmail.com`,
                    subject: subject,
                    text: text,
                    html: "",
                };
                try {
                    await sendExternalMail(emailObject);
                }
                catch (e) {
                    console.log(`mailer response error`, e.message);
                }
                return {
                    message: "OTP created and sent successfully",
                    status: 201,
                };
            }
            return { status: 400, message: "Verification failed" };
        }
        catch (error) {
            console.error(`❌ CreateOTP Error:`, error.message);
            return {
                message: "Internal Server Error",
                status: 500,
            };
        }
    }
    async ChangePassword(load) {
        try {
            const otpRepo = await AppDataSource.getRepository(Otp);
            const foundOtp = await otpRepo.findOne({
                where: {
                    otp: load.otp,
                    email: load.email,
                },
            });
            if (foundOtp) {
                const userRepo = await AppDataSource.getRepository(User);
                const user = await userRepo.findOne({
                    where: {
                        email: load.email,
                    },
                });
                if (!user) {
                    return {
                        message: "invalid user",
                        status: 400,
                    };
                }
                if (load.confirmPassword !== load.newPassword) {
                    return {
                        message: "Passwords do not match",
                        status: 400,
                    };
                }
                const hashedPassword = await bcrypt.hash(load.newPassword, 10);
                user.password = hashedPassword;
                userRepo.save(user);
                otpRepo.delete({
                    otp: load.otp,
                    email: load.email,
                });
                return {
                    message: "Password changed successfully",
                    status: 200,
                };
            }
            return {
                message: "Otp invalid or used",
                status: 400,
            };
        }
        catch (e) {
            console.log(`chnage pass error==>`, e.message);
            return {
                message: e.message,
                status: 500,
            };
        }
    }
}
