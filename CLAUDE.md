# CLAUDE.md — AI Glossary Project
### TuringCollective | ITAI 1370 | Joseph Clay

---

## What This Project Is

This is a live, deployable AI glossary website built for ITAI 1370 — History of AI, Theory and Platforms at Houston Community College. It serves as both a graded assignment submission and a growing portfolio piece. The glossary starts with 26 terms for Lab L01 and expands every week throughout the semester into a full Term Project.

---

## Project Owner

| Field | Value |
|---|---|
| Student | Joseph Clay |
| Major | B.A.T in AI and Robotics |
| Course | ITAI 1370 — History of AI |
| Professor | Professor Anna Devarakonda |
| CRN | 14049 |
| Team | TuringCollective |
| Institution | Houston Community College |
| Term | Summer 2026 |
| GitHub | josephc1417 |

---

## File Structure

```
L01_TuringCollective_JosephClay_ITAI1370/
├── index.html       ← Entire application — public glossary + admin panel
├── glossary.json    ← All term data — the only file edited for content changes
├── README.md        ← Deployment and usage instructions
└── CLAUDE.md        ← This file — project context for Claude
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML + CSS + JavaScript — no framework |
| Data | glossary.json — flat JSON file, single source of truth |
| Version Control | GitHub (repo: ai-glossary) |
| Hosting | Netlify — auto-deploys on every GitHub push |
| Persistence | GitHub API — admin panel writes directly to glossary.json in the repo |
| Fonts | Syne (headings) + Outfit (body) + JetBrains Mono (labels/code) |
| Theme | Dark AI tech aesthetic — animated grid background, cyan accent (#00d4ff) |

---

## Architecture Overview

```
glossary.json
     │
     ▼
index.html loads JSON via fetch('./glossary.json')
     │
     ├── PUBLIC GLOSSARY (default view)
     │   ├── Sticky nav with search
     │   ├── Hero section with metadata
     │   ├── Stats bar (terms, letters, modules, sources)
     │   ├── Module filter tabs (auto-generated from JSON)
     │   ├── Alphabet navigation bar
     │   ├── Term card grid with search + filter
     │   ├── Full term modal (definition, example, APA citation)
     │   └── Auto-generated APA references section
     │
     ├── ABOUT PAGE
     │   └── Course info, assignment structure, submission details
     │
     └── ADMIN PANEL (password protected)
         ├── Login screen — password: TuringAdmin2026
         ├── Dashboard stats
         ├── GitHub save panel (writes directly to repo via API)
         ├── Module manager (add new modules like L02, L03)
         ├── Terms table with search + module filter
         └── Add / Edit / Delete term modal with full form
```

---

## glossary.json Structure

This is the only file that changes for content updates. Never touch index.html for content.

```json
{
  "metadata": {
    "title": "AI Glossary — Lab L01",
    "student": "Joseph Clay",
    "major": "B.A.T in AI and Robotics",
    "course": "ITAI 1370 — History of AI",
    "professor": "Professor Anna Devarakonda",
    "crn": "14049",
    "institution": "Houston Community College",
    "term": "Summer 2026",
    "team": "TuringCollective",
    "description": "..."
  },
  "terms": [
    {
      "id": "A",
      "letter": "A",
      "term": "Algorithm",
      "definition": "2-3 sentence definition.",
      "example": "Real-world example.",
      "module": "L01",
      "source": {
        "author": "Last, F.",
        "year": "2023",
        "title": "Title of source",
        "publisher": "Publisher name",
        "url": "https://..."
      }
    }
  ]
}
```

### Key rules for the JSON:
- Every term needs a unique `id` — use the letter for L01 terms (A, B, C...), use `LETTER_timestamp` for new terms added via admin
- `module` field controls which filter tab a term appears under — set to L01, L02, L03 etc.
- Sources follow APA format — author, year, title, publisher, url (url is optional)
- Terms are sorted alphabetically by `letter` at render time — order in JSON does not matter
- The references section auto-generates from all source fields in the terms array

---

## Admin Panel

### Login
- Navigate to the site → click Admin in the nav
- Default password: `TuringAdmin2026`
- To change: find `let adminPW = 'TuringAdmin2026'` in index.html and update the string

### GitHub Save (Persistence)
The admin panel uses the GitHub Contents API to write glossary.json directly to the repo.

Required fields in the Save panel:
- **GitHub Username** — josephc1417
- **Repository Name** — ai-glossary
- **Personal Access Token** — generate at github.com → Settings → Developer Settings → Personal Access Tokens → Tokens (classic) → check `repo` scope

Workflow:
1. Make edits in admin panel (add/edit/delete terms)
2. Click Save Glossary to GitHub
3. GitHub updates glossary.json in the repo
4. Netlify detects the commit and rebuilds
5. Live site reflects changes in ~30 seconds

### CRUD Operations
| Action | How |
|---|---|
| Add term | Click + Add Term button → fill form → Add Term |
| Edit term | Click Edit on any row in the table → update fields → Save Changes |
| Delete term | Click Del on any row → confirm → gone |
| Add module | Module Manager → type new label (e.g. L02) → Add Module |
| Save to GitHub | Fill GitHub credentials → Save Glossary to GitHub |

---

## Assignment Specifications

### Lab L01 Requirements
- 26 AI terms — one per letter A through Z
- Each term: 2-3 sentence definition + real-world example + optional visual + APA citation
- Organized alphabetically
- Bibliography at the end in APA format
- Submitted as website URL, media recording, or file upload
- File naming: `L01_TuringCollective_JosephClay_ITAI1370`

### Grading Rubric (6 criteria, 5 points each)
| Criteria | What the site does |
|---|---|
| Content Comprehensiveness | All 26 letters covered, all sections complete |
| Visual Representation | Card grid, modals, stats bar, alphabet nav |
| GitHub/Project Integration | Deployed via GitHub + Netlify, link submittable |
| Resource Relevance | APA citations with sources for every term |
| Reflection Depth | Definitions written in Joseph's own words |
| Bibliography & Citations | Auto-generated APA references section |

### This Glossary Grows All Semester
Every week add new terms for that module via the admin panel. By end of term the full glossary is the Term Project — already organized by module, already cited, already live.

---

## Deployment

### First Time Setup
```
1. Create GitHub repo: ai-glossary
2. Upload index.html and glossary.json
3. Go to netlify.com → New site from Git → connect GitHub repo
4. Deploy → get live URL
5. Submit that URL as the assignment
```

### Ongoing Updates
```
Admin panel → add/edit terms → Save to GitHub → Netlify rebuilds automatically
```

---

## What Claude Should Know When Helping

- **Never rewrite index.html from scratch** — it contains the full working application. Make targeted edits only.
- **Content changes go in glossary.json** — not in index.html.
- **The admin password** is stored as a plain string in index.html (`let adminPW`). This is acceptable for a school project on a free Netlify URL.
- **The GitHub token** is entered by the user in the admin panel UI at runtime — it is never hardcoded in the files.
- **Module tabs are auto-generated** — adding `"module": "L02"` to any term automatically creates the L02 filter button. No code change needed.
- **The id field must be unique** — for L01 terms it matches the letter. For new terms added via admin it uses `LETTER_timestamp` format.
- **APA citations auto-render** — the references section at the bottom of the glossary page builds itself from all source objects in the terms array, deduplicated and sorted alphabetically.
- **Design system** — dark theme, CSS variables defined in :root. Primary accent is `#00d4ff` (cyan). Secondary accent is `#00ffaa` (green). Gold `#ffd060` reserved for highlights. Do not introduce new color values — use existing CSS variables.
- **Fonts** — Syne for headings (font-weight 800), Outfit for body text, JetBrains Mono for labels and code elements. Do not change fonts.
- **No frameworks** — this is intentionally vanilla HTML/CSS/JS. Do not suggest React, Vue, or any bundler. The simplicity is the point — it opens with Live Server, deploys to Netlify with zero config, and runs everywhere.

---

## Common Tasks Claude Might Be Asked to Help With

| Task | Approach |
|---|---|
| Add a new term manually | Edit glossary.json — copy an existing term block, update all fields, give it a unique id |
| Change the admin password | Find `let adminPW` in index.html, update the string |
| Update course metadata | Edit the `metadata` object at the top of glossary.json |
| Add a visual/image to a term | Currently terms don't have image fields — would need to add an `image` field to the term schema and update the card and modal render functions in index.html |
| Change the color theme | Update CSS variables in the :root block at the top of the style section in index.html |
| Add a new page/nav item | Add a nav button, a page div with matching id, and a case in the showPage() function |
| Debug GitHub save | Check that the token has `repo` scope, the username and repo name are exact, and CORS is not blocking the fetch |
| Export the glossary as a document | The JSON can be converted to a Word doc or PDF using the docx or pdf skills |
