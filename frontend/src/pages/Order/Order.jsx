import React, { useContext, useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { StoreContext } from "../../context/StoreContext";
import { getMyorders } from "../../api/userApi";

const Order = () => {
  const { token, fetchMyOrders, myOrders } = useContext(StoreContext);
  useEffect(() => {
    (async () => {
      await fetchMyOrders(token);
    })();
  }, []);

  const handleCancelOrder = () => {
    console.log("cancel order");
  };

  return (
    <div className="orders md:max-w-10/12 mx-auto md:my-5 px-3">
      <h3 className="text-2xl mb-3">My Orders</h3>
      {!myOrders ? (
        <p>Loading my orders...</p>
      ) : (
        <div className="main-container w-full shadow rounded">
          <div className="header  grid place-items-start items-center grid-cols-[2fr_1.5fr_1.5fr_1.2fr_1fr] bg-gray-200 px-4 py-3 border-b border-b-gray-400  font-medium rounded-t-md text-gray-700">
            <p>Name</p>
            <p>Amount</p>
            <p>Payment Status</p>
            <p>Status</p>
            <p className="">Action</p>
          </div>
          <div className="content">
            {myOrders.map((item) => {
              return (
                <div
                  key={item._id}
                  className="order min-h-14 grid place-items-start items-center grid-cols-[2fr_1.5fr_1.5fr_1.2fr_1fr] px-4 py-3 border-b border-b-gray-200"
                >
                  <div className="namej self-start">
                    {item.items.map((food) => (
                      <p key={food._id} className=" text-xs text-gray-700">
                        {food.quantity} x {food.name}
                      </p>
                    ))}
                  </div>
                  <p className="amount text-gray-600">
                    &#8377; {item.totalAmount.toFixed(2)}
                  </p>
                  <p className="paymentStatus text-gray-600">
                    {item.paymentStatus ? "Paid" : "Unpaid"}
                  </p>
                  <p className="status text-gray-600">{item.status}</p>
                  <button
                    disabled={item.status === "delivered"}
                    onClick={handleCancelOrder}
                    className="action text-rose-600 disabled:text-gray-400 disabled:pointer-events-none cursor-pointer"
                  >
                    cancel
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
