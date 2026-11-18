
import UserModel from "../Model/UserModel.js";
import sendEmail from "../../config/nodemailer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomInt } from "crypto";

// Generate OTP
const generateOTP = () => {
    return randomInt(100000, 1000000).toString();
};

// OTP Expiry - 2 Minutes
const getOTPExpiry = () => {
    return new Date(Date.now() + 2 * 60 * 1000);
};


// ================= REGISTER =================

export const register = async (req, res) => {
    try {
        const { name, email, password, contactNumber, role } = req.body;

        if (!name || !email || !password || !contactNumber) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        const userRole = role || "student";

        if (!["student", "staff", "canteen owner"].includes(userRole)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role"
            });
        }

        let user = await UserModel.findOne({ email });

        if (user && user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "User already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOTP();
        const otpExpire = getOTPExpiry();

        if (user) {
            user.name = name;
            user.password = hashedPassword;
            user.contactNumber = contactNumber;
            user.role = userRole;
            user.otp = otp;
            user.otpExpire = otpExpire;

            await user.save();
        } else {
            user = await UserModel.create({
                name,
                email,
                password: hashedPassword,
                contactNumber,
                otp,
                otpExpire,
                role: userRole
            });
        }

        const result = await sendEmail(
            email,
            "CampusBite Registration OTP",
            `Hello ${name},

Your OTP is ${otp}.

This OTP is valid for 2 minutes.

Thank you,
CampusBite Team`
        );

        if (!result) {
            user.otp = null;
            user.otpExpire = null;
            await user.save();

            return res.status(500).json({
                success: false,
                message: "Email sending failed"
            });
        }

        return res.status(201).json({
            success: true,
            message: "Registration successful. OTP sent to your email."
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= OTP VERIFY =================

export const otpVerify = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required"
            });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Email already verified"
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        if (!user.otpExpire || user.otpExpire < new Date()) {
            return res.status(400).json({
                success: false,
                message: "OTP expired"
            });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpire = null;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= LOGIN =================

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!user.isVerified) {
            return res.status(401).json({
                success: false,
                message: "Please verify your email first"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                contactNumber: user.contactNumber,
                role: user.role
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= FORGOT PASSWORD =================

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const user = await UserModel.findOne({
            email,
            isVerified: true
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Verified user not found"
            });
        }

        const otp = generateOTP();

        user.otp = otp;
        user.otpExpire = getOTPExpiry();

        await user.save();

        const result = await sendEmail(
            email,
            "CampusBite Password Reset OTP",
            `Hello ${user.name},

Your password reset OTP is ${otp}.

This OTP is valid for 2 minutes.

Thank you,
CampusBite Team`
        );

        if (!result) {
            user.otp = null;
            user.otpExpire = null;
            await user.save();

            return res.status(500).json({
                success: false,
                message: "Email sending failed"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Password reset OTP sent successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= RESET PASSWORD =================

export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        const user = await UserModel.findOne({
            email,
            isVerified: true
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        if (!user.otpExpire || user.otpExpire < new Date()) {
            return res.status(400).json({
                success: false,
                message: "OTP expired"
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.otp = null;
        user.otpExpire = null;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= CHANGE PASSWORD =================

export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Old and new password are required"
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "New password must be at least 6 characters"
            });
        }

        const user = await UserModel.findById(req.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            oldPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect"
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= LOGOUT =================

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        });

        return res.status(200).json({
            success: true,
            message: "Logout successful"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
