import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";
import ProfileDrawer from "./Profile";

export default function Navbar({ role, onSearch }) {
  const navigate = useNavigate();
  // const user = JSON.parse(localStorage.getItem("user"));
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch && onSearch(e.target.value);
  };

  return (
    <>
      <nav className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between shadow-md">
        {/* Logo */}
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() =>
            role === "admin" ? navigate("/admin") : navigate("/")
          }
        >
          SnapCart
        </div>

        {/* Admin Links */}
        {role === "admin" && (
          <div className="flex items-center gap-6">
            <Link to="/admin/products" className="hover:underline">
              Products
            </Link>
            <Link to="/admin/orders" className="hover:underline">
              Orders
            </Link>
          </div>
        )}

        {/* Search Bar (Only for Users) */}
        {role === "user" && (
          <div className="flex-1 max-w-xl mx-6">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="w-full p-2 text-white outline-none border rounded-xl bg-gray-700"
              />
              <FaSearch className="absolute right-3 top-3 text-white" />
            </div>
          </div>
        )}

        {/* Right Section: Cart + Orders + Profile + Logout */}
        {role && (
          <div className="flex items-center gap-5">
            {role === "user" && (
              <>
                {/* Cart */}
                <div
                  className="relative cursor-pointer"
                  onClick={() => navigate("/cart")}
                >
                  <FaShoppingCart className="text-2xl" />
                </div>

                {/* My Orders */}
                <Link to="/orders" className="hover:underline">
                  My Orders
                </Link>
              </>
            )}

            {/* Profile */}
            <FaUser
              className="text-2xl cursor-pointer"
              onClick={() => navigate("/profile")}
            />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
