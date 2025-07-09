import { NavLink } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { MdViewList } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";

const Sidebar = () => {
  return (
    <div className="sidebar-container w-20 md:w-1/5  lg:w-1/6 min-h-full bg-white text-slate-800 shadow">
      <div className="sidebar-options flex flex-col gap-6 pt-10 pl-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `sidebar-option group flex items-center gap-4 cursor-pointer py-2 px-2
     transition-all duration-200 ${
       isActive ? "bg-icon text-white" : " hover:bg-icon hover:text-white"
     }`
          }
        >
          <RiDashboardFill
            size={24}
            className={`transition duration-200 group-hover:scale-110`}
          />
          <span
            className={`hidden md:inline-block tracking-normal transition-all duration-200 group-hover:tracking-wide`}
          >
            Dashboard
          </span>
        </NavLink>

        <NavLink
          to="/add"
          className={({ isActive }) =>
            `sidebar-option group flex items-center gap-4 cursor-pointer py-2 px-2
     transition-all duration-200 ${
       isActive ? "bg-icon text-white" : " hover:bg-icon hover:text-white"
     }`
          }
        >
          <IoAddCircle
            size={24}
            className={`transition duration-200 group-hover:scale-110`}
          />
          <span
            className={`hidden md:inline-block tracking-normal transition-all duration-200 group-hover:tracking-wide`}
          >
            Add Items
          </span>
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `sidebar-option group flex items-center gap-4 cursor-pointer py-2 px-2
     transition-all duration-200 ${
       isActive ? "bg-icon text-white" : " hover:bg-icon hover:text-white"
     }`
          }
        >
          <MdViewList
            size={24}
            className="transition duration-200 group-hover:scale-110"
          />
          <span className="hidden md:inline-block tracking-normal transition-all duration-200 group-hover:tracking-wide">
            List Items
          </span>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `sidebar-option group flex items-center gap-4 cursor-pointer py-2 px-2
     transition-all duration-200 ${
       isActive ? "bg-icon text-white" : " hover:bg-icon hover:text-white"
     }`
          }
        >
          <FaClipboardList
            size={24}
            className="transition duration-200 group-hover:scale-110"
          />
          <span className="hidden md:inline-block tracking-normal transition-all duration-200 group-hover:tracking-wide">
            Orders
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
