-- Aanpak-tags: per categorie beschikbaar, plus een set die overal geldt.
-- category_id NULL = 'algemeen' (beschikbaar in elke categorie).
create table category_tags (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories (id) on delete cascade,
  label text not null
);

-- Label uniek binnen een categorie (en binnen de 'algemeen'-set).
create unique index category_tags_uniek
on category_tags (coalesce(category_id::text, 'algemeen'), label);

-- Door de aanbieder gekozen tags bij het claimen (minimaal twee — afgedwongen in de flow).
create table provider_tags (
  provider_id uuid not null references providers (id) on delete cascade,
  tag_id uuid not null references category_tags (id) on delete cascade,
  primary key (provider_id, tag_id)
);
