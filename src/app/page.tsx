import Hero from "../components/hero/hero";
import Navbar from "../components/navbar/navbar";
import PopularCocktails from "../components/sections/popularSec/popularSec";
import Most_viewed from "../components/sections/most-viewed/most-viewed";
import CocktailsPage from "../components/sections/all-recpie/cocktailsRecpieSec";
import Footer from "../components/sections/footer/footer";
import {
  getAllCocktails,
  getMostPopularCocktails,
  getMostViewedCocktails,
} from "@/src/lib/cocktails";

const Home = async () => {
  const [cocktails, mostPopular, mostViewed] = await Promise.all([
    getAllCocktails(),
    getMostPopularCocktails(),
    getMostViewedCocktails(),
  ]);

  return (
    <div className="w-full min-h-screen bg-onyx">
      <Hero />
      <Navbar />

      <PopularCocktails cocktails={mostPopular} />

      <Most_viewed cocktails={mostViewed} />

      <CocktailsPage cocktails={cocktails} />

      <Footer />
    </div>
  );
};

export default Home;
