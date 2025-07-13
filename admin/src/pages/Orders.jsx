import React, { useState } from "react";

const Orders = () => {
  const [list, setList] = useState([]);
  return (
    <div className="w-full h-full p-5">
      {/* Header */}

      <div className="header mb-5">
        <h3 className="text-2xl font-medium text-gray-800">Orders</h3>
        <p className="text-gray-500 text-sm">
          Hi, Ravi Panchal. Welcome back to Hungrify Admin!
        </p>
      </div>
      <div className="main">
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
            <div className="data overflow-y-auto md:max-h-[64vh]">
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
                        className="max-w-12 md:max-w-22 object-cover rounded"
                      />
                    </div>
                    <div className="text-gray-800 text-sm md:text-normal md:ml-1">
                      {item.name}
                    </div>
                    <div className="text-gray-600 text-sm md:text-normal md:ml-2">
                      {item.category}
                    </div>
                    <div className="text-gray-600 text-sm md:text-normal md:ml-2">
                      &#x20B9; {item.price}
                    </div>
                    <div className="text-gray-600 text-sm md:text-normal md:ml-2">
                      {item.discount}
                    </div>
                    <div className="action flex gap-x-2 md:gap-x-5 md:ml-2">
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
                        className={`md:px-2 md:py-1.5 border rounded-md text-sm focus:outline-none focus:ring-2 ${
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
    </div>
  );
};

export default Orders;
