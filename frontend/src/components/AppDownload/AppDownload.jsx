import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const AppDownload = () => {
  return (
    <div
      id="mobile-app"
      className=" flex flex-col justify-center items-center my-10 md:16 lg:my-20"
    >
      <p className=" text-2xl md:text-4xl lg:text-5xl text-center mb-4 lg:mb-8 font-medium md:leading-12 lg:leading-16">
        For Better Experience Download <br />
        <span className="text-orange-600 italic mx-3">hungrify</span> App
      </p>
      <div className="link flex items-center gap-x-5">
        <NavLink
          to="#"
          className="cursor-pointer hover:scale-90 transition duration-200"
        >
          <img src={assets.app_store} alt="" className="w-30 scale-95" />
        </NavLink>
        <NavLink
          to="#"
          className="cursor-pointer hover:scale-90 transition duration-200"
        >
          <img src={assets.play_store} alt="" className="w-30" />
        </NavLink>
      </div>
    </div>
  );
};

export default AppDownload;
