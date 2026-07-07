import { createRegistry, type CategorieContract, type Fase } from "@/motor";
import type { NavItem } from "@/motor/components/SiteNav";
import { categorieen } from "./categories";

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
 * De categorie-registry voor de hele site. De zes startcategorieën worden hier
 * geregistreerd; de motor genereert er automatisch menu-items, tegels en pagina's
 * uit. Registreren valideert tegen het contract (Zod).
 */
export const categorieRegistry = createRegistry();
for (const categorie of categorieen) {
  categorieRegistry.register(categorie);
}

/** Categorieën die (mede) in een bepaalde fase relevant zijn. */
export function categorieenInFase(fase: Fase): CategorieContract[] {
  return categorieRegistry.all().filter((c) => c.fases.includes(fase));
}

/** Vaste menu-items, los van de categorieën. */
const basisNav: NavItem[] = [
  { label: "Over ons", href: "/over" },
  { label: "Aanmelden", href: "/aanmelden" },
];

/**
 * Volledige navigatie = één ingang naar alle zorgverleners plus de vaste items.
 * (De categorieën zelf staan gegroepeerd per fase op de homepage.)
 */
export function hoofdNav(): NavItem[] {
  return [{ label: "Zorgverleners", href: "/zorgverleners" }, ...basisNav];
}
