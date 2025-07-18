import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { placeOrderApi, markPaymentDone } from "../../api/placeOrderApi";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, user, token, food_list, cartItems } =
    useContext(StoreContext);
  let totalAmount = getTotalCartAmount();
  let taxes = (totalAmount * 0.08).toFixed(2);
  let shippingCharges = totalAmount > 299 ? 0 : totalAmount > 0 ? 49 : 0;
  let totalPayable = Math.round(
    parseFloat(totalAmount) + parseFloat(taxes) + parseFloat(shippingCharges)
  );

  const [deliveryAddress, setdeliveryAddress] = useState({
    name: "",
    phone: "",
    street: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleOnChange = (e) => {
    setdeliveryAddress({ ...deliveryAddress, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    try {
      // 1. Collect items from cart
      let orderItems = [];

      food_list.forEach((item) => {
        if (cartItems[item._id] > 0) {
          orderItems.push({
            ...item,
            quantity: cartItems[item._id],
          });
        }
      });

      // 2. Prepare order data
      const orderData = {
        items: orderItems,
        deliveryAddress,
        totalAmount: parseFloat(totalPayable),
      };

      // 3. Call backend to place order and get Razorpay info
      const res = await placeOrderApi(orderData, token);
      const { razorpayOrderId, key, amount, currency, orderId } = res.data;

      // 4. Razorpay payment options
      const options = {
        key,
        amount,
        currency,
        name: "Hungrify",
        description: "Hungrify Order",
        order_id: razorpayOrderId,
        callback_url: `/verify?success=true&order_id=${orderId}`,
        // handler: async function (res) {
        //   //Razorpay says payment is done — mark order as paid
        //   await markPaymentDone(orderId);

        //   navigate(`/verify?success=true&order_id=${orderId}`);
        // },
        prefill: {
          name: deliveryAddress?.name,
          email: user.email,
          contact: deliveryAddress?.phone,
        },
        theme: { color: "#F37254" },
        modal: {
          ondismiss: function () {
            toast.error("Payment cancelled. Order not placed.", {
              position: "center",
              autoClose: 3000,
              transition: Bounce,
            });
          },
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Order Error:", error);
    }
  };

  return (
    <div className="place-order-page md:max-w-10/12 mx-auto md:my-10 px-3">
      <div className="place-order-content flex flex-col justify-between md:flex-row gap-16">
        <form
          onSubmit={placeOrder}
          className="flex flex-col md:flex-row gap-8 w-full"
        >
          <div className="delivery-address w-full md:w-3/5">
            <h2 className="text-2xl mb-4">Delivery Address</h2>
            <div className="address-details bg-white p-4 rounded shadow">
              <div className="name-phone w-full flex mb-4">
                <div className="name mr-2 flex-1/2">
                  <label className=" block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={deliveryAddress.name}
                    onChange={handleOnChange}
                    className="w-full text-sm border border-gray-300 p-2 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    placeholder="Full name"
                    required
                  />
                </div>
                <div className="phone flex-1/2">
                  <label className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={deliveryAddress.phone}
                    onChange={handleOnChange}
                    className="w-full text-sm border border-gray-300 p-2 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    placeholder="Phone number"
                    required
                  />
                </div>
              </div>
              <div className="address form-group mb-4">
                <div className="address w-full flex mb-4">
                  <div className="flate-house-building flex-1/2 mr-2">
                    <label className="block text-sm font-medium mb-1">
                      Flate, House No., Building, Street
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={deliveryAddress.street}
                      onChange={handleOnChange}
                      className="w-full text-sm border border-gray-300 p-2 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      placeholder="flate, house no."
                      required
                    />
                  </div>
                  <div className="area-colony-street flex-1/2">
                    <label className="block text-sm font-medium mb-1">
                      Area, Colony, Street, Sector, Village
                    </label>
                    <input
                      type="text"
                      name="area"
                      value={deliveryAddress.area}
                      onChange={handleOnChange}
                      className="w-full text-sm border border-gray-300 p-2 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      required
                    />
                  </div>
                </div>
                <div className="landmark-city w-full flex mb-4">
                  <div className="landmark flex-1/2 mr-2">
                    <label className="block text-sm font-medium mb-1">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      value={deliveryAddress.landmark}
                      onChange={handleOnChange}
                      className="w-full text-sm border border-gray-300 p-2 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      placeholder="E.g. near apollo hospital"
                    />
                  </div>
                  <div className="city flex-1/2">
                    <label className="block text-sm font-medium mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={deliveryAddress.city}
                      onChange={handleOnChange}
                      className="w-full text-sm border border-gray-300 p-2 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      placeholder="city"
                      required
                    />
                  </div>
                </div>

                <div className="city-pincode w-full flex mb-4">
                  <div className="state mr-2 flex-1/2">
                    <label className="block text-sm font-medium mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={deliveryAddress.state}
                      onChange={handleOnChange}
                      className="w-full text-sm border border-gray-300 p-2 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      placeholder="state"
                      required
                    />
                  </div>
                  <div className="pincode flex-1/2">
                    <label className="block text-sm font-medium mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={deliveryAddress.pincode}
                      onChange={handleOnChange}
                      className="w-full text-sm border border-gray-300 p-2 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      placeholder="6-digit pincode"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="payment-method w-full md:w-2/5 px-4 ">
            <h2 className="text-2xl mb-4">Payment Details</h2>
            <div className="order-summary">
              <div className="order-details bg-white p-4 rounded shadow">
                <p className="order-summary-title font-medium mb-2">
                  Order Summary
                </p>
                <div className="summary-details">
                  <p className="flex justify-between  text-sm mb-1">
                    Total Amount:
                    <span className="font-semibold">
                      &#x20B9; {totalAmount}
                    </span>
                  </p>
                  <div className="taxes flex justify-between  text-sm mb-1">
                    <p>GST (18%) :</p>
                    <p>
                      &#x20B9;&nbsp;
                      {taxes}
                    </p>
                  </div>
                  <div className="shipping-charges flex justify-between  text-sm border-b border-b-gray-300 pb-1 mb-1">
                    <div>
                      <p>Shipping :</p>
                      <i className="text-xs text-gray-400">
                        {totalAmount > 299
                          ? "(Free delivery above ₹299)"
                          : `(add items worth ${
                              299 - totalAmount
                            } more to free delivery)`}
                      </i>
                    </div>
                    <p>
                      &#x20B9;&nbsp;
                      {shippingCharges.toFixed(2)}
                    </p>
                  </div>
                  <div className="total-detail flex justify-between items-center text-lg font-medium">
                    <p>Amount to pay : </p>
                    <p>
                      &#x20B9;&nbsp;
                      {totalPayable}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded transition"
            >
              Proceed to pay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
