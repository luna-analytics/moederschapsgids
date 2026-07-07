import Image from "next/image";
import Link from "next/link";
import { KnopLink } from "./ui";
import { PlaatsZoeker } from "./PlaatsZoeker";
import { fasesVolgorde, faseMeta } from "@/config/fases";
import { categorieenInFase } from "@/config/site.config";

/** Hero: groot Fraunces-kop met één cursief accentwoord (brandbook), plaatszoeker + CTA. */
export function Hero({ plaatsen }: { plaatsen: string[] }) {
  return (
    <section className="py-8">
      <p className="font-body text-sm uppercase tracking-wide text-antraciet/70">
        Van kinderwens tot moederschap
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-tight text-antraciet sm:text-6xl">
        Jouw <em className="italic text-terracotta-donker">complete</em> gids voor moederschap
      </h1>
      <p className="mt-5 max-w-xl font-body text-lg text-antraciet/90">
        Handgekozen holistische zorgverleners rondom zwangerschap en moederschap, bij jou in
        de buurt. Zoek op je woonplaats of blader per fase van de reis.
      </p>
      <div className="mt-8">
        <PlaatsZoeker plaatsen={plaatsen} />
      </div>
      <div className="mt-6">
        <KnopLink href="/zorgverleners" variant="secundair">
          Bekijk alle zorgverleners
        </KnopLink>
      </div>
    </section>
  );
}

/** De vijf fases van de reis, elk met icoon en de bijbehorende categorieën. */
export function FaseBlokken() {
  return (
    <section id="fases" className="border-t border-zand py-12">
      <h2 className="font-display text-3xl text-antraciet">Kies je fase</h2>
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {fasesVolgorde.map((fase) => {
          const meta = faseMeta[fase];
          const categorieen = categorieenInFase(fase);
          return (
            <div key={fase} className="border-t border-zand pt-5">
              <Image
                src={meta.icoon}
                alt=""
                width={56}
                height={69}
                className="h-16 w-auto"
              />
              <h3 className="mt-3 font-display text-xl text-antraciet">{meta.label}</h3>
              <p className="mt-1 font-body text-sm text-antraciet/80">{meta.intro}</p>
              {categorieen.length > 0 ? (
                <ul className="mt-3 space-y-1 font-body">
                  {categorieen.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/${c.slug}`}
                        className="text-antraciet hover:text-terracotta-donker"
                      >
                        {c.naam}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 font-body text-sm italic text-antraciet/60">
                  Binnenkort meer.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** Uitlegblok "hoe de gids werkt" (copy/over-en-hoe-het-werkt.md). */
export function HoeHetWerkt() {
  const stappen = [
    "Kies je fase of zoek op je woonplaats.",
    "Bekijk wie er bij jou in de buurt zit, op de kaart of in de lijst.",
    "Profielen in kleur zijn aangevuld door de zorgverlener zelf en door ons beoordeeld. Klik door voor het verhaal, de aanpak en de website.",
  ];
  return (
    <section className="border-t border-zand py-12">
      <h2 className="font-display text-3xl text-antraciet">Hoe de gids werkt</h2>
      <ol className="mt-6 grid gap-6 sm:grid-cols-3">
        {stappen.map((stap, i) => (
          <li key={i} className="border-t border-zand pt-4">
            <span className="font-display text-2xl text-terracotta-donker">{i + 1}</span>
            <p className="mt-2 font-body text-antraciet/90">{stap}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
