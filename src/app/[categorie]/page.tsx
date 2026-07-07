import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { CategorieView } from "@/motor/components";
import { Breadcrumbs } from "@/components/ui";
import { CategorieResultaat } from "@/components/CategorieResultaat";
import { categorieRegistry } from "@/config/site.config";
import { faseMeta } from "@/config/fases";
import { getCategorieProviders, getPlaatsenVoorCategorie } from "@/lib/data/providers";
import { veiligeData } from "@/lib/data/veilig";

// De routes komen uit de registry (geen DB nodig) → veilig te prerenderen. Nieuwe
// categorieën die later worden geregistreerd verschijnen zonder herbouw (ISR).
export const revalidate = 3600;
// Geldige categorieën = de registry (eindig, bekend bij build). Alles daarbuiten
// hoort een echte 404 te geven, niet een "zachte" 200.
export const dynamicParams = false;

export function generateStaticParams() {
  return categorieRegistry.all().map((c) => ({ categorie: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorie: string }>;
}): Promise<Metadata> {
  const { categorie } = await params;
  const gevonden = categorieRegistry.bySlug(categorie);
  if (!gevonden) return {};
  return { title: gevonden.naam, description: gevonden.omschrijving };
}

export default async function CategoriePagina({
  params,
}: {
  params: Promise<{ categorie: string }>;
}) {
  const { categorie } = await params;
  const gevonden = categorieRegistry.bySlug(categorie);
  if (!gevonden) notFound();

  const [providers, plaatsen] = await Promise.all([
    veiligeData(() => getCategorieProviders(categorie), { live: [], scraped: [] }, `providers ${categorie}`),
    veiligeData(() => getPlaatsenVoorCategorie(categorie), [], `plaatsen ${categorie}`),
  ]);

  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Zorgverleners", href: "/zorgverleners" },
          { label: gevonden.naam },
        ]}
      />

      {/* Fase-iconen bovenaan de categoriepagina (brandbook). */}
      <div className="flex items-center gap-3">
        {gevonden.fases.map((fase) => (
          <Image
            key={fase}
            src={faseMeta[fase].icoon}
            alt={faseMeta[fase].label}
            title={faseMeta[fase].label}
            width={32}
            height={39}
            className="h-9 w-auto"
          />
        ))}
      </div>

      <div className="mt-4">
        <CategorieView categorie={gevonden} />
      </div>

      {plaatsen.length > 0 && (
        <section className="mt-10 border-t border-zand pt-6">
          <h2 className="font-display text-xl text-antraciet">Zoek per plaats</h2>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 font-body">
            {plaatsen.map((plaats) => (
              <li key={plaats}>
                <Link
                  href={`/${gevonden.slug}/${encodeURIComponent(plaats)}`}
                  className="text-antraciet hover:text-terracotta-donker"
                >
                  {plaats}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10 border-t border-zand pt-8">
        <h2 className="font-display text-2xl text-antraciet">
          Aanbieders — {gevonden.naam}
        </h2>
        <div className="mt-6">
          <CategorieResultaat providers={providers} />
        </div>
      </section>
    </SiteShell>
  );
}
