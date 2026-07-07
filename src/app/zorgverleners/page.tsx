import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { CategorieTegel } from "@/motor/components";
import { Breadcrumbs } from "@/components/ui";
import { categorieRegistry } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Alle zorgverleners",
  description:
    "Bekijk alle categorieën zorgverleners rondom zwangerschap en moederschap in de gids.",
};

export default function ZorgverlenersOverzicht() {
  const categorieen = categorieRegistry.all();
  return (
    <SiteShell>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Zorgverleners" }]} />
      <h1 className="font-display text-4xl text-antraciet">Alle zorgverleners</h1>
      <p className="mt-3 max-w-2xl font-body text-lg text-antraciet/90">
        Kies een categorie om aanbieders bij jou in de buurt te vinden.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categorieen.map((categorie) => (
          <CategorieTegel key={categorie.slug} categorie={categorie} />
        ))}
      </div>
    </SiteShell>
  );
}
