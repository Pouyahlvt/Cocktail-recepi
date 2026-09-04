"use client";

import Hero from "../components/hero/hero";
import Navbar from "../components/navbar/navbar";
import PopularCocktails from "../components/sections/popularSec/popularSec";
import Most_viewed from "../components/sections/most-viewed/most-viewed";

const Home = () => {
  return (
    <div className="w-full h-fit">
      <Hero />
      <Navbar />
      <PopularCocktails />
      <Most_viewed />
    </div>
  );
};

export default Home;
