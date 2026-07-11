import { useState } from 'react'
import type { DeckType } from '../types'
import { getCardImagePath } from '../utils/cards'

interface HistoryModalProps {
  deck: DeckType
  drawnCards: number[]
  onPlaySound: (cardNumber: number) => void
  onClose: () => void
}

export function HistoryModal({
  deck,
  drawnCards,
  onPlaySound,
  onClose,
}: HistoryModalProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const activeCard = drawnCards[activeIndex] ?? null
  const hasCards = drawnCards.length > 0

  const goToNewer = () => setActiveIndex((i) => Math.max(i - 1, 0))
  const goToOlder = () => setActiveIndex((i) => Math.min(i + 1, drawnCards.length - 1))

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mt-auto flex max-h-[92dvh] flex-col rounded-t-3xl bg-amber-50 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-amber-200 px-5 py-4">
          <h2 className="text-lg font-bold text-amber-950">Cartas cantadas</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-amber-200/80 px-3 py-1 text-sm font-medium text-amber-900"
          >
            Cerrar
          </button>
        </div>

        {!hasCards ? (
          <p className="px-6 py-16 text-center text-amber-800/70">
            Aún no se ha cantado ninguna carta
          </p>
        ) : (
          <>
            <div className="relative flex flex-1 items-center justify-center px-4 py-6">
              <button
                type="button"
                onClick={goToNewer}
                disabled={activeIndex <= 0}
                className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-2xl text-amber-900 shadow-md disabled:opacity-30"
                aria-label="Carta más reciente"
              >
                ‹
              </button>

              <div className="relative mx-14 aspect-3/4 w-full max-w-[220px]">
                <img
                  src="/card.png"
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute inset-0 h-full w-full object-contain"
                />
                <button
                  type="button"
                  onClick={goToOlder}
                  disabled={activeIndex >= drawnCards.length - 1}
                  className="absolute inset-[8%] overflow-hidden rounded-lg disabled:cursor-default"
                  aria-label="Siguiente carta"
                >
                  {activeCard && (
                    <img
                      src={getCardImagePath(deck, activeCard)}
                      alt={`Carta ${activeCard}`}
                      className="h-full w-full object-contain"
                    />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => activeCard && onPlaySound(activeCard)}
                  className="absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-transform active:scale-95"
                  aria-label="Reproducir sonido"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-8 w-8">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>

              <button
                type="button"
                onClick={goToOlder}
                disabled={activeIndex >= drawnCards.length - 1}
                className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-2xl text-amber-900 shadow-md disabled:opacity-30"
                aria-label="Carta anterior"
              >
                ›
              </button>
            </div>

            <div className="border-t border-amber-200 px-4 py-4">
              <p className="mb-3 text-center text-xs text-amber-700">
                {activeIndex + 1} de {drawnCards.length}
                {activeIndex === 0 && ' · Más reciente'}
              </p>
              <div className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {drawnCards.map((card, index) => (
                  <button
                    key={`${card}-${index}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`shrink-0 overflow-hidden rounded-lg ring-2 transition-all ${
                      index === activeIndex
                        ? 'ring-amber-600 scale-105'
                        : 'ring-transparent opacity-70'
                    }`}
                  >
                    <img
                      src={getCardImagePath(deck, card)}
                      alt={`Carta ${card}`}
                      className="h-16 w-12 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
