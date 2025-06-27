import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display mt-4 md:mt-8">
      <h2 className="text-xl md:text-2xl font-semibold">Top dishes near you</h2>
      <hr className="separation-line" />
      <div className="food-display-list grid gap-8 [grid-template-columns:repeat(auto-fill,_minmax(240px,_1fr))] mt-8">
        {food_list.map((item) => {
          if (category === "all" || category === item.category) {
            return <FoodItem key={item._id} item={item} />;
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
