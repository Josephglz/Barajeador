import { useCallback, useEffect, useRef, useState } from 'react'
import type { DeckType } from '../types'
import { DEFAULT_INTERVAL } from '../types'
import {
  getCardSoundPath,
  getSharedAudio,
  playSound,
  playSoundFromGesture,
  resetAudioUnlock,
  stopSound,
  unlockAudio,
} from '../utils/audio'
import { createShuffledDeck, drawCard } from '../utils/deck'

export function useGame() {
  const [selectedDeck, setSelectedDeck] = useState<DeckType | null>(null)
  const [remainingDeck, setRemainingDeck] = useState<number[]>([])
  const [drawnCards, setDrawnCards] = useState<number[]>([])
  const [currentCard, setCurrentCard] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [intervalSeconds, setIntervalSeconds] = useState(DEFAULT_INTERVAL)
  const [showTimeModal, setShowTimeModal] = useState(false)
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const sessionStartedRef = useRef(false)
  const isPlayingRef = useRef(false)
  const intervalSecondsRef = useRef(intervalSeconds)
  const prevIntervalRef = useRef(intervalSeconds)
  const remainingDeckRef = useRef<number[]>([])

  useEffect(() => {
    intervalSecondsRef.current = intervalSeconds
  }, [intervalSeconds])

  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const playCardSound = useCallback((cardNumber: number) => {
    playSoundFromGesture(getCardSoundPath(cardNumber))
  }, [])

  const setDeck = useCallback((deck: number[]) => {
    remainingDeckRef.current = deck
    setRemainingDeck(deck)
  }, [])

  const drawNextCard = useCallback(
    (fromGesture = false) => {
      const { card, remaining } = drawCard(remainingDeckRef.current)
      remainingDeckRef.current = remaining
      setRemainingDeck(remaining)

      if (card === null) {
        clearTimer()
        setIsPlaying(false)
        setIsFinished(true)
        return
      }

      setCurrentCard(card)
      setDrawnCards((drawn) => [card, ...drawn])

      if (fromGesture) {
        playSoundFromGesture(getCardSoundPath(card))
      } else {
        void playSound(getCardSoundPath(card))
      }
    },
    [clearTimer],
  )

  const restartTimerIfPlaying = useCallback(() => {
    if (!isPlayingRef.current) return
    clearTimer()
    intervalRef.current = setInterval(drawNextCard, intervalSecondsRef.current * 1000)
  }, [clearTimer, drawNextCard])

  const startTimer = useCallback(() => {
    clearTimer()
    intervalRef.current = setInterval(drawNextCard, intervalSecondsRef.current * 1000)
  }, [clearTimer, drawNextCard])

  const resetSession = useCallback(() => {
    clearTimer()
    stopSound()
    resetAudioUnlock()
    getSharedAudio().onended = null
    sessionStartedRef.current = false
    const deck = createShuffledDeck()
    setDeck(deck)
    setDrawnCards([])
    setCurrentCard(null)
    setIsPlaying(false)
    setIsFinished(false)
  }, [clearTimer, setDeck])

  const selectDeck = useCallback(
    (deck: DeckType) => {
      setSelectedDeck(deck)
      resetSession()
    },
    [resetSession],
  )

  const shuffleDeck = useCallback(() => {
    resetSession()
    playSoundFromGesture('/card-swap.mp3')
  }, [resetSession])

  const skipToNextCard = useCallback(() => {
    if (isFinished || !sessionStartedRef.current) return

    drawNextCard(true)
    restartTimerIfPlaying()
  }, [isFinished, drawNextCard, restartTimerIfPlaying])

  const togglePlay = useCallback(async () => {
    if (isFinished) return

    if (isPlaying) {
      clearTimer()
      setIsPlaying(false)
      return
    }

    await unlockAudio()
    setIsPlaying(true)

    if (!sessionStartedRef.current) {
      sessionStartedRef.current = true
      stopSound()
      const audio = getSharedAudio()
      audio.onended = () => {
        audio.onended = null
        drawNextCard(false)
        startTimer()
      }
      playSoundFromGesture('/intro.mp3')
    } else {
      startTimer()
    }
  }, [isFinished, isPlaying, clearTimer, drawNextCard, startTimer])

  useEffect(() => {
    if (prevIntervalRef.current === intervalSeconds) return
    prevIntervalRef.current = intervalSeconds
    if (isPlaying && !isFinished && sessionStartedRef.current) {
      startTimer()
    }
  }, [intervalSeconds, isPlaying, isFinished, startTimer])

  useEffect(() => {
    return () => {
      clearTimer()
      stopSound()
      getSharedAudio().onended = null
    }
  }, [clearTimer])

  return {
    selectedDeck,
    drawnCards,
    currentCard,
    isPlaying,
    intervalSeconds,
    showTimeModal,
    showHistoryModal,
    isFinished,
    cardsLeft: remainingDeck.length,
    selectDeck,
    shuffleDeck,
    togglePlay,
    skipToNextCard,
    setIntervalSeconds,
    setShowTimeModal,
    setShowHistoryModal,
    playCardSound,
  }
}
