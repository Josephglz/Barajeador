export function getCardSoundPath(cardNumber: number): string {
  if (cardNumber === 13) return '/sounds/el_gorrito.mp3'
  return `/sounds/${cardNumber}.mp3`
}

export function playSound(src: string): HTMLAudioElement {
  const audio = new Audio(src)
  audio.play().catch(() => {})
  return audio
}
