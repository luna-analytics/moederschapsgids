import { createClient } from "@supabase/supabase-js";
import { getPublicEnv } from "@/lib/env";

/**
 * Anon-client met de publieke sleutel. Respecteert RLS: leest live-profielen
 * volledig en scraped alleen via de beperkte view. Veilig zowel server-side
 * (server components, publieke pagina's) als in de browser. Geen sessie nodig
 * zolang er nog geen ingelogde gebruiker is (auth komt in Blok 2).
 */
export function createAnonSupabase() {
  const env = getPublicEnv();
  return createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
