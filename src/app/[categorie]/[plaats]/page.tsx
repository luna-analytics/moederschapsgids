import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { Breadcrumbs } from "@/components/ui";
import { CategorieResultaat } from "@/components/CategorieResultaat";
import { categorieRegistry } from "@/config/site.config";
import { getCategorieProviders, getAllePlaatsen } from "@/lib/data/providers";
import { veiligeData } from "@/lib/data/veilig";

export const revalidate = 3600;
// Geldige combinaties = elke categorie × elke bekende plaats. Zo toont een lege
// combinatie (bv. doula in een plaats zonder doula) netjes de aanmeld-oproep,
// terwijl een onbekende plaats een echte 404 krijgt.
export const dynamicParams = false;

export async function generateStaticParams() {
  const plaatsen = await veiligeData(getAllePlaatsen, [], "params alle plaatsen (cat/plaats)");
  const params: { categorie: string; plaats: string }[] = [];
  for (const c of categorieRegistry.all()) {
    for (const plaats of plaatsen) params.push({ categorie: c.slug, plaats });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorie: string; plaats: string }>;
}): Promise<Metadata> {
  const { categorie, plaats } = await params;
  const gevonden = categorieRegistry.bySlug(categorie);
  if (!gevonden) return {};
  const plaatsNaam = decodeURIComponent(plaats);
  return {
    title: `${gevonden.naam} in ${plaatsNaam}`,
    description: `Vind ${gevonden.naam.toLowerCase()} in ${plaatsNaam} en omgeving in de gids.`,
  };
}

export default async function CategoriePlaatsPagina({
  params,
}: {
  params: Promise<{ categorie: string; plaats: string }>;
}) {
  const { categorie, plaats } = await params;
  const gevonden = categorieRegistry.bySlug(categorie);
  if (!gevonden) notFound();
  const plaatsNaam = decodeURIComponent(plaats);

  const providers = await veiligeData(
    () => getCategorieProviders(categorie, plaatsNaam),
    { live: [], scraped: [] },
    `providers ${categorie}/${plaatsNaam}`,
  );

  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Zorgverleners", href: "/zorgverleners" },
          { label: gevonden.naam, href: `/${gevonden.slug}` },
          { label: plaatsNaam },
        ]}
      />
      <h1 className="font-display text-4xl text-antraciet">
        {gevonden.naam} in {plaatsNaam}
      </h1>
      {/* Unieke introtekst via template (programmatic SEO). */}
      <p className="mt-3 max-w-2xl font-body text-lg text-antraciet/90">
        {gevonden.omschrijving} Hieronder de aanbieders in en rond {plaatsNaam}.
      </p>

      <div className="mt-8">
        <CategorieResultaat
          providers={providers}
          legeTekst={`We hebben nog geen ${gevonden.naam.toLowerCase()} in ${plaatsNaam}. Ken jij hier een goede aanbieder?`}
        />
      </div>
    </SiteShell>
  );
}
