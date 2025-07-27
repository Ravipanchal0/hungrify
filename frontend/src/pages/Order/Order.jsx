import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import { cancelOrder } from "../../api/userApi";

const Order = () => {
  const { token, fetchMyOrders, myOrders } = useContext(StoreContext);
  useEffect(() => {
    (async () => {
      await fetchMyOrders(token);
    })();
  }, []);
  const handleCancelOrder = async (orderId) => {
    try {
      if (!window.confirm("Are you want to cancel the order?")) return;
      await cancelOrder(token, orderId);
      await fetchMyOrders(token);
      toast.success("Order cancelled successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleTrackOrder = async () => {
    try {
      await fetchMyOrders(token);
    } catch (err) {
      toast.error("Failed to fetch order status.");
    }
  };

  return (
    <div className="orders md:max-w-10/12 mx-auto my-3 md:my-5 px-3">
      <h3 className="text-2xl mb-3">My Orders</h3>
      {!myOrders ? (
        <p>Loading my orders...</p>
      ) : myOrders.length === 0 ? (
        <p>You have no order</p>
      ) : (
        <div className="main-container w-full shadow rounded">
          <div className="header  grid place-items-start items-center grid-cols-[2fr_1.5fr_1.5fr_1.2fr_1.3fr] bg-gray-200 px-4 py-3 border-b border-b-gray-400  font-medium rounded-t-md text-gray-700">
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
                  className="order min-h-14 grid place-items-start items-center grid-cols-[2fr_1.5fr_1.5fr_1.2fr_1.3fr] px-4 py-3 border-b border-b-gray-200"
                >
                  <div className="name self-start">
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
                  <div className="btns flex gap-3">
                    <button
                      disabled={item.status === "delivered"}
                      onClick={() => handleCancelOrder(item._id)}
                      className="action text-sm md:text-normal px-2 py-0.5 md:px-4 md:py-1.5 rounded bg-rose-100 text-rose-600 disabled:text-gray-400 disabled:pointer-events-none cursor-pointer"
                    >
                      cancel
                    </button>
                    <button
                      disabled={item.status === "delivered"}
                      onClick={handleTrackOrder}
                      className="action text-xs px-2 py-0.5 rounded bg-rose-100 text-rose-600 disabled:text-gray-400 disabled:pointer-events-none cursor-pointer"
                    >
                      Track Order
                    </button>
                  </div>
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
