import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  let totalAmount = getTotalCartAmount();
  let taxes = (totalAmount * 0.08).toFixed(2);
  let shippingCharges = totalAmount > 299 ? 0 : totalAmount > 0 ? 49 : 0;
  let totalPayable = Math.round(
    parseFloat(totalAmount) + parseFloat(taxes) + parseFloat(shippingCharges)
  );
  return (
    <div className="place-order-page md:max-w-10/12 mx-auto md:my-10 px-3">
      <div className="place-order-content flex flex-col justify-between md:flex-row gap-16">
        <div className="delivery-address w-full md:w-3/5">
          <h2 className="text-2xl mb-4">Delivery Address</h2>
          <div className="address-details bg-white p-4 rounded shadow">
            <form>
              <div className="name-phone w-full flex mb-4">
                <div className="name mr-2 flex-1/2">
                  <label className=" block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
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
                      className="w-full text-sm border border-gray-300 p-2 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      placeholder="6-digit pincode"
                      required
                    />
                  </div>
                </div>
              </div>

              <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                Save Address
              </button>
            </form>
          </div>
        </div>
        <div className="payment-method w-full md:w-2/5 px-4 ">
          <h2 className="text-2xl mb-4">Payment Method</h2>
          <div className="order-summary">
            <div className="order-details bg-white p-4 rounded shadow">
              <p className="order-summary-title font-medium mb-2">
                Order Summary
              </p>
              <div className="summary-details">
                <p className="flex justify-between  text-sm mb-1">
                  Total Amount:
                  <span className="font-semibold">&#x20B9; {totalAmount}</span>
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
          <form
            // onSubmit={handleSubmit}
            className="payment-method-details bg-white p-6 rounded shadow-md space-y-4"
          >
            <p className="text-sm text-gray-600">
              Please select your preferred payment method:
            </p>

            <div className="payment-options flex flex-col gap-3">
              <label
                htmlFor="card"
                className="flex items-center gap-2 p-3 border rounded-md shadow cursor-pointer hover:bg-gray-50 transition"
              >
                <input
                  type="radio"
                  name="payment"
                  id="card"
                  value="Card"
                  // checked={selectedMethod === "Card"}
                  // onChange={handleChange}
                  className="w-4 h-4 accent-orange-600 bg-gray-100 border-gray-300 "
                />
                Credit / Debit Card
              </label>

              <label
                htmlFor="netbanking"
                className="flex items-center gap-2 p-3 border rounded-md shadow cursor-pointer hover:bg-gray-50 transition"
              >
                <input
                  type="radio"
                  name="payment"
                  id="netbanking"
                  value="Net Banking"
                  // checked={selectedMethod === "Net Banking"}
                  // onChange={handleChange}
                  className="w-4 h-4 accent-orange-600 bg-gray-100 border-gray-300 "
                />
                Net Banking
              </label>

              <label
                htmlFor="upi"
                className="flex items-center gap-2 p-3 border rounded-md shadow cursor-pointer hover:bg-gray-50 transition"
              >
                <input
                  type="radio"
                  name="payment"
                  id="upi"
                  value="UPI"
                  // checked={selectedMethod === "UPI"}
                  // onChange={handleChange}
                  className="w-4 h-4 accent-orange-600 bg-gray-100 border-gray-300"
                />
                UPI
              </label>
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded transition"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
