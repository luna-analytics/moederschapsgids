"use client";

import { useState } from "react";
import { knopClasses } from "./ui";

/**
 * Nieuwsbrief-inschrijving met honeypot-spamwering (het verborgen veld "bedrijf"
 * moet leeg blijven). Server-side validatie en throttling gebeuren in de API-route.
 */
export function Nieuwsbrief() {
  const [status, setStatus] = useState<"idle" | "bezig" | "ok" | "fout">("idle");
  const [melding, setMelding] = useState("");

  async function verstuur(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("bezig");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/nieuwsbrief", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          bedrijf: data.get("bedrijf"), // honeypot
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      setMelding("Gelukt! Je staat op de lijst.");
      form.reset();
    } catch {
      setStatus("fout");
      setMelding("Er ging iets mis. Probeer het later nog eens.");
    }
  }

  return (
    <form onSubmit={verstuur} className="max-w-xl">
      <label htmlFor="nieuwsbrief-email" className="block font-body text-sm text-antraciet/80">
        Blijf op de hoogte
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          id="nieuwsbrief-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="jouw@email.nl"
          className="w-full rounded-control border border-zand bg-linnen px-4 py-3 font-body text-antraciet placeholder:text-antraciet/50"
        />
        {/* Honeypot: onzichtbaar voor mensen, ingevuld door bots. */}
        <input
          type="text"
          name="bedrijf"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        <button type="submit" disabled={status === "bezig"} className={knopClasses("primair")}>
          {status === "bezig" ? "Bezig…" : "Inschrijven"}
        </button>
      </div>
      {melding && (
        <p
          role="status"
          className={`mt-2 font-body text-sm ${
            status === "fout" ? "text-terracotta-donker" : "text-antraciet/80"
          }`}
        >
          {melding}
        </p>
      )}
    </form>
  );
}
