import { createClient } from "@/src/lib/supabase/server";

export default async function TestUser() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error) {
    return (
      <main className="p-10">
        <h1>Auth Error</h1>
        <p>{error.message}</p>
      </main>
    );
  }

  return (
    <main className="p-10">
      <h1>Logged In User</h1>

      <pre className="mt-5">{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
