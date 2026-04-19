-- ARU STAY — Content schema
-- Run this once in Supabase SQL Editor (Dashboard → SQL → New query → Paste → Run).
-- Idempotent: safe to re-run; uses IF NOT EXISTS / CREATE OR REPLACE where possible.

-- =========================================================================
-- 0. Extensions
-- =========================================================================
create extension if not exists pgcrypto;

-- =========================================================================
-- 1. Helper: updated_at trigger
-- =========================================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =========================================================================
-- 2. site_text — scalar key-value (meta.*, nav.*, hero.*, etc.)
-- =========================================================================
create table if not exists public.site_text (
  key        text        not null,
  locale     text        not null check (locale in ('ko','en','ja','zh')),
  value      text        not null default '',
  updated_at timestamptz not null default now(),
  primary key (key, locale)
);

drop trigger if exists trg_site_text_updated on public.site_text;
create trigger trg_site_text_updated before update on public.site_text
  for each row execute function public.set_updated_at();

-- =========================================================================
-- 3. Structured entities (parent + per-locale child tables)
-- =========================================================================

-- about.points[]
create table if not exists public.about_points (
  id         uuid primary key default gen_random_uuid(),
  sort_order int  not null default 0,
  created_at timestamptz not null default now()
);
create table if not exists public.about_points_i18n (
  point_id  uuid   not null references public.about_points(id) on delete cascade,
  locale    text   not null check (locale in ('ko','en','ja','zh')),
  title     text   not null default '',
  body      text   not null default '',
  primary key (point_id, locale)
);

-- rooms[]
create table if not exists public.rooms (
  id         uuid primary key default gen_random_uuid(),
  slug       text unique not null,
  sort_order int  not null default 0,
  size       text not null default '',       -- shared across locales (e.g. "14 m²")
  image_key  text,                           -- FK-ish pointer into site_images.key
  created_at timestamptz not null default now()
);
create table if not exists public.rooms_i18n (
  room_id   uuid   not null references public.rooms(id) on delete cascade,
  locale    text   not null check (locale in ('ko','en','ja','zh')),
  name      text   not null default '',
  capacity  text   not null default '',
  description text not null default '',
  amenities text[] not null default '{}',
  primary key (room_id, locale)
);

-- facilities.items[]
create table if not exists public.facilities (
  id         uuid primary key default gen_random_uuid(),
  sort_order int  not null default 0,
  created_at timestamptz not null default now()
);
create table if not exists public.facilities_i18n (
  facility_id uuid  not null references public.facilities(id) on delete cascade,
  locale      text  not null check (locale in ('ko','en','ja','zh')),
  name        text  not null default '',
  description text  not null default '',
  primary key (facility_id, locale)
);

-- faq.items[]
create table if not exists public.faq (
  id         uuid primary key default gen_random_uuid(),
  sort_order int  not null default 0,
  created_at timestamptz not null default now()
);
create table if not exists public.faq_i18n (
  faq_id   uuid   not null references public.faq(id) on delete cascade,
  locale   text   not null check (locale in ('ko','en','ja','zh')),
  question text   not null default '',
  answer   text   not null default '',
  primary key (faq_id, locale)
);

-- guestNotes.items[]
create table if not exists public.guest_notes (
  id         uuid primary key default gen_random_uuid(),
  sort_order int  not null default 0,
  created_at timestamptz not null default now()
);
create table if not exists public.guest_notes_i18n (
  note_id uuid   not null references public.guest_notes(id) on delete cascade,
  locale  text   not null check (locale in ('ko','en','ja','zh')),
  quote   text   not null default '',
  author  text   not null default '',
  primary key (note_id, locale)
);

-- location.access[]
create table if not exists public.location_access (
  id         uuid primary key default gen_random_uuid(),
  sort_order int  not null default 0,
  created_at timestamptz not null default now()
);
create table if not exists public.location_access_i18n (
  access_id uuid not null references public.location_access(id) on delete cascade,
  locale    text not null check (locale in ('ko','en','ja','zh')),
  place     text not null default '',
  time      text not null default '',
  primary key (access_id, locale)
);

-- longStay.bullets[]
create table if not exists public.long_stay_bullets (
  id         uuid primary key default gen_random_uuid(),
  sort_order int  not null default 0,
  created_at timestamptz not null default now()
);
create table if not exists public.long_stay_bullets_i18n (
  bullet_id uuid not null references public.long_stay_bullets(id) on delete cascade,
  locale    text not null check (locale in ('ko','en','ja','zh')),
  text      text not null default '',
  primary key (bullet_id, locale)
);

-- site_images — URLs from Supabase Storage (bucket: site-images)
create table if not exists public.site_images (
  key        text primary key,                  -- e.g. 'hero', 'room.single', 'about'
  url        text not null,
  alt_text   text not null default '',
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_site_images_updated on public.site_images;
create trigger trg_site_images_updated before update on public.site_images
  for each row execute function public.set_updated_at();

-- =========================================================================
-- 4. RLS — public read, authenticated write
-- =========================================================================
alter table public.site_text             enable row level security;
alter table public.about_points          enable row level security;
alter table public.about_points_i18n     enable row level security;
alter table public.rooms                 enable row level security;
alter table public.rooms_i18n            enable row level security;
alter table public.facilities            enable row level security;
alter table public.facilities_i18n       enable row level security;
alter table public.faq                   enable row level security;
alter table public.faq_i18n              enable row level security;
alter table public.guest_notes           enable row level security;
alter table public.guest_notes_i18n      enable row level security;
alter table public.location_access       enable row level security;
alter table public.location_access_i18n  enable row level security;
alter table public.long_stay_bullets     enable row level security;
alter table public.long_stay_bullets_i18n enable row level security;
alter table public.site_images           enable row level security;

-- Policy helper macro would be nice, but Postgres doesn't have one; list explicitly.
do $$
declare t text;
begin
  for t in select unnest(array[
    'site_text','about_points','about_points_i18n','rooms','rooms_i18n',
    'facilities','facilities_i18n','faq','faq_i18n','guest_notes','guest_notes_i18n',
    'location_access','location_access_i18n','long_stay_bullets','long_stay_bullets_i18n',
    'site_images'
  ]) loop
    execute format('drop policy if exists "public read %1$s" on public.%1$I', t);
    execute format('create policy "public read %1$s" on public.%1$I for select using (true)', t);

    execute format('drop policy if exists "auth write %1$s" on public.%1$I', t);
    execute format('create policy "auth write %1$s" on public.%1$I for all to authenticated using (true) with check (true)', t);
  end loop;
end $$;

-- =========================================================================
-- 5. Storage bucket — site-images (public read, authenticated write)
-- =========================================================================
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

drop policy if exists "site-images public read" on storage.objects;
create policy "site-images public read"
  on storage.objects for select
  using (bucket_id = 'site-images');

drop policy if exists "site-images auth insert" on storage.objects;
create policy "site-images auth insert"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'site-images');

drop policy if exists "site-images auth update" on storage.objects;
create policy "site-images auth update"
  on storage.objects for update to authenticated
  using (bucket_id = 'site-images');

drop policy if exists "site-images auth delete" on storage.objects;
create policy "site-images auth delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'site-images');
