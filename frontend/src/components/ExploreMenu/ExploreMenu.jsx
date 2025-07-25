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
    <div id="" className="explore-menu flex flex-col md:my-10">
      <h1 className="text-xl md:text-2xl font-medium md:font-semibold">
        Explore Our Menu
      </h1>
      <p className="text-xs md:text-base">
        From spicy street snacks to gourmet mains, we've got something for every
        craving. Dive into our delicious selection and find your next favorite
        bite.
      </p>
      <hr className="border-none bg-separator h-0.5 my-1 md:my-2" />
      <div className="explore-menu-list flex items-center text-center justify-evenly gap-3 md:gap-10 overflow-x-scroll md:my-6 py-1 md:py-3 px-2 whitespace-nowrap hide-scrollbar">
        {filteredCategories.map((item) => {
          return (
            <div
              onClick={() =>
                setCategory((pre) => (pre === item ? "all" : item))
              }
              key={item}
              className="menu-item"
            >
              <p className="md:mt-2 text-sm md:text-base md:font-medium text-gray-800 bg-amber-100 rounded px-4 py-2 cursor-pointer">
                {item.toUpperCase()}
              </p>
            </div>
          );
        })}
      </div>
      <hr className="border-none bg-gray-200 h-0.5 my-2 md:my-5" />
    </div>
  );
};

export default ExploreMenu;
