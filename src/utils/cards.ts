import type { DeckType } from '../types'
import { DECK_FOLDERS } from '../types'

export function getCardImagePath(deck: DeckType, cardNumber: number): string {
  return `/${DECK_FOLDERS[deck]}/${cardNumber}.png`
}
