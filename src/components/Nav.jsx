import Logo from './Logo'

export default function Nav({ activePage, setActivePage, searchQ, setSearchQ }) {
  return (
    <nav
      className="sticky top-0 z-50 border-b border-brand-border px-8"
      style={{ backgroundColor: 'rgba(5,8,16,0.92)', backdropFilter: 'blur(16px)' }}
    >
      <div className="max-w-page mx-auto flex items-center gap-6 h-[62px]">
        {/* Brand */}
        <button
          onClick={() => setActivePage('glossary')}
          className="flex items-center gap-3 bg-transparent border-none cursor-pointer flex-shrink-0 p-0"
        >
          <Logo />
          <div className="text-left">
            <div className="font-heading text-[0.9rem] font-bold text-brand-text leading-none mb-0.5">
              TuringCollective
            </div>
            <div className="font-code text-[0.65rem] text-brand-muted leading-none">
              ITAI 1370 · Summer 2026
            </div>
          </div>
        </button>

        {/* Search — only on glossary page */}
        {activePage === 'glossary' && (
          <div className="flex-1 max-w-[300px] relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted text-sm select-none">
              ⌕
            </span>
            <input
              type="text"
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              placeholder="Search terms…"
              className="w-full bg-brand-surface border border-brand-border rounded-lg text-brand-text text-[0.82rem] py-[0.45rem] pr-3 pl-9 outline-none transition-colors focus:border-brand-accent placeholder:text-brand-muted"
            />
          </div>
        )}

        {/* Nav links */}
        <div className="flex gap-1 ml-auto">
          {['glossary', 'about', 'admin'].map(page => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`font-code text-[0.72rem] tracking-[0.06em] px-3.5 py-1.5 rounded-lg border cursor-pointer capitalize transition-all ${
                activePage === page
                  ? 'text-brand-accent border-brand-border2 bg-brand-surface'
                  : 'text-brand-muted border-transparent bg-transparent hover:text-brand-accent hover:border-brand-border2 hover:bg-brand-surface'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
