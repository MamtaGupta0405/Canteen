
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        contactNumber: {
            type: String,
            required: true
        },

        otp: {
            type: String,
            default: null
        },

        otpExpire: {
            type: Date,
            default: null
        },

        isVerified: {
            type: Boolean,
            default: false
        },

        role: {
            type: String,
            enum: ["student", "staff", "canteen owner", "admin"],
            default: "student",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
