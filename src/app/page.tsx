"use client";

import Hero from "../components/hero/hero";
import Navbar from "../components/navbar/navbar";
import PopularCocktails from "../components/sections/popularSec/popularSec";
import Most_viewed from "../components/sections/most-viewed/most-viewed";
import CocktailsPage from "../components/sections/all-recpie/cocktailsRecpieSec";

const Home = () => {
  return (
    <div className="w-full h-fit">
      <Hero />
      <Navbar />
      <PopularCocktails />
      <Most_viewed />
      <CocktailsPage />
    </div>
  );
};

export default Home;
