import {
  GrInstagram,
  FaTwitter,
  FaFacebook,
  FaArrowRightLong,
} from "../../assets/icons.js";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div id="footer" className="footer bg-amber-900 text-amber-50 mt-5">
      <div className="footer-content md:max-w-10/12 mx-auto flex flex-col md:flex-row justify-between gap-y-10 mb-8 px-3 py-5 md:py-12">
        <div className="left flex flex-col md:gap-2">
          <h1 className="text-orange-500 font-quicksand text-4xl font-bold cursor-default tracking-wide">
            hungrify
          </h1>
          <div className="desc flex flex-col mt-1.5">
            <p className="font-semibold text-xl">Get Hungry. Get Fed.</p>
            <p className="text-base max-w-3/5">
              From street food to fine dining, Hungrify brings hot, fresh meals
              straight to your door — faster than you can say
              <i> “I’m starving.”</i>
            </p>
          </div>
          <div className="social flex items-center gap-x-4 text-xl mt-5">
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
              className="inline-flex items-center justify-center  size-10 bg-white rounded-full cursor-pointer group"
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
        <div className="center">
          <nav>
            <ul className="flex justify-between flex-col gap-2 md:gap-3 text-base">
              <NavLink
                to="#"
                className=" hover:text-amber-200 transition duration-150 cursor-pointer"
              >
                Home
              </NavLink>
              <NavLink
                to="#"
                className=" hover:text-amber-200 transition duration-150 cursor-pointer"
              >
                About Us
              </NavLink>
              <NavLink
                to="#"
                className=" hover:text-amber-200 transition duration-150 cursor-pointer"
              >
                Delivery
              </NavLink>
              <NavLink
                to="#"
                className=" hover:text-amber-200 transition duration-150 cursor-pointer"
              >
                Privacy Policy
              </NavLink>
            </ul>
          </nav>
        </div>
        <div className="right flex flex-col gap-1">
          <h2 className="font-medium text-lg flex gap-1 items-center group">
            GET IN TOUCH
            <span>
              <FaArrowRightLong className="group-hover:translate-x-2 transition duration-300" />
            </span>
          </h2>
          <ul className="flex flex-col justify-between gap-1 text-base">
            <li>contact@hungrify.com</li>
            <li>+91 &nbsp;98234-23483</li>
          </ul>
        </div>
      </div>
      <hr className="separation-line my-3" />
      <p className="footer-copyright text-center py-3 text-base">
        Copyright 2025 &copy; hungrify.com - All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
