import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { Breadcrumbs } from "@/components/ui";
import { CategorieResultaat } from "@/components/CategorieResultaat";
import { siteConfig } from "@/config/site.config";
import { getAllePlaatsen, getPlaatsProviders } from "@/lib/data/providers";
import { veiligeData } from "@/lib/data/veilig";

export const revalidate = 3600;
export const dynamicParams = false; // Onbekende plaats → echte 404.

export async function generateStaticParams() {
  const plaatsen = await veiligeData(getAllePlaatsen, [], "params alle plaatsen");
  return plaatsen.map((plaats) => ({ plaats }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ plaats: string }>;
}): Promise<Metadata> {
  const { plaats } = await params;
  const plaatsNaam = decodeURIComponent(plaats);
  return {
    title: `Zorgverleners in ${plaatsNaam}`,
    description: `Holistische zorgverleners rondom zwangerschap en moederschap in ${plaatsNaam}.`,
  };
}

export default async function PlaatsPagina({
  params,
}: {
  params: Promise<{ plaats: string }>;
}) {
  const { plaats } = await params;
  const plaatsNaam = decodeURIComponent(plaats);

  const providers = await veiligeData(
    () => getPlaatsProviders(plaatsNaam),
    { live: [], scraped: [] },
    `plaats ${plaatsNaam}`,
  );

  return (
    <SiteShell>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: plaatsNaam }]} />
      <h1 className="font-display text-4xl text-antraciet">
        Zorgverleners in {plaatsNaam}
      </h1>
      <p className="mt-3 max-w-2xl font-body text-lg text-antraciet/90">
        {siteConfig.naam} verzamelt holistische zorgverleners rondom zwangerschap en
        moederschap in {plaatsNaam} en omgeving.
      </p>
      <div className="mt-8">
        <CategorieResultaat
          providers={providers}
          legeTekst={`We hebben nog geen aanbieders in ${plaatsNaam}. Ken jij hier een goede aanbieder?`}
        />
      </div>
    </SiteShell>
  );
}
