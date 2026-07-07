import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Shell, CategorieView } from "@/motor/components";
import { siteConfig, categorieRegistry, hoofdNav } from "@/config/site.config";

/**
 * Generieke categoriepagina, volledig gedreven door de registry. Alleen slugs die
 * geregistreerd zijn bestaan als route (generateStaticParams); een onbekende slug
 * geeft een nette 404. Met alleen de voorbeeldcategorie geregistreerd bestaat nu
 * enkel /voorbeeld-categorie — bewijs dat één registratie een hele pagina oplevert.
 */
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

  return (
    <Shell siteName={siteConfig.naam} nav={hoofdNav()}>
      <CategorieView categorie={gevonden} />
    </Shell>
  );
}
