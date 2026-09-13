import { createClient } from "@/src/lib/supabase/client";
import { redirect } from "next/navigation";

export const logout = async () => {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error);
    return false;
  }

  return true;
};

export const handleLogout = async () => {
  const success = await logout();

  if (success) {
    redirect("/");
  }
};
