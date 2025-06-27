import React from "react";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu flex flex-col my-10">
      <h1 className="text-2xl font-semibold">Explore Our Menu</h1>
      <p className="">
        From spicy street snacks to gourmet mains, we've got something for every
        craving. Dive into our delicious selection and find your next favorite
        bite.
      </p>
      <hr className="separation-line" />
      <div className="explore-menu-list flex items-center text-center gap-10 overflow-x-scroll my-6 py-3 px-2 whitespace-nowrap hide-scrollbar">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((pre) =>
                  pre === item.menu_name ? "all" : item.menu_name
                )
              }
              key={index}
              className="menu-item min-w-[120px]"
            >
              <img
                src={item.menu_image}
                alt={item.menu_name}
                className={
                  category === item.menu_name
                    ? "w-full h-auto rounded-full ring-4 ring-offset-1 ring-orange-500"
                    : "w-full h-auto rounded"
                }
              />
              <p className="mt-2 text-base font-medium text-gray-800">
                {item.menu_name}
              </p>
            </div>
          );
        })}
      </div>
      <hr className="border-none bg-gray-200 h-0.5 my-5" />
    </div>
  );
};

export default ExploreMenu;
