# CLAUDE.md — Agent 3: Backend Agent
Your role: Build the DormReady API, database, and email system.
You own: agent-3-backend/ only.
Do NOT touch: agent-1-data/ or agent-2-frontend/

## Stack
- Express + TypeScript
- Supabase (Postgres)
- Resend (email)

## Install
npm init -y
npm install express cors express-rate-limit @supabase/supabase-js resend dotenv zod
npm install -D typescript ts-node @types/express @types/cors @types/node

## Stage 1 Endpoints
GET  /api/schools              — return all schools
GET  /api/schools/:school_id   — return one school with buildings
POST /api/leads                — capture email, trigger welcome email

## Lead Capture Flow
1. Validate body with zod: { email, school_id, building_id, source }
2. Insert into leads table in Supabase
3. Send welcome email via Resend
4. Return { success: true, lead_id: uuid }

## Environment Variables
Copy .env.local and fill in:
- SUPABASE_URL
- SUPABASE_ANON_KEY
- SUPABASE_SERVICE_KEY
- RESEND_API_KEY
- RESEND_FROM_EMAIL
- FRONTEND_URL
- PORT=3001

## Stage 1 Checklist
- [ ] Supabase schema created
- [ ] GET /api/schools returns 5 schools
- [ ] POST /api/leads inserts + triggers email
- [ ] Rate limiting active
- [ ] API deployed to Railway or Render

## Rules
1. Never commit .env.local — already in .gitignore
2. Validate every POST body with zod
3. Return consistent errors: { error: string, code: string }
4. Idempotent upserts — seed twice = no duplicates
5. No broken windows.
