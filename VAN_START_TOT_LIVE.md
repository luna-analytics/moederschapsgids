# VAN START TOT LIVE

Chronologische handleiding. [JIJ] = doe je zelf. [CLAUDE CODE] = typ je
letterlijk als opdracht in het Claude Code-paneel in VS Code. Volg de
volgorde, sla niets over.

## A. Accounts en installaties (eenmalig)

1. [JIJ] Domein kopen: moederschapsgids.nl via TransIP of Vimexx.
2. [JIJ] GitHub-account, nieuwe lege private repository "moederschapsgids".
3. [JIJ] Supabase-account, nieuw project aanmaken, regio EU kiezen.
4. [JIJ] Vercel-account (inloggen kan met je GitHub-account).
5. [JIJ] Terminal openen, `node -v` intypen. Geen versienummer? Node.js
   installeren via nodejs.org, LTS-versie.
6. [JIJ] Claude Code CLI installeren: `npm install -g @anthropic-ai/claude-code`
7. [JIJ] In VS Code: Extensions, zoek "Claude Code" (uitgever Anthropic),
   installeren, inloggen met je Pro-account.
8. [JIJ] Cline-extensie zoeken en uitschakelen of verwijderen.

## B. Project lokaal zetten

9. [JIJ] Zip uitpakken naar `C:\dev\moederschapsgids`.
10. [JIJ] In VS Code: File > Open Folder > die map.
11. [JIJ] Terminal in VS Code openen (Terminal > New Terminal), uitvoeren:
    ```
    git init
    git add .
    git commit -m "eerste commit: projectplan en merk"
    git remote add origin <jouw-github-repo-url>
    git push -u origin main
    ```

## C. Omgevingsvariabelen

12. [JIJ] Supabase-dashboard > Project Settings > API: Project URL, anon
    key en service_role key kopiëren.
13. [JIJ] Nieuw bestand `.env.local` in de projectroot (staat al in
    .gitignore, komt dus nooit in git):
    ```
    NEXT_PUBLIC_SUPABASE_URL=
    NEXT_PUBLIC_SUPABASE_ANON_KEY=
    SUPABASE_SERVICE_ROLE_KEY=
    ADMIN_EMAIL=<jouw eigen e-mailadres>
    NEXT_PUBLIC_SITE_NAME=Moederschapsgids
    NEXT_PUBLIC_SITE_URL=https://moederschapsgids.nl
    ```

## D. Sessie 1 — verkennen, nog niet bouwen

14. [CLAUDE CODE]
    > Lees CLAUDE.md en PROJECT_PLAN.md. Stel je vragen en maak een
    > analyse. Bouw nog niets.
15. [JIJ] Vragen beantwoorden.

## E. Sessie 2 — Blok 1: skelet en publieke site

16. [CLAUDE CODE]
    > Bouw eerst het fundament uit Blok 1 van docs/BUILD_CHECKLIST.md:
    > Next.js-skelet (TypeScript strict), design tokens, site.config.ts,
    > registry-mechaniek, migrations met seed-data (15 voorbeeldproviders,
    > mix grijs en live), en GitHub Actions CI die bij elke push lint,
    > typecheck, tests en build draait. Bouw nog geen pagina's. Laat daarna één dummy-categorie door
    > de registry zien als bewijs dat het stramien werkt.
17. [JIJ] TUSSENSTAP (5 min): bekijk de dummy-categorie, check of het
    stramien werkt (categorie, menu-item en overzichtskaart in dezelfde
    layout). Akkoord? Ga door naar de volgende opdracht. Klopt er iets
    niet, laat Claude Code het registry-mechaniek eerst herstellen voor
    je verdergaat: hier bouwt alles daarna op verder.
18. [CLAUDE CODE]
    > Bouw nu de rest van Blok 1: homepage met fase-blokken en het
    > zorgverleners-blok uit copy/over-en-hoe-het-werkt.md, categorie- en
    > plaatspagina's met grijs/actief, profielpagina, kaart met
    > clustering. Gebruik brand/brandbook.md, brand/logo, brand/iconen en
    > brand/mockups/website_mockup.png voor het ontwerp. Laat het
    > resultaat zien voor je verdergaat.
19. [JIJ] POORT 1: `npm run dev`, bekijk localhost in de browser en op je
    telefoon, check tegen het brandbook. Akkoord of feedback teruggeven.

## F. Sessie 3 — Blok 2: claim-flow, tags, admin

20. [CLAUDE CODE]
    > Bouw Blok 2 uit docs/BUILD_CHECKLIST.md: magic link auth,
    > claimformulier met de tags uit docs/TAGS_SEED.md (minimaal twee
    > verplicht), moderatiewachtrij, profile_edits, providertabel met
    > CSV-import en dedupe, tagbeheer, knop markeer betaald,
    > gratis-jaar-toggle, statistieken per provider, RLS- en smoke-tests,
    > teksten-beheer in de admin (contentblokken en e-mailtemplates,
    > geseed vanuit copy/) en de mailinglijst van geclaimde aanbieders
    > met CSV-export en broadcast via Resend.
21. [JIJ] POORT 2: doorloop de flow zelf als testaanbieder: claimen, tags
    kiezen, jezelf goedkeuren in de admin, betaald markeren. Pas daarna
    een sitetekst aan in de admin en check dat hij live verandert, en
    stuur een proefmail naar jezelf.

## G. Sessie 4 — Blok 3: data

22. [CLAUDE CODE]
    > Bouw Blok 3 uit docs/BUILD_CHECKLIST.md: scrapers voor de zes
    > categorieen op de bronnen uit PROJECT_PLAN.md, geocoding via
    > Nominatim, import als status scraped. Alleen gratis openbare
    > bronnen.
23. [JIJ] POORT 3: steekproef van 10 per categorie tegen de bron, verberg
    uitschieters via de admin.

## H. Sessie 5 — Blok 4: livegang voorbereiden

24. [CLAUDE CODE]
    > Bouw Blok 4 uit docs/BUILD_CHECKLIST.md: sitemap, metadata,
    > schema.org, breadcrumbs, de pagina's /voorwaarden en /privacy vanuit
    > juridisch/, de directe verwijderknop, Vercel Analytics, en het
    > automatische beheer: verleng-cron met stats-mail en auto-terugval
    > naar grijs, claim-notificatie en goedkeuringsmail via Resend. Haal
    > Lighthouse mobiel naar 90 of hoger.
25. [JIJ] Juridische concepten invullen (KVK, IBAN, e-mailadres), jurist
    laten checken of het risico bewust accepteren.
26. [JIJ] E-mailadres aanmaken, plus een gratis Resend-account; beide
    toevoegen aan .env.local (en straks aan Vercel).

## I. Deployen en domein koppelen

27. [JIJ] Vercel: New Project, importeer de GitHub-repo.
28. [JIJ] Vercel: Project Settings > Environment Variables, dezelfde
    waarden als in .env.local invoeren.
29. [JIJ] Deploy. Elke volgende push naar main deployt vanzelf.
30. [JIJ] Vercel: Project Settings > Domains, moederschapsgids.nl
    toevoegen. Vercel toont de benodigde DNS-records.
31. [JIJ] Bij TransIP/Vimexx: DNS-beheer van moederschapsgids.nl openen,
    de getoonde records toevoegen (meestal A-record en/of CNAME).
32. [JIJ] Wachten op DNS-propagatie (meestal enkele uren, soms tot 24u).
    Vercel regelt het SSL-certificaat automatisch.

## J. Laatste stappen

33. [JIJ] POORT 4: eindcheck op moederschapsgids.nl zelf.
34. [JIJ] Google Search Console: domein toevoegen, verifieren, sitemap
    indienen.
35. [JIJ] Eerste 10 tot 20 uitnodigingen versturen, template uit
    copy/faq-en-emails.md.

Daarna: doorlopend circa 10 minuten per binnenkomende claim.
