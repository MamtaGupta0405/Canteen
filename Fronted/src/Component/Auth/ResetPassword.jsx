
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPasswordThunk } from "../../Store/User/UserApi";
import { Lock, Eye, EyeOff } from "lucide-react";

export const ResetPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { loading, error, message } = useSelector(
        (state) => state.userReducer
    );

    const [email, setEmail] = useState(
        location.state?.email || ""
    );

    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await dispatch(
                resetPasswordThunk({
                    email,
                    otp,
                    newPassword
                })
            ).unwrap();

            setOtp("");
            setNewPassword("");

            navigate("/login");

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
            >

                <div className="text-center mb-6">
                    <Lock size={40} className="mx-auto text-blue-600 mb-3" />

                    <h2 className="text-2xl font-bold">
                        Reset Password
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Enter your OTP and create a new password.
                    </p>
                </div>

                <label className="block mb-2 font-medium">
                    Email
                </label>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border p-3 rounded-lg mb-4"
                />

                <label className="block mb-2 font-medium">
                    OTP
                </label>

                <input
                    type="text"
                    placeholder="Enter 6 digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    maxLength={6}
                    className="w-full border p-3 rounded-lg mb-4"
                />

                <label className="block mb-2 font-medium">
                    New Password
                </label>

                <div className="relative mb-5">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        minLength={6}
                        className="w-full border p-3 rounded-lg pr-12"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3"
                    >
                        {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg disabled:opacity-50"
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </button>

                {error && (
                    <p className="text-red-500 mt-3 text-center">
                        {error}
                    </p>
                )}

                {message && (
                    <p className="text-green-600 mt-3 text-center">
                        {message}
                    </p>
                )}

            </form>
        </div>
    );
};
