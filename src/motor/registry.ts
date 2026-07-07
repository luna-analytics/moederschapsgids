import {
  categorieContractSchema,
  type CategorieContract,
} from "./contract";

/**
 * De registry is het mechaniek waar het hele stramien op leunt: één registratie
 * voedt automatisch het menu-item, de overzichtstegel en de categoriepagina —
 * allemaal in dezelfde layout. De motor kent geen enkele concrete categorie; die
 * worden vanuit de configuratielaag geregistreerd.
 *
 * Registreren valideert altijd tegen het contract (Zod). Een categorie die het
 * contract schendt (bv. een vergoedingsclaim zonder bron) komt er niet in — het
 * stramien kan zo nooit een halve categorie tonen.
 */
export interface Registry {
  register(categorie: CategorieContract): void;
  all(): CategorieContract[];
  bySlug(slug: string): CategorieContract | undefined;
  has(slug: string): boolean;
}

export function createRegistry(): Registry {
  const bijSlug = new Map<string, CategorieContract>();

  return {
    register(categorie) {
      const geldig = categorieContractSchema.parse(categorie);
      if (bijSlug.has(geldig.slug)) {
        throw new Error(`Categorie met slug "${geldig.slug}" is al geregistreerd.`);
      }
      bijSlug.set(geldig.slug, geldig);
    },

    all() {
      return [...bijSlug.values()].sort((a, b) => a.volgorde - b.volgorde);
    },

    bySlug(slug) {
      return bijSlug.get(slug);
    },

    has(slug) {
      return bijSlug.has(slug);
    },
  };
}
