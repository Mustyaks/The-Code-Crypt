/**
 * Demo Controller
 * Orchestrates a 20-second scripted demo showcasing all features
 */

import { playGhostWhisper, playGlitchSound, playSuccessChime } from './soundEffects'

// Demo script with spooky code
const DEMO_CODE = `// 👻 Welcome to The Code Crypt
// Where dead code comes back to life...

function summonSpirit() {
  const spirits = ['👻', '🦇', '🕷️', '⚰️'];
  return spirits[Math.floor(Math.random() * spirits.length)];
}

// This line is cursed... click it!
const hauntedVariable = "possessed";

// Watch for syntax errors...
function brokenCode( {
  return "missing bracket";
}

console.log('The crypt awakens...', summonSpirit());`

/**
 * Demo Controller Class
 * Manages the entire demo sequence
 */
export class DemoController {
  constructor(editorRef, setCode, triggerGlitch) {
    this.editorRef = editorRef
    this.setCode = setCode
    this.triggerGlitch = triggerGlitch
    this.isRunning = false
    this.timeouts = []
  }

  /**
   * Start the demo sequence
   */
  async start() {
    if (this.isRunning) {
      console.log('Demo already running')
      return
    }

    this.isRunning = true
    this.timeouts = []

    // Clear editor first
    this.setCode('')

    // Execute demo sequence
    await this.runDemoSequence()
  }

  /**
   * Stop the demo and clean up
   */
  stop() {
    this.isRunning = false
    this.timeouts.forEach(timeout => clearTimeout(timeout))
    this.timeouts = []
  }

  /**
   * Main demo sequence (20 seconds)
   */
  async runDemoSequence() {
    const steps = [
      // Step 1: Type spooky code (0-8s)
      { time: 0, action: () => this.typeCode(DEMO_CODE, 50) },
      
      // Step 2: Highlight cursed line (8s)
      { time: 8000, action: () => this.highlightCursedLine(7) },
      
      // Step 3: Play ghost whisper (8.5s)
      { time: 8500, action: () => playGhostWhisper() },
      
      // Step 4: Trigger glitch effect (10s)
      { time: 10000, action: () => this.triggerGlitch() },
      
      // Step 5: Play glitch sound (10s)
      { time: 10000, action: () => playGlitchSound() },
      
      // Step 6: Create syntax error (12s)
      { time: 12000, action: () => this.createSyntaxError() },
      
      // Step 7: Fix error (15s)
      { time: 15000, action: () => this.fixSyntaxError() },
      
      // Step 8: Play success chime (15.5s)
      { time: 15500, action: () => playSuccessChime() },
      
      // Step 9: Final glitch (18s)
      { time: 18000, action: () => this.triggerGlitch() },
      
      // Step 10: Demo complete (20s)
      { time: 20000, action: () => this.complete() },
    ]

    // Schedule all steps
    steps.forEach(step => {
      const timeout = setTimeout(() => {
        if (this.isRunning) {
          step.action()
        }
      }, step.time)
      this.timeouts.push(timeout)
    })
  }

  /**
   * Type code with animation
   * @param {string} code - Code to type
   * @param {number} speed - Typing speed in ms per character
   */
  async typeCode(code, speed = 50) {
    let currentCode = ''
    
    for (let i = 0; i < code.length; i++) {
      if (!this.isRunning) break
      
      currentCode += code[i]
      this.setCode(currentCode)
      
      // Wait for next character
      await this.sleep(speed)
      
      // Random variation in typing speed
      if (Math.random() > 0.9) {
        await this.sleep(speed * 2)
      }
    }
  }

  /**
   * Highlight a cursed line
   * @param {number} lineNumber - Line to highlight
   */
  highlightCursedLine(lineNumber) {
    if (!this.editorRef.current) return

    try {
      const view = this.editorRef.current
      const line = view.state.doc.line(lineNumber)
      
      // Scroll to line
      view.dispatch({
        effects: [
          // Could add custom effects here
        ],
        selection: { anchor: line.from, head: line.to }
      })

      // Flash the line
      const lineElement = view.dom.querySelector(`.cm-line:nth-child(${lineNumber})`)
      if (lineElement) {
        lineElement.classList.add('cursed-line', 'activated')
        setTimeout(() => {
          lineElement.classList.remove('activated')
        }, 1000)
      }
    } catch (error) {
      console.warn('Could not highlight line:', error)
    }
  }

  /**
   * Create a syntax error in the code
   */
  createSyntaxError() {
    this.setCode(prevCode => {
      // Add an unclosed bracket to create error
      return prevCode.replace(
        'function brokenCode( {',
        'function brokenCode( {'
      )
    })
  }

  /**
   * Fix the syntax error
   */
  fixSyntaxError() {
    this.setCode(prevCode => {
      // Fix the bracket
      return prevCode.replace(
        'function brokenCode( {',
        'function brokenCode() {'
      )
    })
  }

  /**
   * Demo complete
   */
  complete() {
    this.isRunning = false
    console.log('✨ Demo complete!')
  }

  /**
   * Sleep utility
   * @param {number} ms - Milliseconds to sleep
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

/**
 * Create and manage demo controller
 * @param {object} editorRef - Reference to CodeMirror editor
 * @param {function} setCode - Function to update code
 * @param {function} triggerGlitch - Function to trigger glitch effect
 * @returns {object} Demo controller instance and controls
 */
export function useDemoController(editorRef, setCode, triggerGlitch) {
  let controller = null

  const startDemo = () => {
    if (controller) {
      controller.stop()
    }
    controller = new DemoController(editorRef, setCode, triggerGlitch)
    controller.start()
    return controller
  }

  const stopDemo = () => {
    if (controller) {
      controller.stop()
      controller = null
    }
  }

  return {
    startDemo,
    stopDemo,
    isRunning: () => controller?.isRunning || false,
  }
}

/**
 * Demo sequence timeline (for reference)
 * 
 * 0s:    Start typing spooky code
 * 8s:    Finish typing, highlight cursed line 7
 * 8.5s:  Play ghost whisper sound
 * 10s:   Trigger screen glitch + sound
 * 12s:   Create syntax error (monster spawns)
 * 15s:   Fix syntax error (monster despawns)
 * 15.5s: Play success chime
 * 18s:   Final glitch effect
 * 20s:   Demo complete
 * 
 * Features showcased:
 * - Typing animation
 * - Cursed line highlighting
 * - Ghost whisper sound
 * - Screen glitch effects
 * - Error monster spawn/despawn
 * - Ghost reactions to typing
 * - Success sounds
 * - Visual effects
 */

/**
 * Alternative: Quick demo (10 seconds)
 */
export const QUICK_DEMO_SEQUENCE = [
  { time: 0, action: 'type', data: '// Quick demo\nvar x = 5' },
  { time: 3000, action: 'error', data: 'var x = 5(' },
  { time: 5000, action: 'fix', data: 'const x = 5' },
  { time: 7000, action: 'glitch' },
  { time: 10000, action: 'complete' },
]

/**
 * Demo code variations
 */
export const DEMO_VARIATIONS = {
  spooky: DEMO_CODE,
  
  minimal: `// Minimal demo
function test() {
  return "haunted";
}`,
  
  error: `// Error demo
function broken( {
  return "error";
}`,
  
  cursed: `// Line 3 is cursed!
const x = 1;
const cursed = "click me";
const y = 2;`,
}

/**
 * Demo event emitter for tracking
 */
export class DemoEventEmitter {
  constructor() {
    this.listeners = {}
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data))
    }
  }

  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback)
    }
  }
}

/**
 * Demo analytics
 */
export function trackDemoEvent(event, data) {
  console.log(`[Demo] ${event}:`, data)
  // Could send to analytics service
}

export default DemoController
