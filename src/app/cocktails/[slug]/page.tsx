"use client";

import CocktailRecipe from "@/src/components/cocktailpage/cocktailsPage";
import Navbar from "@/src/components/navbar/navbar";

const testCock = {
  id: 1,
  name: "Martini",
  type: "Classic",
  image: "/cocktails/martini-cocktails.png",
  alcohol: "Gin",
  strongGrade: "Very Strong",
  difficulty: "Easy",
  favourites: 1240,
  views: 8420,
  toppings: ["Lemon twist", "Green olive"],
  recpie: [
    "Fill a mixing glass with ice.",
    "Add 60 ml gin and 10 ml dry vermouth.",
    "Stir gently for 20 seconds.",
    "Strain into a chilled martini glass.",
    "Garnish with a lemon twist or green olive.",
  ],
};

const Cocktail_page = () => {
  return (
    <main>
      <Navbar />
      <CocktailRecipe
        id={testCock.id}
        name={testCock.name}
        type={testCock.type}
        image={testCock.image}
        alcohol={testCock.alcohol}
        strongGrade={testCock.strongGrade}
        difficulty={testCock.difficulty}
        favourites={testCock.favourites}
        views={testCock.views}
        toppings={testCock.toppings}
        recpie={testCock.recpie}
      />
    </main>
  );
};

export default Cocktail_page;
