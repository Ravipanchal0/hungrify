import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { fetchMenuItems } from "../controller/itemController.js";
import { MdDelete } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";

import { assets } from "../assets/assets.js";

const Products = () => {
  const [list, setList] = useState([]);

  const fetchMenu = async () => {
    const response = await fetchMenuItems();
    if (response) {
      setList(response.data);
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
      <div className="menu-display overflow-y-auto">
        <div class="relative overflow-x-auto shadow-md sm:rounded-md">
          {/* <table class="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-white border-b border-b-gray-500">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Image
                </th>
                <th scope="col" class="px-6 py-3">
                  Food name
                </th>
                <th scope="col" class="px-6 py-3">
                  Category
                </th>
                <th scope="col" class="px-6 py-3">
                  Price
                </th>
                <th scope="col" class="px-6 py-3">
                  Discount(%)
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="overflow-auto">
              {!list.length && (
                <div className="text-2xl m-22">
                  <p className="text-gray-800">Sorry!</p>
                  <p className="text-sm">No menus available</p>
                </div>
              )}
              {list.map((item) => {
                return (
                  <tr key={item._id} class=" bg-white border-b border-gray-200">
                    <th scope="row" class="p-4">
                      <img src={item.image} alt={item.name} width={100} />
                    </th>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item.name}
                    </th>
                    <td class="px-6 py-4">{item.category}</td>
                    <td class="px-6 py-4">&#x20B9;{item.price}</td>
                    <td class="px-6 py-4">{item.discount}%</td>
                    <td class="px-6 py-4 flex items-center">
                      <NavLink
                        to="#"
                        class="font-medium text-gray-500 hover:underline"
                      >
                        <MdEditSquare size={24} />
                      </NavLink>
                      <NavLink
                        to="#"
                        class="font-medium text-red-500 hover:underline"
                      >
                        <MdDelete size={24} />
                      </NavLink>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table> */}

          <div className="Product-list">
            {/* Header Row */}
            <div className="header grid grid-cols-layout font-bold border-b py-3 bg-gray-100">
              <p>Image</p>
              <p>Name</p>
              <p>Price</p>
              <p>Discount</p>
              <p>Category</p>
              <p>Action</p>
            </div>

            {/* Data Rows Container */}
            <div className="data overflow-y-auto max-h-[80vh]">
              {/* One data row */}
              <div className="data-content grid grid-cols-layout items-center gap-4 py-4 border-b">
                <img
                  src="https://via.placeholder.com/80"
                  alt="product"
                  className="w-24 h-16 object-cover"
                />
                <p>Cool T-Shirt</p>
                <p>$19.99</p>
                <p>10%</p>
                <p>Clothing</p>
                <div className="action flex gap-3">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </div>
              </div>

              {/* Another data row (repeat as needed) */}
              <div className="data-content grid grid-cols-layout items-center gap-4 py-4 border-b">
                <img
                  src="https://via.placeholder.com/80"
                  alt="product"
                  className="w-24 h-16 object-cover"
                />
                <p>Classic Jeans</p>
                <p>$39.99</p>
                <p>15%</p>
                <p>Denim</p>
                <div className="action flex gap-3">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
