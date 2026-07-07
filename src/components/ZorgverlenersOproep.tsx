import { KnopLink } from "./ui";

/**
 * Het zorgverleners-blok (copy/over-en-hoe-het-werkt.md). Prominent op de homepage
 * en op /aanmelden, en als vriendelijke oproep bij lege lijsten. Plat sage-vlak met
 * haarlijn, geen schaduwkaart.
 */
export function ZorgverlenersOproep({ compact = false }: { compact?: boolean }) {
  return (
    <section className="border border-zand bg-sage/15 p-8">
      <h2 className={`font-display text-antraciet ${compact ? "text-2xl" : "text-3xl"}`}>
        Geboortezorgverlener, of bied jij een dienst van kinderwens tot moederschap?
      </h2>
      {!compact && (
        <p className="mt-4 max-w-2xl font-body text-antraciet/90">
          Voeg je toe en maak je profiel compleet. Vertel zelf je verhaal: foto&apos;s, je
          aanpak, je tags en een link naar je website. Sta je er al grijs bij? Dan claim je
          die vermelding met een klik. Geen tussenpartij, geen commissie op je boekingen:
          jouw profiel, jouw klanten.
        </p>
      )}
      <div className="mt-6">
        <KnopLink href="/aanmelden">Voeg je toe en maak je profiel compleet</KnopLink>
      </div>
    </section>
  );
}
