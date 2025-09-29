# Personalized-Meal-Fitness-Planner
Capstone project: A web app that recommends personalized weekly meal and fitness plans for customers based on their needs and information.
# Plan Smarter, Eat Better — Personalized Meal & Fitness Planner

> **Status:** Planning (Week 1). Tech not installed yet. This repo holds docs, wireframes, and setup notes so development can start cleanly in Week 2.

## Project Overview
A simple web/mobile app that recommends a **weekly meal plan** and **fitness routine** from a short user profile (weight, dietary preferences, goal, available time). The app focuses on **personalization**, **ease of use**, and **scalability**.

# Goals (MVP)
- Collect basic user profile (weight, diet prefs, goal, available time).
- Generate a 7‑day **meal plan** and **workout schedule** from rules + free APIs.
- Show a clean weekly view and allow quick swap for meals/workouts.
- Save user data and plans (offline-first; sync later).

# Planned Tech Stack (to be installed later)
- **Frontend:** React + TypeScript or Flutter alternative.
- **Backend/DB:** Firebase (Auth, Firestore).
- **APIs:** Free nutrition API (e.g., Edamam/Spoonacular) + internal workout library.
- **Tooling:** GitHub Projects for tasks; Figma for wireframes.

> Note: No React/Firebase code yet — Week 1 is repo setup, planning, and research.

# Architecture Plan (high-level)
- `frontend/` – UI, state mgmt, API clients, offline cache.
- `cloud/` – Firebase rules, sample Cloud Functions (optional later).
- `data/` – seed JSON for meals/workouts, category tags.
- `docs/` – specs, decision logs, API notes.
- `wireframes/` – Figma exports / screenshots.
- `scripts/` – helper scripts (e.g., data import).

## Repository Structure
```
.
├─ docs/
│  ├─ proposal.md
│  ├─ milestones.md
│  └─ api-notes.md
├─ wireframes/
│  └─ week1-sketches/
├─ data/
│  ├─ sample-meals.json
│  └─ sample-workouts.json
├─ frontend/            # placeholder (to be created later)
├─ cloud/               # placeholder (to be created later)
├─ scripts/
│  └─ README.md
├─ .gitignore
└─ README.md
```


# Data Model (initial draft)
```
users/{uid}:
  name, email
  profile: { weightKg, heightCm, dietPrefs[], goal, timePerDayMins }
  settings: { units: "metric|imperial" }

plans/{uid}/{yyyy‑mm‑dd}:
  meals: [ {id, name, kcals, protein, carbs, fat, instructionsRef} ]
  workout: { dayType, blocks: [ {name, durationMins, intensity} ] }
```

# Environment & Secrets
Create a local `.env.local` (not committed) once Firebase/API keys exist:
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_PROJECT_ID=...
VITE_NUTRITION_API_KEY=...
```

# Collaboration
- Issues + tasks tracked in **GitHub Projects**.
- Branching model: `main` (stable) → `feat/<name>` for features.
- PR template and code style to be added in Week 2.

# License
MIT (see `LICENSE`).

---

### Quick Start (when ready)
1) Install Node.js (LTS).  
2) `cd frontend && npm create vite@latest` *(or React/Flutter scaffold)*  
3) Configure Firebase in `/frontend/src/config/` and `.env.local`.  
4) Run dev server and start building screens.
