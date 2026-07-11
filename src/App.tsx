import { DeckSelector } from './components/DeckSelector'
import { GameScreen } from './components/GameScreen'
import { useGame } from './hooks/useGame'

function App() {
  const game = useGame()

  if (!game.selectedDeck) {
    return (
      <div className="min-h-dvh bg-linear-to-b from-amber-100 via-orange-50 to-amber-200">
        <DeckSelector onSelect={game.selectDeck} />
      </div>
    )
  }

  return (
    <GameScreen
      deck={game.selectedDeck}
      currentCard={game.currentCard}
      drawnCards={game.drawnCards}
      isPlaying={game.isPlaying}
      isFinished={game.isFinished}
      cardsLeft={game.cardsLeft}
      intervalSeconds={game.intervalSeconds}
      showTimeModal={game.showTimeModal}
      showHistoryModal={game.showHistoryModal}
      onShuffle={game.shuffleDeck}
      onTogglePlay={game.togglePlay}
      onOpenTime={() => game.setShowTimeModal(true)}
      onCloseTime={() => game.setShowTimeModal(false)}
      onOpenHistory={() => game.setShowHistoryModal(true)}
      onCloseHistory={() => game.setShowHistoryModal(false)}
      onIntervalChange={game.setIntervalSeconds}
      onPlaySound={game.playCardSound}
      onSkipCard={game.skipToNextCard}
      canSkipCard={!game.isFinished && (game.isPlaying || game.drawnCards.length > 0)}
    />
  )
}

export default App
