import React from "react";
import { assets } from "../../assets/assets";

const Hero = () => {
  return (
    <div className="my-10">
      <div
        className="w-full min-h-[34vw] relative bg-contain bg-center bg-no-repeat text-white px-6 rounded-lg"
        style={{ backgroundImage: `url(${assets.header_img})` }}
      >
        <div className="hero-content max-w-3/5 bottom-22  left-14 absolute flex flex-col items-start animate-fadeIn">
          <h2 className="text-6xl leading-16">
            Order your favorite food on&nbsp;
            <span className="font-quicksand font-bold italic text-shadow-xs text-shadow-amber-900">
              hungrify
            </span>
          </h2>
          <div className="desc mt-3">
            <p className="font-semibold text-xl">Get Hungry. Get Fed.</p>
            <p className="text-base w-3/4">
              From street food to fine dining, Hungrify brings hot, fresh meals
              straight to your door — faster than you can say
              <i> “I’m starving.”</i>
            </p>
          </div>
          <div className="btns flex items-center gap-x-3 mt-3">
            <button className="px-5 py-1.5 rounded-full border-2 text-orange-500 font-semibold tracking-wide border-white bg-white cursor-pointer shadow-lg hover:bg-amber-50">
              Order Now
            </button>
            <button className="px-5 py-1.5 rounded-full border-2 text-orange-500 font-semibold tracking-wide border-white bg-white cursor-pointer shadow-lg hover:bg-amber-50">
              View Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
