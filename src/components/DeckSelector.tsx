import type { DeckType } from '../types'
import { DECK_FOLDERS, DECK_LABELS } from '../types'

interface DeckSelectorProps {
  onSelect: (deck: DeckType) => void
}

export function DeckSelector({ onSelect }: DeckSelectorProps) {
  const decks: DeckType[] = ['legacy', 'kids']

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 py-10">
      <div className="mb-4 text-center">
        <img
          src="/card.png"
          alt="Lotería"
          className="mx-auto mb-4 h-24 w-auto drop-shadow-lg"
        />
        <h1 className="text-3xl font-bold text-amber-950">Mi Barajeador</h1>
        <p className="mt-2 text-amber-800/80">Elige tu mazo para jugar</p>
      </div>

      <div className="flex w-full max-w-sm flex-col gap-5">
        {decks.map((deck) => (
          <button
            key={deck}
            type="button"
            onClick={() => onSelect(deck)}
            className="group relative h-36 w-full overflow-hidden rounded-2xl shadow-xl ring-2 ring-amber-900/20 transition-transform active:scale-[0.97]"
          >
            <img
              src={`/${DECK_FOLDERS[deck]}/1.png`}
              alt={DECK_LABELS[deck]}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            <span className="absolute bottom-4 left-0 right-0 text-center text-2xl font-bold tracking-wide text-white drop-shadow-md">
              {DECK_LABELS[deck]}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
