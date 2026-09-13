import Hero from "../components/hero/hero";
import Navbar from "../components/navbar/navbar";
import PopularCocktails from "../components/sections/popularSec/popularSec";
import Most_viewed from "../components/sections/most-viewed/most-viewed";
import CocktailsPage from "../components/sections/all-recpie/cocktailsRecpieSec";
import Footer from "../components/sections/footer/footer";
import { getAllCocktails } from "@/src/lib/cocktails";

const Home = async () => {
  const cocktails = await getAllCocktails();

  return (
    <div className="w-full min-h-screen bg-onyx">
      <Hero />
      <Navbar />

      <PopularCocktails />

      <Most_viewed />

      <CocktailsPage cocktails={cocktails} />

      <Footer />
    </div>
  );
};

export default Home;
