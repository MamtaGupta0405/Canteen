
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerThunk } from "../../Store/User/UserApi";
import { toast } from "react-hot-toast";

import {
    UserRound,
    Mail,
    Lock,
    Phone,
    GraduationCap,
    Eye,
    EyeOff,
    Utensils
} from "lucide-react";

export const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        contactNumber: "",
        role: "student"
    });

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "name") {
            if (/^[a-zA-Z ]*$/.test(value)) {
                setFormData({ ...formData, name: value });
            }
            return;
        }

        if (name === "contactNumber") {
            if (/^\d{0,10}$/.test(value)) {
                setFormData({ ...formData, contactNumber: value });
            }
            return;
        }

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.name.trim().length < 2) {
            toast.error("Please enter a valid name");
            return;
        }

        if (!/^\d{10}$/.test(formData.contactNumber)) {
            toast.error("Phone number must be exactly 10 digits");
            return;
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        try {
            setLoading(true);

            const response = await dispatch(
                registerThunk(formData)
            ).unwrap();

            toast.success(
                response.message || "Registration successful!"
            );

            navigate("/otpVerify", {
                state: {
                    email: formData.email
                }
            });

        } catch (error) {
            toast.error(error || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-orange-50 to-amber-100 px-3 py-5">

            {/* Register Card */}
            <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden border border-orange-100">

                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-5 text-center">

                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-2xl mb-2">
                        <Utensils size={25} className="text-white" />
                    </div>

                    <h1 className="text-2xl font-extrabold text-white">
                        CampusBite
                    </h1>

                    <p className="text-orange-100 text-xs mt-1">
                        Fresh Food, Happy Mood!
                    </p>

                </div>

                {/* Form Content */}
                <div className="px-6 py-5">

                    <div className="text-center mb-5">

                        <h2 className="text-xl font-bold text-gray-800">
                            Create Account
                        </h2>

                        <p className="text-gray-400 text-xs mt-1">
                            Join us and enjoy delicious food
                        </p>

                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3">

                        {/* Name */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Full Name
                            </label>

                            <div className="flex items-center border border-gray-200 rounded-xl px-3 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition">
                                <UserRound size={17} className="text-orange-500 shrink-0" />

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    minLength={2}
                                    className="w-full p-2.5 text-sm outline-none rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Email Address
                            </label>

                            <div className="flex items-center border border-gray-200 rounded-xl px-3 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition">
                                <Mail size={17} className="text-orange-500 shrink-0" />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2.5 text-sm outline-none rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Contact Number
                            </label>

                            <div className="flex items-center border border-gray-200 rounded-xl px-3 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition">
                                <Phone size={17} className="text-orange-500 shrink-0" />

                                <input
                                    type="tel"
                                    name="contactNumber"
                                    placeholder="10 digit mobile number"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    required
                                    maxLength={10}
                                    inputMode="numeric"
                                    className="w-full p-2.5 text-sm outline-none rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Password
                            </label>

                            <div className="flex items-center border border-gray-200 rounded-xl px-3 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition">
                                <Lock size={17} className="text-orange-500 shrink-0" />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Create password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                    className="w-full p-2.5 text-sm outline-none rounded-xl"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-400 hover:text-orange-500"
                                >
                                    {showPassword
                                        ? <EyeOff size={17} />
                                        : <Eye size={17} />
                                    }
                                </button>
                            </div>
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Select Role
                            </label>

                            <div className="flex items-center border border-gray-200 rounded-xl px-3 focus-within:border-orange-500 transition">
                                <GraduationCap size={18} className="text-orange-500" />

                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full p-2.5 text-sm outline-none bg-white rounded-xl"
                                >
                                    <option value="student">Student</option>
                                    <option value="staff">Staff</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-bold py-3 rounded-xl transition shadow-md shadow-orange-200 disabled:opacity-50 mt-2"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>

                    </form>

                    {/* Login */}
                    <div className="text-center mt-5 pt-4 border-t border-gray-100">

                        <p className="text-xs text-gray-500">
                            Already have an account?

                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="text-orange-600 font-bold ml-1 hover:underline"
                            >
                                Login
                            </button>
                        </p>

                    </div>

                </div>
            </div>
        </div>
    );
};
