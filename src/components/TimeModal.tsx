interface TimeModalProps {
  seconds: number
  onChange: (seconds: number) => void
  onClose: () => void
}

const PRESETS = [3, 5, 8, 10, 15]

export function TimeModal({ seconds, onChange, onClose }: TimeModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-1 text-xl font-bold text-amber-950">Tiempo entre cartas</h2>
        <p className="mb-6 text-sm text-amber-800/70">
          Segundos antes de cantar la siguiente
        </p>

        <div className="mb-6 flex flex-wrap justify-center gap-3">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onChange(preset)}
              className={`min-w-14 rounded-xl px-4 py-3 text-lg font-bold transition-colors ${
                seconds === preset
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-100 text-amber-900 active:bg-amber-200'
              }`}
            >
              {preset}s
            </button>
          ))}
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-amber-900">
            Personalizado: {seconds}s
          </label>
          <input
            type="range"
            min={2}
            max={30}
            step={1}
            value={seconds}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full accent-amber-600"
          />
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl bg-amber-600 py-3 font-semibold text-white active:bg-amber-700"
        >
          Listo
        </button>
      </div>
    </div>
  )
}
