export type DeckType = 'legacy' | 'kids'

export const DECK_FOLDERS: Record<DeckType, string> = {
  legacy: 'img_legacy',
  kids: 'img_kids',
}

export const DECK_LABELS: Record<DeckType, string> = {
  legacy: 'Original',
  kids: 'Animada',
}

export const TOTAL_CARDS = 54
export const DEFAULT_INTERVAL = 5
