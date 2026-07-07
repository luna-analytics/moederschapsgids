import Link from "next/link";
import type { CategorieContract } from "../contract";

/**
 * Overzichtstegel voor één categorie, gevoed uit het contract. Plat vlak met een
 * haarlijn-kader (border-zand), geen ronde hoeken op het vlak zelf, geen schaduw.
 * Verschijnt op de homepage en op plaatspagina's — telkens in dezelfde layout.
 */
export function CategorieTegel({ categorie }: { categorie: CategorieContract }) {
  return (
    <Link
      href={`/${categorie.slug}`}
      className="block border border-zand bg-linnen p-6 hover:border-terracotta-donker"
    >
      <h3 className="font-display text-xl text-antraciet">{categorie.naam}</h3>
      <p className="mt-2 font-body text-sm text-antraciet/80">
        {categorie.omschrijving}
      </p>
    </Link>
  );
}
