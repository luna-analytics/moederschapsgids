import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { Breadcrumbs } from "@/components/ui";
import { LegeStaat } from "@/components/LegeStaat";
import { siteConfig, categorieRegistry } from "@/config/site.config";
import { getProvincieVermeldingen } from "@/lib/data/providers";
import { veiligeData } from "@/lib/data/veilig";

export const revalidate = 3600;
export const dynamicParams = false; // Alleen actieve provincies; rest → 404.

function slugNaarProvincie(slug: string): string | undefined {
  return siteConfig.provincies.find(
    (p) => p.toLowerCase() === decodeURIComponent(slug).toLowerCase(),
  );
}

export function generateStaticParams() {
  return siteConfig.provincies.map((p) => ({ provincie: p }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ provincie: string }>;
}): Promise<Metadata> {
  const { provincie } = await params;
  const naam = slugNaarProvincie(provincie);
  if (!naam) return {};
  return {
    title: `Zorgverleners in ${naam}`,
    description: `Overzicht van zorgverleners rondom zwangerschap en moederschap in ${naam}.`,
  };
}

export default async function ProvinciePagina({
  params,
}: {
  params: Promise<{ provincie: string }>;
}) {
  const { provincie } = await params;
  const naam = slugNaarProvincie(provincie);
  if (!naam) notFound();

  const vermeldingen = await veiligeData(
    () => getProvincieVermeldingen(naam),
    [],
    `provincie ${naam}`,
  );

  const categorieNaam = (slug: string) => categorieRegistry.bySlug(slug)?.naam ?? slug;

  return (
    <SiteShell>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: naam }]} />
      <h1 className="font-display text-4xl text-antraciet">Zorgverleners in {naam}</h1>
      <p className="mt-3 max-w-2xl font-body text-lg text-antraciet/90">
        Alle aanbieders in {naam}, van geclaimd (in kleur) tot nog niet geclaimd (grijs).
      </p>

      <div className="mt-8">
        {vermeldingen.length === 0 ? (
          <LegeStaat
            titel={`Nog geen aanbieders in ${naam}`}
            tekst="Ken jij hier een goede aanbieder, of ben je er zelf een?"
          />
        ) : (
          <ul className="border-t border-zand">
            {vermeldingen.map((v, i) => (
              <li key={`${v.praktijknaam}-${i}`} className="border-b border-zand py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span>
                    {v.live && v.slug ? (
                      <Link
                        href={`/praktijk/${v.slug}`}
                        className="font-display text-lg text-antraciet hover:text-terracotta-donker"
                      >
                        {v.praktijknaam}
                      </Link>
                    ) : (
                      <span className="font-display text-lg text-antraciet/45">
                        {v.praktijknaam}
                      </span>
                    )}
                    <span className="ml-3 font-body text-sm text-antraciet/60">{v.plaats}</span>
                  </span>
                  <span className="font-body text-sm text-antraciet/70">
                    {v.categorie_slugs.map(categorieNaam).join(", ")}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SiteShell>
  );
}
