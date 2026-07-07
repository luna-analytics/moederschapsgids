import type { CategorieContract } from "@/motor";

/**
 * DUMMY-categorie — bewust een voorbeeld, geen echte dienst. Dient alleen om te
 * bewijzen dat het registry-stramien werkt: één registratie levert automatisch
 * menu-item, overzichtstegel en categoriepagina in dezelfde layout.
 *
 * De zes echte startcategorieën (zwangerschapsyoga, bevallingscursus,
 * bekkenfysiotherapie, zwangerschapsfysiotherapie, doula, zwangerschapsmassage)
 * worden pas geregistreerd bij hun eigen pipeline-taken (zie
 * docs/PIPELINE_CATEGORIE.md). Tot die tijd staat alleen deze voorbeeldcategorie
 * in de code-registry.
 */
export const voorbeeldCategorie: CategorieContract = {
  slug: "voorbeeld-categorie",
  naam: "Voorbeeldcategorie",
  omschrijving:
    "Een voorbeeldcategorie die enkel het stramien demonstreert. Zodra een echte " +
    "categorie via de pipeline wordt geregistreerd, verschijnt die op precies " +
    "dezelfde manier: als menu-item, als tegel en als eigen pagina.",
  fases: ["zwangerschap"],
  vergoeding: {
    status: "soms",
    toelichting:
      "Voorbeeldtekst: of iets vergoed wordt hangt af van de polis. Dit is geen " +
      "echte vergoedingsclaim.",
    bron: "Voorbeeldbron (placeholder, geen echte verwijzing)",
  },
  hoeKiesJe: [
    "Voorbeeldcriterium: kijk of de aanbieder bij jouw fase past.",
    "Voorbeeldcriterium: vraag naar aanpak en ervaring.",
  ],
  bron: "Voorbeeldbron (placeholder)",
  volgorde: 1,
};
