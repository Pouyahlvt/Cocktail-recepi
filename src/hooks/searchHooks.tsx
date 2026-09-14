// hooks/useCocktailSearch.ts
import { useState, useMemo } from "react";
import { cocktails_data } from "../data/cocktailsData";

export function useSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAndSortedCocktails = useMemo(() => {
    // Filter by name (case-insensitive)
    const filtered = searchTerm
      ? cocktails_data.filter((cocktail) =>
          cocktail.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : cocktails_data;

    // Sort alphabetically by name
    return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    cocktails: filteredAndSortedCocktails,
  };
}
