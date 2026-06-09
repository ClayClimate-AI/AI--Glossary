import { useState } from 'react'

const ADMIN_PW = 'TuringAdmin2026'

/* ── Shared input style ─────────────────────────────────── */
const inp = 'w-full bg-brand-surface border border-brand-border rounded-lg text-brand-text text-[0.875rem] py-2.5 px-3 outline-none transition-colors focus:border-brand-accent placeholder:text-brand-muted'

/* ── Login Screen ───────────────────────────────────────── */
function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)

  const attempt = () => {
    if (pw === ADMIN_PW) { onLogin() }
    else { setErr(true); setPw('') }
  }

  return (
    <div className="max-w-[420px] mx-auto mt-24 bg-brand-card border border-brand-border rounded-[14px] overflow-hidden">
      <div className="bg-gradient-to-br from-brand-bg2 to-brand-surface border-b border-brand-border p-8 text-center">
        <h2 className="font-heading font-extrabold text-brand-text text-2xl mb-1">Admin Access</h2>
        <p className="font-code text-[0.7rem] text-brand-muted">TuringCollective · ITAI 1370 Glossary</p>
      </div>
      <div className="p-8">
        {err && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-3.5 py-2.5 text-[0.82rem] text-red-400 mb-5">
            Incorrect password. Try again.
          </div>
        )}
        <label className="block font-code text-[0.68rem] text-brand-accent uppercase tracking-[0.1em] mb-1.5">
          Password
        </label>
        <input
          type="password"
          value={pw}
          onChange={e => { setPw(e.target.value); setErr(false) }}
          onKeyDown={e => e.key === 'Enter' && attempt()}
          placeholder="Enter admin password"
          className={`${inp} mb-4`}
        />
        <button
          onClick={attempt}
          className="w-full font-code text-[0.75rem] py-2.5 rounded-lg bg-brand-accent text-black border-none cursor-pointer font-medium hover:bg-brand-accent2 transition-colors"
        >
          Access Admin Panel →
        </button>
      </div>
    </div>
  )
}

/* ── GitHub Save Panel ──────────────────────────────────── */
function GithubPanel({ data }) {
  const [user, setUser]   = useState('')
  const [repo, setRepo]   = useState('')
  const [token, setToken] = useState('')
  const [status, setStatus] = useState(null) // { msg, type } | null

  const save = async () => {
    if (!user || !repo || !token) { setStatus({ msg: 'Fill in all three fields.', type: 'error' }); return }
    setStatus({ msg: '⏳ Connecting to GitHub…', type: 'loading' })
    try {
      const url = `https://api.github.com/repos/${user}/${repo}/contents/public/glossary.json`
      const headers = {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      }
      const getRes = await fetch(url, { headers })
      let sha = ''
      if (getRes.ok) { sha = (await getRes.json()).sha }

      const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))))
      const body = { message: 'Update glossary.json via admin panel', content, ...(sha && { sha }) }
      const putRes = await fetch(url, { method: 'PUT', headers, body: JSON.stringify(body) })

      if (putRes.ok) {
        setStatus({ msg: '✓ Saved to GitHub! Netlify will rebuild in ~30 seconds.', type: 'success' })
      } else {
        const err = await putRes.json()
        setStatus({ msg: `✗ GitHub error: ${err.message || putRes.status}`, type: 'error' })
      }
    } catch (e) {
      setStatus({ msg: `✗ Network error: ${e.message}`, type: 'error' })
    }
  }

  const statusCls = {
    success: 'bg-brand-green/10 border border-brand-green/30 text-brand-green',
    error:   'bg-red-500/10 border border-red-500/30 text-red-400',
    loading: 'bg-brand-accent/10 border border-brand-accent/30 text-brand-accent',
  }

  return (
    <div className="bg-brand-card border border-brand-border rounded-[10px] p-6 mb-6">
      <h3 className="font-heading font-bold text-brand-text text-base mb-1">Save to GitHub</h3>
      <p className="text-[0.82rem] text-brand-muted mb-5 leading-relaxed">
        Enter your credentials once. Every save writes directly to your repo — Netlify rebuilds the live site automatically in ~30 seconds.
      </p>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          ['GitHub Username', user, setUser, 'e.g. josephc1417', 'text'],
          ['Repository Name', repo, setRepo, 'e.g. ai-glossary', 'text'],
          ['Personal Access Token', token, setToken, 'ghp_xxxxxxxxxxxx', 'password'],
        ].map(([label, val, setter, ph, type]) => (
          <div key={label}>
            <label className="block font-code text-[0.68rem] text-brand-accent uppercase tracking-[0.1em] mb-1.5">
              {label}
            </label>
            <input type={type} value={val} onChange={e => setter(e.target.value)} placeholder={ph} className={inp} />
          </div>
        ))}
      </div>
      <button
        onClick={save}
        className="font-code text-[0.75rem] px-5 py-2.5 rounded-lg bg-brand-green text-black border-none cursor-pointer font-medium hover:bg-emerald-400 transition-colors"
      >
        ⬆ Save Glossary to GitHub
      </button>
      {status && (
        <div className={`font-code text-[0.75rem] px-3.5 py-2.5 rounded-lg mt-3 ${statusCls[status.type]}`}>
          {status.msg}
        </div>
      )}
    </div>
  )
}

/* ── Module Manager ─────────────────────────────────────── */
function ModuleManager({ modules, onAdd }) {
  const [input, setInput] = useState('')
  const add = () => {
    const val = input.trim().toUpperCase()
    if (val) { onAdd(val); setInput('') }
  }
  return (
    <div className="bg-brand-card border border-brand-border rounded-[10px] p-6 mb-6">
      <h3 className="font-heading font-bold text-brand-text text-base mb-1">Module Manager</h3>
      <p className="text-[0.82rem] text-brand-muted mb-4">
        Add a new module label to start grouping terms for the next lab.
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {modules.map(m => {
          return (
            <span key={m} className="inline-flex items-center gap-2 font-code text-[0.72rem] px-3 py-1.5 rounded-full border border-brand-border2 bg-brand-surface text-brand-text">
              {m}
            </span>
          )
        })}
      </div>
      <div className="flex gap-3 items-center">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="e.g. L02"
          className={`${inp} max-w-[200px]`}
        />
        <button
          onClick={add}
          className="font-code text-[0.75rem] px-5 py-2.5 rounded-lg border border-brand-border2 text-brand-muted bg-transparent cursor-pointer whitespace-nowrap hover:border-brand-accent hover:text-brand-accent transition-all"
        >
          + Add Module
        </button>
      </div>
    </div>
  )
}

/* ── Admin Dashboard ────────────────────────────────────── */
function AdminDashboard({ data, setData, modules, onEdit, onAddModule, showToast, onLogout }) {
  const [search, setSearch]   = useState('')
  const [modFilter, setModFilter] = useState('all')

  const terms = data.terms
  const mods  = [...new Set(terms.map(t => t.module))].sort()
  const srcs  = new Set(terms.map(t => t.source.author + t.source.year)).size

  const filtered = terms
    .filter(t => {
      const mm = modFilter === 'all' || t.module === modFilter
      const q  = search.toLowerCase()
      const ms = !q || t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
      return mm && ms
    })
    .sort((a, b) => a.letter.localeCompare(b.letter))

  const deleteTerm = (id) => {
    const t = terms.find(x => x.id === id)
    if (!t || !confirm(`Delete "${t.term}"? This cannot be undone.`)) return
    setData(prev => ({ ...prev, terms: prev.terms.filter(x => x.id !== id) }))
    showToast('Term deleted', 'error')
  }

  return (
    <div className="max-w-[1100px] mx-auto px-8 py-12 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="font-heading font-extrabold text-brand-text text-[1.75rem]">Admin Panel</h1>
        <div className="flex gap-3">
          <button
            onClick={() => onEdit('new')}
            className="font-code text-[0.75rem] px-5 py-2.5 rounded-lg bg-brand-green text-black border-none cursor-pointer font-medium hover:bg-emerald-400 transition-colors flex items-center gap-2"
          >
            + Add Term
          </button>
          <button
            onClick={onLogout}
            className="font-code text-[0.75rem] px-5 py-2.5 rounded-lg border border-brand-border2 text-brand-muted bg-transparent cursor-pointer hover:border-brand-accent hover:text-brand-accent transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {[
          [terms.length, 'Total Terms'],
          [mods.length, 'Modules'],
          [srcs, 'Sources'],
          [Math.max(0, 26 - terms.length), 'Letters Left'],
        ].map(([n, label]) => (
          <div key={label} className="bg-brand-card border border-brand-border rounded-[10px] py-4 px-5 text-center">
            <div className="font-heading font-extrabold text-brand-accent text-[1.75rem] leading-none mb-1">{n}</div>
            <div className="font-code text-[0.6rem] text-brand-muted uppercase tracking-[0.08em]">{label}</div>
          </div>
        ))}
      </div>

      <GithubPanel data={data} />
      <ModuleManager modules={modules} onAdd={onAddModule} />

      {/* Toolbar */}
      <div className="flex gap-3 items-center flex-wrap mb-4 bg-brand-card border border-brand-border rounded-[10px] p-4">
        <div className="relative max-w-[240px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted text-sm select-none">⌕</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search terms…"
            className="w-full bg-brand-surface border border-brand-border rounded-lg text-brand-text text-[0.82rem] py-[0.45rem] pr-3 pl-9 outline-none focus:border-brand-accent placeholder:text-brand-muted"
          />
        </div>
        <select
          value={modFilter}
          onChange={e => setModFilter(e.target.value)}
          className="bg-brand-surface border border-brand-border rounded-lg text-brand-text text-[0.82rem] py-2 px-3 outline-none focus:border-brand-accent"
        >
          <option value="all">All Modules</option>
          {mods.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <span className="ml-auto font-code text-[0.68rem] text-brand-muted">{filtered.length} terms</span>
      </div>

      {/* Table */}
      <div className="bg-brand-card border border-brand-border rounded-[10px] overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {['Letter', 'Term & Definition', 'Module', 'Actions'].map((h, i) => (
                <th
                  key={h}
                  className="bg-brand-surface text-left font-code text-[0.65rem] text-brand-muted uppercase tracking-[0.08em] px-4 py-3 border-b border-brand-border whitespace-nowrap"
                  style={{ width: i === 0 ? 60 : i === 2 ? 90 : i === 3 ? 130 : undefined }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id} className="border-b border-brand-border last:border-0 hover:[&>td]:bg-brand-accent/[0.02] transition-colors">
                <td className="px-4 py-3.5 align-top">
                  <span className="font-heading font-extrabold text-brand-accent text-[1.4rem] leading-none">{t.letter}</span>
                </td>
                <td className="px-4 py-3.5 align-top">
                  <div className="font-medium text-brand-text text-[0.9rem] mb-0.5">{t.term}</div>
                  <div
                    className="text-[0.78rem] text-brand-muted leading-[1.55]"
                    style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                  >
                    {t.definition}
                  </div>
                </td>
                <td className="px-4 py-3.5 align-top">
                  <span className="font-code text-[0.65rem] text-brand-muted bg-brand-surface border border-brand-border px-[0.45rem] py-[0.15rem] rounded whitespace-nowrap">
                    {t.module}
                  </span>
                </td>
                <td className="px-4 py-3.5 align-top">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(t)}
                      className="font-code text-[0.65rem] px-2.5 py-1.5 rounded border border-brand-border2 text-brand-muted bg-transparent cursor-pointer hover:border-brand-accent hover:text-brand-accent transition-all whitespace-nowrap"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTerm(t.id)}
                      className="font-code text-[0.65rem] px-2.5 py-1.5 rounded bg-red-500 text-white border-none cursor-pointer hover:bg-red-600 transition-colors whitespace-nowrap"
                    >
                      Del
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ── Page ───────────────────────────────────────────────── */
export default function AdminPage({
  data, setData, modules, adminLoggedIn, setAdminLoggedIn, onEdit, showToast,
}) {
  if (!adminLoggedIn) {
    return <LoginScreen onLogin={() => setAdminLoggedIn(true)} />
  }

  return (
    <>
      <AdminDashboard
        data={data}
        setData={setData}
        modules={modules}
        onEdit={onEdit}
        onAddModule={onAddModule}
        showToast={showToast}
        onLogout={() => setAdminLoggedIn(false)}
      />
      <footer className="border-t border-brand-border px-8 py-6 text-center">
        <p className="font-code text-[0.68rem] text-brand-dim tracking-[0.05em]">
          Joseph Clay · ITAI 1370 — History of AI · TuringCollective · Summer 2026
        </p>
      </footer>
    </>
  )
}
