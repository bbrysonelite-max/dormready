# CLAUDE.md — Agent 1: Data Agent
Your role: Scrape, clean, and structure dorm room dimension data.
You own: agent-1-data/ only.
Do NOT touch: agent-2-frontend/ or agent-3-backend/

## Stage 1 — Scrape these 5 schools
- UCLA: https://ask.housing.ucla.edu/app/answers/detail/a_id/539
- Stanford: https://rde.stanford.edu
- USC: https://housing.usc.edu
- NYU: https://www.nyu.edu/students/student-information-and-resources/housing-and-dining.html
- UT Austin: https://housing.utexas.edu

## Your Output
Produce two files in agent-1-data/data/
- schools.json
- dorms.json

## JSON Contract
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
          "notes": "Community bathroom. No AC. Twin XL beds.",
          "source_url": ""
        }
      ]
    }
  ]
}

## Rules
1. Accuracy over speed. Mark unknown fields null — never guess.
2. Cite sources. Add source_url to every building.
3. Never commit raw HTML. Parse immediately.
4. Run validate.js before every commit.
5. No broken windows.

## Progress Log
- 2026-04-07: Stage 1 UCLA complete. Scraped 17 buildings from ask.housing.ucla.edu/app/answers/detail/a_id/539. Produced data/dorms.json and data/schools.json. validate.js passes.
