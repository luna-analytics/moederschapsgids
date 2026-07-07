import { describe, it, expect } from "vitest";
import { kleuren } from "./tokens";

/** WCAG relatieve luminantie voor een #rrggbb-hex. */
function luminantie(hex: string): number {
  const kanaal = (n: number) => {
    const c = n / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 0.2126 * kanaal(r) + 0.7152 * kanaal(g) + 0.0722 * kanaal(b);
}

function contrast(a: string, b: string): number {
  const la = luminantie(a);
  const lb = luminantie(b);
  const [licht, donker] = la > lb ? [la, lb] : [lb, la];
  return (licht + 0.05) / (donker + 0.05);
}

describe("kleur-tokens en toegankelijkheid (WCAG AA)", () => {
  it("terracotta-donker haalt AA-contrast (>= 4.5) op linnen", () => {
    expect(contrast(kleuren.terracottaDonker, kleuren.linnen)).toBeGreaterThanOrEqual(4.5);
  });

  it("gewone terracotta haalt dat niet — daarom bestaat de donkere variant", () => {
    // Documenteert de brandbook-regel: terracotta nooit voor kleine tekst.
    expect(contrast(kleuren.terracotta, kleuren.linnen)).toBeLessThan(4.5);
  });

  it("bodytekst antraciet op linnen haalt ruim AA", () => {
    expect(contrast(kleuren.antraciet, kleuren.linnen)).toBeGreaterThanOrEqual(4.5);
  });
});
