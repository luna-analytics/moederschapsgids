# PIPELINE per categorie (of nieuwe bron)

Plaats dit bestand als docs/PIPELINE_CATEGORIE.md.

1. Verzamelen [C]: bronnen zoeken, scraper schrijven (robots.txt respecteren, 2 tot 5 seconden tussen requests, nette user agent, geen Google Maps), CSV opleveren in het importformaat
2. Structureren [C]: dedupliceren op praktijknaam plus plaats, geocoderen via Nominatim (1 request per seconde, cache)
3. Valideren [M]: steekproef van 10 records tegen de bron, plus curatie: past deze aanbieder bij het holistische profiel
4. Verrijken [C stelt voor, M keurt]: categoriepagina volgens het contract (omschrijving, fases, vergoeding met bron, hoe kies je een goede aanbieder), eventueel een FAQ-blok
5. Publiceren [M]: visuele check van de plaatspagina's, dan live

Klaar is: categorie geregistreerd in de registry, data geimporteerd als status scraped, categoriepagina compleet volgens het contract, changelog bijgewerkt.
