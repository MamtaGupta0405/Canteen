
import React from "react";
import { SlideProfile } from "./SlideProfile";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";

export const Auth = () => {
    const { user, isAuthorized } = useSelector(
        (state) => state.userReducer
    );

    return (
        <div>
            {isAuthorized && user ? (
                <SlideProfile />
            ) : (
                <div className="flex items-center gap-3">
                    <Link
                        to="/login"
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 font-semibold hover:text-orange-500 transition"
                    >
                        <LogIn size={18} />
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-semibold transition"
                    >
                        <UserPlus size={18} />
                        Register
                    </Link>
                </div>
            )}
        </div>
    );
};
