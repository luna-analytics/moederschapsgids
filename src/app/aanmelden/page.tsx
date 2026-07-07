import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { Breadcrumbs } from "@/components/ui";
import { ZorgverlenersOproep } from "@/components/ZorgverlenersOproep";

export const metadata: Metadata = {
  title: "Aanmelden",
  description:
    "Voeg je praktijk toe aan de gids of claim je grijze vermelding, en maak je profiel compleet.",
};

const faq = [
  {
    vraag: "Wat kost een vermelding?",
    antwoord:
      "De basisvermelding (naam, plaats, categorie, grijs) is en blijft gratis. Een volledig profiel, in kleur en klikbaar, met foto's, je verhaal, je aanpak-tags en een link naar je website, kost 95 tot 120 euro per jaar.",
  },
  {
    vraag: "Wat levert het op?",
    antwoord:
      "Zwangere vrouwen en moeders zoeken op woonplaats en fase. Jij bent vindbaar op het moment dat zij zoeken. In je profiel zie je zelf hoe vaak je bekeken bent en hoe vaak er is doorgeklikt naar je website.",
  },
  {
    vraag: "Hoe werkt aanmelden?",
    antwoord:
      "Claim je grijze vermelding of meld je nieuw aan, vul je profiel in en kies minimaal twee aanpak-tags. Wij beoordelen je profiel, meestal binnen enkele dagen. Na goedkeuring ontvang je de factuur en gaat je profiel live.",
  },
  {
    vraag: "Waarom tags?",
    antwoord:
      "Bezoekers zoeken op aanpak: holistisch, natuurlijke materialen, trauma-informed. Jij bepaalt zelf welke tags bij jouw praktijk passen.",
  },
  {
    vraag: "Kan ik mijn vermelding laten verwijderen?",
    antwoord:
      "Ja, altijd. Gebruik de knop “verwijder mijn vermelding” op je grijze vermelding of mail ons; we halen je er binnen enkele dagen af.",
  },
  {
    vraag: "Zit er een boekingssysteem of commissie aan vast?",
    antwoord:
      "Nee. Bezoekers klikken door naar jouw eigen website; boekingen en betaling lopen volledig via jou.",
  },
];

export default function AanmeldenPagina() {
  return (
    <SiteShell>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Aanmelden" }]} />
      <h1 className="font-display text-4xl text-antraciet">Zet jezelf op de kaart</h1>

      <div className="mt-8">
        <ZorgverlenersOproep />
      </div>

      {/* De echte claim-flow (inloggen via magic link, profiel invullen, tags kiezen)
          komt in de volgende stap. Deze pagina legt nu uit hoe het werkt. */}
      <p className="mt-6 max-w-2xl font-body text-antraciet/70">
        Het aanmeldformulier met inloggen en profiel invullen komt binnenkort. Wil je nu al
        aangemeld worden of je vermelding claimen? Neem contact op, dan zetten we het samen
        klaar.
      </p>

      <section className="mt-12 border-t border-zand pt-8">
        <h2 className="font-display text-3xl text-antraciet">Veelgestelde vragen</h2>
        <dl className="mt-6 max-w-2xl space-y-6">
          {faq.map((item) => (
            <div key={item.vraag} className="border-t border-zand pt-4">
              <dt className="font-display text-lg text-antraciet">{item.vraag}</dt>
              <dd className="mt-1 font-body text-antraciet/90">{item.antwoord}</dd>
            </div>
          ))}
        </dl>
      </section>
    </SiteShell>
  );
}
