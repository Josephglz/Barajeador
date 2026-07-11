import type { DeckType } from '../types'
import { getCardImagePath } from '../utils/cards'

interface CardViewerProps {
  deck: DeckType
  cardNumber: number | null
  onSkip?: () => void
  skipEnabled?: boolean
}

export function CardViewer({ deck, cardNumber, onSkip, skipEnabled }: CardViewerProps) {
  const canSkip = skipEnabled && onSkip

  return (
    <div className="relative mx-auto aspect-3/4 w-full max-w-xs">
      <img
        src="/card.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-contain drop-shadow-2xl"
      />
      {canSkip ? (
        <button
          type="button"
          onClick={onSkip}
          className="absolute inset-[8%] flex items-center justify-center overflow-hidden rounded-lg active:opacity-90"
          aria-label="Cantar siguiente carta"
        >
          {cardNumber ? (
            <img
              src={getCardImagePath(deck, cardNumber)}
              alt={`Carta ${cardNumber}`}
              className="pointer-events-none h-full w-full object-contain animate-[fadeIn_0.4s_ease-out]"
            />
          ) : (
            <img
              src="/card_thumb.png"
              alt="Esperando carta"
              className="pointer-events-none h-full w-full object-contain opacity-60"
            />
          )}
        </button>
      ) : (
        <div className="absolute inset-[8%] flex items-center justify-center overflow-hidden rounded-lg">
          {cardNumber ? (
            <img
              src={getCardImagePath(deck, cardNumber)}
              alt={`Carta ${cardNumber}`}
              className="h-full w-full object-contain animate-[fadeIn_0.4s_ease-out]"
            />
          ) : (
            <img
              src="/card_thumb.png"
              alt="Esperando carta"
              className="h-full w-full object-contain opacity-60"
            />
          )}
        </div>
      )}
    </div>
  )
}
