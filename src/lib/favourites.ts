import { createClient } from "@/src/lib/supabase/client";

/**
 * Maximum number of cocktails a user can favorite.
 */
const MAX_FAVORITES = 100;

/**
 * Add a cocktail to a user's favorites.
 *
 * This function:
 * - Checks that the user is authenticated.
 * - Prevents duplicate favorites.
 * - Limits each user to 100 favorites.
 * - Inserts the favorite into the favorites table.
 * - Updates the cocktail's favorites count safely.
 */
export const addFavorite = async (userId: string, cocktailId: number) => {
  const supabase = createClient();

  // Check if this cocktail is already a favorite.
  const { data: existingFavorite, error: existingError } = await supabase
    .from("favorites")
    .select("user_id")
    .eq("user_id", userId)
    .eq("cocktail_id", cocktailId)
    .maybeSingle();

  if (existingError) {
    return {
      success: false,
      error: existingError.message,
    };
  }

  // Prevent duplicate favorites.
  if (existingFavorite) {
    return {
      success: false,
      error: "Cocktail is already in favorites.",
    };
  }

  // Count the user's current favorites.
  const { count, error: countError } = await supabase
    .from("favorites")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (countError) {
    return {
      success: false,
      error: countError.message,
    };
  }

  // Maximum of 100 favorites per user.
  if ((count ?? 0) >= MAX_FAVORITES) {
    return {
      success: false,
      error: "You can only have 100 favorite cocktails.",
    };
  }

  // Add the favorite.
  const { error: insertError } = await supabase.from("favorites").insert({
    user_id: userId,
    cocktail_id: cocktailId,
  });

  if (insertError) {
    return {
      success: false,
      error: insertError.message,
    };
  }

  // Increase the cocktail's favorite count.
  const { data: cocktail, error: cocktailError } = await supabase
    .from("cocktails")
    .select("favorites")
    .eq("id", cocktailId)
    .single();

  if (cocktailError) {
    return {
      success: false,
      error: cocktailError.message,
    };
  }

  const newFavoriteCount = (cocktail.favorites ?? 0) + 1;

  const { error: updateError } = await supabase
    .from("cocktails")
    .update({
      favorites: newFavoriteCount,
    })
    .eq("id", cocktailId);

  if (updateError) {
    console.error("COCKTAIL UPDATE ERROR:", updateError);

    return {
      success: false,
      error: updateError.message,
    };
  }

  return {
    success: true,
    favoriteCount: newFavoriteCount,
  };
};

/**
 * Remove a cocktail from a user's favorites.
 */
export const removeFavorite = async (userId: string, cocktailId: number) => {
  const supabase = createClient();

  // Check if the favorite exists.
  const { data: existingFavorite, error: existingError } = await supabase
    .from("favorites")
    .select("user_id")
    .eq("user_id", userId)
    .eq("cocktail_id", cocktailId)
    .maybeSingle();

  if (existingError) {
    return {
      success: false,
      error: existingError.message,
    };
  }

  // Nothing to remove.
  if (!existingFavorite) {
    return {
      success: false,
      error: "Cocktail is not in favorites.",
    };
  }

  // Remove the favorite.
  const { error: deleteError } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId)
    .eq("cocktail_id", cocktailId);

  if (deleteError) {
    return {
      success: false,
      error: deleteError.message,
    };
  }

  // Get the current cocktail favorite count.
  const { data: cocktail, error: cocktailError } = await supabase
    .from("cocktails")
    .select("favorites")
    .eq("id", cocktailId)
    .single();

  if (cocktailError) {
    return {
      success: false,
      error: cocktailError.message,
    };
  }

  // Never allow the count to go below zero.
  const newFavoriteCount = Math.max(0, (cocktail.favorites ?? 0) - 1);

  const { error: updateError } = await supabase
    .from("cocktails")
    .update({
      favorites: newFavoriteCount,
    })
    .eq("id", cocktailId);

  if (updateError) {
    return {
      success: false,
      error: updateError.message,
    };
  }

  return {
    success: true,
    favoriteCount: newFavoriteCount,
  };
};

/**
 * Check whether a specific cocktail is already
 * favorited by a user.
 */
export const isFavorite = async (userId: string, cocktailId: number) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("favorites")
    .select("user_id")
    .eq("user_id", userId)
    .eq("cocktail_id", cocktailId)
    .maybeSingle();

  if (error) {
    return {
      success: false,
      isFavorite: false,
      error: error.message,
    };
  }

  return {
    success: true,
    isFavorite: !!data,
  };
};
