
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { otpVerifyThunk } from "../../Store/User/UserApi";
import { toast } from "react-hot-toast";
import { ShieldCheck, Mail, ArrowRight, UtensilsCrossed } from "lucide-react";

export const OtpVerify = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || "";

    const [otp, setOtp] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (otp.length !== 6) {
            return toast.error("Please enter 6 digit OTP");
        }

        try {
            const response = await dispatch(
                otpVerifyThunk({ email, otp })
            ).unwrap();

            toast.success(response.message || "OTP verified successfully!");

            navigate("/login");

        } catch (error) {
            toast.error(error || "OTP verification failed");
        }
    };

    return (
        <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

                {/* Logo */}
                <div className="text-center">

                    <div className="inline-flex items-center justify-center bg-orange-100 p-4 rounded-2xl">
                        <UtensilsCrossed
                            size={35}
                            className="text-orange-500"
                        />
                    </div>

                    <h1 className="text-3xl font-extrabold text-gray-800 mt-3">
                        Campus<span className="text-orange-500">Bite</span>
                    </h1>

                    <p className="text-gray-500 text-sm mt-2">
                        Fresh Food, Happy Campus!
                    </p>

                </div>

                {/* OTP Icon */}
                <div className="flex justify-center mt-8">
                    <div className="bg-orange-100 p-5 rounded-full">
                        <ShieldCheck
                            size={45}
                            className="text-orange-500"
                        />
                    </div>
                </div>

                {/* Heading */}
                <div className="text-center mt-5">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Verify Your Email
                    </h2>

                    <p className="text-gray-500 text-sm mt-2">
                        Enter the 6-digit OTP sent to your email address.
                    </p>
                </div>

                {/* Email */}
                <div className="flex items-center justify-center gap-2 bg-orange-50 p-3 rounded-xl mt-5">
                    <Mail size={18} className="text-orange-500" />

                    <span className="text-sm font-medium text-gray-700 break-all">
                        {email || "Email not found"}
                    </span>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-6">

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Enter OTP
                    </label>

                    <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="Enter 6 digit OTP"
                        value={otp}
                        onChange={(e) =>
                            setOtp(e.target.value.replace(/\D/g, ""))
                        }
                        className="w-full border-2 border-gray-200 focus:border-orange-500 rounded-xl p-4 text-center text-2xl tracking-[12px] font-bold outline-none transition"
                    />

                    <button
                        type="submit"
                        disabled={!email || otp.length !== 6}
                        className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-bold py-3 rounded-xl mt-6 transition"
                    >
                        Verify OTP
                        <ArrowRight size={20} />
                    </button>

                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Already verified?
                    <button
                        onClick={() => navigate("/login")}
                        className="text-orange-500 font-bold ml-1"
                    >
                        Login Now
                    </button>
                </p>

            </div>

        </div>
    );
};
