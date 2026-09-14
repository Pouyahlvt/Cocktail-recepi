import { notFound } from "next/navigation";
import CocktailRecipe from "@/src/components/cocktailpage/cocktailsPage";
import Navbar from "@/src/components/navbar/navbar";
import { getAllCocktails } from "@/src/lib/cocktails";

type CocktailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const Cocktail_page = async ({ params }: CocktailPageProps) => {
  const cocktails = await getAllCocktails();

  const { slug } = await params;

  const decodedSlug = decodeURIComponent(slug);

  const cocktail = cocktails.find((cocktail) => cocktail.name === decodedSlug);

  if (!cocktail) {
    notFound();
  }

  console.log({ ...cocktail });

  return (
    <main>
      <Navbar />
      <CocktailRecipe {...cocktail} />
    </main>
  );
};

export default Cocktail_page;
