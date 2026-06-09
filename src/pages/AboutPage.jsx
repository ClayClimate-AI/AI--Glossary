const infoRows = (items) => items.map(([label, value]) => (
  <div key={label} className="flex flex-col gap-0.5 py-2 border-b border-brand-border last:border-0">
    <span className="font-code text-[0.65rem] text-brand-muted uppercase tracking-[0.08em]">{label}</span>
    <span className="text-[0.9rem] text-brand-text font-medium">{value}</span>
  </div>
))

export default function AboutPage() {
  return (
    <>
      <div className="max-w-[900px] mx-auto px-8 py-16 pb-24">
        <h1 className="font-heading font-extrabold text-brand-text text-[2.5rem] mb-2">About This Project</h1>
        <p className="text-[0.9rem] text-brand-muted mb-12">
          Course information, assignment context, and project structure
        </p>

        <div className="grid grid-cols-2 gap-4 mb-12">
          <div className="bg-brand-card border border-brand-border rounded-[10px] p-6">
            <h3 className="font-code text-[0.7rem] text-brand-accent uppercase tracking-[0.1em] mb-4">Student</h3>
            {infoRows([
              ['Name', 'Joseph Clay'],
              ['Major', 'B.A.T in AI and Robotics'],
              ['Team', 'TuringCollective'],
              ['Institution', 'Houston Community College'],
            ])}
          </div>
          <div className="bg-brand-card border border-brand-border rounded-[10px] p-6">
            <h3 className="font-code text-[0.7rem] text-brand-accent uppercase tracking-[0.1em] mb-4">Course</h3>
            {infoRows([
              ['Course', 'ITAI 1370 — History of AI'],
              ['Professor', 'Professor Anna Devarakonda'],
              ['CRN', '14049'],
              ['Term', 'Summer 2026'],
            ])}
          </div>
        </div>

        <div className="bg-brand-card border border-brand-border border-l-[3px] border-l-brand-accent rounded-r-[10px] p-6 mb-8">
          <h3 className="font-heading text-[1.1rem] font-bold text-brand-text mb-3">About This Course</h3>
          <p className="text-[0.9rem] text-brand-muted leading-[1.75]">
            ITAI 1370 — History of AI, Theory and Platforms is organized into 16 Content Modules covering
            the evolution of artificial intelligence from its earliest philosophical foundations through
            modern machine learning and autonomous systems. This glossary serves as a living reference
            document that grows with each module — beginning with Lab L01 and expanding throughout the
            semester into a comprehensive Term Project.
          </p>
        </div>

        <div className="bg-brand-card border border-brand-border rounded-[10px] p-6">
          <h3 className="font-code text-[0.7rem] text-brand-accent uppercase tracking-[0.1em] mb-4">
            Assignment Structure
          </h3>
          {infoRows([
            ['Lab L01', '26 AI terms — one per letter A through Z · Due Saturday 11:59pm'],
            ['Weekly', 'Add new terms per module to the appropriate glossary subdivision'],
            ['Term Project', 'Full expanded glossary submitted at end of semester'],
            ['Submission', 'L01_TuringCollective_JosephClay_ITAI1370'],
            ['Format', 'Website URL · Media recording · Or file upload'],
          ])}
        </div>
      </div>

      <footer className="border-t border-brand-border px-8 py-6 text-center">
        <p className="font-code text-[0.68rem] text-brand-dim tracking-[0.05em]">
          Joseph Clay · ITAI 1370 — History of AI · TuringCollective · Summer 2026
        </p>
      </footer>
    </>
  )
}
