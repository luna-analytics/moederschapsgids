import { describe, it, expect } from "vitest";
import { siteConfig, categorieRegistry, hoofdNav } from "./site.config";

describe("site.config", () => {
  it("valt terug op een merknaam als de env ontbreekt", () => {
    // In de testomgeving is NEXT_PUBLIC_SITE_NAME niet gezet: fallback verwacht.
    expect(siteConfig.naam).toBe("Moederschapsgids");
  });

  it("heeft de drie start-provincies", () => {
    expect(siteConfig.provincies).toHaveLength(3);
    expect(siteConfig.provincies).toContain("Utrecht");
  });

  it("registreert de voorbeeldcategorie in de registry", () => {
    expect(categorieRegistry.has("voorbeeld-categorie")).toBe(true);
  });

  it("zet elke geregistreerde categorie automatisch in het menu", () => {
    const hrefs = hoofdNav().map((item) => item.href);
    expect(hrefs).toContain("/voorbeeld-categorie");
  });
});
