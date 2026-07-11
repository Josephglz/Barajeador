import { TOTAL_CARDS } from '../types'

export function createShuffledDeck(): number[] {
  const deck = Array.from({ length: TOTAL_CARDS }, (_, i) => i + 1)
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}

export function drawCard(deck: number[]): { card: number | null; remaining: number[] } {
  if (deck.length === 0) return { card: null, remaining: [] }
  const remaining = [...deck]
  const card = remaining.pop()!
  return { card, remaining }
}
