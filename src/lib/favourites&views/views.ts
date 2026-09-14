import { createClient } from "@/src/lib/supabase/client";
import { getVisitorId } from "@/src/lib/favourites&views/viewers";

export const recordCocktailView = async (cocktailId: number) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const visitorId = user ? null : getVisitorId();

  const { data, error } = await supabase.rpc("record_cocktail_view", {
    p_cocktail_id: cocktailId,
    p_user_id: user?.id ?? null,
    p_visitor_id: visitorId,
  });

  if (error) {
    console.error("View recording error:", error);
    return false;
  }

  return data === true;
};
