import { z } from "zod";

/**
 * Motor-laag: NUL projectwoorden. Dit bestand kent geen merknaam, geen concrete
 * categorienamen en geen hexwaarden — alleen de VORM waaraan elke categorie moet
 * voldoen. De concrete invulling komt uit de configuratielaag (src/config).
 *
 * Het contract is de belofte uit PROJECT_PLAN.md ("Contract per categorie"): elke
 * categorie levert verplicht slug, naam, omschrijving, relevante fase(s),
 * vergoedingsinformatie MET bron, hoe kies je een goede aanbieder, en een
 * bronvermelding. Claims over zorg of vergoeding mogen alleen live met bron.
 */

export const FASES = [
  "kinderwens",
  "zwangerschap",
  "bevalling",
  "postpartum",
  "moederschap",
] as const;

export type Fase = (typeof FASES)[number];

/** Vergoeding is een claim over zorg: nooit zonder bronvermelding (spelregel). */
export const vergoedingSchema = z.object({
  status: z.enum(["ja", "nee", "soms"]),
  toelichting: z.string().min(1),
  bron: z.string().min(1),
});

const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug mag alleen a-z, 0-9 en koppeltekens bevatten");

export const categorieContractSchema = z.object({
  slug: slugSchema,
  naam: z.string().min(1),
  omschrijving: z.string().min(1),
  fases: z.array(z.enum(FASES)).min(1),
  vergoeding: vergoedingSchema,
  hoeKiesJe: z.array(z.string().min(1)).min(1),
  bron: z.string().min(1),
  volgorde: z.number().int().nonnegative(),
});

export type CategorieContract = z.infer<typeof categorieContractSchema>;
export type Vergoeding = z.infer<typeof vergoedingSchema>;
