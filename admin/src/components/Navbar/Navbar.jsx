import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets.js"; // Adjust the import path as necessary

const Navbar = () => {
  return (
    <div className="navbar-container z-50 flex items-center justify-between px-6 md:px-8 py-1.5 bg-white shadow">
      <div className="logo">
        <h1 className="logo-text text-xl md:text-3xl text-orange-500 font-bold font-quicksand">
          hungrify
        </h1>
        <p className="logo-subtext text-sm text-gray-700">Admin Panel</p>
      </div>
      <div className="profile">
        <div className="image size-8 md:size-11 rounded-full overflow-hidden">
          <img src={assets.profile_image} alt="Profile" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
