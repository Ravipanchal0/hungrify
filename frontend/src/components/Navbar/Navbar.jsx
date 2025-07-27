import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import {
  IoBagHandle,
  IoSearch,
  FaSignInAlt,
  AiFillHome,
  MdRestaurantMenu,
} from "../../assets/icons.js";
import { StoreContext } from "../../context/StoreContext.jsx";

const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const { getTotalCartAmount, token, setToken, user, setUser, setCartItems } =
    useContext(StoreContext);
  const total = parseInt(getTotalCartAmount());

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setToken("");
    setUser({});
    setCartItems({});
    navigate("/");
  };

  return (
    <header className="min-w-full sticky top-0 z-100 md:backdrop-blur-md bg-amber-100  md:bg-amber-100/50">
      <div className="flex justify-between items-center p-3 md:py-5 md:max-w-10/12 mx-auto">
        <div className="logo">
          <NavLink to="/">
            <h1 className="text-orange-500 font-quicksand text-xl md:text-2xl font-bold cursor-default tracking-wide">
              hungrify
            </h1>
          </NavLink>
        </div>

        {/* Mobile profile */}
        {token ? (
          <div className="relative">
            <div
              onClick={() => setOpenProfileModal(!openProfileModal)}
              className="peer flex md:hidden justify-center items-center text-2xl font-semibold font-quicksand text-gray-50 size-10 rounded-full bg-amber-500 cursor-pointer"
            >
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            {/* Dropdown Box visible on peer-hover or hover */}
            {openProfileModal && (
              <div className="absolute w-30 right-0 top-13 flex flex-col items-center justify-center gap-y-3 bg-white p-4 shadow-md z-50 rounded">
                {/* Triangle */}
                <div className="w-0 h-0 absolute -top-3 right-2 border-l-[12px] border-l-transparent border-b-[14px] border-b-white border-r-[12px] border-r-transparent"></div>

                <NavLink
                  to="/profile"
                  className="text-gray-700 hover:text-amber-500 transition"
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/myorders"
                  className="text-gray-700 hover:text-amber-500 transition"
                >
                  My Order
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-amber-500 transition cursor-pointer"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowLogin(true)}
            className="sign-in md:hidden"
            title="Sign in"
          >
            <FaSignInAlt
              size={24}
              className="text-[#bc6429] transition duration-150 cursor-pointer hover:transform hover:translate-x-0.5 hover:text-orange-500"
            />
          </button>
        )}
        {/* Mobile Navbar */}
        <div className="md:hidden fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-xs">
          <div className="nav-menu mx-auto rounded-full bg-amber-100/40 backdrop-blur-xs px-3 py-3 shadow">
            <ul className="flex justify-evenly items-center gap-x-3 text-[24px] text-[#7d390c]">
              <Link
                onClick={() => navigate("/")}
                to="home"
                smooth={200}
                offset={-70}
                spy={true}
                className="hover:text-orange-400 hover:transform hover:-translate-y-1 transition duration-300 cursor-pointer"
              >
                <AiFillHome />
              </Link>
              <Link
                onClick={() => navigate("/")}
                to="explore-menu"
                smooth={200}
                offset={-60}
                spy={true}
                className=" hover:text-orange-400 hover:transform hover:-translate-y-1 transition duration-300 cursor-pointer"
              >
                <MdRestaurantMenu />
              </Link>
              <NavLink className="search hover:text-orange-400 hover:transform hover:-translate-y-1 transition duration-300 cursor-pointer">
                <IoSearch />
              </NavLink>
              <NavLink
                to="/cart"
                className="cart relative hover:text-orange-400 hover:transform hover:-translate-y-1 transition duration-300 cursor-pointer"
              >
                <IoBagHandle />
                <div
                  className={
                    !total
                      ? "hidden"
                      : "dot absolute -top-1 -right-1 size-2 rounded-full bg-orange-500"
                  }
                ></div>
              </NavLink>
            </ul>
          </div>
        </div>
        {/* {Desktop Navbar} */}
        <div className="navbar-menu hidden md:flex">
          <ul className="flex items-center gap-x-8 text-[#7d390c]  text-lg">
            <Link
              onClick={() => navigate("/")}
              to="home"
              smooth={true}
              offset={-100}
              duration={500}
              spy={true}
              activeClass="text-orange-400 border-b-2 border-b-orange-400"
              className="hover:transform hover:-translate-y-0.5 hover:text-orange-400 transition duration-200 cursor-pointer hover:border-b-2 hover:border-b-orange-400"
            >
              Home
            </Link>
            <Link
              onClick={() => navigate("/")}
              to="explore-menu"
              smooth={true}
              offset={-70}
              duration={500}
              spy={true}
              activeClass="text-orange-400 border-b-2 border-b-orange-400"
              className="hover:transform hover:-translate-y-0.5 hover:text-orange-400 transition duration-200 cursor-pointer hover:border-b-2 hover:border-b-orange-400"
            >
              Menu
            </Link>
            <Link
              to="mobile-app"
              smooth={true}
              offset={-70}
              duration={500}
              spy={true}
              activeClass="text-orange-400 border-b-2 border-b-orange-400"
              className="hover:transform hover:-translate-y-0.5 hover:text-orange-400 transition duration-200 cursor-pointer hover:border-b-2 hover:border-b-orange-400"
            >
              Mobile-app
            </Link>
            <Link
              to="footer"
              smooth={true}
              offset={-70}
              duration={500}
              spy={true}
              activeClass="text-orange-400 border-b-2 border-b-orange-400"
              className="hover:transform hover:-translate-y-0.5 hover:text-orange-400 transition duration-200 cursor-pointer hover:border-b-2 hover:border-b-orange-400"
            >
              Contact Us
            </Link>
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
          <NavLink to="/cart" className="cart-icon relative" title="Cart">
            <IoBagHandle
              size={22}
              className="text-[#bc6429] hover:text-orange-500 transition duration-150 cursor-pointer"
            />
            <div
              className={
                !total
                  ? "hidden"
                  : "dot absolute -top-1 -right-1 size-2 rounded-full bg-orange-500"
              }
            ></div>
          </NavLink>
          {token ? (
            <div className="relative">
              <div className="peer flex justify-center items-center text-2xl font-semibold font-quicksand text-gray-50 size-10 rounded-full bg-amber-500 cursor-pointer">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>

              {/* Dropdown Box visible on peer-hover or hover */}
              <div className="absolute w-30 right-0 top-13 hidden peer-hover:flex hover:flex flex-col items-center justify-center gap-y-3 bg-white p-4 shadow-md z-50 rounded">
                {/* Triangle */}
                <div className="w-0 h-0 absolute -top-3 right-2 border-l-[12px] border-l-transparent border-b-[14px] border-b-white border-r-[12px] border-r-transparent"></div>

                <NavLink
                  to="/profile"
                  className="text-gray-700 hover:text-amber-500 transition"
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/myorders"
                  className="text-gray-700 hover:text-amber-500 transition"
                >
                  My Order
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-amber-500 transition cursor-pointer"
                >
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="sign-in "
              title="Sign in"
            >
              <FaSignInAlt
                size={24}
                className="text-[#bc6429] transition duration-150 cursor-pointer hover:transform hover:translate-x-0.5 hover:text-orange-500"
              />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
