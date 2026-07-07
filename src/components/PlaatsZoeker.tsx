"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { knopClasses } from "./ui";

/**
 * Zoeken op woonplaats met autocomplete. Bewust een native datalist: toegankelijk,
 * werkt met toetsenbord en heeft geen extra afhankelijkheid. Bij een bekende plaats
 * navigeren we naar de plaatspagina; anders een korte, nette melding.
 */
export function PlaatsZoeker({ plaatsen }: { plaatsen: string[] }) {
  const router = useRouter();
  const [waarde, setWaarde] = useState("");
  const [fout, setFout] = useState<string | null>(null);

  function zoek(e: React.FormEvent) {
    e.preventDefault();
    const gekozen = plaatsen.find((p) => p.toLowerCase() === waarde.trim().toLowerCase());
    if (!gekozen) {
      setFout("We kennen deze plaats nog niet. Kies een plaats uit de lijst.");
      return;
    }
    router.push(`/plaats/${encodeURIComponent(gekozen)}`);
  }

  return (
    <form onSubmit={zoek} className="max-w-xl">
      <label htmlFor="plaats" className="block font-body text-sm text-antraciet/80">
        Zoek op jouw woonplaats
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          id="plaats"
          name="plaats"
          list="plaatsen-lijst"
          autoComplete="off"
          value={waarde}
          onChange={(e) => {
            setWaarde(e.target.value);
            setFout(null);
          }}
          placeholder="Bijvoorbeeld Utrecht"
          className="w-full rounded-control border border-zand bg-linnen px-4 py-3 font-body text-antraciet placeholder:text-antraciet/50"
        />
        <datalist id="plaatsen-lijst">
          {plaatsen.map((p) => (
            <option key={p} value={p} />
          ))}
        </datalist>
        <button type="submit" className={knopClasses("primair")}>
          Zoek
        </button>
      </div>
      {fout && (
        <p role="alert" className="mt-2 font-body text-sm text-terracotta-donker">
          {fout}
        </p>
      )}
    </form>
  );
}
