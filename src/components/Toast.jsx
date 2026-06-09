export default function Toast({ toast }) {
  if (!toast) return null

  const isSuccess = toast.type === 'success'
  return (
    <div
      className={`fixed bottom-8 right-8 z-[500] font-code text-[0.78rem] px-5 py-3 rounded-[9px] pointer-events-none transition-all ${
        isSuccess
          ? 'bg-brand-green/10 border border-brand-green/40 text-brand-green'
          : 'bg-red-500/10 border border-red-500/40 text-red-400'
      }`}
    >
      {toast.msg}
    </div>
  )
}
