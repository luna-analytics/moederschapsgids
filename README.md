# Moederschapsgids

Gecureerde online gids van holistische zorgverleners rondom moederschap,
van kinderwens tot postpartum. Start: Randstad. Doel: heel Nederland.

## Begin hier

1. Lees VAN_START_TOT_LIVE.md: het exacte draaiboek, stap voor stap, van
   accounts aanmaken tot domein live.
2. STAPPENPLAN.md voor het overzicht op hoofdlijnen.
3. PROJECT_PLAN.md voor wat er precies gebouwd wordt en waarom.
3. CLAUDE.md wordt automatisch door Claude Code gelezen bij elke sessie,
   dat hoef je zelf niet te openen.
4. docs/BUILD_CHECKLIST.md is de taakverdeling per week.

## Eerste opdracht aan Claude Code

"Lees CLAUDE.md en PROJECT_PLAN.md. Stel je vragen en maak een analyse.
Bouw nog niets."

## Mapstructuur

- `docs/` — checklist, pipeline per categorie, changelog, beslissingslog
- `brand/` — brandbook.md (bron van waarheid), logo/, iconen/ (incl. vijf losse fase-iconen), mockups/
- `copy/` — over-pagina, FAQ zorgverleners, e-mailtemplates
- `juridisch/` — concept algemene voorwaarden en privacyverklaring (jurist-check nodig)
- `scripts/` — scraping- en geocodingscripts, komt in fase 4
- `src/` — de code: `motor/` (contract, registry, generieke componenten, nul
  projectwoorden), `config/` (tokens, site.config, categorieën), `lib/`
  (Supabase-clients, env-validatie), `app/` (Next.js App Router)
- `supabase/` — `config.toml`, `migrations/` en `seed.sql`

## Lokaal draaien

1. `npm install`
2. Kopieer de env-namen (zie hieronder) naar `.env.local` en vul je eigen waarden
   in — `.env.local` staat in `.gitignore` en wordt nooit gecommit.
3. Database lokaal (vereist Docker): `npm run db:start` en dan `npm run db:reset`
   (past de migrations toe en laadt `supabase/seed.sql`).
4. `npm run dev` en open http://localhost:3000
5. Kwaliteitschecks (draaien ook in CI bij elke push): `npm run lint`,
   `npm run typecheck`, `npm run test`, `npm run build`.

## Omgevingsvariabelen (alleen namen, nooit waarden)

Zet deze in `.env.local` (lokaal) en in Vercel (productie):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` — alleen server-side, nooit naar de browser
- `ADMIN_EMAIL`
- `NEXT_PUBLIC_SITE_NAME` — merknaam; wijzigen = 1 regel
- `NEXT_PUBLIC_SITE_URL`
- `RESEND_API_KEY` — transactionele mail (vanaf Blok 4)

## Code (ontstaat vanaf fase 1)

De code (`src/`, `supabase/`) wordt door Claude Code gebouwd, niet vooraf
aangemaakt.
