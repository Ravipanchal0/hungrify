import { useState } from "react";
import { Hero, ExploreMenu, FoodDisplay } from "../../components";

const Home = () => {
  const [category, setCategory] = useState("all");
  return (
    <div className="md:max-w-10/12 mx-auto my-10">
      <Hero />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  );
};

export default Home;
