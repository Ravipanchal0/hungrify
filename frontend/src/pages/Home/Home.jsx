import { useState } from "react";
import { Hero, ExploreMenu, FoodDisplay, AppDownload } from "../../components";

const Home = () => {
  const [category, setCategory] = useState("all");
  return (
    <div className="md:max-w-10/12 mx-auto md:my-10 px-3">
      <Hero />
      <div id="explore-menu">
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
      </div>
      <AppDownload />
    </div>
  );
};

export default Home;
