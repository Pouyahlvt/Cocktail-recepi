import { createClient } from "@/src/lib/supabase/server";
import type { CocktailsType } from "@/src/types/cocktails.ts/cocktails_data";

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

  return (data ?? []).map((cocktail) => ({
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
  }));
}
