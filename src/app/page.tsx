import { Shell, CategorieTegel } from "@/motor/components";
import { siteConfig, categorieRegistry, hoofdNav } from "@/config/site.config";

/**
 * SCAFFOLD-INDEX — bewijs van het stramien, GEEN echte homepage. Deze pagina wordt
 * na de TUSSENSTAP vervangen door de echte homepage (fase-blokken, zoekbalk,
 * zorgverleners-blok). Nu laat ze alleen zien dat de registry automatisch de
 * navigatie en de overzichtstegels voedt: registreer een categorie en ze
 * verschijnt hier én in het menu, zonder extra code.
 */
export default function Home() {
  const categorieen = categorieRegistry.all();

  return (
    <Shell siteName={siteConfig.naam} nav={hoofdNav()}>
      <p className="font-body text-sm uppercase tracking-wide text-antraciet/70">
        Stramien-bewijs · wordt vervangen door de echte homepage
      </p>
      <h1 className="mt-2 font-display text-4xl text-antraciet">
        Registry-stramien werkt
      </h1>
      <p className="mt-4 max-w-2xl font-body text-lg text-antraciet/90">
        De onderstaande tegels en de menu-items hierboven komen automatisch uit de
        categorie-registry. Elke categorie die via de registry wordt geregistreerd,
        krijgt in dezelfde layout een menu-item, een tegel en een eigen pagina.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categorieen.map((categorie) => (
          <CategorieTegel key={categorie.slug} categorie={categorie} />
        ))}
      </div>
    </Shell>
  );
}
