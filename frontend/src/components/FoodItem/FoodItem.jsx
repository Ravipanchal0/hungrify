import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext.jsx";

const FoodItem = (item) => {
  const { _id, name, discount_price, main_price, description, image } =
    item.item;

  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className="food-item  rounded-xl flex flex-col md:justify-between p-1 md:p-2 shadow group">
      <div className="food-image relative rounded-xl overflow-hidden transition duration-200">
        <img
          src={image}
          alt=""
          className="rounded-xl group-hover:scale-125 transition duration-300 w-36 md:w-full"
        />
        <div className="counter-btn absolute bottom-1 right-2">
          {cartItems[_id] ? (
            <div className="flex items-center gap-x-2 justify-center bg-white p-1 rounded-full">
              <button className="sub flex justify-center items-center">
                <img
                  src={assets.remove_icon_red}
                  alt=""
                  className="w-4 md:w-7 cursor-pointer hover:scale-90 "
                  onClick={() => removeFromCart(_id)}
                />
              </button>
              <p className="count text-sm md:text-lg font-medium text-icon px-0.5">
                {cartItems[_id]}
              </p>
              <button className="add">
                <img
                  src={assets.add_icon_green}
                  alt=""
                  className="w-4 md:w-7 cursor-pointer hover:scale-90 "
                  onClick={() => addToCart(_id)}
                />
              </button>
            </div>
          ) : (
            <button
              className="w-5 md:w-8 cursor-pointer"
              onClick={() => addToCart(_id)}
            >
              <img src={assets.add_icon_white} alt="" />
            </button>
          )}
        </div>
      </div>
      <div className="food-info mt-3 flex flex-col flex-1">
        <div className="price flex items-center text-icon gamd:p-x-1 text-sm md:text-lg font-medium">
          <p className="price">${discount_price}</p>
          <p className="main-price">
            <span className="line-through text-gray-400 text-xs md:text-sm font-normal">
              {main_price}
            </span>
          </p>
        </div>
        <div className="name-rating md:flex justify-between items-center mb-1">
          <p className="name text-sm md:text-lg font-medium mb-1">{name}</p>
          <img src={assets.rating_starts} alt="" className="w-8 md:w-16" />
        </div>
        <p className="food-desc hidden md:inline-block text-sm text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FoodItem;
