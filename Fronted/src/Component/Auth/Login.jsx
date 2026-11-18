import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Utensils, Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";

import { loginThunk } from "../../Store/User/UserApi";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await dispatch(loginThunk(formData)).unwrap();

      toast.success(response.message || "Login successful!");

      navigate("/");
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-orange-500 p-4 rounded-2xl text-white mb-4">
            <Utensils size={32} />
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Campus<span className="text-orange-500">Bite</span>
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back! Login to your account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>

            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={19}
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full border border-gray-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={19}
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full border border-gray-200 rounded-xl py-3 pl-12 pr-12 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              to="/forgotPassword"
              className="text-sm font-semibold text-orange-500 hover:text-orange-600"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition"
          >
            <LogIn size={19} />
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-600 mt-7 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-orange-500 font-bold hover:text-orange-600"
          >
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};
