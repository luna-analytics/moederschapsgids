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
- Rest van de code (app, components, migrations) ontstaat vanaf fase 1,
  gebouwd door Claude Code, niet vooraf aangemaakt
