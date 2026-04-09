# START HERE — DormReady
Read this first. Every time.

Live Site: https://dormready.vercel.app
Repo: https://github.com/bbrysonelite-max/dormready

## Three Terminals — One At A Time
Terminal 1 Green Data: cd ~/Desktop/dormready/agent-1-data && git checkout agent-1-data && claude
Terminal 2 Dark Blue Frontend: cd ~/Desktop/dormready/agent-2-frontend && git checkout agent-2-frontend && claude
Terminal 3 Black Backend: cd ~/Desktop/dormready/agent-3-backend && git checkout agent-3-backend && claude

## Start Dev Servers First
Frontend: cd ~/Desktop/dormready/agent-2-frontend && npm run dev (localhost:3000)
Backend: cd ~/Desktop/dormready/agent-3-backend && npm run dev (localhost:3001)

## Stage 2 Prompts

Terminal 1 Green:
Read CLAUDE.md. UCLA is complete. Find real verified dimensions for Stanford from official housing pages. Then USC, NYU, UT Austin. No nulls. Commit each school separately.

Terminal 2 Dark Blue:
Read CLAUDE.md. Home page is live at dormready.vercel.app. Build Stage 2: school index page at /schools/[school_id] and dorm profile page at /schools/[school_id]/[building_id] with dimensions, room type tabs, lead capture, and affiliate strip. API at http://localhost:3001/api/schools.

Terminal 3 Black:
Read CLAUDE.md. Stage 1 complete. Prepare for Railway deployment: create Procfile, document env vars in .env.local.example. Then build POST /api/layouts and GET /api/affiliate/click.

## .env.local (agent-3-backend only — never commit)
SUPABASE_URL=https://ubrawsxcpqtnnquftqqk.supabase.co
SUPABASE_ANON_KEY=from supabase Settings API Legacy tab
SUPABASE_SERVICE_KEY=from supabase Settings API Legacy tab
RESEND_API_KEY=from resend.com
RESEND_FROM_EMAIL=hello@dormready.io
AMAZON_ASSOCIATE_TAG=dormready-20
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

## What Is Done vs Not Done
DONE: UCLA 17 buildings, home page on Vercel, GET /api/schools, POST /api/leads, Supabase sche
