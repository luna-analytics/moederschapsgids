"use client";

import { useEffect } from "react";
import Link from "next/link";
import { knopClasses } from "@/components/ui";

/**
 * Foutstaat in huisstijl. Zelfstandig (geen Shell) om client/server-wrijving te
 * vermijden. Toont geen technische details aan de bezoeker.
 */
export default function Fout({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-linnen px-6">
      <div className="max-w-lg text-center">
        <h1 className="font-display text-4xl text-antraciet">Er ging iets mis</h1>
        <p className="mt-4 font-body text-antraciet/80">
          Onze excuses, er trad een fout op. Probeer het opnieuw; blijft het misgaan, kom dan
          later nog eens terug.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button onClick={reset} className={knopClasses("primair")}>
            Probeer opnieuw
          </button>
          <Link href="/" className={knopClasses("secundair")}>
            Naar de homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
