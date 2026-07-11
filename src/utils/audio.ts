const sharedAudio = new Audio()
sharedAudio.preload = 'auto'

let audioUnlocked = false
let audioContext: AudioContext | null = null

export function getCardSoundPath(cardNumber: number): string {
  if (cardNumber === 13) return '/sounds/el_gorrito.mp3'
  return `/sounds/${cardNumber}.mp3`
}

export async function unlockAudio(): Promise<boolean> {
  if (audioUnlocked) return true

  try {
    if (!audioContext) {
      audioContext = new AudioContext()
    }
    if (audioContext.state === 'suspended') {
      await audioContext.resume()
    }
    audioUnlocked = true
    return true
  } catch {
    return false
  }
}

export function stopSound(): void {
  sharedAudio.pause()
  sharedAudio.currentTime = 0
}

export async function playSound(src: string): Promise<void> {
  if (!audioUnlocked) {
    await unlockAudio()
  }

  stopSound()
  sharedAudio.src = src

  try {
    await sharedAudio.play()
  } catch {
    // Sin gesto del usuario el navegador puede bloquear el audio.
  }
}

/** Llamar directamente desde un click/tap para no perder el gesto del usuario. */
export function playSoundFromGesture(src: string): void {
  void unlockAudio()
  stopSound()
  sharedAudio.src = src
  void sharedAudio.play().then(() => {
    audioUnlocked = true
  })
}

export function getSharedAudio(): HTMLAudioElement {
  return sharedAudio
}

export function resetAudioUnlock(): void {
  audioUnlocked = false
  stopSound()
  sharedAudio.src = ''
  sharedAudio.onended = null
  if (audioContext) {
    void audioContext.close()
    audioContext = null
  }
}
