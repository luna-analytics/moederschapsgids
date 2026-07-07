import { ProviderLijst } from "./ProviderLijst";
import { ProviderKaart, type KaartMarker } from "./ProviderKaart";
import { LegeStaat } from "./LegeStaat";
import type { CategorieProviders } from "@/lib/data/providers";

/**
 * Gedeeld resultaatblok voor categorie- en plaatspagina's: kaart (live-markers) +
 * lijst met grijs/actief. Scraped-vermeldingen staan in de lijst maar niet op de
 * kaart: de beperkte scraped-view geeft bewust geen coördinaten prijs (RLS).
 * Bij geen resultaten een nette lege staat met de aanmeld-oproep.
 */
export function CategorieResultaat({
  providers,
  legeTekst,
}: {
  providers: CategorieProviders;
  legeTekst?: string;
}) {
  const { live, scraped } = providers;
  const totaal = live.length + scraped.length;

  if (totaal === 0) {
    return (
      <LegeStaat
        titel="Nog geen aanbieders hier"
        tekst={
          legeTekst ??
          "We hebben hier nog niemand in de gids. Ken jij een goede aanbieder in de buurt?"
        }
      />
    );
  }

  const markers: KaartMarker[] = live
    .filter((p) => p.lat != null && p.lng != null)
    .map((p) => ({
      lat: p.lat as number,
      lng: p.lng as number,
      naam: p.praktijknaam,
      live: true,
      href: `/praktijk/${p.slug}`,
    }));

  return (
    <div className="space-y-8">
      {markers.length > 0 && <ProviderKaart markers={markers} />}
      <div>
        <p className="font-body text-sm text-antraciet/70">
          {live.length} in kleur (geclaimd), {scraped.length} grijs (nog niet geclaimd)
        </p>
        <div className="mt-3">
          <ProviderLijst live={live} scraped={scraped} />
        </div>
      </div>
    </div>
  );
}
