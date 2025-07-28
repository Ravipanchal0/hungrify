import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { StoreContext } from "../Context/StoreContext";

const Orders = () => {
  const [filterStatus, setFilterStatus] = useState("All");
  const {
    orders,
    loading,
    error,
    fetchAllOrdersList,
    fetchOrderListByStatus,
    changeOrderStatus,
  } = useContext(StoreContext);

  useEffect(() => {
    (async () => {
      await fetchAllOrdersList();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (filterStatus === "All") {
        fetchAllOrdersList();
      } else {
        fetchOrderListByStatus(filterStatus);
      }
    })();
  }, [filterStatus]);

  const handleChangeStatus = async (e, orderId) => {
    const selectedStatus = e.target.value;
    try {
      await changeOrderStatus(orderId, selectedStatus);
      toast.success("Order status updated!");
    } catch (err) {
      toast.error("Failed to update order status.");
    }
  };

  return (
    <div className="w-full h-full p-5 mb-5">
      {/* Header */}

      <div className="header mb-5 flex justify-between">
        <div className="heading">
          <h3 className="text-2xl font-medium text-gray-800">Orders</h3>
          <p className="text-gray-500 text-sm">
            Hi, Ravi Panchal. Welcome back to Hungrify Admin!
          </p>
        </div>
        <div className="filter">
          <select
            name="status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`md:px-2 md:py-1.5 border rounded-md text-sm focus:outline-none focus:ring-2`}
          >
            {[
              "All",
              "pending",
              "confirmed",
              "preparing",
              "on the way",
              "delivered",
              "cancelled",
            ].map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="main">
        <div className="menu-display">
          <div className="Product-list shadow rounded">
            {/* Header Row */}
            <div className="header grid place-items-start items-center grid-cols-[2fr_2fr_1.5fr_1.5fr_1.2fr_1.5fr] font-medium border-b border-b-gray-300 p-4 bg-slate-100 text-gray-700">
              <div className="">Order Items</div>
              <div className="">Deliver Address</div>
              <div className="">Amount</div>
              <div>Payment Status</div>
              <div>Status</div>
              <div>Action</div>
            </div>

            {/* Data Rows Container */}
            <div className="data overflow-y-auto md:max-h-[64vh]">
              {/* One data row */}
              {orders.map((item) => {
                return (
                  <div
                    key={item._id}
                    className={`data-content grid place-items-start items-center grid-cols-[2fr_2fr_1.5fr_1.5fr_1.2fr_1.5fr] p-4 border-b border-b-gray-200 `}
                  >
                    <div className="items">
                      {item.items.map((food) => (
                        <p key={food._id} className=" text-xs text-gray-700">
                          {food.quantity} x {food.name}
                        </p>
                      ))}
                    </div>
                    <div className="address">
                      <p className="text-xs">{item.deliveryAddress.name}</p>
                      <p className="text-xs text-gray-600">
                        {item.deliveryAddress.phone}
                      </p>
                      <p className="text-xs text-gray-600">
                        {item.deliveryAddress.street},{" "}
                        {item.deliveryAddress.area}
                      </p>
                      <p className="text-xs text-gray-600">
                        {item.deliveryAddress.city},{item.deliveryAddress.state}
                      </p>
                    </div>
                    <div className="amount text-gray-600 text-sm md:text-normal md:ml-2">
                      &#x20B9; {item.totalAmount}
                    </div>
                    <div className="paymentStatus text-gray-600 text-sm md:text-normal md:ml-2">
                      {item.paymentStatus ? "Paid" : "Unpaid"}
                    </div>
                    <div className="text-gray-600 text-sm md:text-normal md:ml-2">
                      {item.status}
                    </div>
                    <div className="status-change">
                      <select
                        disabled={!item.userId}
                        name="status"
                        value={item.status}
                        onChange={(e) => handleChangeStatus(e, item._id)}
                        className={`md:px-2 md:py-1.5 border rounded-md text-sm focus:outline-none focus:ring-2 ${
                          item.status !== "cancelled"
                            ? "border-green-400 ring-green-200"
                            : "border-red-400 ring-red-200"
                        }`}
                      >
                        {[
                          "pending",
                          "confirmed",
                          "preparing",
                          "on the way",
                          "delivered",
                          "cancelled",
                        ].map((status, index) => (
                          <option key={index} value={status}>
                            {status}
                          </option>
                        ))}
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
