import { createClient } from "@/src/lib/supabase/server";

import type { CocktailsType } from "@/src/types/cocktails.ts/cocktails_data";

// this is ai idea for make fix be carefull 💀💀💀💀
type CocktailRow = {
  id: number;
  name: string;
  type: string;
  image: string;
  alcohol: string;
  strength_rate: number;
  difficulty: string;
  favorites: number;
  views: number;
  ingredients: string[];
  recipe: string[];
};

const mapCocktail = (cocktail: CocktailRow): CocktailsType => ({
  id: cocktail.id,
  name: cocktail.name,
  type: cocktail.type,
  image: cocktail.image,
  alcohol: cocktail.alcohol,
  strongGrade: cocktail.strength_rate,
  difficulty: cocktail.difficulty as "Easy" | "Medium" | "Hard",
  favourites: cocktail.favorites,
  views: cocktail.views,
  ingredients: cocktail.ingredients,
  recipe: cocktail.recipe,
});

export async function getAllCocktails(): Promise<CocktailsType[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cocktails")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching cocktails:", error);
    throw new Error("Failed to fetch cocktails");
  }

  return (data ?? []).map(mapCocktail);
}

/**
 * Get 7 cocktails with the most lifetime views.
 */
export async function getMostViewedCocktails(): Promise<CocktailsType[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cocktails")
    .select("*")
    .order("views", { ascending: false })
    .limit(7);

  if (error) {
    console.error("Error fetching most viewed cocktails:", error);
    throw new Error("Failed to fetch most viewed cocktails");
  }

  return (data ?? []).map(mapCocktail);
}

/**
 * Get 7 cocktails with the most favorites.
 */
export async function getMostPopularCocktails(): Promise<CocktailsType[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cocktails")
    .select("*")
    .order("favorites", { ascending: false })
    .limit(7);

  if (error) {
    console.error("Error fetching most popular cocktails:", error);
    throw new Error("Failed to fetch most popular cocktails");
  }

  return (data ?? []).map(mapCocktail);
}
