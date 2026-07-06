# BUILD_CHECKLIST

Plaats dit bestand als docs/BUILD_CHECKLIST.md.
Eigenaren: [M] Marjolein, [C] Claude Code. Afvinken via Close the day.

M-tijdbudget: circa 8 uur actief, verdeeld over setup, vier poorten, één
tussenstap in Blok 1, en de livegang. Claude Code werkt per blok autonoom
door; de commit na elke taak blijft het savepoint, dus terugdraaien kost
niets.

## Setup (M, eenmalig, ~2 uur)

- [ ] [M 60m] Domein registreren, Supabase-project aanmaken, Vercel en
      GitHub-repo koppelen, git init met .gitignore eerst, 2FA aanzetten
      op GitHub, Supabase en Vercel
- [ ] [M 30m] Claude Code CLI en VS Code-extensie installeren, inloggen
      met Pro-account, Cline-extensie uitzetten
- [ ] [M 30m] Eerste sessie: "Lees CLAUDE.md en PROJECT_PLAN.md, stel je
      vragen, bouw nog niets", en de vragen beantwoorden

## Blok 1: skelet en publieke site (C autonoom, met 1 tussenstap)

- [ ] [C] Fundament: Next.js skelet (TypeScript strict), design tokens,
      site.config.ts, registry-mechaniek, migrations, seed met 15
      voorbeelden (mix grijs en live), GitHub Actions CI (lint,
      typecheck, tests, build bij elke push). Nog geen pagina's.
- [ ] [C] Eén dummy-categorie door de registry, als bewijs dat het
      stramien werkt (categorie, menu-item en overzichtskaart in dezelfde
      layout)
- [ ] [M 5m] TUSSENSTAP: dummy-categorie bekijken, stramien akkoord.
      Klopt het niet, eerst het registry-mechaniek laten herstellen: hier
      bouwt de rest op verder.
- [ ] [C] Homepage met fase-blokken, zoekbalk met autocomplete en
      aanmeld-knop voor zorgverleners
- [ ] [C] Categorie- en plaatspagina's met grijs/actief, profielpagina,
      kaart met clustering, plus nette lege-, fout- en 404-staten in
      huisstijl (lege plaatspagina toont de aanmeld-oproep)
- [ ] [M 60m] POORT 1: doorklikken op mobiel, design en structuur akkoord

## Blok 2: claim flow, tags en admin (C autonoom)

- [ ] [C] Magic link auth, claimformulier met aanpak-tags (minimaal twee
      verplicht) en jaartarief-akkoord
- [ ] [C] Moderatiewachtrij, profile_edits, providertabel, CSV-import met
      dedupe, tagbeheer, knop markeer betaald, gratis-jaar-toggle
- [ ] [C] Statistieken per provider
- [ ] [C] RLS-policies plus geautomatiseerde RLS-tests (publiek kan geen
      e-mailadressen of niet-live profielen lezen) en smoke-tests op de
      kritieke flows, testresultaat tonen
- [ ] [C] Teksten-beheer in de admin: alle contentblokken en
      e-mailtemplates bewerkbaar met variabelen en voorbeeldweergave,
      geseed vanuit copy/
- [ ] [C] Mailinglijst in de admin: geclaimde aanbieders met CSV-export
      en broadcast via Resend (nooit naar alleen-gescrapete adressen)
- [ ] [M 75m] POORT 2: de hele flow zelf doorlopen als testaanbieder,
      goedkeuren, betaald markeren, een sitetekst aanpassen in de admin
      en live zien veranderen, en een proefmail naar jezelf sturen

## Blok 3: data (C autonoom, alleen gratis openbare bronnen)

- [ ] [C] Scrapers voor de zes categorieen op registers en openbare
      lijsten, geocoding via Nominatim, import als status scraped
- [ ] [M 60m] POORT 3: steekproef van 10 per categorie tegen de bron,
      rare uitschieters verbergen

## Blok 4: livegang

- [ ] [C] Sitemap, metadata, schema.org, breadcrumbs, Lighthouse mobiel
      90 of hoger
- [ ] [C] Pagina's /voorwaarden en /privacy vullen vanuit juridisch/ map,
      voettekst-links, knop "verwijder mijn vermelding" op grijze
      vermeldingen
- [ ] [C] Vercel Analytics aanzetten (gratis, privacyvriendelijk)
- [ ] [C] Automatisch beheer: verleng-cron met stats-mail en
      auto-terugval naar grijs, directe verwijderknop, claim-notificatie
      en automatische goedkeuringsmail via Resend
- [ ] [M 10m] Resend-account aanmaken, API-key in .env.local en Vercel
- [ ] [M 15m] Juridische concepten nalezen, invulvelden vullen (KVK, IBAN,
      e-mailadres); jurist-check inplannen of risico bewust accepteren
- [ ] [M 15m] E-mailadres aanmaken (bijv. via de domein-registrar) en in
      site.config.ts zetten
- [ ] [M 60m] POORT 4: eindcheck en livegang, domein definitief
- [ ] [M 15m] Google Search Console: domein verifieren en sitemap indienen
- [ ] [M 60m] Eerste 10 tot 20 persoonlijke uitnodigingen versturen met de
      template uit copy/faq-en-emails.md (warm netwerk, gratis jaar via de
      admin-toggle)

## Doorlopend na livegang

Zie docs/BEHEER.md voor het volledige maandritme binnen 2 uur.
- [ ] [M ~10m per claim] Claim beoordelen en goedkeuren (mail gaat
      vanzelf), na ontvangst betaling betaald_tot zetten
- [ ] [M 5m per maand] Database-export als back-up via het
      Supabase-dashboard
- [ ] [C] Scrapers opnieuw draaien op verzoek van M (per kwartaal)

Totaal M: circa 8 uur actief. Kalendertijd: 2 tot 3 weken, want elke
C-sessie wordt door M gestart.
