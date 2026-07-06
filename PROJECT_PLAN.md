# PROJECT_PLAN

Werktitel: Moederschapsgids (overal via NEXT_PUBLIC_SITE_NAME, naam wijzigen = 1
regel). Domein: moederschapsgids.nl. "Negen Manen" kan als sfeernaam blijven
bestaan voor het zwangerschapsgedeelte specifiek, verder niet meer gebruikt.

## Doel

Gecureerde online gids van holistische zorgverleners rondom zwangerschap.
Handgekozen aanbod, geen telefoonboek. Bezoekers (zwangere vrouwen) zoeken
op plaats of categorie en vinden aanbieders bij hen in de buurt. Start:
Randstad (Noord-Holland, Zuid-Holland, Utrecht). Uitbreiden naar andere
provincies mag alleen data kosten, nooit nieuwe code. V1 richt zich op
zwangerschap; het datamodel kent fases (kinderwens, zwangerschap,
bevalling, postpartum, moederschap) zodat uitbreiden richting matrescentie
later alleen data en categorieen kost.

## Verdienmodel (context, niets van bouwen in v1)

Twee sporen naast elkaar, niet elkaar uitsluitend.

**Spoor 1: eigen platform, directory-model.** Basisvermelding (gescrapet,
grijs, alleen naam, plaats en categorie) blijft altijd gratis: compleetheid
is de SEO-waarde van de site. Verdienen gebeurt aan het geclaimde profiel:
claimen is een betaald jaarabonnement van 95 tot 120 euro en geeft een
eigen klikbare pagina in kleur met foto's, verhaal, aanpak-tags,
websitelink en optionele kortingscode. Betaling in v1 handmatig per
factuur (M markeert betaald in de admin); Mollie-checkout volgt zodra er
structureel claims binnenkomen. Launch-tactiek: de eerste 10 tot 20
aanbieders uit het warme netwerk kunnen handmatig een gratis jaar krijgen
(admin-toggle), mits hun profiel binnen twee weken compleet is.
Profielstatistieken (weergaven, doorkliks) worden vanaf dag 1 geteld en
zijn het verlengargument. Geen affiliate-tracking (niet betrouwbaar te
meten); een boekingsmodule met commissie is een mogelijke latere stap,
niet in v1.

**Spoor 2: technische draagkracht als bijdrage aan een groter geheel.**
Zie "Samenwerking met organisaties als This is the Village" hieronder.

## Samenwerking met organisaties als This is the Village

Context: This is the Village bouwt bewust niet vanuit individueel
eigenaarschap, individuele winst of klassieke investeerdersstructuren. Ze
noemen dat zelf patriarchaal en willen gedeelde draagkracht: tijd, kennis,
netwerk, financiele ruimte en visie, allemaal als evenwaardige bijdrage.
Ze geven zelf aan op het vlak van bedrijfsstructuur en financiering nog
vast te lopen, dus dit is een open plek, geen dichtgetimmerd proces.

Voorgestelde structuur: platform-coöperativisme, een bestaande, erkende
stroming (precedent: Stocksy United, fotografen-eigendom, 50 tot 75
procent van omzet naar bijdragers, patronage-uitkering bij overschot,
ledenklassen per type bijdrage met eigen bestuursstem). Concreet voor M:

1. Technische draagkracht wordt een eigen ledenklasse, naast wat zij al
   noemen (tijd, kennis, netwerk, visie). Geen individueel eigenaarschap,
   wel een aanwijsbaar, getrackt aandeel.
2. Patronage in plaats van equity: een percentage van platformomzet naar
   wie bouwt en onderhoudt, uitgekeerd als het platform overschot maakt,
   herzien op vaste momenten.
3. Fasering: eerst een eenvoudige overeenkomst met dit principe, pas bij
   echte groei formaliseren naar een coöperatie u.a. (bestaande NL
   rechtsvorm). Bindende afspraken via notaris of jurist, niet zelf
   opstellen.
4. Realistisch verwachtingspatroon: geen groot exit-bedrag zoals bij een
   aandeelhoudersstructuur, wel een doorlopend aandeel zolang het platform
   loopt. Hard plafond aan onbetaalde uren afspreken vóór het eerste
   kennismakingsgesprek, op papier, ongeacht hoe het gesprek zelf voelt.

## Stack

Zie .clinerules. Kort: Next.js App Router + TypeScript, Tailwind +
shadcn/ui met design tokens, Supabase, Leaflet + OpenStreetMap, Vercel.
Alles binnen gratis tiers.

## Drie lagen

1. Motor: componenten, contract, registry-mechaniek. Nul projectwoorden.
2. Configuratie: site.config.ts met SITE_NAME, kleuren, typografie,
   geregistreerde categorieen, actieve provincies, vaste teksten.
3. Data: Supabase.

## Design

Bron van waarheid: brand/brandbook.md (merkverhaal, logo, typografie,
kleuren, fase-iconen, beeldtaal, tone of voice), met de bestanden in
brand/logo, brand/iconen en brand/mockups. Kort: toon is invoelend maar
nuchter. Palet: linnen #F5F0E8 (achtergrond), sage #8A9A7B (primaire
merkkleur), terracotta #C4744F (accent: knoppen, links, actieve status),
antraciet #3A342C (tekst), zand #D4C5B0 (secundaire vlakken, kaders,
subtiele scheidingen). Koppen: Fraunces via next/font in de zachte snit
(font-variation-settings 'SOFT' 100, 'WONK' 1), maximaal een cursief
accentwoord per kop. Lopende tekst, navigatie, knoppen: Karla via
next/font. Logo: het omarming-beeldmerk uit brand/logo (PNG; favicon.png
als basis voor favicons; als M later SVG-exports levert, die verkiezen).
Fase-iconen: de vijf losse bestanden brand/iconen/fase-1-kinderwens.png
tot en met fase-5-moederschap.png, gebruikt bij de fase-blokken op de
homepage en bovenaan categoriepagina's, nergens anders. Structuur:
registertaal, vlakken zonder schaduw, dunne haarlijnen als scheiding,
hoekradius maximaal 6 px en alleen op knoppen en invoervelden, nooit witte
schaduwkaarten met ronde hoeken (de generieke AI-look, expliciet
afgewezen). Veel witruimte, warme fotografie volgens de beeldtaal-regels
in het brandbook, mobile first. Alle waarden als tokens in
tailwind.config, via site.config.ts aanpasbaar. brand/mockups/
website_mockup.png dient als visuele referentie bij het bouwen van de
homepage.

## Kernconcepten

1. Zelf-selectie plus lichte curatie: aanbieders kiezen bij het claimen
   zelf hun aanpak-tags (minimaal twee, bijvoorbeeld holistische
   benadering, natuurlijke materialen, trauma-informed); M beoordeelt
   alleen betaalde claims en uitzonderingen, geen vooronderzoek per
   aanbieder. De over-pagina belooft daarom "beoordeeld", niet
   "handgekozen".
2. Grijs versus actief: gescrapete vermeldingen (status scraped) staan wel
   in lijsten en op de kaart, maar grijs en niet klikbaar, alleen
   praktijknaam, plaats en categorie. Bij elke grijze vermelding een knop
   "Is dit jouw praktijk? Maak je profiel compleet". Geclaimde en
   goedgekeurde profielen (status live) zijn in kleur en klikbaar met een
   eigen pagina.
3. Claim flow: registreren via magic link, profiel invullen inclusief
   minimaal twee aanpak-tags en akkoord met het jaartarief; status wordt
   claimed_pending, M keurt goed en markeert betaald in de admin, dan pas
   live. Latere wijzigingen gaan via een wachtrij (profile_edits) en zijn
   pas zichtbaar na goedkeuring.
4. Kortingscode: optioneel veld per aanbieder. Blok op de profielpagina
   toont alleen als het is ingevuld.
5. Statistieken: elke profielweergave en elke klik op website of
   kortingscode wordt per dag geteld in profile_stats
6. Automatisch beheer: dagelijkse cron (Vercel Cron) checkt betaald_tot
   en stuurt 30 dagen voor verloop automatisch de verlengmail met de
   eigen statistieken van de aanbieder; 14 dagen na verloop valt het
   profiel automatisch terug naar een grijze basisvermelding. De knop
   "verwijder mijn vermelding" werkt direct (automatisch verbergen,
   bevestiging naar de aanvrager, melding naar M). Bij een nieuwe claim
   krijgt M een notificatiemail; goedkeuren verstuurt automatisch de
   goedkeuringsmail met factuurgegevens. Transactionele mail via de
   gratis tier van Resend (RESEND_API_KEY). Alle onderwerpen en
   mailteksten komen uit email_templates en zijn door M per stap aan te
   passen in de admin, zonder Claude Code-sessie..

## Contract per categorie (registry)

Elke categorie levert verplicht: slug, naam, korte omschrijving, in welke
fase(s) relevant, vergoedingsinformatie (verzekering ja, nee of
soms, met bron), hoe kies je een goede aanbieder, bronvermelding.
Registratie in de registry genereert automatisch: categoriepagina,
menu-item, tegel op de homepage en plaatspagina's, allemaal in dezelfde
layout. Startcategorieen: zwangerschapsyoga, bevallingscursus,
bekkenfysiotherapie, zwangerschapsfysiotherapie, doula,
zwangerschapsmassage.

## Datamodel (Supabase, migrations)

1. categories: id, slug, naam, beschrijving, volgorde, fases (array:
   kinderwens, zwangerschap, bevalling, postpartum, moederschap)
2. providers: id, praktijknaam, contactnaam, slug, beschrijving, plaats,
   gemeente, provincie, adres, lat, lng, website, email, telefoon,
   foto_urls, kortingscode (nullable), kortingstekst (nullable), status
   (scraped, claimed_pending, live, afgewezen, verborgen), claimed_by
   (nullable), betaald_tot (datum, nullable), created_at, updated_at
3. provider_categories: koppeltabel (een aanbieder kan meerdere
   categorieen hebben)
4. category_tags: per categorie de beschikbare aanpak-tags (bijvoorbeeld
   holistische benadering, natuurlijke materialen, trauma-informed),
   beheerd door M in de admin
5. provider_tags: koppeltabel provider + tag, gekozen door de aanbieder
   bij het claimen (minimaal twee verplicht)
6. profile_edits: wachtrij voor wijzigingen aan live profielen
   (provider_id, json met nieuwe velden, status pending/approved/rejected)
7. profile_stats: provider_id, datum, views, website_clicks,
   kortingscode_clicks
8. newsletter_signups: email, created_at
9. site_content: key, waarde, omschrijving. Alle bewerkbare teksten van
   de site, geseed vanuit de copy/ map, met fallback naar de seed als een
   key ontbreekt (nooit een lege pagina)
10. email_templates: slug, onderwerp, body met variabelen (zoals {naam},
    {bedrag}, {views}), geseed vanuit copy/faq-en-emails.md
11. RLS: publiek leest live volledig en scraped beperkt (praktijknaam,
    plaats, provincie, categorie). Eigenaar leest eigen provider en dient
    wijzigingen in via profile_edits. Admin (ADMIN_EMAIL) mag alles;
    site_content en email_templates zijn alleen door de admin te bewerken.

## Pagina's en SEO

1. Homepage: zoekbalk voor plaats (searchable dropdown met autocomplete op
   plaatsnaam, geen los tekstveld) of postcode, warme blokken per fase van de
   reis (kinderwens, zwangerschap, bevalling, postpartum, moederschap) met
   per blok de bijbehorende categorieen, korte uitleg hoe de gids werkt,
   een prominent zorgverleners-blok met de kop "Geboortezorgverlener, of
   bied jij een dienst van kinderwens tot moederschap?" en de knop "Voeg
   je toe en maak je profiel compleet", en nieuwsbrief-inschrijving
2. /[categorie]: landelijk overzicht per categorie
3. /[categorie]/[plaats]: programmatic SEO-pagina's uit de database, lijst
   (live in kleur, scraped grijs), kaart, unieke introtekst via template
   met variabelen
4. /provincie/[provincie]: overzicht per provincie
5. /praktijk/[slug]: profielpagina, alleen status live
6. /over en /aanmelden
7. Technisch: dynamische sitemap.xml, unieke title en meta description per
   pagina, schema.org LocalBusiness op profielpagina's, breadcrumbs
8. /admin: wachtrij (claims en wijzigingen, goedkeuren of afwijzen),
   providertabel met zoeken en filteren, CSV-import met preview en
   deduplicatie op praktijknaam plus plaats, statistieken per provider,
   tagbeheer per categorie, per provider een knop "markeer betaald tot
   [datum]" en een gratis-jaar-toggle voor het warme netwerk,
   teksten-beheer (alle contentblokken van de site en alle
   e-mailtemplates, met variabelen-uitleg en voorbeeldweergave voor
   verzenden), en een mailinglijst-overzicht van geclaimde aanbieders met
   CSV-export en een broadcast-bericht via Resend

## Kaart

Leaflet + OpenStreetMap. Markers: sage voor live, grijs voor scraped.
Clustering bij veel resultaten. Op categorie- en plaatspagina's, klein op
profielpagina's.

## Scraping en data

Per bron een script in /scripts (Node, cheerio en playwright) dat een CSV
oplevert in het importformaat: praktijknaam, contactnaam, categorie,
plaats, provincie, adres, website, email, telefoon. Vaste stappen en
poorten staan in docs/PIPELINE_CATEGORIE.md. Netjes scrapen: robots.txt
respecteren, 2 tot 5 seconden tussen requests, nette user agent, geen
Google Maps. Geocoding via Nominatim (1 request per seconde, resultaten
lokaal cachen).

## Fasering

1. Fundament: setup, tokens, migrations, registry plus een dummy-categorie
2. Publieke site: home, categorie- en plaatspagina's, profiel, kaart
3. Claim flow en admin
4. Eerste categorie gevuld via de pipeline (zwangerschapsyoga)
5. Overige categorieen via dezelfde pipeline
6. SEO-afwerking en livegang

## Fundering en kwaliteit

1. TypeScript strict mode; server-side validatie van alle invoer met Zod
2. CI via GitHub Actions (gratis): bij elke push draaien lint, typecheck,
   tests en een productie-build. Een rode build gaat niet live
3. Tests: RLS-tests (publiek kan geen e-mailadressen of niet-live
   profielen lezen) plus smoke-tests op de kritieke flows (claimen wordt
   pending, goedkeuren wordt live, verlopen wordt grijs)
4. Nette lege, fout- en 404-staten in huisstijl; een lege plaatspagina
   toont de aanmeld-oproep ("Ken jij hier een goede aanbieder?")
5. Toegankelijkheid WCAG AA: bodytekst altijd antraciet op linnen,
   terracotta nooit voor kleine tekst, knopcontrast minimaal AA (zo nodig
   een donkerder terracotta-token toevoegen), alt-teksten, zichtbare
   focus-staten, toetsenbordnavigatie
6. Fonts self-hosted via next/font, nooit de Google Fonts CDN op de site
   (AVG); de privacyverklaring vermeldt OSM-kaarttegels en Resend als
   verwerkers
7. Spamwering op alle formulieren: honeypot-veld plus server-side limiet
8. Bulkmail alleen naar geclaimde aanbieders (contractrelatie); nooit
   naar alleen-gescrapete adressen (spamverbod)

## Niet in v1

Geen reviews, geen blog, geen geautomatiseerde betalingen (facturatie
gaat handmatig via de admin; Mollie-checkout komt later), geen
meertaligheid (wel nette structuur), geen boekingssysteem, geen betaalde
zoek-API's voor scraping (alleen gratis openbare bronnen).

## Omgevingsvariabelen (alleen namen, nooit waarden)

NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
SUPABASE_SERVICE_ROLE_KEY, ADMIN_EMAIL, NEXT_PUBLIC_SITE_NAME,
NEXT_PUBLIC_SITE_URL, RESEND_API_KEY
