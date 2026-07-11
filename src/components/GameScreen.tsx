import type { DeckType } from '../types'
import { DECK_LABELS } from '../types'
import { CardViewer } from './CardViewer'
import { FloatingButton } from './FloatingButton'
import { HistoryModal } from './HistoryModal'
import { TimeModal } from './TimeModal'

interface GameScreenProps {
  deck: DeckType
  currentCard: number | null
  drawnCards: number[]
  isPlaying: boolean
  isFinished: boolean
  cardsLeft: number
  intervalSeconds: number
  showTimeModal: boolean
  showHistoryModal: boolean
  onShuffle: () => void
  onTogglePlay: () => void
  onOpenTime: () => void
  onCloseTime: () => void
  onOpenHistory: () => void
  onCloseHistory: () => void
  onIntervalChange: (seconds: number) => void
  onPlaySound: (cardNumber: number) => void
}

export function GameScreen({
  deck,
  currentCard,
  drawnCards,
  isPlaying,
  isFinished,
  cardsLeft,
  intervalSeconds,
  showTimeModal,
  showHistoryModal,
  onShuffle,
  onTogglePlay,
  onOpenTime,
  onCloseTime,
  onOpenHistory,
  onCloseHistory,
  onIntervalChange,
  onPlaySound,
}: GameScreenProps) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-linear-to-b from-amber-100 via-orange-50 to-amber-200">
      <FloatingButton label="Barajear" onClick={onShuffle} position="top-left" />
      <FloatingButton
        label={`Tiempo · ${intervalSeconds}s`}
        onClick={onOpenTime}
        position="top-right"
      />

      <main className="flex flex-1 flex-col items-center justify-center px-6 pt-20 pb-28">
        <p className="mb-2 text-sm font-medium text-amber-800/70">
          Mazo {DECK_LABELS[deck]}
        </p>
        <CardViewer deck={deck} cardNumber={currentCard} />

        <div className="mt-6 text-center">
          {isFinished ? (
            <p className="text-lg font-semibold text-amber-900">¡Baraja completa!</p>
          ) : (
            <p className="text-sm text-amber-800/70">
              {cardsLeft} cartas restantes · {drawnCards.length} cantadas
            </p>
          )}
        </div>
      </main>

      <FloatingButton
        label={isPlaying ? 'Pausar' : 'Iniciar'}
        onClick={onTogglePlay}
        position="bottom-center"
        variant="primary"
        disabled={isFinished}
      />

      <FloatingButton
        label=""
        ariaLabel="Historial de cartas"
        onClick={onOpenHistory}
        position="bottom-right"
        variant="secondary"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <rect x="3" y="3" width="7" height="9" rx="1" />
            <rect x="14" y="3" width="7" height="9" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        }
      />

      {showTimeModal && (
        <TimeModal
          seconds={intervalSeconds}
          onChange={onIntervalChange}
          onClose={onCloseTime}
        />
      )}

      {showHistoryModal && (
        <HistoryModal
          deck={deck}
          drawnCards={drawnCards}
          onPlaySound={onPlaySound}
          onClose={onCloseHistory}
        />
      )}
    </div>
  )
}
