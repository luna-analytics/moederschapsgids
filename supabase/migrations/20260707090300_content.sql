-- Wachtrij, statistieken, nieuwsbrief en de bewerkbare teksten/mails.

-- Wijzigingen aan live profielen gaan via deze wachtrij (nooit direct live).
create table profile_edits (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references providers (id) on delete cascade,
  wijzigingen jsonb not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create index profile_edits_status_idx on profile_edits (status);

-- Per dag per provider geteld (weergaven en doorkliks); het verlengargument.
create table profile_stats (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references providers (id) on delete cascade,
  datum date not null default current_date,
  views integer not null default 0,
  website_clicks integer not null default 0,
  kortingscode_clicks integer not null default 0,
  unique (provider_id, datum)
);

create table newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- Alle bewerkbare sitetekst, geseed vanuit copy/, met fallback naar de seed.
create table site_content (
  key text primary key,
  waarde text not null,
  omschrijving text
);

-- Transactionele e-mailteksten met variabelen ({naam}, {bedrag}, {views}, ...).
create table email_templates (
  slug text primary key,
  onderwerp text not null,
  body text not null
);
