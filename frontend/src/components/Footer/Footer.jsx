import React from "react";
import { GrInstagram, FaTwitter, FaFacebook } from "../../assets/icons.js";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer h-72 bg-amber-900 text-amber-50 py-10">
      <div className="footer-content md:max-w-10/12 mx-auto flex items-center justify-between">
        <div className="left flex flex-col gap-2">
          <h1 className="text-orange-500 font-quicksand text-xl md:text-4xl font-bold cursor-default tracking-wide">
            hungrify
          </h1>
          <div className="desc flex flex-col">
            <p className="font-semibold text-xl">Get Hungry. Get Fed.</p>
            <p className="text-base max-w-3/5">
              From street food to fine dining, Hungrify brings hot, fresh meals
              straight to your door — faster than you can say
              <i> “I’m starving.”</i>
            </p>
          </div>
          <div className="social flex items-center gap-x-4 text-xl mt-2">
            <NavLink
              to="https://facebook.com"
              target="_blank"
              className="inline-flex items-center justify-center size-10 bg-white rounded-full cursor-pointer group"
            >
              <FaFacebook className="text-blue-700 group-hover:scale-125 transition duration-300" />
            </NavLink>

            <NavLink
              to="https://instagram.com"
              target="_blank"
              className="inline-flex items-center justify-center size-10 bg-white rounded-full cursor-pointer group"
            >
              <GrInstagram className="text-rose-500 group-hover:scale-125 transition duration-300" />
            </NavLink>

            <NavLink
              to="https://twitter.com"
              target="_blank"
              className="inline-flex items-center justify-center size-10 bg-white rounded-full cursor-pointer group"
            >
              <FaTwitter className="text-sky-500 group-hover:scale-125 transition duration-300" />
            </NavLink>
          </div>
        </div>
        <div className="center">dsfsdfsdf</div>
        <div className="right">sdfsdfsadf</div>
      </div>
    </div>
  );
};

export default Footer;
