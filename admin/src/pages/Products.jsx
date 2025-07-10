import React, { useState } from "react";
import { useEffect } from "react";
import { fetchMenuItems } from "../controller/itemController.js";

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
      <h3 className="text-2xl mb-4">Menus</h3>
      <div className="menu-display overflow-y-auto">
        <div class="relative overflow-x-auto shadow-md sm:rounded-md">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500">
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
                    <td class="px-6 py-4 ">
                      <a
                        href="#"
                        class="mr-4 font-medium text-blue-600 hover:underline"
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        class="font-medium text-blue-600 hover:underline"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
