import { Link } from "react-scroll";
import { assets } from "../../assets/assets";
import { IoArrowDownCircleOutline } from "../../assets/icons";

const Hero = () => {
  return (
    <div id="home" className="my-4 md:my-10">
      <div
        className="w-full md:min-h-[34vw] min-h-44 sm:min-h-56 relative bg-contain bg-center bg-no-repeat md:px-6 rounded-lg text-white"
        style={{ backgroundImage: `url(${assets.header_img})` }}
      >
        <div className="hero-content max-w-3/5 md:max-w-4/5 lg:max-w-3/5 bottom-5 sm:bottom-7 lg:bottom-10 left-5 sm:left-32 md:left-10 lg:left-14 absolute flex flex-col items-start animate-fadeIn">
          <h2 className="text-xl md:text-4xl lg:text-6xl md:leading-10 lg:leading-16 leading-5">
            Order your favorite food on&nbsp;
            <span className="font-quicksand font-semibold md:font-bold italic text-shadow-xs text-shadow-amber-900">
              hungrify
            </span>
          </h2>
          <div className="desc md:mt-1 lg:mt-3">
            <p className="text-xs md:text-lg lg:text-xl font-medium md:font-semibold">
              Get Hungry. Get Fed.
            </p>
            <p className="hidden md:block text-xs md:sm lg:text-base w-3/4">
              From street food to fine dining, Hungrify brings hot, fresh meals
              straight to your door — faster than you can say
              <i> “I’m starving.”</i>
            </p>
          </div>
          <div className="btns flex items-center gap-x-1 md:gap-x-3 mt-1.5 md:mt-3">
            <button className="px-2 md:px-5 py-0.5 md:py-1.5 text-xs md:text-base rounded-full border-2 text-orange-500 md:font-semibold md:tracking-wide border-white bg-white cursor-pointer shadow md:shadow-lg hover:bg-amber-50">
              Order Now
            </button>
            <button className="px-2 md:px-5 py-0.5 md:py-1.5 text-xs md:text-base rounded-full border-2 text-orange-500 md:font-semibold md:tracking-wide border-white bg-white cursor-pointer shadow md:shadow-lg hover:bg-amber-50">
              View Menu
            </button>
          </div>
        </div>
      </div>
      <div className="scroll">
        <Link to="footer" smooth={500} className="absolute bottom-10 right-14">
          <IoArrowDownCircleOutline
            size={40}
            className="text-icon animate-bounce cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
};

export default Hero;
