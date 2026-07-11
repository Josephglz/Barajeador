import type { DeckType } from '../types'
import { getCardImagePath } from '../utils/cards'

interface CardViewerProps {
  deck: DeckType
  cardNumber: number | null
}

export function CardViewer({ deck, cardNumber }: CardViewerProps) {
  return (
    <div className="relative mx-auto aspect-3/4 w-full max-w-xs">
      <img
        src="/card.png"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-contain drop-shadow-2xl"
      />
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
    </div>
  )
}
