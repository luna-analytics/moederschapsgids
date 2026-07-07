import { KnopLink } from "./ui";

/**
 * Nette lege staat in huisstijl. Standaard de aanmeld-oproep ("Ken jij hier een
 * goede aanbieder?") zoals gevraagd voor lege plaatspagina's.
 */
export function LegeStaat({
  titel = "Nog geen aanbieders hier",
  tekst = "We hebben hier nog niemand in de gids. Ken jij een goede aanbieder in de buurt, of ben je er zelf een?",
  actieLabel = "Meld een aanbieder aan",
  actieHref = "/aanmelden",
}: {
  titel?: string;
  tekst?: string;
  actieLabel?: string;
  actieHref?: string;
}) {
  return (
    <div className="border border-dashed border-zand bg-linnen p-10 text-center">
      <h2 className="font-display text-2xl text-antraciet">{titel}</h2>
      <p className="mx-auto mt-3 max-w-md font-body text-antraciet/80">{tekst}</p>
      <div className="mt-6 flex justify-center">
        <KnopLink href={actieHref}>{actieLabel}</KnopLink>
      </div>
    </div>
  );
}
