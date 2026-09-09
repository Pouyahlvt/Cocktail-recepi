import { notFound } from "next/navigation";
import { cocktails_data } from "@/src/data/cocktailsData";
import CocktailRecipe from "@/src/components/cocktailpage/cocktailsPage";
import Navbar from "@/src/components/navbar/navbar";

type CocktailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const Cocktail_page = async ({ params }: CocktailPageProps) => {
  const cocktails = cocktails_data;

  const { slug } = await params;

  // Decode the slug (handles %20 and other URL-encoded characters)
  const decodedSlug = decodeURIComponent(slug);

  const cocktail = cocktails.find((cocktail) => cocktail.name === decodedSlug);

  if (!cocktail) {
    notFound();
  }

  return (
    <main>
      <Navbar />
      <CocktailRecipe {...cocktail} />
    </main>
  );
};

export default Cocktail_page;
