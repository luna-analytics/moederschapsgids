import Link from "next/link";
import type { LiveProvider, ScrapedProvider } from "@/lib/data/providers";

/**
 * De kern van het grijs/actief-patroon.
 *   - live: in kleur, klikbaar naar het profiel;
 *   - scraped: grijs, NIET klikbaar (ook niet via directe URL — dat bewaakt RLS),
 *     met de oproep "Is dit jouw praktijk? Maak je profiel compleet".
 * Structuurtaal: een lijst met haarlijnen, geen schaduwkaarten.
 */

function LiveRegel({ provider }: { provider: LiveProvider }) {
  return (
    <li className="border-b border-zand py-4">
      <Link
        href={`/praktijk/${provider.slug}`}
        className="group flex items-baseline justify-between gap-4"
      >
        <span>
          <span className="font-display text-lg text-antraciet group-hover:text-terracotta-donker">
            {provider.praktijknaam}
          </span>
          <span className="ml-3 font-body text-sm text-antraciet/70">{provider.plaats}</span>
        </span>
        <span className="shrink-0 font-body text-sm text-terracotta-donker">Bekijk profiel →</span>
      </Link>
    </li>
  );
}

function ScrapedRegel({ provider }: { provider: ScrapedProvider }) {
  return (
    <li className="border-b border-zand py-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span>
          {/* Grijs en niet klikbaar. */}
          <span className="font-display text-lg text-antraciet/45">{provider.praktijknaam}</span>
          <span className="ml-3 font-body text-sm text-antraciet/40">{provider.plaats}</span>
        </span>
        <Link
          href="/aanmelden"
          className="font-body text-sm text-antraciet/70 underline decoration-zand underline-offset-4 hover:text-terracotta-donker"
        >
          Is dit jouw praktijk? Maak je profiel compleet
        </Link>
      </div>
    </li>
  );
}

export function ProviderLijst({
  live,
  scraped,
}: {
  live: LiveProvider[];
  scraped: ScrapedProvider[];
}) {
  return (
    <ul className="border-t border-zand">
      {live.map((p) => (
        <LiveRegel key={p.id} provider={p} />
      ))}
      {scraped.map((p) => (
        <ScrapedRegel key={p.id} provider={p} />
      ))}
    </ul>
  );
}
