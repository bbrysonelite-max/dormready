-- DormReady Schema — Run this in Supabase SQL Editor

create table if not exists schools (
  school_id   text primary key,
  school_name text not null,
  location    text not null,
  created_at  timestamptz default now()
);

create table if not exists buildings (
  id           uuid primary key default gen_random_uuid(),
  school_id    text not null references schools(school_id) on delete cascade,
  building_id  text not null,
  building_name text not null,
  type         text,
  created_at   timestamptz default now(),
  unique (school_id, building_id)
);

create table if not exists room_types (
  id           uuid primary key default gen_random_uuid(),
  building_id  uuid not null references buildings(id) on delete cascade,
  type         text not null,
  length_ft    numeric,
  width_ft     numeric,
  sqft         numeric,
  photo_urls   text[] default '{}',
  tour_url     text,
  notes        text,
  created_at   timestamptz default now()
);

create table if not exists leads (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  school_id   text references schools(school_id),
  building_id text,
  source      text default 'organic',
  created_at  timestamptz default now(),
  unique (email, school_id)
);

-- Indexes
create index if not exists buildings_school_id_idx on buildings(school_id);
create index if not exists room_types_building_id_idx on room_types(building_id);
create index if not exists leads_email_idx on leads(email);
create index if not exists leads_school_id_idx on leads(school_id);

-- Enable Row Level Security (read-only public access for school/building/room data)
alter table schools    enable row level security;
alter table buildings  enable row level security;
alter table room_types enable row level security;
alter table leads      enable row level security;

create policy "Public read schools"    on schools    for select using (true);
create policy "Public read buildings"  on buildings  for select using (true);
create policy "Public read room_types" on room_types for select using (true);
-- leads: no public read; service key only
