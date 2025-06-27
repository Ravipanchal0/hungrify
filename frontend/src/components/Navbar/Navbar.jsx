import { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  IoBagHandle,
  IoSearch,
  FaSignInAlt,
  AiFillHome,
  MdRestaurantMenu,
} from "../../assets/icons.js";
import { StoreContext } from "../../context/StoreContext.jsx";

const Navbar = () => {
  const { cartItems } = useContext(StoreContext);

  return (
    <header className="min-w-full sticky top-0 z-100 md:backdrop-blur-md bg-amber-100  md:bg-amber-100/50">
      <div className="flex justify-between items-center py-3 md:py-5 md:max-w-10/12 mx-auto">
        <div className="logo">
          <h1 className="text-orange-500 font-quicksand text-xl md:text-2xl font-bold cursor-default tracking-wide">
            hungrify
          </h1>
        </div>
        <div className="md:hidden profile size-8 rounded-full ring-1 ring-[#7d390c]"></div>

        {/* Mobile Navbar */}
        <div className="md:hidden fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-xs">
          <div className="nav-menu mx-auto rounded-full bg-amber-100/40 backdrop-blur-md px-3 py-3 shadow">
            <ul className="flex justify-evenly items-center gap-x-3 text-[24px] text-[#7d390c]">
              <li className="hover:text-orange-400 hover:transform hover:-translate-y-1 transition duration-300 cursor-pointer">
                <AiFillHome />
              </li>
              <li className="hover:text-orange-400 hover:transform hover:-translate-y-1 transition duration-300 cursor-pointer">
                <MdRestaurantMenu />
              </li>
              <li className="hover:text-orange-400 hover:transform hover:-translate-y-1 transition duration-300 cursor-pointer">
                <IoSearch />
              </li>
              <li className="hover:text-orange-400 hover:transform hover:-translate-y-1 transition duration-300 cursor-pointer">
                <IoBagHandle />
              </li>
            </ul>
          </div>
        </div>

        {/* {Desktop Navbar} */}
        <div className="navbar-menu hidden md:flex">
          <ul className="flex items-center gap-x-8 text-[#7d390c]  text-lg">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-400 border-b-2 border-b-orange-400"
                  : "hover:transform hover:-translate-y-0.5 hover:text-orange-400 transition duration-200 cursor-pointer hover:border-b-2 hover:border-b-orange-400"
              }
            >
              Home
            </NavLink>
            <li className="hover:transform hover:-translate-y-0.5 hover:text-orange-400 transition duration-200 cursor-pointer hover:border-b-2 hover:border-b-orange-400">
              Menu
            </li>
            <li className="hover:transform hover:-translate-y-0.5 hover:text-orange-400 transition duration-200 cursor-pointer hover:border-b-2 hover:border-b-orange-400">
              Mobile-app
            </li>
            <li className="hover:transform hover:-translate-y-0.5 hover:text-orange-400 transition duration-200 cursor-pointer hover:border-b-2 hover:border-b-orange-400">
              Contact Us
            </li>
          </ul>
        </div>
        <div className="navbar-right hidden md:flex items-center gap-x-7">
          <div className="search">
            <IoSearch
              size={22}
              className="text-[#bc6429] hover:text-orange-500 transition duration-150 cursor-pointer"
              title="Search"
            />
          </div>
          <div className="cart-icon relative" title="Cart">
            <IoBagHandle
              size={22}
              className="text-[#bc6429] hover:text-orange-500 transition duration-150 cursor-pointer"
            />
            <div
              className={
                cartItems
                  ? "hidden"
                  : "dot absolute -top-1 -right-1 size-2 rounded-full bg-orange-500"
              }
            ></div>
          </div>
          <button className="sign-in " title="Sign in">
            <FaSignInAlt
              size={24}
              className="text-[#bc6429] transition duration-150 cursor-pointer hover:transform hover:translate-x-0.5 hover:text-orange-500"
            />
          </button>
          {/* <div className="profile size-10 rounded-full ring-1 ring-[#7d390c]"></div> */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
