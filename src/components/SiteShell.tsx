import Link from "next/link";
import { Shell } from "@/motor/components";
import { siteConfig, hoofdNav } from "@/config/site.config";

/**
 * Projectlaag-wrapper rond de generieke motor-Shell: vult merk (Fraunces-woordmerk)
 * en de footer met projectinhoud in. De motor blijft zo projectwoord-vrij.
 *
 * Let op: de aangeleverde logo-PNG's hebben een ingebakken blauwe achtergrond en
 * zijn dus niet bruikbaar op linnen. Tot M transparante/SVG-exports levert gebruiken
 * we het woordmerk in de kop en een merk-gekleurd SVG-favicon (app/icon.svg).
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const footer = (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="max-w-sm">
        <p className="font-display text-lg text-antraciet">{siteConfig.naam}</p>
        <p className="mt-1">{siteConfig.omschrijving}</p>
      </div>
      <nav aria-label="Footer">
        <ul className="flex flex-col gap-2">
          <li>
            <Link href="/zorgverleners" className="hover:text-terracotta-donker">
              Zorgverleners
            </Link>
          </li>
          <li>
            <Link href="/over" className="hover:text-terracotta-donker">
              Over ons
            </Link>
          </li>
          <li>
            <Link href="/aanmelden" className="hover:text-terracotta-donker">
              Aanmelden
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );

  return (
    <Shell siteName={siteConfig.naam} nav={hoofdNav()} footer={footer}>
      {children}
    </Shell>
  );
}
