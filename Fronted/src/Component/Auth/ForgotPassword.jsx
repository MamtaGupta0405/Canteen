
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPasswordThunk } from "../../Store/User/UserApi";

export const ForgotPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, message } = useSelector(
        (state) => state.userReducer
    );

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await dispatch(forgotPasswordThunk({ email })).unwrap();

            navigate("/resetPassword", {
                state: { email }
            });

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-lg w-96"
            >

                <h2 className="text-2xl font-bold text-center mb-6">
                    Forgot Password
                </h2>

                <label className="block mb-2 font-medium">
                    Email
                </label>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-3 rounded-lg mb-4"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg"
                >
                    {loading ? "Sending..." : "Send OTP"}
                </button>

                {error && (
                    <p className="text-red-500 mt-3">{error}</p>
                )}

                {message && (
                    <p className="text-green-600 mt-3">{message}</p>
                )}

            </form>
        </div>
    );
};
