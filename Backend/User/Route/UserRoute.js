
import express from "express";

import {
    register,
    login,
    otpVerify,
    forgotPassword,
    resetPassword,
    changePassword,
    logout
} from "../Controller/UserController.js";

import isAuthorized from "../../Middleware/IsAuthorized.js";

const UserRouter = express.Router();

// Register
UserRouter.post("/register", register);

// Login
UserRouter.post("/login", login);

// OTP Verify
UserRouter.post("/otpVerify", otpVerify);

// Forgot Password
UserRouter.post("/forgotPassword", forgotPassword);

// Reset Password
UserRouter.post("/resetPassword", resetPassword);

// Change Password
UserRouter.post("/changePassword", isAuthorized, changePassword);

// Logout
UserRouter.post("/logout", logout);

export default UserRouter;
