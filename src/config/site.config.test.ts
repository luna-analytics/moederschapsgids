import { describe, it, expect } from "vitest";
import { siteConfig, categorieRegistry, categorieenInFase, hoofdNav } from "./site.config";

describe("site.config", () => {
  it("valt terug op een merknaam als de env ontbreekt", () => {
    // In de testomgeving is NEXT_PUBLIC_SITE_NAME niet gezet: fallback verwacht.
    expect(siteConfig.naam).toBe("Moederschapsgids");
  });

  it("heeft de drie start-provincies", () => {
    expect(siteConfig.provincies).toHaveLength(3);
    expect(siteConfig.provincies).toContain("Utrecht");
  });

  it("registreert de zes startcategorieën in de registry", () => {
    expect(categorieRegistry.all()).toHaveLength(6);
    expect(categorieRegistry.has("zwangerschapsyoga")).toBe(true);
    expect(categorieRegistry.has("doula")).toBe(true);
  });

  it("koppelt categorieën aan de juiste fase", () => {
    const slugs = categorieenInFase("bevalling").map((c) => c.slug);
    expect(slugs).toContain("bevallingscursus");
    expect(slugs).toContain("doula");
    expect(slugs).not.toContain("zwangerschapsmassage");
  });

  it("heeft een navigatie met de vaste items", () => {
    const hrefs = hoofdNav().map((item) => item.href);
    expect(hrefs).toContain("/zorgverleners");
    expect(hrefs).toContain("/over");
    expect(hrefs).toContain("/aanmelden");
  });
});
