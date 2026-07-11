import { useCallback, useEffect, useRef, useState } from 'react'
import type { DeckType } from '../types'
import { DEFAULT_INTERVAL } from '../types'
import { getCardSoundPath, playSound } from '../utils/audio'
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

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const sessionStartedRef = useRef(false)
  const intervalSecondsRef = useRef(intervalSeconds)
  const prevIntervalRef = useRef(intervalSeconds)
  const remainingDeckRef = useRef<number[]>([])

  useEffect(() => {
    intervalSecondsRef.current = intervalSeconds
  }, [intervalSeconds])

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
  }, [])

  const playCardSound = useCallback(
    (cardNumber: number) => {
      stopAudio()
      audioRef.current = playSound(getCardSoundPath(cardNumber))
    },
    [stopAudio],
  )

  const setDeck = useCallback((deck: number[]) => {
    remainingDeckRef.current = deck
    setRemainingDeck(deck)
  }, [])

  const drawNextCard = useCallback(() => {
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
    playCardSound(card)
  }, [clearTimer, playCardSound])

  const startTimer = useCallback(() => {
    clearTimer()
    intervalRef.current = setInterval(drawNextCard, intervalSecondsRef.current * 1000)
  }, [clearTimer, drawNextCard])

  const resetSession = useCallback(() => {
    clearTimer()
    stopAudio()
    sessionStartedRef.current = false
    const deck = createShuffledDeck()
    setDeck(deck)
    setDrawnCards([])
    setCurrentCard(null)
    setIsPlaying(false)
    setIsFinished(false)
  }, [clearTimer, stopAudio, setDeck])

  const selectDeck = useCallback(
    (deck: DeckType) => {
      setSelectedDeck(deck)
      resetSession()
    },
    [resetSession],
  )

  const shuffleDeck = useCallback(() => {
    resetSession()
  }, [resetSession])

  const togglePlay = useCallback(() => {
    if (isFinished) return

    if (isPlaying) {
      clearTimer()
      setIsPlaying(false)
      return
    }

    setIsPlaying(true)

    if (!sessionStartedRef.current) {
      sessionStartedRef.current = true
      stopAudio()
      const intro = playSound('/intro.mp3')
      audioRef.current = intro
      intro.onended = () => {
        drawNextCard()
        startTimer()
      }
    } else {
      startTimer()
    }
  }, [isFinished, isPlaying, clearTimer, stopAudio, drawNextCard, startTimer])

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
      stopAudio()
    }
  }, [clearTimer, stopAudio])

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
    setIntervalSeconds,
    setShowTimeModal,
    setShowHistoryModal,
    playCardSound,
  }
}
