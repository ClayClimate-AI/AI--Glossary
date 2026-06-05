🌐 **Live:** [ai-glossary-itai1370.netlify.app](https://ai-glossary-itai1370.netlify.app)

# AI Glossary — ITAI 1370
### Joseph Clay | TuringCollective | Houston Community College
### Professor Anna Devarakonda | CRN: 14049 | Summer 2026

---

## Project Structure

```
L01_TuringCollective_JosephClay_ITAI1370/
├── index.html       ← Entire site: public glossary + admin panel
├── glossary.json    ← All your data lives here
└── README.md        ← This file
```

---

## How to Use the Admin Panel

1. Go to your live site URL
2. Click **Admin** in the top nav
3. Enter password: `TuringAdmin2026` (change this in index.html line: `let adminPW = 'TuringAdmin2026'`)
4. Add, edit, or delete terms using the interface
5. Enter your GitHub credentials in the Save panel
6. Click **Save Glossary to GitHub** — live site updates in ~30 seconds

## How to Generate a GitHub Token

1. Go to github.com → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
2. Click Generate new token
3. Give it a name: `ai-glossary-admin`
4. Check the `repo` scope checkbox
5. Click Generate token — copy it immediately
6. Paste it into the Admin panel token field

## Adding New Module Terms (Each Week)

1. Login to Admin panel
2. Click **+ Add Term**
3. Select the correct module (L02, L03, etc.) from the dropdown
4. Fill in the form
5. Click **Add Term**
6. Click **Save Glossary to GitHub**
7. Done — live site updates automatically

## Submission

File naming: `L01_TuringCollective_JosephClay_ITAI1370`
Submit your Netlify URL as the website URL submission.
