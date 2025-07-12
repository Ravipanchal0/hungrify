import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  fetchMenuItems,
  deleteMenuItem,
  updateMenuAvailability,
} from "../controller/itemController.js";
import { MdDelete } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";

import { toast } from "react-toastify";

const Products = () => {
  const [list, setList] = useState([]);

  const fetchMenu = async () => {
    const response = await fetchMenuItems();
    if (response) {
      setList(response.data);
    }
  };

  const handleAvailabilityChange = async (e, itemId) => {
    const newAvailability = e.target.value;

    // Call backend
    const response = await updateMenuAvailability(itemId, newAvailability);

    if (response.success) {
      toast.success("Availability updated");
      fetchMenu();
    } else {
      toast.error("Failed to update availability");
      fetchMenu();
    }
  };

  const handleEdit = (itemId) => {
    console.log(itemId);
    console.log(availability);
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await deleteMenuItem(itemId);

      if (response.success) {
        toast.success("Item deleted successfully.");
        fetchMenu();
      } else {
        toast.error("Could not delete the item.");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div className="w-full p-5">
      <div className="header mb-5">
        <h3 className="text-2xl font-medium text-gray-800">Menus</h3>
        <p className="text-gray-500 text-sm">
          Hi, Ravi Panchal. Welcome back to Hungrify Admin!
        </p>
      </div>
      <div className="menu-display">
        <div className="Product-list shadow rounded">
          {/* Header Row */}
          <div className="header grid grid-cols-[2.5fr_2fr_1.5fr_1.2fr_1.2fr_1fr_1.5fr] font-medium border-b border-b-gray-300 p-4 bg-slate-100 text-gray-700">
            <div className="">Image</div>
            <div className="">Name</div>
            <div className="">Category</div>
            <div>Price</div>
            <div>Discount</div>
            <div>Action</div>
            <div>Avaibility</div>
          </div>

          {/* Data Rows Container */}
          <div className="data overflow-y-auto max-h-[64vh]">
            {/* One data row */}
            {list.map((item) => {
              return (
                <div
                  key={item._id}
                  className={`data-content grid grid-cols-[2.5fr_2fr_1.5fr_1.2fr_1.2fr_1fr_1.5fr] items-center p-4 border-b border-b-gray-200 ${
                    !item.isAvailable ? "bg-red-50 text-gray-500" : ""
                  }`}
                >
                  <div className="img">
                    <img
                      src={item.image}
                      alt="product"
                      className="max-w-22 object-cover rounded"
                    />
                  </div>
                  <div className="text-gray-800 ml-1">{item.name}</div>
                  <div className="text-gray-600 ml-2">{item.category}</div>
                  <div className="text-gray-600 ml-2">
                    &#x20B9; {item.price}
                  </div>
                  <div className="text-gray-600 ml-2">{item.discount}</div>
                  <div className="action flex gap-x-5 ml-2">
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="text-blue-500 text-2xl cursor-pointer hover:text-blue-400"
                    >
                      <MdEditSquare />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 text-2xl cursor-pointer hover:text-red-400"
                    >
                      <MdDelete />
                    </button>
                  </div>
                  <div className="availability">
                    <select
                      name="isAvailable"
                      value={item.isAvailable}
                      onChange={(e) => handleAvailabilityChange(e, item._id)}
                      className={`px-2 py-1.5 border rounded-md text-sm focus:outline-none focus:ring-2 ${
                        item.isAvailable
                          ? "border-green-400 ring-green-200"
                          : "border-red-400 ring-red-200"
                      }`}
                    >
                      <option value="true">Available</option>
                      <option value="false">Not Available</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
