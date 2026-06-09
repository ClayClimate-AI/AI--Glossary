# AI Glossary — ITAI 1370
### Joseph Clay | TuringCollective | Houston Community College
### Professor Anna Devarakonda | CRN: 14049 | Summer 2026

🌐 **Live Site:** [l01-josephclay-itai1370.netlify.app](https://l01-josephclay-itai1370.netlify.app)

---

## About This Project

This is a living AI reference glossary built for ITAI 1370 — History of AI, Theory and Platforms. It launched with 26 terms for Lab L01 (one per letter, A–Z) and grows throughout the semester as each new module introduces new concepts. By the end of the course, the full expanded glossary becomes the Term Project submission.

The site is always live, always up to date, and always citeable — every term includes a definition, a real-world example, and an APA citation that auto-renders in the References section.

---

## Why the Stack Changed: Vanilla → React + Vite + Tailwind

The project started as a single `index.html` file — all HTML, CSS, and JavaScript written by hand with no dependencies. That approach is simple and works well for a first deployment, but it has a ceiling. As the glossary grows from 26 terms to 100+, that single file becomes difficult to maintain, update, and extend.

### The Original Stack

| Layer | Technology |
|---|---|
| Markup | HTML — written directly in one file |
| Styles | CSS — custom properties and keyframes in a `<style>` block |
| Logic | Vanilla JavaScript — DOM manipulation in a `<script>` block |
| Data | `glossary.json` — fetched at runtime |
| Hosting | Netlify — direct file upload, no build step |

This worked for Lab L01. The entire app lived in one file, opened with Live Server, and deployed with zero configuration.

### Why It Needed to Evolve

A glossary that gets updated every week for 16 weeks is not a static document — it is a growing application. Adding module tabs, search, modals, admin CRUD, and a GitHub save pipeline inside a single flat file creates real problems:

- **No component reuse.** Every card, modal, and form section was templated as raw HTML strings inside JavaScript functions. Changing the card layout meant finding every place it was built and updating each one.
- **No separation of concerns.** Styles, logic, and structure were intermixed. A CSS change required scrolling through JavaScript to find the right template literal.
- **No build optimization.** The entire app — all CSS, all JS — shipped as one unminified file on every load.
- **Hard to scale.** As terms grow past 100, adding new fields, new pages, or new filter logic in a monolithic file becomes error-prone.

### The New Stack

| Layer | Technology | Why |
|---|---|---|
| UI Framework | **React 18** | Component-based — each section (Nav, TermCard, Modal, AdminPanel) is its own isolated, reusable file. Logic lives with the markup it controls. |
| Build Tool | **Vite 5** | Instant dev server with hot module replacement. Production builds are minified, tree-shaken, and optimized automatically. Netlify detects it and runs `npm run build` on every push. |
| Styling | **Tailwind CSS v3** | Utility-first classes keep styles colocated with components. No more scrolling between a `<style>` block and a template literal to change a button's color. The design system (colors, fonts, spacing) is defined once in `tailwind.config.js`. |
| Data | **`public/glossary.json`** | Same flat JSON structure — just moved to `public/` so Vite copies it into the build output unchanged. |
| State | **React `useState` / `useMemo`** | Search, filters, modals, and admin state are managed declaratively. No more manual DOM manipulation. |

### What Stayed the Same

The rebuild was a technology change, not a design change. Everything visible to a reader or professor is identical to the original:

- The dark AI aesthetic, animated grid background, and cyan accent color
- The animated neural network logo
- The term card layout, view modal, and APA references section
- The admin panel with login, CRUD, module manager, and GitHub save
- The `glossary.json` data format — all 26 L01 terms carry over exactly

---

## Project Structure

```
AI_Glossary/
├── index.html              ← Vite entry point (replaces the old full-app file)
├── netlify.toml            ← Tells Netlify: build with npm run build, serve dist/
├── package.json            ← React, Vite, Tailwind dependencies
├── tailwind.config.js      ← Brand colors, fonts, custom shadow tokens
├── vite.config.js          ← Vite config with React plugin
├── public/
│   └── glossary.json       ← All term data — the only file edited for content
└── src/
    ├── App.jsx             ← Root component — all shared state lives here
    ├── index.css           ← Tailwind directives + global CSS animations
    ├── main.jsx            ← React entry point
    ├── components/
    │   ├── Logo.jsx        ← Animated neural network SVG
    │   ├── Nav.jsx         ← Sticky nav with search
    │   ├── ViewModal.jsx   ← Public term detail modal
    │   ├── TermFormModal.jsx ← Admin add/edit form modal
    │   └── Toast.jsx       ← Notification toast
    ├── pages/
    │   ├── GlossaryPage.jsx ← Hero, stats, filters, card grid, references
    │   ├── AboutPage.jsx   ← Course and assignment info
    │   └── AdminPage.jsx   ← Login, dashboard, GitHub save, terms table
    └── utils/
        └── cite.js         ← APA citation formatter
```

---

## Adding New Terms Each Week

1. Go to the live site → click **Admin** in the nav
2. Enter password: `TuringAdmin2026`
3. Click **+ Add Term**
4. Select the correct module (L02, L03, etc.) from the dropdown
5. Fill in Term, Definition, Example, and Source fields
6. Click **Add Term**
7. In the **Save to GitHub** panel, enter your GitHub username, repo name (`AI--Glossary`), and personal access token
8. Click **Save Glossary to GitHub** — Netlify rebuilds the live site in ~30 seconds

New module tabs appear automatically when any term uses a new module label.

---

## Generating a GitHub Token

1. GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
2. Click **Generate new token**
3. Name it `ai-glossary-admin`, check the `repo` scope
4. Copy the token immediately and paste it into the admin panel

---

## Local Development

```bash
npm install
npm run dev       # starts dev server at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

---

## Submission

File naming convention: `L01_TuringCollective_JosephClay_ITAI1370`
Submit the live Netlify URL as the website URL entry.
