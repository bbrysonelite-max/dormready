# START HERE — DormReady
Read this first. Every time.

## Live URLs
Site: https://dormready.vercel.app
API: https://dormready-production.up.railway.app
Repo: https://github.com/bbrysonelite-max/dormready

## Three Terminals — One At A Time
Black = Agent 1 Data: cd ~/Desktop/dormready/agent-1-data && git checkout agent-1-data && claude
Dark Blue = Agent 2 Frontend: cd ~/Desktop/dormready/agent-2-frontend && git checkout agent-2-frontend && claude
Green = Agent 3 Backend: cd ~/Desktop/dormready/agent-3-backend && git checkout agent-3-backend && claude

ONE TERMINAL AT A TIME. Watch it start before touching the next.

## Dev Servers
Frontend: cd ~/Desktop/dormready/agent-2-frontend && npm run dev (localhost:3000)
Backend: cd ~/Desktop/dormready/agent-3-backend && npm run dev (localhost:3001)

## Deploy Frontend
cd ~/Desktop/dormready/agent-2-frontend && vercel --prod

## Stage 2 Prompts

Agent 1 Black:
Read CLAUDE.md. UCLA is complete. Find real verified dimensions for Stanford, USC, NYU, UT Austin from official housing pages. No nulls. Commit each school separately.

Agent 2 Dark Blue:
Read CLAUDE.md. Site is live at dormready.vercel.app. Build Stage 2: room layout visualizer with to-scale SVG grid and draggable furniture. Add Save My Layout button posting to POST /api/layouts. Fix home page search bar to filter schools.

Agent 3 Green:
Read CLAUDE.md. Backend live on Railway. Build Stage 2: POST /api/layouts, GET /api/affiliate/click, POST /api/layouts/:id/send to email PDF via Resend.

## .env.local — agent-3-backend only, never commit
SUPABASE_URL=https://ubrawsxcpqtnnquftqqk.supabase.co
SUPABASE_ANON_KEY=supabase Settings API Legacy anon key
SUPABASE_SERVICE_KEY=supabase Settings API Legacy service_role key
RESEND_API_KEY=resend.com API Keys
RESEND_FROM_EMAIL=hello@dormready.io
AMAZON_ASSOCIATE_TAG=dormready-20
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

agent-2-frontend/.env.local:
NEXT_PUBLIC_API_URL=http://localhost:3001

## Done vs Not Done
DONE: UCLA 4 buildings live, all pages working, lead capture, affiliate strip, Railway backend, Supabase DB
TODO: dormready.io domain, Amazon Associates, Stanford/USC/NYU/UT Austin data, layout visualizer, PDF delivery, search

## Dashboards
Vercel: https://vercel.com/bbrysonelite-maxs-projects/dormready
Railway: https://railway.com/project/81548116-c5ca-4a9d-942c-e2ff567b105f
Supabase: https://supabase.com/dashboard/project/ubrawsxcpqtnnquftqqk

## Rules
1. One prompt per terminal
2. Never commit .env.local
3. Each agent owns its folder only
4. No guessing dimensions
5. No broken windows
6. Deploy: vercel --prod from agent-2-frontend

## Resume Prompt For New Claude Chat
Working on DormReady. Repo: github.com/bbrysonelite-max/dormready. Frontend: dormready.vercel.app. Backend: dormready-production.up.railway.app. Read START_HERE.md. Stage 1 complete. Continue Stage 2.
