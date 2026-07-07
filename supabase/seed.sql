-- Seed voor Blok 1. Alles is fictief/plaatshouder: de motor, het grijs/live-patroon
-- en de kleur/klikbaar-staat zijn hiermee te demonstreren zonder onbevestigde
-- echte-bedrijfsdata in git. Echte praktijken komen pas via de gevalideerde
-- scraping-pipeline in Blok 3 (met M's steekproef bij POORT 3).

-- CATEGORIEËN (data voor joins; de code-registry bevat in Blok 1 alleen de dummy) --
insert into categories (slug, naam, beschrijving, volgorde, fases) values
  ('zwangerschapsyoga', 'Zwangerschapsyoga', 'Yoga afgestemd op de zwangerschap: ademwerk, ontspanning en bekkenbodem.', 1, '{zwangerschap,postpartum}'),
  ('bevallingscursus', 'Bevallingscursus', 'Voorbereiding op de bevalling, van hypnobirthing tot haptonomie.', 2, '{zwangerschap,bevalling}'),
  ('bekkenfysiotherapie', 'Bekkenfysiotherapie', 'Gespecialiseerde fysiotherapie voor bekken en bekkenbodem rond de zwangerschap.', 3, '{zwangerschap,postpartum}'),
  ('zwangerschapsfysiotherapie', 'Zwangerschapsfysiotherapie', 'Begeleiding bij houding, beweging en klachten tijdens de zwangerschap.', 4, '{zwangerschap}'),
  ('doula', 'Doula', 'Continue, niet-medische begeleiding voor, tijdens en na de bevalling.', 5, '{zwangerschap,bevalling,postpartum}'),
  ('zwangerschapsmassage', 'Zwangerschapsmassage', 'Massage gericht op ontspanning en verlichting van zwangerschapsklachten.', 6, '{zwangerschap}');

-- AANPAK-TAGS (docs/TAGS_SEED.md) --------------------------------------------
-- Algemeen (category_id NULL = beschikbaar in elke categorie).
insert into category_tags (category_id, label) values
  (null, 'Holistische benadering'),
  (null, 'Natuurlijke producten en materialen'),
  (null, 'Trauma-informed'),
  (null, 'Kleinschalig en persoonlijk'),
  (null, 'Ook online beschikbaar'),
  (null, 'Avond- en weekendtijden');

-- Per categorie (subselect op slug).
insert into category_tags (category_id, label)
select c.id, x.label
from categories c
join (values
  ('zwangerschapsyoga', 'Kleine groepen'),
  ('zwangerschapsyoga', 'Ook postnatale yoga'),
  ('zwangerschapsyoga', 'Ademwerk en ontspanning'),
  ('zwangerschapsyoga', 'Geschikt voor beginners'),
  ('zwangerschapsyoga', 'Terugkomles met baby'),
  ('bevallingscursus', 'Hypnobirthing'),
  ('bevallingscursus', 'Haptonomie'),
  ('bevallingscursus', 'Samen met partner'),
  ('bevallingscursus', 'Medisch onderbouwd'),
  ('bevallingscursus', 'Angst en spanning bespreekbaar'),
  ('bekkenfysiotherapie', 'Geregistreerd bekkenfysiotherapeut'),
  ('bekkenfysiotherapie', 'Zwangerschap en postpartum'),
  ('bekkenfysiotherapie', 'Bekkenbodemklachten'),
  ('bekkenfysiotherapie', 'Aandacht voor het hele lichaam'),
  ('bekkenfysiotherapie', 'Directe toegankelijkheid (geen verwijzing nodig)'),
  ('zwangerschapsfysiotherapie', 'Bekken- en rugklachten'),
  ('zwangerschapsfysiotherapie', 'Houding en beweging'),
  ('zwangerschapsfysiotherapie', 'Begeleiding tot en na de bevalling'),
  ('zwangerschapsfysiotherapie', 'Samenwerking met verloskundigen'),
  ('doula', 'Continue begeleiding bij de bevalling'),
  ('doula', 'Ook postpartum-ondersteuning'),
  ('doula', 'Thuis- en ziekenhuisbevalling'),
  ('doula', 'Geboorteplan-begeleiding'),
  ('zwangerschapsmassage', 'Gecertificeerd zwangerschapsmasseur'),
  ('zwangerschapsmassage', 'Ook postnatale massage'),
  ('zwangerschapsmassage', 'Aan huis mogelijk'),
  ('zwangerschapsmassage', 'Aandacht voor bekken en onderrug')
) as x(cat_slug, label) on x.cat_slug = c.slug;

-- PROVIDERS: 12 grijs (scraped) — alleen naam/plaats/provincie in de seed ------
insert into providers (praktijknaam, slug, plaats, provincie, status) values
  ('Yogastudio Maanlicht', 'yogastudio-maanlicht', 'Amsterdam', 'Noord-Holland', 'scraped'),
  ('Zwanger & Zen', 'zwanger-en-zen', 'Utrecht', 'Utrecht', 'scraped'),
  ('Samen Bevallen', 'samen-bevallen', 'Haarlem', 'Noord-Holland', 'scraped'),
  ('Nieuw Begin Cursussen', 'nieuw-begin-cursussen', 'Rotterdam', 'Zuid-Holland', 'scraped'),
  ('Bekkenzorg Alkmaar', 'bekkenzorg-alkmaar', 'Alkmaar', 'Noord-Holland', 'scraped'),
  ('FysioBekken Delft', 'fysiobekken-delft', 'Delft', 'Zuid-Holland', 'scraped'),
  ('Fysio in Verwachting', 'fysio-in-verwachting', 'Den Haag', 'Zuid-Holland', 'scraped'),
  ('Beweegpraktijk Amersfoort', 'beweegpraktijk-amersfoort', 'Amersfoort', 'Utrecht', 'scraped'),
  ('Doula Dichtbij', 'doula-dichtbij', 'Leiden', 'Zuid-Holland', 'scraped'),
  ('Warme Handen Doula', 'warme-handen-doula', 'Utrecht', 'Utrecht', 'scraped'),
  ('Massagepraktijk Rustpunt', 'massagepraktijk-rustpunt', 'Amsterdam', 'Noord-Holland', 'scraped'),
  ('Ontspannen Zwanger', 'ontspannen-zwanger', 'Den Haag', 'Zuid-Holland', 'scraped');

-- PROVIDERS: 3 live (fictief) — volledig profiel met foto's, tags, 1 kortingscode
insert into providers
  (praktijknaam, contactnaam, slug, beschrijving, plaats, gemeente, provincie, adres, lat, lng, website, email, telefoon, foto_urls, kortingscode, kortingstekst, status, betaald_tot)
values
  (
    'Praktijk De Zachte Start', 'Fictieve Naam A', 'praktijk-de-zachte-start',
    'Fictief voorbeeldprofiel. Zwangerschapsyoga in kleine groepen met veel aandacht voor ademwerk en ontspanning. Ook terugkomlessen met baby.',
    'Utrecht', 'Utrecht', 'Utrecht', 'Voorbeeldstraat 1', 52.0907, 5.1214,
    'https://voorbeeld.nl', 'hallo@voorbeeld.nl', '030 1234567',
    '{https://placehold.co/800x600?text=Zachte+Start}', 'ZACHT10', 'Gebruik ZACHT10 voor 10% korting op je eerste blok.',
    'live', '2027-07-01'
  ),
  (
    'Doulacollectief Bloei', 'Fictieve Naam B', 'doulacollectief-bloei',
    'Fictief voorbeeldprofiel. Continue begeleiding bij de bevalling, thuis of in het ziekenhuis, met ondersteuning in de postpartumperiode.',
    'Haarlem', 'Haarlem', 'Noord-Holland', 'Voorbeeldkade 22', 52.3874, 4.6462,
    'https://voorbeeld-bloei.nl', 'info@voorbeeld-bloei.nl', '023 7654321',
    '{https://placehold.co/800x600?text=Bloei}', null, null,
    'live', '2027-07-01'
  ),
  (
    'Bekkenfysio Kompas', 'Fictieve Naam C', 'bekkenfysio-kompas',
    'Fictief voorbeeldprofiel. Geregistreerd bekkenfysiotherapeut, gespecialiseerd in zwangerschap en postpartum, met aandacht voor het hele lichaam.',
    'Rotterdam', 'Rotterdam', 'Zuid-Holland', 'Voorbeeldplein 5', 51.9225, 4.4792,
    'https://voorbeeld-kompas.nl', 'praktijk@voorbeeld-kompas.nl', '010 2223344',
    '{https://placehold.co/800x600?text=Kompas}', null, null,
    'live', '2027-07-01'
  );

-- KOPPELING provider -> categorie --------------------------------------------
insert into provider_categories (provider_id, category_id)
select p.id, c.id
from providers p
join (values
  ('yogastudio-maanlicht', 'zwangerschapsyoga'),
  ('zwanger-en-zen', 'zwangerschapsyoga'),
  ('samen-bevallen', 'bevallingscursus'),
  ('nieuw-begin-cursussen', 'bevallingscursus'),
  ('bekkenzorg-alkmaar', 'bekkenfysiotherapie'),
  ('fysiobekken-delft', 'bekkenfysiotherapie'),
  ('fysio-in-verwachting', 'zwangerschapsfysiotherapie'),
  ('beweegpraktijk-amersfoort', 'zwangerschapsfysiotherapie'),
  ('doula-dichtbij', 'doula'),
  ('warme-handen-doula', 'doula'),
  ('massagepraktijk-rustpunt', 'zwangerschapsmassage'),
  ('ontspannen-zwanger', 'zwangerschapsmassage'),
  ('praktijk-de-zachte-start', 'zwangerschapsyoga'),
  ('doulacollectief-bloei', 'doula'),
  ('bekkenfysio-kompas', 'bekkenfysiotherapie')
) as x(prov_slug, cat_slug)
  on x.prov_slug = p.slug
join categories c on c.slug = x.cat_slug;

-- TAGS voor de live-profielen (minimaal twee elk) ----------------------------
-- Categorie-specifieke tags.
insert into provider_tags (provider_id, tag_id)
select p.id, t.id
from providers p
join (values
  ('praktijk-de-zachte-start', 'zwangerschapsyoga', 'Kleine groepen'),
  ('praktijk-de-zachte-start', 'zwangerschapsyoga', 'Ademwerk en ontspanning'),
  ('doulacollectief-bloei', 'doula', 'Continue begeleiding bij de bevalling'),
  ('doulacollectief-bloei', 'doula', 'Ook postpartum-ondersteuning'),
  ('bekkenfysio-kompas', 'bekkenfysiotherapie', 'Geregistreerd bekkenfysiotherapeut'),
  ('bekkenfysio-kompas', 'bekkenfysiotherapie', 'Zwangerschap en postpartum')
) as x(prov_slug, cat_slug, label) on x.prov_slug = p.slug
join categories c on c.slug = x.cat_slug
join category_tags t on t.category_id = c.id and t.label = x.label;

-- Plus één algemene tag per live-profiel.
insert into provider_tags (provider_id, tag_id)
select p.id, t.id
from providers p
join (values
  ('praktijk-de-zachte-start', 'Kleinschalig en persoonlijk'),
  ('doulacollectief-bloei', 'Trauma-informed'),
  ('bekkenfysio-kompas', 'Holistische benadering')
) as x(prov_slug, label) on x.prov_slug = p.slug
join category_tags t on t.category_id is null and t.label = x.label;

-- SITE_CONTENT: een paar keys als bewijs van de fallback-seed ----------------
insert into site_content (key, waarde, omschrijving) values
  ('home.hero.titel', 'Jouw complete gids voor moederschap', 'Titel in de hero op de homepage'),
  ('home.hero.cta', 'Ontdek zorgverleners', 'Knoptekst in de hero'),
  ('home.hoehetwerkt.titel', 'Hoe de gids werkt', 'Kop boven het uitlegblok');
