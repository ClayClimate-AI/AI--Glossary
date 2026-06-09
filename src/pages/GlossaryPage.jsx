import { useMemo } from 'react'
import { buildCite } from '../utils/cite'

/* ── Hero ──────────────────────────────────────────────── */
function Hero({ metadata: m }) {
  return (
    <div className="max-w-page mx-auto px-8 pt-16 pb-10">
      <div className="inline-flex items-center gap-2 font-code text-[0.68rem] tracking-[0.12em] text-brand-accent bg-brand-accent/[0.08] border border-brand-accent/20 rounded-full px-3.5 py-1.5 mb-6">
        <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0" />
        Lab L01 — Glossary Kickstart · TuringCollective
      </div>
      <h1 className="font-heading font-extrabold text-brand-text leading-[1.08] mb-5" style={{ fontSize: 'clamp(2.2rem,5vw,4rem)' }}>
        Artificial Intelligence<br />
        <span className="text-brand-accent">Reference Glossary</span>
      </h1>
      <div className="flex flex-wrap gap-8 mb-6">
        {[
          ['Student', m.student],
          ['Major', m.major],
          ['Course', m.course],
          ['Professor', m.professor],
          ['Term', m.term],
        ].map(([label, value]) => (
          <div key={label} className="flex flex-col gap-0.5">
            <span className="font-code text-[0.62rem] text-brand-muted uppercase tracking-[0.1em]">{label}</span>
            <span className="text-[0.875rem] text-brand-text font-medium">{value}</span>
          </div>
        ))}
      </div>
      <p className="max-w-[640px] text-[0.9rem] text-brand-muted leading-[1.75] border-l-2 border-brand-accent pl-5">
        {m.description}
      </p>
    </div>
  )
}

/* ── Stats Bar ─────────────────────────────────────────── */
function StatsBar({ terms }) {
  const mods = new Set(terms.map(t => t.module)).size
  const srcs = new Set(terms.map(t => t.source.author + t.source.year)).size
  const stats = [
    [terms.length, 'Terms'],
    [26, 'Letters'],
    [mods, 'Modules'],
    [srcs, 'Sources'],
  ]
  return (
    <div className="max-w-page mx-auto px-8 mb-8">
      <div className="grid grid-cols-4 border border-brand-border rounded-[10px] overflow-hidden" style={{ gap: '1px', background: '#1a2540' }}>
        {stats.map(([n, label]) => (
          <div key={label} className="bg-brand-surface text-center py-5 px-6">
            <div className="font-heading font-extrabold text-brand-accent text-[2rem] leading-none mb-1">{n}</div>
            <div className="font-code text-[0.62rem] text-brand-muted uppercase tracking-[0.08em]">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Module Bar ────────────────────────────────────────── */
function ModuleBar({ modules, activeModule, setActiveModule, setActiveLetter }) {
  const handleAll = () => { setActiveModule('all'); setActiveLetter(null) }
  return (
    <div className="max-w-page mx-auto px-8 mb-6 flex flex-wrap items-center gap-2">
      <span className="font-code text-[0.65rem] text-brand-muted tracking-[0.08em] mr-2">Module:</span>
      <button
        onClick={handleAll}
        className={`font-code text-[0.7rem] px-3.5 py-1.5 rounded-full border cursor-pointer transition-all tracking-[0.05em] ${
          activeModule === 'all'
            ? 'bg-brand-accent border-brand-accent text-black font-medium'
            : 'bg-transparent border-brand-border2 text-brand-muted hover:bg-brand-accent hover:border-brand-accent hover:text-black'
        }`}
      >
        All
      </button>
      {modules.map(mod => (
        <button
          key={mod}
          onClick={() => setActiveModule(mod)}
          className={`font-code text-[0.7rem] px-3.5 py-1.5 rounded-full border cursor-pointer transition-all tracking-[0.05em] ${
            activeModule === mod
              ? 'bg-brand-accent border-brand-accent text-black font-medium'
              : 'bg-transparent border-brand-border2 text-brand-muted hover:bg-brand-accent hover:border-brand-accent hover:text-black'
          }`}
        >
          {mod}
        </button>
      ))}
    </div>
  )
}

/* ── Alpha Bar ─────────────────────────────────────────── */
function AlphaBar({ terms, activeLetter, setActiveLetter }) {
  const hasLetters = new Set(terms.map(t => t.letter))
  return (
    <div className="max-w-page mx-auto px-8 mb-7 flex flex-wrap gap-1.5">
      {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => (
        <button
          key={l}
          onClick={() => setActiveLetter(activeLetter === l ? null : l)}
          className={`w-8 h-8 rounded-md border font-code text-[0.72rem] flex items-center justify-center cursor-pointer transition-all ${
            activeLetter === l
              ? 'bg-brand-accent border-brand-accent text-black font-medium'
              : hasLetters.has(l)
              ? 'bg-brand-surface border-brand-border text-brand-text hover:bg-brand-accent hover:border-brand-accent hover:text-black'
              : 'bg-brand-surface border-brand-border text-brand-muted opacity-40 cursor-default'
          }`}
        >
          {l}
        </button>
      ))}
      {activeLetter && (
        <button
          onClick={() => setActiveLetter(null)}
          className="h-8 px-2.5 rounded-md border border-brand-border bg-brand-surface text-brand-muted font-code text-[0.65rem] flex items-center gap-1 cursor-pointer ml-1 transition-all hover:border-brand-accent hover:text-brand-accent whitespace-nowrap"
        >
          ✕ Clear
        </button>
      )}
    </div>
  )
}

/* ── Term Card ─────────────────────────────────────────── */
function TermCard({ term, index, onView }) {
  return (
    <div
      className="card-animate bg-brand-card border border-brand-border rounded-[10px] overflow-hidden cursor-pointer transition-all hover:-translate-y-0.5 hover:border-brand-accent hover:shadow-glow"
      style={{ animationDelay: `${index * 0.035}s` }}
      onClick={() => onView(term)}
    >
      {/* Card header */}
      <div className="flex items-center gap-3.5 px-5 py-4 border-b border-brand-border">
        <div className="font-heading font-extrabold text-brand-accent leading-none text-[2.2rem] min-w-[2.2rem]">
          {term.letter}
        </div>
        <div className="font-heading text-[1rem] font-bold text-brand-text leading-[1.25] flex-1">
          {term.term}
        </div>
        <div className="font-code text-[0.6rem] text-brand-muted bg-brand-surface border border-brand-border px-[0.45rem] py-[0.15rem] rounded whitespace-nowrap ml-auto">
          {term.module}
        </div>
      </div>

      {/* Card body */}
      <div className="px-5 py-3.5">
        <p
          className="text-[0.82rem] text-brand-muted leading-[1.65] mb-3.5"
          style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {term.definition}
        </p>
        <div className="font-code text-[0.6rem] text-brand-green uppercase tracking-[0.1em] mb-1">
          Real-World Example
        </div>
        <p
          className="text-[0.78rem] text-brand-text leading-[1.6]"
          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {term.example}
        </p>
      </div>

      {/* Card footer */}
      <div className="px-5 py-2.5 border-t border-brand-border flex items-center justify-between">
        <div className="font-code text-[0.6rem] text-brand-dim overflow-hidden text-ellipsis whitespace-nowrap max-w-[180px]">
          {term.source.author}, {term.source.year}
        </div>
        <button
          onClick={e => { e.stopPropagation(); onView(term) }}
          className="font-code text-[0.6rem] text-brand-accent bg-transparent border-none cursor-pointer p-0 whitespace-nowrap transition-opacity hover:opacity-70"
        >
          View Full →
        </button>
      </div>
    </div>
  )
}

/* ── References ────────────────────────────────────────── */
function RefsSection({ terms }) {
  const refs = useMemo(() => {
    const seen = new Map()
    terms.forEach(t => {
      const k = t.source.author + t.source.year
      if (!seen.has(k)) seen.set(k, t.source)
    })
    return [...seen.values()].sort((a, b) => a.author.localeCompare(b.author))
  }, [terms])

  return (
    <div className="max-w-page mx-auto px-8 py-12 pb-20 border-t border-brand-border">
      <h2 className="font-heading font-extrabold text-brand-text text-[1.75rem] mb-1">References</h2>
      <p className="text-[0.85rem] text-brand-muted mb-7">All sources cited in APA format · Alphabetical by author</p>
      <div className="space-y-0">
        {refs.map((s, i) => (
          <div
            key={i}
            className="py-3 border-b border-brand-border text-[0.85rem] text-brand-muted leading-[1.7]"
            dangerouslySetInnerHTML={{ __html: buildCite(s) }}
          />
        ))}
      </div>
    </div>
  )
}

/* ── Page ──────────────────────────────────────────────── */
export default function GlossaryPage({
  data, modules, activeLetter, setActiveLetter,
  activeModule, setActiveModule, searchQ, onViewTerm,
}) {
  const filtered = useMemo(() => {
    return data.terms.filter(t => {
      const modMatch    = activeModule === 'all' || t.module === activeModule
      const letterMatch = !activeLetter || t.letter === activeLetter
      const q           = searchQ.toLowerCase()
      const textMatch   = !q
        || t.term.toLowerCase().includes(q)
        || t.definition.toLowerCase().includes(q)
        || t.example.toLowerCase().includes(q)
      return modMatch && letterMatch && textMatch
    }).sort((a, b) => a.letter.localeCompare(b.letter))
  }, [data.terms, activeModule, activeLetter, searchQ])

  return (
    <>
      <Hero metadata={data.metadata} />
      <StatsBar terms={data.terms} />
      <ModuleBar
        modules={modules}
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        setActiveLetter={setActiveLetter}
      />
      <AlphaBar
        terms={data.terms}
        activeLetter={activeLetter}
        setActiveLetter={setActiveLetter}
      />

      <div className="max-w-page mx-auto px-8 pb-20">
        <div className="font-code text-[0.72rem] text-brand-muted mb-5 tracking-[0.04em]">
          Showing {filtered.length} of {data.terms.length} terms
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-brand-muted col-span-full">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="font-heading text-xl font-bold text-brand-text mb-2">No terms found</h3>
            <p>Try a different search or filter.</p>
          </div>
        ) : (
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))' }}>
            {filtered.map((term, i) => (
              <TermCard key={term.id} term={term} index={i} onView={onViewTerm} />
            ))}
          </div>
        )}
      </div>

      <RefsSection terms={data.terms} />

      <footer className="border-t border-brand-border px-8 py-6 text-center">
        <p className="font-code text-[0.68rem] text-brand-dim tracking-[0.05em]">
          {data.metadata.student} · {data.metadata.course} · {data.metadata.team} · {data.metadata.term}
        </p>
      </footer>
    </>
  )
}
