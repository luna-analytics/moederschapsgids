-- Row Level Security. Uitgangspunt (PROJECT_PLAN, punt 11):
--   * publiek leest LIVE volledig en SCRAPED beperkt (naam/plaats/provincie/categorie);
--   * eigenaar leest de eigen provider en dient wijzigingen in via profile_edits;
--   * admin draait via de service-role key (omzeilt RLS).
-- Uitgebreide, geautomatiseerde RLS-tests volgen in Blok 2 (BUILD_CHECKLIST).
--
-- Belangrijk: RLS-policies werken BOVENOP de tabel-grants. Zonder een expliciete
-- GRANT krijgt anon "permission denied" en wordt de policy niet eens geëvalueerd.
-- Daarom hieronder per tabel eerst het juiste grant, dan de policies. De grants
-- zijn ruim op kolomnivo (hele tabel), de rij-afscherming doet de policy; scraped
-- rijen komen zo nooit uit `providers` maar alleen via de beperkte view.
grant usage on schema public to anon, authenticated;
grant select on
  categories, providers, provider_categories, category_tags, provider_tags, site_content
  to anon, authenticated;
grant insert on newsletter_signups to anon, authenticated;
grant select, insert on profile_edits to authenticated;
grant select on profile_stats to authenticated;
-- email_templates krijgt bewust GEEN grant aan anon/authenticated: alleen service role.

-- PROVIDERS ------------------------------------------------------------------
alter table providers enable row level security;

-- Publiek: live-rijen volledig leesbaar (geclaimd, bewust openbaar profiel).
create policy providers_public_live on providers
for select to anon, authenticated
using (status = 'live');

-- Eigenaar: de eigen provider in elke status.
create policy providers_owner_select on providers
for select to authenticated
using (claimed_by = auth.uid());

-- Scraped wordt NIET direct uit providers gelezen door publiek. In plaats daarvan
-- een view die precies de toegestane kolommen blootgeeft (geen e-mail/telefoon).
-- security_invoker = off: de view draait als eigenaar en omzeilt zo de RLS van
-- providers, maar levert alleen de whitelist-kolommen.
create view public_scraped_providers
with (security_invoker = off) as
select
  p.id,
  p.praktijknaam,
  p.plaats,
  p.provincie,
  coalesce(array_agg(c.slug) filter (where c.slug is not null), '{}') as categorie_slugs
from providers p
left join provider_categories pc on pc.provider_id = p.id
left join categories c on c.id = pc.category_id
where p.status = 'scraped'
group by p.id;

grant select on public_scraped_providers to anon, authenticated;

-- CATEGORIES / KOPPELINGEN / TAGS (publiek leesbaar) -------------------------
alter table categories enable row level security;
create policy categories_public_read on categories
for select to anon, authenticated using (true);

alter table provider_categories enable row level security;
create policy provider_categories_public_read on provider_categories
for select to anon, authenticated using (true);

alter table category_tags enable row level security;
create policy category_tags_public_read on category_tags
for select to anon, authenticated using (true);

alter table provider_tags enable row level security;
create policy provider_tags_public_read on provider_tags
for select to anon, authenticated using (true);

-- PROFILE_EDITS (alleen eigenaar) --------------------------------------------
alter table profile_edits enable row level security;

create policy profile_edits_owner_select on profile_edits
for select to authenticated
using (exists (
  select 1 from providers p
  where p.id = profile_edits.provider_id and p.claimed_by = auth.uid()
));

create policy profile_edits_owner_insert on profile_edits
for insert to authenticated
with check (exists (
  select 1 from providers p
  where p.id = profile_edits.provider_id and p.claimed_by = auth.uid()
));

-- PROFILE_STATS (privé; eigenaar leest eigen cijfers, tellen gaat via service role)
alter table profile_stats enable row level security;

create policy profile_stats_owner_select on profile_stats
for select to authenticated
using (exists (
  select 1 from providers p
  where p.id = profile_stats.provider_id and p.claimed_by = auth.uid()
));

-- NEWSLETTER_SIGNUPS (anon mag inschrijven, niemand leest publiek) ------------
alter table newsletter_signups enable row level security;
create policy newsletter_signups_insert on newsletter_signups
for insert to anon, authenticated with check (true);

-- SITE_CONTENT (publiek leesbaar, schrijven alleen via service role) ----------
alter table site_content enable row level security;
create policy site_content_public_read on site_content
for select to anon, authenticated using (true);

-- EMAIL_TEMPLATES: RLS aan, geen enkele publieke policy -> alleen service role.
alter table email_templates enable row level security;
