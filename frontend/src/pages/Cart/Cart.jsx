import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { IoMdAdd, IoMdRemove, MdDelete } from "../../assets/icons.js";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets.js";
import { LoginModal } from "../../components/index.js";

const Cart = () => {
  const [couponAmount, setCouponAmount] = useState(0);
  const navigate = useNavigate();
  const {
    cartItems,
    food_list,
    addToCart,
    removeFromCart,
    deleteFromCart,
    getTotalCartAmount,
    showLogin,
    setShowLogin,
    token,
  } = useContext(StoreContext);
  let totalAmount = getTotalCartAmount();
  let totalPayable = Math.round(
    parseFloat(totalAmount) - parseFloat(couponAmount)
  );

  return totalAmount > 0 ? (
    <div className="cart-page md:max-w-10/12 mx-auto md:my-10 px-3">
      <div className="cart-items">
        <div className="cart-items-title grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] text-center font-medium text-lg border-b md:border-b-2 border-orange-500 px-2 py-3">
          <p className="text-start">Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div
                key={item._id}
                className="cart-item grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-center p-2 border-b border-b-gray-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 rounded object-cover"
                />
                <p>{item.name}</p>
                <p>&#x20B9; {item.price}</p>
                <div className="quantity flex items-center justify-center gap-x-2">
                  <button
                    className="rounded border-2 border-icon p-1"
                    onClick={() => removeFromCart(item._id)}
                  >
                    <IoMdRemove className="text-icon" />
                  </button>
                  <span>{cartItems[item._id]}</span>
                  <button
                    className="rounded border-2 border-icon p-1"
                    onClick={() => addToCart(item._id)}
                  >
                    <IoMdAdd className="text-icon" />
                  </button>
                </div>
                <p>&#x20B9; {item.price * cartItems[item._id]}</p>
                <button
                  onClick={() => deleteFromCart(item._id)}
                  className="flex items-center justify-center p-1"
                >
                  <MdDelete className="text-icon text-2xl cursor-pointer hover:text-orange-600" />
                </button>
              </div>
            );
          }
        })}
      </div>
      <hr className="my-4 h-0.5 border-none bg-gray-300" />
      <div className="cart-footer mt-8 my-3 p-2 ">
        <div className="cart-payment-detail flex flex-col md:flex-row md:justify-between md:items-baseline md:gap-x-24 gap-y-8 md:gap-y-0 mb-10">
          <div className="cart-total md:flex-3/6">
            <p className="text-lg font-medium">Cart Total:</p>
            <div className="cart-total-details ml-1 flex flex-col gap-y-1 mt-2">
              <div className="subtotal-details flex justify-between  text-sm mb-1">
                <p>Subtotal :</p>
                <p>
                  &#x20B9;&nbsp;
                  {totalAmount}
                </p>
              </div>
              <div className="coupon-amount flex justify-between  text-sm mb-1">
                <p className="text-sm text-gray-600 mb-1">Coupon Discount :</p>
                <p className="text-sm text-gray-600 mb-1">- &#x20B9; 0.00</p>
              </div>

              <hr className="my-1" />
              <div className="total-detail flex justify-between items-center text-lg font-medium">
                <p>Amount to pay : </p>
                <p>
                  &#x20B9;&nbsp;
                  {totalPayable.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="coupon flex justify-between items-end text-sm">
            <div className="coupon-input  flex flex-col gap-y-6">
              <p>If you have a coupon code, apply it here:</p>
              <input
                type="text"
                placeholder="Enter coupon code"
                className="inset-shadow-2xs p-1.5 border-b border-b-orange-700 focus:border-b-white focus:rounded  md:mr-4 outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
              />
            </div>
            <button className="bg-orange-500 text-white px-2 py-2 rounded hover:bg-orange-600">
              Apply Coupon
            </button>
          </div>
        </div>
        <div className="checkout w-full flex justify-center md:justify-end my-8">
          <button
            onClick={() => navigate("/checkout")}
            className="w-72 px-3 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 cursor-pointer"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  ) : (
    <>
      {showLogin && <LoginModal />}
      <div className="empty-cart flex flex-col gap-y-8 items-center flex-1/2 text-center py-5">
        <div className="img flex flex-col justify-center items-center gap-y-2">
          <img src={assets.empty_cart} alt="" className="max-w-56" />
          <p className="text-xl text-gray-600 font-medium">
            Your hungrify cart is empty
          </p>
        </div>
        {!token && (
          <div className="authentication flex flex-col items-center gap-y-2 w-64">
            <button
              onClick={() => setShowLogin(true)}
              className="w-full py-2 rounded-full bg-amber-500 cursor-pointer hover:bg-amber-500/90 text-white transition duration-150"
            >
              Sign in to your account
            </button>
            <button
              onClick={() => setShowLogin(true)}
              className="w-full py-1.5 rounded-full border-2 border-amber-500 cursor-pointer hover:bg-amber-500/30  transition duration-150"
            >
              Sign up now
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
