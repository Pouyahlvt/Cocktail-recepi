// cocktail.interface.ts

// export interface Cocktail {
//   id: number;
//   name: string;
//   type: string;
//   image: string;
//   alcohol: boolean;
//   difficulty: "Easy" | "Medium" | "Hard"; // You can expand this as needed
//   favourites: number;
//   views: number;
//   toppings: string[];
//   recpie: string[]; // Note: you have a typo in your data (recpie instead of recipe)
// }

// If you want to fix the typo, use this instead:
// with strong
export interface CocktailsType {
  id: number;
  name: string;
  type: string;
  image: string;
  alcohol: string;
  strongGrade: "Very Strong" | "Standard" | "Light";
  difficulty: "Easy" | "Medium" | "Hard";
  favourites: number;
  views: number;
  toppings: string[];
  recipe: string[]; // Corrected spelling
}
