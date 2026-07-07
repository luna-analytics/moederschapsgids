import { createClient } from "@supabase/supabase-js";
import { getPublicEnv } from "@/lib/env";

/**
 * Browser-client met de publieke anon-key. Leest alleen wat RLS toestaat (live
 * volledig, scraped beperkt via de view). Nog niet gebruikt in pagina's — dat komt
 * bij de publieke site en de claim-flow.
 */
export function createBrowserSupabase() {
  const env = getPublicEnv();
  return createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
