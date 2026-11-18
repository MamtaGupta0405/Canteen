
import { createBrowserRouter } from "react-router-dom";

import { Register } from "../Component/Auth/Register";
import { Login } from "../Component/Auth/Login";
import { OtpVerify } from "../Component/Auth/OtpVerify";
import { ForgotPassword } from "../Component/Auth/ForgotPassword";
import { ResetPassword } from "../Component/Auth/ResetPassword";
import { ChangePassword } from "../Component/Auth/ChangePassword";
import { Home } from "../Component/Home";

const Authrouter = [
     {path:"/",
            element:<Home/>
        },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/otpVerify",
        element: <OtpVerify />
    },
    {
        path: "/forgotPassword",
        element: <ForgotPassword />
    },
    {
        path: "/resetPassword",
        element: <ResetPassword />
    },
    {
        path: "/changePassword",
        element: <ChangePassword />
    }
];

export default Authrouter;
