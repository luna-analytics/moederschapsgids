import { createRegistry } from "@/motor";
import type { NavItem } from "@/motor/components/SiteNav";
import { voorbeeldCategorie } from "./categories/voorbeeld-categorie";

/**
 * Configuratielaag: alle projectwoorden en concrete keuzes staan hier, niet in de
 * motor. De merknaam komt uit NEXT_PUBLIC_SITE_NAME (naam wijzigen = 1 regel env),
 * met een veilige fallback zodat een pagina nooit leeg is.
 */
export const siteConfig = {
  naam: process.env.NEXT_PUBLIC_SITE_NAME || "Moederschapsgids",
  omschrijving:
    "Gecureerde gids van holistische zorgverleners rondom zwangerschap en " +
    "moederschap, doorzoekbaar op jouw woonplaats.",
  /** Actieve provincies (start: Randstad). Uitbreiden kost alleen data, geen code. */
  provincies: ["Noord-Holland", "Zuid-Holland", "Utrecht"] as const,
} as const;

/**
 * De categorie-registry voor de hele site. Hier worden categorieën geregistreerd;
 * de motor genereert er automatisch menu-items, tegels en pagina's uit. Voorlopig
 * staat alleen de voorbeeldcategorie geregistreerd (bewijs van het stramien).
 */
export const categorieRegistry = createRegistry();
categorieRegistry.register(voorbeeldCategorie);

/** Vaste menu-items, los van de categorieën. */
const basisNav: NavItem[] = [
  { label: "Over ons", href: "/over" },
  { label: "Aanmelden", href: "/aanmelden" },
];

/**
 * Volledige navigatie = de geregistreerde categorieën (automatisch uit de
 * registry) plus de vaste items. Registreer een categorie en ze staat in het menu.
 */
export function hoofdNav(): NavItem[] {
  const categorieItems: NavItem[] = categorieRegistry
    .all()
    .map((c) => ({ label: c.naam, href: `/${c.slug}` }));
  return [...categorieItems, ...basisNav];
}
