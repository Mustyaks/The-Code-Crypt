/**
 * Sound Effects Utilities
 * Uses Web Audio API to generate spooky sounds
 */

let audioContext = null

// Initialize audio context (lazy loading)
function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioContext
}

/**
 * Play ghost whisper sound effect
 * Creates an eerie whisper-like sound using oscillators
 */
export function playGhostWhisper(volume = 0.1) {
  try {
    const ctx = getAudioContext()
    
    // Create oscillators for layered whisper effect
    const oscillator1 = ctx.createOscillator()
    const oscillator2 = ctx.createOscillator()
    const oscillator3 = ctx.createOscillator()
    
    // Create gain nodes for volume control
    const gainNode = ctx.createGain()
    const masterGain = ctx.createGain()
    
    // Set oscillator types and frequencies for whisper effect
    oscillator1.type = 'sine'
    oscillator1.frequency.setValueAtTime(200, ctx.currentTime)
    oscillator1.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.5)
    
    oscillator2.type = 'sine'
    oscillator2.frequency.setValueAtTime(400, ctx.currentTime)
    oscillator2.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.5)
    
    oscillator3.type = 'triangle'
    oscillator3.frequency.setValueAtTime(150, ctx.currentTime)
    oscillator3.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.5)
    
    // Set volume envelope (fade in and out)
    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.1)
    gainNode.gain.linearRampToValueAtTime(volume * 0.7, ctx.currentTime + 0.3)
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5)
    
    masterGain.gain.setValueAtTime(0.3, ctx.currentTime)
    
    // Connect audio nodes
    oscillator1.connect(gainNode)
    oscillator2.connect(gainNode)
    oscillator3.connect(gainNode)
    gainNode.connect(masterGain)
    masterGain.connect(ctx.destination)
    
    // Start and stop oscillators
    const startTime = ctx.currentTime
    const duration = 0.5
    
    oscillator1.start(startTime)
    oscillator2.start(startTime)
    oscillator3.start(startTime)
    
    oscillator1.stop(startTime + duration)
    oscillator2.stop(startTime + duration)
    oscillator3.stop(startTime + duration)
    
  } catch (error) {
    console.warn('Audio playback failed:', error)
  }
}

/**
 * Play screen glitch sound
 * Short digital glitch noise
 */
export function playGlitchSound(volume = 0.05) {
  try {
    const ctx = getAudioContext()
    
    const bufferSize = ctx.sampleRate * 0.1 // 100ms
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    
    // Generate white noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }
    
    const source = ctx.createBufferSource()
    source.buffer = buffer
    
    const gainNode = ctx.createGain()
    gainNode.gain.setValueAtTime(volume, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
    
    source.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    source.start()
    source.stop(ctx.currentTime + 0.1)
    
  } catch (error) {
    console.warn('Glitch sound failed:', error)
  }
}

/**
 * Play error monster growl
 * Deep rumbling sound for monsters
 */
export function playMonsterGrowl(volume = 0.08) {
  try {
    const ctx = getAudioContext()
    
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.type = 'sawtooth'
    oscillator.frequency.setValueAtTime(80, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.3)
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.05)
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3)
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscillator.start()
    oscillator.stop(ctx.currentTime + 0.3)
    
  } catch (error) {
    console.warn('Monster growl failed:', error)
  }
}

/**
 * Play success chime (for exorcised lines)
 */
export function playSuccessChime(volume = 0.1) {
  try {
    const ctx = getAudioContext()
    
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(523.25, ctx.currentTime) // C5
    oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1) // E5
    oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2) // G5
    
    gainNode.gain.setValueAtTime(volume, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4)
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscillator.start()
    oscillator.stop(ctx.currentTime + 0.4)
    
  } catch (error) {
    console.warn('Success chime failed:', error)
  }
}
