-- Extensies en enumtypes. Basis waar alle tabellen op leunen.
create extension if not exists pgcrypto;

-- Statusladder van een vermelding (PROJECT_PLAN, datamodel providers).
create type provider_status as enum (
  'scraped',         -- gescrapet, grijs, niet klikbaar
  'claimed_pending', -- geclaimd, wacht op goedkeuring/betaling
  'live',            -- goedgekeurd, in kleur, eigen pagina
  'afgewezen',       -- claim afgewezen
  'verborgen'        -- op verzoek verborgen / na verloop teruggevallen
);

-- De fasedimensie van de reis (uitbreiden richting matrescentie = alleen data).
create type fase as enum (
  'kinderwens',
  'zwangerschap',
  'bevalling',
  'postpartum',
  'moederschap'
);
