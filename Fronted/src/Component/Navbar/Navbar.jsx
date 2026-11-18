
import React, { useState } from "react";
import { Search, UtensilsCrossed, ShoppingCart } from "lucide-react";
import { Auth } from "../Auth/Auth";

export const Navbar = () => {
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();

        if (search.trim()) {
            console.log("Searching:", search);
        }
    };

    return (
        <nav className="w-full bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">

                {/* Logo */}
                <div className="flex items-center gap-2 cursor-pointer">
                    <div className="bg-orange-500 p-2 rounded-xl">
                        <UtensilsCrossed size={25} className="text-white" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-800">
                            Campus<span className="text-orange-500">Bite</span>
                        </h1>
                        <p className="text-xs text-gray-500">
                            Fresh Food, Happy Campus!
                        </p>
                    </div>
                </div>

                {/* Search Bar */}
                <form
                    onSubmit={handleSearch}
                    className="hidden md:flex items-center flex-1 max-w-xl bg-gray-100 rounded-full px-4 py-2 border border-gray-200 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100"
                >
                    <Search size={20} className="text-gray-500" />

                    <input
                        type="text"
                        placeholder="Search food, snacks, drinks..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-transparent outline-none px-3 text-sm text-gray-700"
                    />

                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition"
                    >
                        Search
                    </button>
                </form>

                {/* Right Side */}
                <div className="flex items-center gap-5">
                    <button className="relative text-gray-700 hover:text-orange-500 transition">
                        <ShoppingCart size={25} />
                    </button>

                    <Auth />
                </div>

            </div>
        </nav>
    );
};
