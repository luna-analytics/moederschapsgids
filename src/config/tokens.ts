/**
 * Design tokens — de ENIGE plek in de codebase met hexwaarden.
 * tailwind.config.ts mapt deze op semantische classnames (bg-linnen, text-antraciet, ...).
 * Componenten gebruiken nooit losse hexwaarden; altijd de semantische token.
 * Bron van waarheid: brand/brandbook.md (Kleurenpalet).
 */

export const kleuren = {
  /** Warme off-white, primaire achtergrond. */
  linnen: "#F5F0E8",
  /** Gedempt aards groen, primaire merkkleur (o.a. live-markers op de kaart). */
  sage: "#8A9A7B",
  /** Accent: knoppen, links, actieve status, de figuur in het logo. */
  terracotta: "#C4744F",
  /**
   * Donkerder terracotta voor tekst/knoppen die AA-contrast moeten halen.
   * ~5:1 op linnen (terracotta zelf haalt maar ~3:1 en mag niet voor kleine tekst).
   */
  terracottaDonker: "#A0502F",
  /** Diepe warme houtskool, primaire tekstkleur. */
  antraciet: "#3A342C",
  /** Secundaire neutraal: vlakken, kaders, subtiele scheidingen. */
  zand: "#D4C5B0",
} as const;

/** Hoekradius: maximaal 6px, alleen op knoppen en invoervelden (brandbook: structuurtaal). */
export const radius = {
  control: "6px",
} as const;

/** CSS-variabelenamen die next/font in de layout aan de fonts koppelt. */
export const fontVars = {
  display: "--font-display",
  body: "--font-body",
} as const;

export type Kleur = keyof typeof kleuren;
