import { NextResponse } from "next/server";
import { z } from "zod";
import { createAnonSupabase } from "@/lib/supabase/anon";

/**
 * Nieuwsbrief-inschrijving. Spamwering (spelregel): honeypot + een eenvoudige
 * server-side throttle per IP. De insert loopt via de anon-client; RLS staat op
 * newsletter_signups alleen INSERT toe en niemand mag de lijst publiek lezen.
 */

const schema = z.object({
  email: z.string().email(),
  bedrijf: z.string().optional(), // honeypot: hoort leeg te zijn
});

// Best-effort geheugen-throttle (per serverless-instance). Voor v1-volume voldoende;
// een gedeelde store kan later. Max 5 inzendingen per IP per 10 minuten.
const venster = 10 * 60 * 1000;
const maxPerVenster = 5;
const perIp = new Map<string, number[]>();

function teVaak(ip: string, nu: number): boolean {
  const recent = (perIp.get(ip) ?? []).filter((t) => nu - t < venster);
  recent.push(nu);
  perIp.set(ip, recent);
  return recent.length > maxPerVenster;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "onbekend";
  const nu = Date.now();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot ingevuld → doe alsof het lukte, sla niets op.
  if (parsed.data.bedrijf && parsed.data.bedrijf.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (teVaak(ip, nu)) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  const supabase = createAnonSupabase();
  const { error } = await supabase
    .from("newsletter_signups")
    .insert({ email: parsed.data.email.toLowerCase() });

  // Dubbele inschrijving (unieke e-mail) is geen fout voor de gebruiker.
  if (error && error.code !== "23505") {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
