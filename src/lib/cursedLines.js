/**
 * Cursed Lines Configuration
 * Each cursed line has a riddle that must be solved to exorcise it
 */

export const CURSED_LINES = {
  3: {
    riddle: "I speak without a mouth and hear without ears. I have no body, but come alive with wind. What am I?",
    answer: "echo",
    hint: "Think about sound and programming...",
    difficulty: "easy"
  },
  7: {
    riddle: "The more you take, the more you leave behind. What am I?",
    answer: "footsteps",
    hint: "Think about walking...",
    difficulty: "medium"
  },
  12: {
    riddle: "I am not alive, but I grow; I don't have lungs, but I need air; I don't have a mouth, but water kills me. What am I?",
    answer: "fire",
    hint: "Think about elements...",
    difficulty: "hard"
  }
}

/**
 * Get line number from cursor position in CodeMirror
 * @param {object} view - CodeMirror view
 * @param {number} pos - Cursor position
 * @returns {number} Line number (1-indexed)
 */
export function getLineFromCursor(view, pos) {
  if (!view || pos === undefined) return null
  const line = view.state.doc.lineAt(pos)
  return line.number
}

/**
 * Check if a line is cursed
 * @param {number} lineNumber - Line number (1-indexed)
 * @returns {boolean}
 */
export function isCursedLine(lineNumber) {
  return lineNumber in CURSED_LINES
}

/**
 * Get riddle for a cursed line
 * @param {number} lineNumber - Line number (1-indexed)
 * @returns {object|null} Riddle object or null
 */
export function getRiddle(lineNumber) {
  return CURSED_LINES[lineNumber] || null
}

/**
 * Check if answer is correct (case-insensitive, trimmed)
 * @param {number} lineNumber - Line number (1-indexed)
 * @param {string} userAnswer - User's answer
 * @returns {boolean}
 */
export function checkAnswer(lineNumber, userAnswer) {
  const riddle = CURSED_LINES[lineNumber]
  if (!riddle) return false
  
  const normalizedAnswer = userAnswer.toLowerCase().trim()
  const correctAnswer = riddle.answer.toLowerCase().trim()
  
  return normalizedAnswer === correctAnswer
}

/**
 * Get all cursed line numbers
 * @returns {number[]}
 */
export function getAllCursedLines() {
  return Object.keys(CURSED_LINES).map(Number)
}

/**
 * Get difficulty color
 * @param {string} difficulty
 * @returns {string} Tailwind color class
 */
export function getDifficultyColor(difficulty) {
  switch (difficulty) {
    case 'easy':
      return 'text-green-400'
    case 'medium':
      return 'text-yellow-400'
    case 'hard':
      return 'text-red-400'
    default:
      return 'text-gray-400'
  }
}
