import { redirect } from "next/navigation";
import { createClient } from "@/src/lib/supabase/server";
import Profile from "@/src/components/profile/profile";
import Footer from "@/src/components/sections/footer/footer";

type ProfilePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Convert name into a URL-friendly slug
const createSlug = (name: string) => {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const { slug } = await params;

  const supabase = await createClient();

  // Get logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/Login");
  }

  // Get profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("name")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    console.error("Profile error:", profileError);
    redirect("/");
  }

  // Create URL slug from user's name
  const userSlug = createSlug(profile.name);

  // If URL is not the user's real slug, redirect to it
  if (slug !== userSlug) {
    redirect(`/profile/${userSlug}`);
  }

  // Get user's favorites
  const { data: favorites, error: favoritesError } = await supabase
    .from("favorites")
    .select("cocktail_id")
    .eq("user_id", user.id);

  if (favoritesError) {
    console.error("Favorites error:", favoritesError);
  }

  const favoriteCocktailIds =
    favorites?.map((favorite) => favorite.cocktail_id) ?? [];

  const profileData = {
    name: profile.name,
    email: user.email ?? "",
    createdAt: user.created_at,
    favoriteCocktailIds,
  };

  return (
    <main>
      <Profile profileData={profileData} />
      <Footer />
    </main>
  );
};

export default ProfilePage;
