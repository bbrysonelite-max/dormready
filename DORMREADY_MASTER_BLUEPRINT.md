# DormReady — Master Project Blueprint
**Owner:** Brent Bryson / BotCraft Works  
**Product:** DormReady.io — The definitive dorm room dimension + layout guide  
**Mission:** Capture parents and students at the moment of college acceptance, convert via interior design value, monetize via affiliate + layout upsell  

---

## Architecture Overview

```
dormready/
├── DORMREADY_MASTER_BLUEPRINT.md   ← You are here
├── agent-1-data/                   ← Agent 1 owns this
│   ├── CLAUDE.md
│   ├── scraper/
│   ├── data/
│   └── scripts/
├── agent-2-frontend/               ← Agent 2 owns this
│   ├── CLAUDE.md
│   ├── src/
│   └── public/
└── agent-3-backend/                ← Agent 3 owns this
    ├── CLAUDE.md
    ├── api/
    └── db/
```

---

## The Three Agents — Ownership Map

| Agent | Name | Owns | Delivers | Must NOT touch |
|-------|------|------|----------|----------------|
| 1 | Data Agent | `agent-1-data/` | `/data/schools.json`, `/data/dorms.json` | Frontend, backend API |
| 2 | Frontend Agent | `agent-2-frontend/` | Next.js UI, room visualizer, affiliate strips | Scraping scripts, DB |
| 3 | Backend Agent | `agent-3-backend/` | REST API, DB schema, lead capture, email | UI components, scrapers |

### The Contract (Shared Interface)
All agents agree on this JSON shape. Agent 1 produces it. Agents 2 and 3 consume it.

```json
{
  "school_id": "ucla",
  "school_name": "UCLA",
  "location": "Los Angeles, CA",
  "buildings": [
    {
      "building_id": "hedrick-hall",
      "building_name": "Hedrick Hall",
      "type": "classic",
      "room_types": [
        {
          "type": "double",
          "length_ft": 12.42,
          "width_ft": 10.5,
          "sqft": 130,
          "photo_urls": [],
          "tour_url": "",
          "notes": "Community bathroom, no AC"
        }
      ]
    }
  ]
}
```

---

## Stage 1 — MVP (Weeks 1–2)

**Goal:** Deployable site with 5 schools, real dimensions, lead capture working.

- [ ] Agent 1: Scrape + structure UCLA, Stanford, USC, NYU, UT Austin
- [ ] Agent 2: Build school index page + dorm profile page + email capture UI
- [ ] Agent 3: API endpoint for school data + lead capture POST + email delivery

**Launch bar:** Site live at dormready.io, 5 schools fully profiled, email capture functional.

---

## Stage 2 — Growth (Weeks 3–6)

**Goal:** 50 schools, layout tool live, affiliate revenue flowing.

- [ ] Agent 1: Expand to 50 schools via automated scraping pipeline
- [ ] Agent 2: Drag-and-drop room layout visualizer + affiliate product strip
- [ ] Agent 3: User accounts (save layouts), affiliate link tracking, admin dashboard

---

## Stage 3 — Scale (Weeks 7–12)

**Goal:** 200+ schools, Tiger Claw agent integration, licensable product.

- [ ] Agent 1: Full 200-school database, YouTube tour transcript pipeline
- [ ] Agent 2: Mobile-optimized PWA, shareable layout links
- [ ] Agent 3: API productization (license to dorm brands), Tiger Claw webhook integration

---

## Tech Stack (Agreed — Do Not Deviate)

| Layer | Choice | Reason |
|-------|--------|--------|
| Frontend | Next.js 14 (App Router) | SEO-critical; static generation per school page |
| Styling | Tailwind CSS | Speed |
| Database | Supabase (Postgres) | Free tier, instant API, auth built-in |
| Hosting | Vercel | Zero-config Next.js deploy |
| Email | Resend | Simple API, free tier 3k/month |
| Affiliate | Amazon Associates | Day-1 approval path |
| Scraping | Playwright + Cheerio | Handles both static + JS-rendered pages |

---

## Revenue Model

| Stream | Mechanism | Est. Monthly (at scale) |
|--------|-----------|------------------------|
| Affiliate | Amazon product links per room profile | $2k–$8k |
| Layout PDF | $47 one-time, AI-generated | $3k–$10k |
| Brand licensing | Tiger Claw agent white-label | $5k–$20k |

---

## SEO Strategy

Every dorm building = one URL. Example:  
`dormready.io/schools/ucla/hedrick-hall`

Target keywords:
- "[School] [Building] dorm room dimensions"
- "[School] dorm room size"
- "what fits in [Building] dorm"
- "[School] dorm room layout ideas"

All zero-competition long-tail. Own the real estate before anyone else builds it.

---

## Critical Rules (All Agents Must Follow)

1. **No broken windows.** If you hit an error, fix it before moving on.
2. **No hardcoded secrets.** All API keys go in `.env.local`. Never commit them.
3. **Honor the contract.** The JSON schema above is law. Do not change field names without updating this blueprint.
4. **Mobile first.** Every UI component must work at 375px width.
5. **Build to sell.** Every system must be able to run without Brent. No manual steps in production.
