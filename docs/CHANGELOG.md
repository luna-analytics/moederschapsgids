# CHANGELOG

Plaats dit bestand als docs/CHANGELOG.md. Cline vult aan na elke taak, nieuwste bovenaan.

| Datum | Taak | Resultaat | Commit |
|---|---|---|---|
| 2026-07-07 | Blok 1 — Publieke site | Homepage (hero, fase-blokken met iconen, plaatszoeker met autocomplete, hoe-het-werkt, zorgverleners-oproep, nieuwsbrief+honeypot), categorie-/plaats-/provincie-/profielpagina's met grijs/actief, kaart (Leaflet+OSM, clustering, live-markers), /over, /aanmelden+FAQ, breadcrumbs, nette lege/fout/404-staten. dynamicParams=false → echte 404's (scraped-profiel, onbekende slug/plaats/provincie); lege geldige combi toont aanmeld-oproep. Alles groen (lint/typecheck/13 tests/build); statuscodes en grijs/actief geverifieerd tegen lokale seed. POORT 1 (visuele review op mobiel) staat nog open voor M. | main |
| 2026-07-07 | Blok 1 — Fundament | Next.js App Router (TS strict), tokens+tailwind, motor (contract+registry, nul projectwoorden), 11 migrations + RLS, seed (15 fictieve providers: 12 grijs / 3 live), Supabase-clients + Zod-env, Vitest (12 tests), GitHub Actions CI. Lint/typecheck/test/build groen; `supabase db reset` + RLS-check geverifieerd. | main |
| 2026-07-07 | Blok 1 — Dummy-categorie door de registry | Voorbeeldcategorie geregistreerd; scaffold-index (`/`) toont menu-item + tegel, `/voorbeeld-categorie` toont de categoriepagina uit het contract, onbekende slug → 404. Bewijs van het stramien (TUSSENSTAP-savepoint, wacht op review van M). | main |
