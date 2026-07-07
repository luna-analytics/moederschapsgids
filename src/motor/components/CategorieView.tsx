import type { CategorieContract } from "../contract";

const vergoedingLabel: Record<CategorieContract["vergoeding"]["status"], string> = {
  ja: "Wordt vergoed",
  nee: "Wordt niet vergoed",
  soms: "Soms vergoed",
};

/**
 * Categoriepagina, volledig gevoed uit het contract. Toont de vier
 * contract-onderdelen (omschrijving, fases, vergoeding met bron, hoe kies je) in
 * een vaste layout. Vergoeding staat nooit zonder bronvermelding — het contract
 * dwingt dat af, deze view maakt het zichtbaar.
 */
export function CategorieView({ categorie }: { categorie: CategorieContract }) {
  return (
    <article className="max-w-2xl">
      <p className="font-body text-sm uppercase tracking-wide text-antraciet/70">
        {categorie.fases.join(" · ")}
      </p>
      <h1 className="mt-2 font-display text-4xl text-antraciet">{categorie.naam}</h1>
      <p className="mt-4 font-body text-lg text-antraciet/90">
        {categorie.omschrijving}
      </p>

      <section className="mt-10 border-t border-zand pt-6">
        <h2 className="font-display text-2xl text-antraciet">Vergoeding</h2>
        <p className="mt-2 font-body text-antraciet/90">
          <span className="font-medium">
            {vergoedingLabel[categorie.vergoeding.status]}.
          </span>{" "}
          {categorie.vergoeding.toelichting}
        </p>
        <p className="mt-1 font-body text-sm text-antraciet/70">
          Bron: {categorie.vergoeding.bron}
        </p>
      </section>

      <section className="mt-10 border-t border-zand pt-6">
        <h2 className="font-display text-2xl text-antraciet">
          Hoe kies je een goede aanbieder?
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 font-body text-antraciet/90">
          {categorie.hoeKiesJe.map((punt) => (
            <li key={punt}>{punt}</li>
          ))}
        </ul>
      </section>

      <p className="mt-10 border-t border-zand pt-6 font-body text-sm text-antraciet/70">
        Bron: {categorie.bron}
      </p>
    </article>
  );
}
