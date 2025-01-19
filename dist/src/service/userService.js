import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from 'uuid';
import { Role } from "../types.js";
import { Roles, User } from "../entity/User.js";
import { Otp, OtpType } from "../entity/Otp.js";
import generateOtp from "../utils/otpGenerator.js";
import { MoreThan } from "typeorm";
import mailer from "../config/Mailer.js";
import AppDataSource from "../data-source.js";
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
                };
            }
            const isPasswordValid = await bcrypt.compare(load.password, user.password);
            if (!isPasswordValid) {
                return {
                    status: 401,
                    message: "Invalid password",
                    id: "",
                    token: "",
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
        try {
            let createduserId = 0;
            try {
                const userRepository = AppDataSource.getRepository(User);
                const hashedPassword = await bcrypt.hash(load.password, 10);
                const user = userRepository.create({
                    ...load,
                    password: hashedPassword,
                });
                const createdUser = await userRepository.save(user);
                createduserId = +createdUser.id;
                const roleRepository = AppDataSource.getRepository(Roles);
                const role = roleRepository.create({
                    userid: user.id.toString(),
                    isActive: false,
                    canAssignAdmin: false,
                    canDeleteAdmin: false,
                    canUpload: false,
                });
                console.log(role);
                await roleRepository.save(role);
                // Generate and save OTP
                const otpCode = generateOtp();
                const otpRepository = AppDataSource.getRepository(Otp);
                const otp = otpRepository.create({
                    user: createdUser,
                    otp_code: otpCode,
                    expires_at: new Date(Date.now() + 15 * 60 * 1000), // OTP expires in 15 minutes
                    otp_type: OtpType.UserVerification,
                });
                await otpRepository.save(otp);
                // Send OTP to user email
                mailer({
                    mail: createdUser.email,
                    subject: 'Your OTP Code',
                    text: `Your OTP code is ${otpCode}. It will expire in 15 minutes.`,
                    html: ""
                });
                return { status: 201, message: "User created successfully" };
            }
            catch (e) {
                await this.DeleteUser(createduserId.toString());
                return { status: 400, message: e.message };
            }
        }
        catch (err) {
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
            const user = await userRepository.findOneBy({ email: load.email });
            if (!user) {
                return { status: 404, message: 'User not found' };
            }
            if (user.is_verified) {
                return { status: 400, message: 'User is already verified' };
            }
            console.log(load.email, load.otp);
            const otpRecord = await otpRepository.findOne({
                where: { user: { email: load.email }, otp_code: load.otp, otp_type: OtpType.UserVerification },
            });
            if (!otpRecord) {
                return { status: 400, message: 'Invalid OTP' };
            }
            if (otpRecord.expires_at < new Date()) {
                return { status: 400, message: 'OTP has expired' };
            }
            otpRecord.is_used = true;
            await otpRepository.save(otpRecord);
            user.is_verified = true;
            await userRepository.save(user);
            // Send verification email
            await mailer({
                mail: user.email,
                subject: 'Account Verified',
                text: 'Your account has been successfully verified.',
                html: ""
            });
            return { status: 200, message: 'OTP verified successfully' };
        }
        catch (err) {
            return { status: 500, message: err.message };
        }
    }
    async GetUser(id) {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({
                where: { id: (id) },
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
                if (typedKey !== 'id' && user[typedKey] !== undefined && user[typedKey] !== null && user[typedKey] !== '') {
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
                where: { id: (id) },
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
    async GetRoles(id) {
        try {
            const rolesRepository = AppDataSource.getRepository(Roles);
            const userRoles = await rolesRepository.findOne({
                where: { userid: id },
            });
            if (!userRoles) {
                return { status: 400, message: "User not found" };
            }
            return { status: 200, message: userRoles };
        }
        catch (err) {
            return { status: 500, message: err.message };
        }
    }
    async UpdateRoles(load) {
        try {
            console.log("Update Role  service", load);
            const userRole = AppDataSource.getRepository(Roles);
            let foundRole = await userRole.findOne({
                where: { userid: load.userid },
            });
            if (!foundRole) {
                return { status: 400, message: "User role was not found" };
            }
            const { role } = load;
            if (role == Role.Admin) {
                foundRole.role = role;
                foundRole.canAssignAdmin = true;
                foundRole.canDeleteAdmin = true;
                foundRole.canUpload = true;
                await userRole.save(foundRole);
                return {
                    status: 200,
                    message: "Role updated successfully",
                    updatedRole: foundRole,
                };
            }
            if (role == Role.User) {
                foundRole.role = role;
                foundRole.canAssignAdmin = false;
                foundRole.canDeleteAdmin = false;
                foundRole.canUpload = false;
                await userRole.save(foundRole);
                return {
                    status: 200,
                    message: "Role updated successfully",
                    updatedRole: foundRole,
                };
            }
            return {
                status: 400,
                message: "role does not fit admin, user",
                updatedRole: {},
            };
        }
        catch (err) {
            return {
                status: 500,
                message: err.message,
                updatedRole: {},
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
                subject: 'Password Reset',
                text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
                html: ""
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
                where: { resetToken: load.token, resetTokenExpiry: MoreThan(new Date()) },
            });
            if (!user) {
                return { status: 400, message: "Invalid or expired token" };
            }
            // Check if the new password is the same as the existing password
            const isSamePassword = await bcrypt.compare(load.password, user.password);
            if (isSamePassword) {
                return { status: 400, message: "New password cannot be the same as the existing password" };
            }
            const hashedPassword = await bcrypt.hash(load.password, 10);
            user.password = hashedPassword;
            user.resetToken = null;
            user.resetTokenExpiry = null;
            await userRepository.save(user);
            // Send email notification
            await mailer({
                mail: user.email,
                subject: 'Password Updated Successfully',
                text: 'Your password has been updated successfully.',
                html: ""
            });
            return { status: 200, message: "Password reset successfully" };
        }
        catch (err) {
            return { status: 500, message: err.message };
        }
    }
}
