import { useState } from 'react'
import { DisclaimerModal } from './DisclaimerModal'

export function Footer() {
  const [showDisclaimer, setShowDisclaimer] = useState(false)

  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 z-10 flex items-center justify-center gap-1.5 pb-[max(0.25rem,env(safe-area-inset-bottom))]">
        <p className="text-[10px] font-medium tracking-wide text-amber-900/45">
          Development by JosephGlz
        </p>
        <button
          type="button"
          onClick={() => setShowDisclaimer(true)}
          className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-900/15 text-[9px] font-bold text-amber-900/55 active:bg-amber-900/25"
          aria-label="Ver aviso legal"
        >
          !
        </button>
      </footer>

      {showDisclaimer && <DisclaimerModal onClose={() => setShowDisclaimer(false)} />}
    </>
  )
}
