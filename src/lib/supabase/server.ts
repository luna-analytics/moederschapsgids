import "server-only";
import { createClient } from "@supabase/supabase-js";
import { getPublicEnv, getServerEnv } from "@/lib/env";

/**
 * Server-client met de service-role key: omzeilt RLS en is de rol waarmee de admin
 * (ADMIN_EMAIL) alles mag. NOOIT naar de browser sturen. Alleen server-side
 * aanroepen (server components, route handlers, cron).
 */
export function createServerSupabase() {
  const publicEnv = getPublicEnv();
  const serverEnv = getServerEnv();
  return createClient(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    serverEnv.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
