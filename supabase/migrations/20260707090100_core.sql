-- Kern: categorieën, aanbieders en hun koppeling.

create table categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  naam text not null,
  beschrijving text not null default '',
  volgorde integer not null default 0,
  fases fase[] not null default '{}',
  created_at timestamptz not null default now()
);

create table providers (
  id uuid primary key default gen_random_uuid(),
  praktijknaam text not null,
  contactnaam text,
  slug text not null unique,
  beschrijving text,
  plaats text not null,
  gemeente text,
  provincie text not null,
  adres text,
  lat double precision,
  lng double precision,
  website text,
  email text,
  telefoon text,
  foto_urls text[] not null default '{}',
  kortingscode text,
  kortingstekst text,
  status provider_status not null default 'scraped',
  claimed_by uuid references auth.users (id) on delete set null,
  betaald_tot date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index providers_status_idx on providers (status);
create index providers_plaats_idx on providers (plaats);
create index providers_provincie_idx on providers (provincie);

-- Een aanbieder kan in meerdere categorieën vallen.
create table provider_categories (
  provider_id uuid not null references providers (id) on delete cascade,
  category_id uuid not null references categories (id) on delete cascade,
  primary key (provider_id, category_id)
);

create index provider_categories_category_idx on provider_categories (category_id);

-- updated_at automatisch bijhouden op providers.
create or replace function set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger providers_set_updated_at
before update on providers
for each row execute function set_updated_at();
