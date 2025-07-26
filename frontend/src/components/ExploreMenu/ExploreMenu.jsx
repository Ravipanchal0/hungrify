import React, { useState, useEffect } from "react";
import { getMenuList } from "../../api/menuApi";

const ExploreMenu = ({ category, setCategory }) => {
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const items = await getMenuList();

        // Step 1: Get unique category names from available items
        const uniqueCategories = [
          ...new Set(items.map((item) => item.category)),
        ];

        setFilteredCategories(uniqueCategories);
      } catch (err) {
        console.error("Failed to fetch items", err);
      }
    })();
  }, []);

  return (
    <div id="" className="explore-menu flex flex-col">
      <h1 className="text-xl md:text-2xl font-medium md:font-semibold">
        Explore Our Menu
      </h1>
      <p className="text-xs md:text-base">
        From spicy street snacks to gourmet mains, we've got something for every
        craving. Dive into our delicious selection and find your next favorite
        bite.
      </p>
      <hr className="border-none bg-separator h-[1px] mt-0.5" />
      <div className="explore-menu-list flex items-center text-center justify-between gap-3 md:gap-10 overflow-x-scroll my-2 py-1 md:py-3 px-2 whitespace-nowrap hide-scrollbar">
        <div onClick={() => setCategory("all")} className="menu-item">
          <p className=" text-sm md:text-base md:font-medium text-gray-800 bg-amber-100 rounded p-2 md:px-4 md:py-2 cursor-pointer">
            ALL
          </p>
        </div>
        {filteredCategories.map((item) => {
          return (
            <div
              onClick={() => setCategory(item)}
              key={item}
              className="menu-item"
            >
              <p className=" text-sm md:text-base md:font-medium text-gray-800 bg-amber-100 rounded p-2 md:px-4 md:py-2 cursor-pointer">
                {item.toUpperCase()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMenu;
