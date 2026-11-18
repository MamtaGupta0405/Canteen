
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordThunk } from "../../Store/User/UserApi";
import { Lock, Eye, EyeOff } from "lucide-react";

export const ChangePassword = () => {

    const dispatch = useDispatch();

    const { loading, error, message } = useSelector(
        (state) => state.userReducer
    );

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await dispatch(
                changePasswordThunk({ oldPassword, newPassword })
            ).unwrap();

            setOldPassword("");
            setNewPassword("");

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
                        Change Password
                    </h2>
                </div>

                <label className="block mb-2 font-medium">
                    Old Password
                </label>

                <div className="relative mb-4">
                    <input
                        type={showOldPassword ? "text" : "password"}
                        placeholder="Enter old password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                        className="w-full border p-3 rounded-lg pr-12"
                    />

                    <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute right-3 top-3"
                    >
                        {showOldPassword ? <EyeOff /> : <Eye />}
                    </button>
                </div>

                <label className="block mb-2 font-medium">
                    New Password
                </label>

                <div className="relative mb-5">
                    <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        minLength={6}
                        className="w-full border p-3 rounded-lg pr-12"
                    />

                    <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-3"
                    >
                        {showNewPassword ? <EyeOff /> : <Eye />}
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg disabled:opacity-50"
                >
                    {loading ? "Updating..." : "Change Password"}
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
