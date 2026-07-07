import { SiteShell } from "@/components/SiteShell";
import { KnopLink } from "@/components/ui";

export default function NietGevonden() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-lg py-16 text-center">
        <p className="font-body text-sm uppercase tracking-wide text-antraciet/60">404</p>
        <h1 className="mt-2 font-display text-4xl text-antraciet">
          Deze pagina konden we niet vinden
        </h1>
        <p className="mt-4 font-body text-antraciet/80">
          Misschien is de pagina verplaatst, of bestaat deze (nog) niet. Ga terug naar de
          start en zoek op je woonplaats of fase.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <KnopLink href="/">Naar de homepage</KnopLink>
          <KnopLink href="/zorgverleners" variant="secundair">
            Bekijk zorgverleners
          </KnopLink>
        </div>
      </div>
    </SiteShell>
  );
}
