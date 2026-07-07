import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { Breadcrumbs } from "@/components/ui";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Over ons",
  description: siteConfig.omschrijving,
};

export default function OverPagina() {
  return (
    <SiteShell>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Over ons" }]} />
      <article className="max-w-2xl">
        <h1 className="font-display text-4xl text-antraciet">Over {siteConfig.naam}</h1>

        <p className="mt-6 font-body text-lg text-antraciet/90">
          Moeder worden is een reis met fases: kinderwens, zwangerschap, bevalling,
          postpartum en het moederschap zelf. In elke fase bestaat er goede begeleiding, van
          zwangerschapsyoga tot bekkenfysiotherapie, van doula tot massage. Maar dat aanbod
          is versnipperd over losse websites, lijstjes en mond-tot-mond.
        </p>
        <p className="mt-4 font-body text-lg text-antraciet/90">
          {siteConfig.naam} brengt het bij elkaar, op een kaart, doorzoekbaar op jouw
          woonplaats. Zo vind je wat er bij jou in de buurt is, in de fase waarin jij zit.
        </p>

        <h2 className="mt-10 font-display text-2xl text-antraciet">Grijs en in kleur</h2>
        <p className="mt-3 font-body text-antraciet/90">
          Elke praktijk met een volledig profiel (in kleur, klikbaar) is door de
          zorgverlener zelf aangevuld en door ons beoordeeld voordat hij live ging. Grijze
          vermeldingen komen uit openbare bronnen; die praktijk heeft haar profiel nog niet
          geclaimd. Zo zie je altijd het verschil tussen wat wij verzameld hebben en wie er
          zelf staat.
        </p>

        <h2 className="mt-10 font-display text-2xl text-antraciet">Wie hierachter zit</h2>
        <p className="mt-3 font-body text-antraciet/90">
          {siteConfig.naam} is gemaakt door Marjolein: onderzoeker, data-specialist en docent
          zwangerschapsyoga.
        </p>
      </article>
    </SiteShell>
  );
}
