import type { CategorieContract } from "@/motor";

/**
 * De zes startcategorieën (PROJECT_PLAN). Ze staan hier in de configuratielaag en
 * worden in site.config.ts in de registry gezet; de motor genereert er menu-items,
 * tegels en pagina's uit.
 *
 * Bewust nog ZONDER `vergoeding` en `hoeKiesJe`: dat zijn zorg-/redactieclaims die
 * pas via de pipeline worden geschreven en door M goedgekeurd (docs/PIPELINE_
 * CATEGORIE.md, stap 4 "Verrijken [C stelt voor, M keurt]"). Tot die tijd tonen de
 * categoriepagina's de omschrijving en de aanbieders, geen ongefundeerde claim.
 */
export const categorieen: CategorieContract[] = [
  {
    slug: "zwangerschapsyoga",
    naam: "Zwangerschapsyoga",
    omschrijving:
      "Yoga afgestemd op de zwangerschap: zachte beweging, ademwerk en ontspanning, " +
      "met aandacht voor de bekkenbodem. Vaak in kleine groepen, soms met postnatale " +
      "lessen of een terugkomles met baby.",
    fases: ["zwangerschap", "postpartum"],
    volgorde: 1,
  },
  {
    slug: "bevallingscursus",
    naam: "Bevallingscursus",
    omschrijving:
      "Voorbereiding op de bevalling, van hypnobirthing tot haptonomie. Je leert " +
      "omgaan met weeën, ademhaling en ontspanning, vaak samen met je partner.",
    fases: ["zwangerschap", "bevalling"],
    volgorde: 2,
  },
  {
    slug: "bekkenfysiotherapie",
    naam: "Bekkenfysiotherapie",
    omschrijving:
      "Gespecialiseerde fysiotherapie voor het bekken en de bekkenbodem rond de " +
      "zwangerschap en na de bevalling. Voor klachten als bekkenpijn en " +
      "bekkenbodemproblemen, met aandacht voor het hele lichaam.",
    fases: ["zwangerschap", "postpartum"],
    volgorde: 3,
  },
  {
    slug: "zwangerschapsfysiotherapie",
    naam: "Zwangerschapsfysiotherapie",
    omschrijving:
      "Begeleiding bij houding, beweging en klachten tijdens de zwangerschap, zoals " +
      "rug- en bekkenpijn. Vaak in samenwerking met je verloskundige.",
    fases: ["zwangerschap"],
    volgorde: 4,
  },
  {
    slug: "doula",
    naam: "Doula",
    omschrijving:
      "Continue, niet-medische begeleiding voor, tijdens en na de bevalling. Een " +
      "doula ondersteunt jou en je partner, thuis of in het ziekenhuis, en helpt bij " +
      "je geboorteplan.",
    fases: ["zwangerschap", "bevalling", "postpartum"],
    volgorde: 5,
  },
  {
    slug: "zwangerschapsmassage",
    naam: "Zwangerschapsmassage",
    omschrijving:
      "Massage gericht op ontspanning en verlichting van zwangerschapsklachten, met " +
      "aandacht voor bekken en onderrug. Soms ook aan huis of als postnatale massage.",
    fases: ["zwangerschap"],
    volgorde: 6,
  },
];
