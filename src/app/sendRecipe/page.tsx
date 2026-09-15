import SendCocktail from "@/src/components/sendCocktails/sendCocktail";
import Navbar from "@/src/components/navbar/navbar";

export default function SendRecipe() {
  return (
    <main className="bg-onyx w-full min-h-screen pt-5">
      <Navbar />
      <SendCocktail />
    </main>
  );
}
