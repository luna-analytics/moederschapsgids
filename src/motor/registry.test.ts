import { describe, it, expect } from "vitest";
import { createRegistry } from "./registry";
import type { CategorieContract } from "./contract";

function maakCategorie(overschrijf: Partial<CategorieContract> = {}): CategorieContract {
  return {
    slug: "test-categorie",
    naam: "Test",
    omschrijving: "Omschrijving",
    fases: ["zwangerschap"],
    vergoeding: { status: "soms", toelichting: "Toelichting", bron: "Bron" },
    hoeKiesJe: ["Criterium"],
    bron: "Bron",
    volgorde: 1,
    ...overschrijf,
  };
}

describe("registry", () => {
  it("registreert een geldige categorie en vindt ze terug op slug", () => {
    const registry = createRegistry();
    registry.register(maakCategorie());
    expect(registry.bySlug("test-categorie")?.naam).toBe("Test");
    expect(registry.has("test-categorie")).toBe(true);
  });

  it("sorteert all() op volgorde", () => {
    const registry = createRegistry();
    registry.register(maakCategorie({ slug: "b", volgorde: 2 }));
    registry.register(maakCategorie({ slug: "a", volgorde: 1 }));
    expect(registry.all().map((c) => c.slug)).toEqual(["a", "b"]);
  });

  it("weigert een dubbele slug", () => {
    const registry = createRegistry();
    registry.register(maakCategorie());
    expect(() => registry.register(maakCategorie())).toThrow(/al geregistreerd/);
  });

  it("weigert een vergoedingsclaim zonder bron (contractschending)", () => {
    const registry = createRegistry();
    const zonderBron = {
      ...maakCategorie(),
      vergoeding: { status: "ja", toelichting: "Wordt vergoed" },
    } as unknown as CategorieContract;
    expect(() => registry.register(zonderBron)).toThrow();
  });

  it("weigert een ongeldige slug", () => {
    const registry = createRegistry();
    expect(() => registry.register(maakCategorie({ slug: "Geen Geldige Slug" }))).toThrow();
  });
});
