import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutThunk } from "../../Store/User/UserApi";
import {
  UserRound,
  ChevronDown,
  ShoppingBag,
  Heart,
  LogOut,
  LayoutDashboard,
  Users,
  Package,
  Settings,
  Utensils,
  ClipboardList,
  History,
  X,
  Clock,
  Coffee,
} from "lucide-react";

export const SlideProfile = () => {
  const { user, isAuthorized } = useSelector((state) => state.userReducer);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch()

  if (!isAuthorized || !user) return null;

  const role = user.role;

  // Role Based Menu
  const roleData = {
    student: {
      title: "Student Panel",
      color: "orange",
      menus: [
        { name: "My Profile", icon: UserRound, path: "/profile" },
        { name: "My Orders", icon: ShoppingBag, path: "/orders" },
        { name: "Order History", icon: History, path: "/order-history" },
        { name: "Favorites", icon: Heart, path: "/favorites" },
      ],
    },

    staff: {
      title: "Staff Panel",
      color: "blue",
      menus: [
        { name: "My Profile", icon: UserRound, path: "/profile" },
        { name: "Order Food", icon: Coffee, path: "/food" },
        { name: "My Orders", icon: ShoppingBag, path: "/orders" },
        { name: "Order History", icon: History, path: "/order-history" },
      ],
    },

    "canteen owner": {
      title: "Canteen Owner Panel",
      color: "green",
      menus: [
        { name: "My Profile", icon: UserRound, path: "/profile" },
        { name: "Manage Food", icon: Utensils, path: "/manage-food" },
        { name: "Manage Orders", icon: ClipboardList, path: "/manage-orders" },
        { name: "Inventory", icon: Package, path: "/inventory" },
      ],
    },

    admin: {
      title: "Admin Panel",
      color: "purple",
      menus: [
        { name: "My Profile", icon: UserRound, path: "/profile" },
        { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { name: "Manage Users", icon: Users, path: "/manage-users" },
        { name: "Manage Products", icon: Package, path: "/manage-products" },
        { name: "Manage Orders", icon: ClipboardList, path: "/manage-orders" },
        { name: "Settings", icon: Settings, path: "/settings" },
      ],
    },
  };

  const currentRole = roleData[role];

  if (!currentRole) return null;

  // Colors
  const colorClasses = {
    orange: "bg-orange-500 hover:bg-orange-600",
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    purple: "bg-purple-600 hover:bg-purple-700",
  };

  const hoverClasses = {
    orange: "hover:bg-orange-50",
    blue: "hover:bg-blue-50",
    green: "hover:bg-green-50",
    purple: "hover:bg-purple-50",
  };

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    // Yahan logoutThunk dispatch karna
    dispatch(logoutThunk())
    setOpen(false);

  };

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3 py-2 rounded-full transition"
      >
        <div
          className={`w-10 h-10 ${colorClasses[currentRole.color]} rounded-full flex items-center justify-center text-white`}
        >
          <UserRound size={22} />
        </div>

        <div className="hidden sm:block text-left">
          <p className="font-bold text-sm text-gray-800">{user.name}</p>

          <p className="text-xs text-gray-500 capitalize">{role}</p>
        </div>

        <ChevronDown
          size={18}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          <div className="absolute right-0 top-14 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
            {/* Header */}
            <div
              className={`${colorClasses[currentRole.color]} p-5 text-white`}
            >
              <div className="flex justify-between items-center">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                  <UserRound size={30} />
                </div>

                <button onClick={() => setOpen(false)}>
                  <X size={21} />
                </button>
              </div>

              <h2 className="text-lg font-bold mt-3">{user.name}</h2>

              <p className="text-sm opacity-90">{user.email}</p>

              <span className="inline-block mt-3 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
                {currentRole.title}
              </span>
            </div>

            {/* Role Based Menu */}
            <div className="p-3 space-y-1">
              {currentRole.menus.map((menu, index) => {
                const Icon = menu.icon;

                return (
                  <button
                    key={index}
                    onClick={() => handleNavigate(menu.path)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-gray-700 transition ${hoverClasses[currentRole.color]}`}
                  >
                    <Icon size={19} />

                    <span className="font-medium text-sm">{menu.name}</span>
                  </button>
                );
              })}

              <hr className="my-2" />

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition font-semibold"
              >
                <LogOut size={19} />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
