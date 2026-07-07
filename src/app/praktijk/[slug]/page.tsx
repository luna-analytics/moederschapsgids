import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { Breadcrumbs } from "@/components/ui";
import { ProviderKaart, type KaartMarker } from "@/components/ProviderKaart";
import { categorieRegistry } from "@/config/site.config";
import { getProviderProfiel } from "@/lib/data/providers";
import { veiligeData } from "@/lib/data/veilig";
import { createAnonSupabase } from "@/lib/supabase/anon";

export const revalidate = 3600;
// Alleen live-profielen bestaan als pagina; scraped/onbekend → echte 404 (sluit aan
// op de regel: scraped is nooit bereikbaar als profielpagina, ook niet via URL).
// Nieuwe live-profielen worden zichtbaar na een redeploy (v1-afweging).
export const dynamicParams = false;

export async function generateStaticParams() {
  // Alleen live-profielen krijgen een pagina. Faalt de DB (CI), dan geen params.
  const slugs = await veiligeData(
    async () => {
      const supabase = createAnonSupabase();
      const { data, error } = await supabase
        .from("providers")
        .select("slug")
        .eq("status", "live");
      if (error) throw error;
      return (data ?? []).map((r) => ({ slug: r.slug as string }));
    },
    [] as { slug: string }[],
    "params live slugs",
  );
  return slugs;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profiel = await getProviderProfiel(slug);
  if (!profiel) return {};
  return {
    title: profiel.praktijknaam,
    description:
      profiel.beschrijving?.slice(0, 155) ??
      `${profiel.praktijknaam} in ${profiel.plaats}.`,
  };
}

export default async function ProfielPagina({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Bewust GEEN veilige fallback: bestaat het live-profiel niet, dan 404.
  const profiel = await getProviderProfiel(slug);
  if (!profiel) notFound();

  const categorieen = profiel.categorieSlugs
    .map((s) => categorieRegistry.bySlug(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const markers: KaartMarker[] =
    profiel.lat != null && profiel.lng != null
      ? [{ lat: profiel.lat, lng: profiel.lng, naam: profiel.praktijknaam, live: true }]
      : [];

  // schema.org LocalBusiness voor betere vindbaarheid.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: profiel.praktijknaam,
    description: profiel.beschrijving ?? undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: profiel.adres ?? undefined,
      addressLocality: profiel.plaats,
      addressRegion: profiel.provincie,
      addressCountry: "NL",
    },
    url: profiel.website ?? undefined,
    telephone: profiel.telefoon ?? undefined,
  };

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Zorgverleners", href: "/zorgverleners" },
          { label: profiel.praktijknaam },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
        <div>
          <p className="font-body text-sm uppercase tracking-wide text-antraciet/70">
            {categorieen.map((c) => c.naam).join(" · ")}
          </p>
          <h1 className="mt-2 font-display text-4xl text-antraciet">{profiel.praktijknaam}</h1>
          <p className="mt-1 font-body text-antraciet/70">
            {profiel.adres ? `${profiel.adres}, ` : ""}
            {profiel.plaats}
          </p>

          {profiel.foto_urls.length > 0 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {profiel.foto_urls.map((url) => (
                <Image
                  key={url}
                  src={url}
                  alt={`Foto van ${profiel.praktijknaam}`}
                  width={800}
                  height={600}
                  className="h-auto w-full rounded-control border border-zand object-cover"
                />
              ))}
            </div>
          )}

          {profiel.beschrijving && (
            <p className="mt-6 max-w-2xl font-body text-lg text-antraciet/90">
              {profiel.beschrijving}
            </p>
          )}

          {profiel.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {profiel.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-control border border-zand px-3 py-1 font-body text-sm text-antraciet/90"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {profiel.kortingscode && (
            <div className="mt-8 border border-terracotta-donker/40 bg-terracotta/10 p-5">
              <h2 className="font-display text-xl text-antraciet">Kortingscode</h2>
              <p className="mt-1 font-body text-antraciet/90">
                {profiel.kortingstekst ?? "Gebruik deze code bij deze aanbieder."}
              </p>
              <p className="mt-2 font-mono text-lg text-terracotta-donker">
                {profiel.kortingscode}
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-4 border-t border-zand pt-6 font-body">
            {profiel.website && (
              <Link
                href={profiel.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terracotta-donker hover:underline"
              >
                Website ↗
              </Link>
            )}
            {profiel.telefoon && (
              <a href={`tel:${profiel.telefoon}`} className="text-antraciet hover:text-terracotta-donker">
                {profiel.telefoon}
              </a>
            )}
            {profiel.email && (
              <a
                href={`mailto:${profiel.email}`}
                className="text-antraciet hover:text-terracotta-donker"
              >
                E-mail
              </a>
            )}
          </div>

          <div className="mt-8">
            {categorieen.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}/${encodeURIComponent(profiel.plaats)}`}
                className="mr-4 font-body text-sm text-antraciet/70 hover:text-terracotta-donker"
              >
                Meer {c.naam.toLowerCase()} in {profiel.plaats} →
              </Link>
            ))}
          </div>
        </div>

        {markers.length > 0 && (
          <aside>
            <ProviderKaart markers={markers} hoogte={280} />
          </aside>
        )}
      </div>
    </SiteShell>
  );
}
