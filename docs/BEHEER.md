# BEHEER: maandritme in maximaal 2 uur

Plaats dit bestand als docs/BEHEER.md.

## Wat automatisch gaat (na Blok 4, jij doet niets)

1. Verlengingen: 30 dagen voor het verlopen van betaald_tot krijgt de
   aanbieder automatisch de verlengmail, inclusief haar eigen weergaven
   en doorkliks als verlengargument. 14 dagen na verloop valt het profiel
   vanzelf terug naar een grijze basisvermelding.
2. Verwijderverzoeken: de knop "verwijder mijn vermelding" verbergt de
   vermelding direct, stuurt de aanvrager een bevestiging en jou een
   melding. AVG-proof zonder dat jij iets hoeft te doen.
3. Nieuwe claims: jij krijgt een notificatiemail; jouw klik op goedkeuren
   verstuurt automatisch de goedkeuringsmail met factuurgegevens.
4. Statistieken, deploys en SSL: lopen vanzelf.
5. Teksten en mails pas je zelf aan in de admin (contentblokken en
   e-mailtemplates), zonder Claude Code-sessie of deploy.
6. Bericht aan alle aangesloten aanbieders: via de mailinglijst in de
   admin (broadcast of CSV-export). Regel: alleen naar geclaimde
   aanbieders, nooit bulkmail naar alleen-gescrapete adressen.

## Wat jij doet

1. Per claim, circa 10 minuten: profiel bekijken, goedkeuren, en na
   ontvangst van de betaling betaald_tot invullen.
2. Wekelijks 10 minuten: wachtrij met profielwijzigingen doorlopen.
3. Maandelijks 20 minuten: mailbox met vragen, blik op Vercel Analytics.
4. Maandelijks 5 minuten: database-export als back-up via het
   Supabase-dashboard (de gratis tier heeft geen volwaardige automatische
   back-ups).
5. Per kwartaal 30 minuten: een Claude Code-sessie "draai de scrapers
   opnieuw en importeer nieuwe vermeldingen als grijs".

Rekenvoorbeeld: 8 claims per maand is 80 minuten, plus het vaste ritme
van circa 40 minuten. Samen net onder de 2 uur.

## Wanneer opschalen

Boven de 15 claims per maand wordt het handmatig betaald markeren de
grootste post. Dat is het moment voor de Mollie-checkout (zie
PROJECT_PLAN, spoor "later"): betaling en livegang gaan dan vanzelf en
jouw rol per claim zakt naar 5 minuten. Prettig probleem: het betekent
1500+ euro nieuwe jaaromzet per maand.

## Veiligheidsroutine

1. 2FA aan op GitHub, Supabase en Vercel (eenmalig, setup).
2. De service_role key staat alleen in .env.local en in Vercel, nooit in
   git of in de browser. Bij twijfel of een lek: key roteren in het
   Supabase-dashboard.
3. RLS-tests draaien mee in de codebase; na elke grote wijziging laat je
   Claude Code ze opnieuw draaien.
4. Datalek of vermoeden daarvan: het platform bewaart bewust weinig
   (zakelijke gegevens, account-e-mails, nieuwsbriefadressen), maar bij
   een lek geldt de meldplicht bij de Autoriteit Persoonsgegevens binnen
   72 uur.
