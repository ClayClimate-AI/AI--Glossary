import { useState, useEffect } from 'react'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const empty = {
  letter: 'A', module: 'L01',
  term: '', definition: '', example: '',
  source: { author: '', year: '', title: '', publisher: '', url: '' },
}

export default function TermFormModal({ term, modules, onSave, onClose }) {
  const isEdit = !!term
  const [form, setForm] = useState(term ? { ...term, source: { ...term.source } } : { ...empty, module: modules[0] || 'L01' })

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }))
  const setSrc = (field, val) => setForm(f => ({ ...f, source: { ...f.source, [field]: val } }))

  const handleSave = () => {
    if (!form.term.trim() || !form.definition.trim() || !form.example.trim()) {
      return
    }
    const saved = { ...form }
    if (!isEdit) {
      saved.id = `${form.letter}_${Date.now()}`
    }
    onSave(saved, !isEdit)
  }

  const inputCls = 'w-full bg-brand-surface border border-brand-border rounded-lg text-brand-text text-[0.875rem] py-2.5 px-3 outline-none transition-colors focus:border-brand-accent placeholder:text-brand-muted'
  const labelCls = 'block font-code text-[0.68rem] text-brand-accent uppercase tracking-[0.1em] mb-1.5'

  return (
    <div
      className="fixed inset-0 bg-black/85 z-[300] flex items-center justify-center p-8"
      style={{ backdropFilter: 'blur(8px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-brand-card2 border border-brand-border2 rounded-[14px] max-w-[680px] w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border">
          <h2 className="font-heading text-xl font-extrabold text-brand-text">
            {isEdit ? `Edit Term: ${term.term}` : 'Add New Term'}
          </h2>
          <button
            onClick={onClose}
            className="bg-transparent border border-brand-border text-brand-muted w-[34px] h-[34px] rounded-lg flex items-center justify-center cursor-pointer transition-all hover:border-brand-accent hover:text-brand-text text-base"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Letter</label>
              <select value={form.letter} onChange={e => set('letter', e.target.value)} className={inputCls}>
                {LETTERS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Module</label>
              <select value={form.module} onChange={e => set('module', e.target.value)} className={inputCls}>
                {modules.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Term Name</label>
            <input
              type="text"
              value={form.term}
              onChange={e => set('term', e.target.value)}
              placeholder="e.g. Neural Network"
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Definition (2–3 sentences)</label>
            <textarea
              rows={4}
              value={form.definition}
              onChange={e => set('definition', e.target.value)}
              className={`${inputCls} resize-y min-h-[80px] leading-relaxed`}
            />
          </div>

          <div>
            <label className={labelCls}>Real-World Example</label>
            <textarea
              rows={3}
              value={form.example}
              onChange={e => set('example', e.target.value)}
              className={`${inputCls} resize-y min-h-[80px] leading-relaxed`}
            />
          </div>

          {/* Source */}
          <div className="bg-brand-surface border border-brand-border rounded-lg p-5 space-y-3">
            <h4 className="font-code text-[0.65rem] text-brand-accent uppercase tracking-[0.1em]">
              Source / Citation
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Author</label>
                <input type="text" value={form.source.author} onChange={e => setSrc('author', e.target.value)} placeholder="Last, F." className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Year</label>
                <input type="text" value={form.source.year} onChange={e => setSrc('year', e.target.value)} placeholder="2023" className={inputCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Title</label>
              <input type="text" value={form.source.title} onChange={e => setSrc('title', e.target.value)} placeholder="Article or book title" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Publisher</label>
              <input type="text" value={form.source.publisher} onChange={e => setSrc('publisher', e.target.value)} placeholder="Publisher name" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>URL (optional)</label>
              <input type="text" value={form.source.url} onChange={e => setSrc('url', e.target.value)} placeholder="https://…" className={inputCls} />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-2">
            <button
              onClick={onClose}
              className="font-code text-[0.75rem] px-5 py-2.5 rounded-lg border border-brand-border2 text-brand-muted bg-transparent cursor-pointer transition-all hover:border-brand-accent hover:text-brand-accent"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="font-code text-[0.75rem] px-5 py-2.5 rounded-lg border-none bg-brand-accent text-black cursor-pointer font-medium transition-all hover:bg-brand-accent2"
            >
              {isEdit ? 'Save Changes' : 'Add Term'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
