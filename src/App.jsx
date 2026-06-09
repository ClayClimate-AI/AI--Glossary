import { useState, useEffect, useMemo, useCallback } from 'react'
import Nav from './components/Nav'
import GlossaryPage from './pages/GlossaryPage'
import AboutPage from './pages/AboutPage'
import AdminPage from './pages/AdminPage'
import ViewModal from './components/ViewModal'
import TermFormModal from './components/TermFormModal'
import Toast from './components/Toast'

export default function App() {
  const [data, setData]               = useState(null)
  const [activePage, setActivePage]   = useState('glossary')
  const [activeLetter, setActiveLetter] = useState(null)
  const [activeModule, setActiveModule] = useState('all')
  const [searchQ, setSearchQ]         = useState('')
  const [adminLoggedIn, setAdminLoggedIn] = useState(false)
  const [viewTerm, setViewTerm]       = useState(null)
  const [editTerm, setEditTerm]       = useState(null) // null | 'new' | term object
  const [extraModules, setExtraModules] = useState([])
  const [toast, setToast]             = useState(null)

  const modules = useMemo(() => {
    if (!data) return []
    return [...new Set([...data.terms.map(t => t.module), ...extraModules])].sort()
  }, [data, extraModules])

  useEffect(() => {
    fetch('/glossary.json')
      .then(r => r.json())
      .then(d => setData(d))
      .catch(e => console.error('Failed to load glossary.json', e))
  }, [])

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  const handleSetActivePage = useCallback((page) => {
    setActivePage(page)
    window.scrollTo(0, 0)
  }, [])

  const handleSaveTerm = useCallback((term, isNew) => {
    setData(prev => {
      const terms = isNew
        ? [...prev.terms, term]
        : prev.terms.map(t => t.id === term.id ? term : t)
      return { ...prev, terms }
    })
    setEditTerm(null)
    showToast(`Term "${term.term}" ${isNew ? 'added' : 'updated'}!`, 'success')
  }, [showToast])

  const handleAddModule = useCallback((mod) => {
    setExtraModules(prev => prev.includes(mod) ? prev : [...prev, mod].sort())
    showToast(`Module ${mod} added`, 'success')
  }, [showToast])

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="font-code text-brand-muted text-sm tracking-widest animate-pulse">
          Loading…
        </div>
      </div>
    )
  }

  return (
    <div className="relative z-[1]">
      <Nav
        activePage={activePage}
        setActivePage={handleSetActivePage}
        searchQ={searchQ}
        setSearchQ={setSearchQ}
      />

      {activePage === 'glossary' && (
        <GlossaryPage
          data={data}
          modules={modules}
          activeLetter={activeLetter}
          setActiveLetter={setActiveLetter}
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          searchQ={searchQ}
          onViewTerm={setViewTerm}
        />
      )}

      {activePage === 'about' && <AboutPage />}

      {activePage === 'admin' && (
        <AdminPage
          data={data}
          setData={setData}
          modules={modules}
          adminLoggedIn={adminLoggedIn}
          setAdminLoggedIn={setAdminLoggedIn}
          onEdit={setEditTerm}
          onAddModule={handleAddModule}
          showToast={showToast}
        />
      )}

      {viewTerm && (
        <ViewModal term={viewTerm} onClose={() => setViewTerm(null)} />
      )}

      {editTerm !== null && (
        <TermFormModal
          term={editTerm === 'new' ? null : editTerm}
          modules={modules}
          onSave={handleSaveTerm}
          onClose={() => setEditTerm(null)}
        />
      )}

      <Toast toast={toast} />
    </div>
  )
}
