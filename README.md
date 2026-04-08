# DormReady — Terminal Quickstart

Three Claude Code agents. Zero overlap. One product.

---

## How to Launch Each Agent

Open **three separate terminal windows.**

### Terminal 1 — Data Agent
```bash
cd dormready/agent-1-data
claude  # or: claude-code
# Claude will read CLAUDE.md automatically and begin Stage 1 scraping
```

### Terminal 2 — Frontend Agent
```bash
cd dormready/agent-2-frontend
claude
# Claude will read CLAUDE.md and scaffold the Next.js app
```

### Terminal 3 — Backend Agent
```bash
cd dormready/agent-3-backend
claude
# Claude will read CLAUDE.md and build the API + DB schema
```

---

## Dependency Order (Important)

```
Agent 1 → produces data/dorms.json
             ↓
Agent 3 → seeds the database from dorms.json
             ↓
Agent 2 → consumes API (or static JSON in Stage 1)
```

**Stage 1 shortcut:** Agent 2 can start immediately using the static JSON files directly — no API needed until Stage 2. Agents 1, 2, and 3 can all run in parallel on Day 1.

---

## Shared Data Location

Agent 1 writes here:
```
agent-1-data/data/schools.json
agent-1-data/data/dorms.json
```

Agent 2 reads from (Stage 1 — static import):
```typescript
import dormsData from '../../agent-1-data/data/dorms.json'
```

Agent 3 seeds from (Stage 1):
```bash
npx ts-node db/seed.ts
```

---

## Stage Gates

| Stage | Agents Working | Gate Condition |
|-------|---------------|----------------|
| 1 | 1, 2, 3 parallel | All checklists in CLAUDE.md complete |
| 2 | 2, 3 (Agent 1 expands to 50 schools) | Site live at dormready.io |
| 3 | All 3 scaling | 50 schools live, affiliate revenue flowing |

---

## One-Time Setup (Do Before Launching Agents)

1. Create Supabase project at supabase.com (free)
2. Copy your `SUPABASE_URL` and keys into `agent-3-backend/.env.local`
3. Create Resend account at resend.com (free tier)
4. Copy `RESEND_API_KEY` into `agent-3-backend/.env.local`
5. Register for Amazon Associates at affiliate-program.amazon.com

That's it. Agents handle everything else.
