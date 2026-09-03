"use client";

import Hero from "../components/hero/hero";
import Navbar from "../components/navbar/navbar";
import PopularCocktails from "../components/sections/popularSec/popularSec";

const Home = () => {
  return (
    <div className="w-full h-fit">
      <Hero />
      <Navbar />
      <PopularCocktails />
    </div>
  );
};

export default Home;
