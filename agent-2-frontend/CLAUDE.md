# CLAUDE.md — Agent 2: Frontend Agent
Your role: Build the DormReady Next.js web app.
You own: agent-2-frontend/ only.
Do NOT touch: agent-1-data/ or agent-3-backend/

## Stack
- Next.js 14 (App Router)
- Tailwind CSS
- TypeScript strict mode

## Install
npx create-next-app@latest . --typescript --tailwind --app --src-dir

## Stage 1 Pages to Build
1. / — Home: search bar + 6 school cards + stats bar
2. /schools/[school_id] — School index: all buildings as cards
3. /schools/[school_id]/[building_id] — Dorm profile: dimensions + lead capture + affiliate strip

## Data Loading (Stage 1 — static)
import dormsData from '../../agent-1-data/data/dorms.json'

## Lead Capture
POST to: process.env.NEXT_PUBLIC_API_URL/api/leads
Body: { email, school_id, building_id, source: 'dorm-profile' }

## SEO — Required on Every Dorm Profile Page
- generateStaticParams() for every building
- Title: "[Building] Dorm Room Size — [School] | DormReady"
- Description includes exact dimensions

## Stage 1 Checklist
- [ ] Home page renders
- [ ] School index renders all buildings for UCLA
- [ ] Dorm profile renders Hedrick Hall with dimensions
- [ ] Lead capture posts to Agent 3 API
- [ ] Lighthouse mobile score > 90

## Rules
1. Mobile first. Design at 375px.
2. Tailwind only. No inline styles.
3. TypeScript strict. No any types.
4. Static generation on all school/dorm pages.
5. No broken windows.

---

## Agent Log

**Agent 2 — 2026-04-08**
Scaffolded Next.js 14 app (TypeScript strict, Tailwind, App Router). Built home page: hero + search bar + 6 school cards (UCLA, Stanford, USC, NYU, UT Austin, UMich) + stats bar. Build passes, TypeScript clean, statically prerendered.

— Agent 2

**Agent 2 — 2026-04-09**
Agent: 2 — Frontend
Last updated: 2026-04-09
Status: Fully deployed on Vercel at dormready.vercel.app
Pages live: home, /schools/[school_id], /schools/[school_id]/[building_id]
Working: room type tabs, lead capture, affiliate strip, breadcrumbs
Deploy command: vercel --prod from agent-2-frontend folder
Key fix: dynamic routes required generateStaticParams — was 404ing on Vercel without it
Next: room layout visualizer, search bar functionality

— Agent 2
