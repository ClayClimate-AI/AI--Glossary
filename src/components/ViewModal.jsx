import { useEffect } from 'react'
import { buildCite } from '../utils/cite'

export default function ViewModal({ term, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-8"
      style={{ backdropFilter: 'blur(8px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-brand-card2 border border-brand-border2 rounded-[14px] max-w-[640px] w-full max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start gap-4 px-6 py-5 border-b border-brand-border sticky top-0 bg-brand-card2">
          <button
            onClick={onClose}
            className="bg-transparent border border-brand-border text-brand-muted h-[34px] px-3 rounded-lg font-code text-[0.68rem] flex items-center gap-1.5 cursor-pointer flex-shrink-0 transition-all hover:border-brand-accent hover:text-brand-accent whitespace-nowrap"
          >
            ← Back to Glossary
          </button>
          <div
            className="font-heading font-extrabold text-brand-accent leading-none"
            style={{ fontSize: '3.5rem' }}
          >
            {term.letter}
          </div>
          <div className="flex-1">
            <div className="font-heading text-2xl font-bold text-brand-text mb-0.5">{term.term}</div>
            <div className="font-code text-[0.65rem] text-brand-muted">
              Module: {term.module} · ITAI 1370 · TuringCollective
            </div>
          </div>
          <button
            onClick={onClose}
            className="bg-transparent border border-brand-border text-brand-muted w-[34px] h-[34px] rounded-lg flex items-center justify-center cursor-pointer flex-shrink-0 transition-all hover:border-brand-accent hover:text-brand-text text-base"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <section>
            <div className="font-code text-[0.62rem] text-brand-accent uppercase tracking-[0.12em] mb-2">
              Definition
            </div>
            <p className="text-[0.9rem] text-brand-text leading-[1.75]">{term.definition}</p>
          </section>

          <section>
            <div className="font-code text-[0.62rem] text-brand-accent uppercase tracking-[0.12em] mb-2">
              Real-World Example
            </div>
            <div className="bg-brand-surface border-l-[3px] border-brand-green rounded-r-lg px-4 py-3.5">
              <p className="text-[0.875rem] text-brand-text leading-[1.7]">{term.example}</p>
            </div>
          </section>

          <section>
            <div className="font-code text-[0.62rem] text-brand-accent uppercase tracking-[0.12em] mb-2">
              APA Citation
            </div>
            <div
              className="bg-brand-surface border border-brand-border rounded-lg px-4 py-3.5 font-code text-[0.75rem] text-brand-muted leading-[1.6]"
              dangerouslySetInnerHTML={{ __html: buildCite(term.source) }}
            />
          </section>
        </div>
      </div>
    </div>
  )
}
