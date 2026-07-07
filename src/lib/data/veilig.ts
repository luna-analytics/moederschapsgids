/**
 * Kleine helper voor overzichts-/lijstdata: vangt fouten (bv. database onbereikbaar
 * tijdens een CI-build met placeholder-env) en geeft een veilige fallback terug, in
 * plaats van de build/pagina te laten crashen. Fouten worden wel gelogd. Detail-
 * pagina's gebruiken dit NIET: die horen bij een echte fout een foutstaat of 404 te
 * tonen.
 */
export async function veiligeData<T>(
  fn: () => Promise<T>,
  fallback: T,
  context: string,
): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    console.error(`[data] ${context} faalde, fallback gebruikt:`, e);
    return fallback;
  }
}
