interface FloatingButtonProps {
  label: string
  onClick: () => void
  position: 'top-left' | 'top-right' | 'bottom-center' | 'bottom-right'
  variant?: 'primary' | 'secondary' | 'accent'
  disabled?: boolean
  icon?: React.ReactNode
  ariaLabel?: string
}

const positionClasses: Record<FloatingButtonProps['position'], string> = {
  'top-left': 'top-[max(1rem,env(safe-area-inset-top))] left-4',
  'top-right': 'top-[max(1rem,env(safe-area-inset-top))] right-4',
  'bottom-center':
    'bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2',
  'bottom-right':
    'bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-4',
}

const variantClasses: Record<NonNullable<FloatingButtonProps['variant']>, string> = {
  primary: 'bg-amber-600 text-white shadow-amber-900/30',
  secondary: 'bg-white/95 text-amber-900 shadow-black/15',
  accent: 'bg-emerald-600 text-white shadow-emerald-900/30',
}

export function FloatingButton({
  label,
  onClick,
  position,
  variant = 'secondary',
  disabled = false,
  icon,
  ariaLabel,
}: FloatingButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel ?? label}
      className={`fixed z-30 flex items-center justify-center gap-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm transition-all active:scale-95 disabled:opacity-40 ${label ? 'px-5 py-3' : 'p-3.5'} ${positionClasses[position]} ${variantClasses[variant]}`}
    >
      {icon}
      {label}
    </button>
  )
}
