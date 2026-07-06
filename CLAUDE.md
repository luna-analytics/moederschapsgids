# Spelregels (naslag staat in PROJECT_PLAN.md, lees die bij twijfel)

## Stack (nooit van afwijken zonder expliciete beslissing van M)
- Next.js App Router + TypeScript
- Tailwind + shadcn/ui; alle stijl via design tokens uit tailwind.config en site.config.ts; nergens losse hexwaarden of projectwoorden in componenten
- Supabase (Postgres, Auth via magic link, Storage); schemawijzigingen alleen via migrations
- Leaflet + OpenStreetMap, geen Google Maps
- Vercel; alles blijft binnen gratis tiers
- Alle sitetekst in het Nederlands

## Architectuur
- Drie lagen strikt gescheiden: motor (componenten, contract, registry, nul projectwoorden), configuratie (site.config.ts), data (Supabase)
- Elke categorie via de registry en het contract in PROJECT_PLAN.md, nooit erbuiten om bouwen
- Vermeldingen met status scraped zijn nooit klikbaar naar een profielpagina, ook niet via directe URL
- Wijzigingen aan live profielen alleen via de profile_edits wachtrij
- Claims over zorg of vergoeding alleen met bronvermelding, anders niet live

## Werkwijze
- Altijd eerst een plan (Plan mode), wachten op akkoord van M, dan pas bouwen
- Een taak per sessie; taken staan in docs/BUILD_CHECKLIST.md
- Menselijke poorten nooit overslaan (zie checklist en docs/PIPELINE_CATEGORIE.md)
- Na elke afgeronde taak: commit met duidelijke message en push
- Bij "Close the day": checklist nalopen, af te vinken [C]-items voorstellen met bewijs, vragen naar [M]-items, eerste taak van morgen noteren; afvinken alleen na akkoord van M

## Automatisch bijhouden
- docs/CHANGELOG.md na elke taak; docs/DECISIONS.md bij elke keuze met alternatieven
- Nieuwe omgevingsvariabelen op naam documenteren in de README, nooit waarden
- Nooit .env of credentials committen
