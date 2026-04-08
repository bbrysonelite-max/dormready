-- DormReady Stage 1 Schema

-- Schools
CREATE TABLE IF NOT EXISTS schools (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  city        TEXT NOT NULL,
  state       TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Buildings (dorms) linked to a school
CREATE TABLE IF NOT EXISTS buildings (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id   UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Leads — one row per email+school pair (unique constraint enables idempotent upsert)
CREATE TABLE IF NOT EXISTS leads (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT NOT NULL,
  school_id   UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  building_id UUID REFERENCES buildings(id) ON DELETE SET NULL,
  source      TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (email, school_id)
);

-- Seed: 5 schools (idempotent — re-running won't duplicate)
INSERT INTO schools (id, name, slug, city, state) VALUES
  ('11111111-1111-1111-1111-111111111111', 'University of Michigan',    'umich',   'Ann Arbor',   'MI'),
  ('22222222-2222-2222-2222-222222222222', 'Ohio State University',     'osu',     'Columbus',    'OH'),
  ('33333333-3333-3333-3333-333333333333', 'University of Texas',       'utexas',  'Austin',      'TX'),
  ('44444444-4444-4444-4444-444444444444', 'UCLA',                      'ucla',    'Los Angeles', 'CA'),
  ('55555555-5555-5555-5555-555555555555', 'University of Florida',     'ufl',     'Gainesville', 'FL')
ON CONFLICT (slug) DO NOTHING;

-- Seed: sample buildings
INSERT INTO buildings (school_id, name) VALUES
  ('11111111-1111-1111-1111-111111111111', 'South Quad'),
  ('11111111-1111-1111-1111-111111111111', 'Markley Hall'),
  ('22222222-2222-2222-2222-222222222222', 'Lincoln Tower'),
  ('33333333-3333-3333-3333-333333333333', 'Jester Center'),
  ('44444444-4444-4444-4444-444444444444', 'Sproul Hall'),
  ('55555555-5555-5555-5555-555555555555', 'Jennings Hall')
ON CONFLICT DO NOTHING;
