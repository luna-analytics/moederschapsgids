import { createAnonSupabase } from "@/lib/supabase/anon";

/**
 * Data-laag voor de publieke pagina's. Twee soorten vermeldingen:
 *   - live: geclaimd, in kleur, klikbaar, volledig profiel;
 *   - scraped: grijs, niet klikbaar, alleen naam/plaats/provincie/categorie
 *     (komt uit de beperkte view, nooit met e-mail of telefoon).
 * RLS bewaakt dit onderscheid; deze laag maakt het expliciet in het typesysteem.
 */

export interface LiveProvider {
  id: string;
  praktijknaam: string;
  slug: string;
  beschrijving: string | null;
  plaats: string;
  gemeente: string | null;
  provincie: string;
  adres: string | null;
  lat: number | null;
  lng: number | null;
  website: string | null;
  email: string | null;
  telefoon: string | null;
  foto_urls: string[];
  kortingscode: string | null;
  kortingstekst: string | null;
}

export interface ScrapedProvider {
  id: string;
  praktijknaam: string;
  plaats: string;
  provincie: string;
  categorie_slugs: string[];
}

export interface CategorieProviders {
  live: LiveProvider[];
  scraped: ScrapedProvider[];
}

const LIVE_KOLOMMEN =
  "id, praktijknaam, slug, beschrijving, plaats, gemeente, provincie, adres, lat, lng, website, email, telefoon, foto_urls, kortingscode, kortingstekst";

/** Live-aanbieders in een categorie (optioneel op plaats gefilterd). */
async function liveInCategorie(slug: string, plaats?: string): Promise<LiveProvider[]> {
  const supabase = createAnonSupabase();
  let query = supabase
    .from("providers")
    .select(`${LIVE_KOLOMMEN}, provider_categories!inner(categories!inner(slug))`)
    .eq("provider_categories.categories.slug", slug)
    .order("praktijknaam");
  if (plaats) query = query.eq("plaats", plaats);

  const { data, error } = await query;
  if (error) throw error;
  // De join-kolom (provider_categories) hoort niet bij het publieke type; strippen.
  return (data ?? []).map((row) => {
    const rec = { ...(row as Record<string, unknown>) };
    delete rec.provider_categories;
    return rec as unknown as LiveProvider;
  });
}

/** Scraped-aanbieders in een categorie (optioneel op plaats gefilterd). */
async function scrapedInCategorie(slug: string, plaats?: string): Promise<ScrapedProvider[]> {
  const supabase = createAnonSupabase();
  let query = supabase
    .from("public_scraped_providers")
    .select("id, praktijknaam, plaats, provincie, categorie_slugs")
    .contains("categorie_slugs", [slug])
    .order("praktijknaam");
  if (plaats) query = query.eq("plaats", plaats);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as ScrapedProvider[];
}

export async function getCategorieProviders(
  slug: string,
  plaats?: string,
): Promise<CategorieProviders> {
  const [live, scraped] = await Promise.all([
    liveInCategorie(slug, plaats),
    scrapedInCategorie(slug, plaats),
  ]);
  return { live, scraped };
}

/** Distinct plaatsen waar een categorie vertegenwoordigd is (live + scraped). */
export async function getPlaatsenVoorCategorie(slug: string): Promise<string[]> {
  const { live, scraped } = await getCategorieProviders(slug);
  const plaatsen = new Set<string>();
  for (const p of live) plaatsen.add(p.plaats);
  for (const p of scraped) plaatsen.add(p.plaats);
  return [...plaatsen].sort((a, b) => a.localeCompare(b, "nl"));
}

/** Alle plaatsen over alle vermeldingen (voor de zoek-autocomplete op de homepage). */
export async function getAllePlaatsen(): Promise<string[]> {
  const supabase = createAnonSupabase();
  const [liveRes, scrapedRes] = await Promise.all([
    supabase.from("providers").select("plaats"),
    supabase.from("public_scraped_providers").select("plaats"),
  ]);
  if (liveRes.error) throw liveRes.error;
  if (scrapedRes.error) throw scrapedRes.error;
  const plaatsen = new Set<string>();
  for (const r of liveRes.data ?? []) plaatsen.add(r.plaats as string);
  for (const r of scrapedRes.data ?? []) plaatsen.add(r.plaats as string);
  return [...plaatsen].sort((a, b) => a.localeCompare(b, "nl"));
}

/** Alle vermeldingen in één plaats, over alle categorieën heen (voor /plaats/[plaats]). */
export async function getPlaatsProviders(plaats: string): Promise<CategorieProviders> {
  const supabase = createAnonSupabase();
  const [liveRes, scrapedRes] = await Promise.all([
    supabase.from("providers").select(LIVE_KOLOMMEN).eq("plaats", plaats).order("praktijknaam"),
    supabase
      .from("public_scraped_providers")
      .select("id, praktijknaam, plaats, provincie, categorie_slugs")
      .eq("plaats", plaats)
      .order("praktijknaam"),
  ]);
  if (liveRes.error) throw liveRes.error;
  if (scrapedRes.error) throw scrapedRes.error;
  return {
    live: (liveRes.data ?? []) as unknown as LiveProvider[],
    scraped: (scrapedRes.data ?? []) as ScrapedProvider[],
  };
}

export interface ProvincieVermelding {
  praktijknaam: string;
  plaats: string;
  provincie: string;
  categorie_slugs: string[];
  live: boolean;
  slug: string | null;
}

/** Alle vermeldingen in een provincie (live + scraped), voor de provinciepagina. */
export async function getProvincieVermeldingen(
  provincie: string,
): Promise<ProvincieVermelding[]> {
  const supabase = createAnonSupabase();
  const [liveRes, scrapedRes] = await Promise.all([
    supabase
      .from("providers")
      .select("praktijknaam, slug, plaats, provincie, provider_categories(categories(slug))")
      .eq("provincie", provincie)
      .order("plaats"),
    supabase
      .from("public_scraped_providers")
      .select("praktijknaam, plaats, provincie, categorie_slugs")
      .eq("provincie", provincie)
      .order("plaats"),
  ]);
  if (liveRes.error) throw liveRes.error;
  if (scrapedRes.error) throw scrapedRes.error;

  const live: ProvincieVermelding[] = (liveRes.data ?? []).map((r) => ({
    praktijknaam: r.praktijknaam as string,
    plaats: r.plaats as string,
    provincie: r.provincie as string,
    slug: r.slug as string,
    live: true,
    categorie_slugs: ((r.provider_categories ?? []) as unknown as {
      categories: { slug: string } | null;
    }[])
      .map((pc) => pc.categories?.slug)
      .filter((s): s is string => Boolean(s)),
  }));
  const scraped: ProvincieVermelding[] = (scrapedRes.data ?? []).map((r) => ({
    praktijknaam: r.praktijknaam as string,
    plaats: r.plaats as string,
    provincie: r.provincie as string,
    slug: null,
    live: false,
    categorie_slugs: (r.categorie_slugs ?? []) as string[],
  }));
  return [...live, ...scraped].sort((a, b) => a.plaats.localeCompare(b.plaats, "nl"));
}

export interface ProviderProfiel extends LiveProvider {
  categorieSlugs: string[];
  tags: string[];
}

/** Volledig live-profiel op slug. null als het niet (meer) live is → 404. */
export async function getProviderProfiel(slug: string): Promise<ProviderProfiel | null> {
  const supabase = createAnonSupabase();
  const { data, error } = await supabase
    .from("providers")
    .select(
      `${LIVE_KOLOMMEN}, provider_categories(categories(slug)), provider_tags(category_tags(label))`,
    )
    .eq("slug", slug)
    .eq("status", "live")
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;

  const { provider_categories, provider_tags, ...rest } = data as Record<string, unknown>;
  return {
    ...(rest as unknown as LiveProvider),
    categorieSlugs: ((provider_categories ?? []) as unknown as {
      categories: { slug: string } | null;
    }[])
      .map((pc) => pc.categories?.slug)
      .filter((s): s is string => Boolean(s)),
    tags: ((provider_tags ?? []) as unknown as {
      category_tags: { label: string } | null;
    }[])
      .map((pt) => pt.category_tags?.label)
      .filter((s): s is string => Boolean(s)),
  };
}
