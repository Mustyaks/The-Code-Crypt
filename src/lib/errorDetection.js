/**
 * Error Detection Utilities
 * Simple regex-based syntax error detection for JavaScript
 */

/**
 * Detect syntax errors in code
 * @param {string} code - Code to analyze
 * @returns {Array} Array of error objects { line, type, message }
 */
export function detectErrors(code) {
  const errors = []
  const lines = code.split('\n')

  lines.forEach((line, index) => {
    const lineNumber = index + 1
    const trimmedLine = line.trim()

    // Skip empty lines and comments
    if (!trimmedLine || trimmedLine.startsWith('//') || trimmedLine.startsWith('/*')) {
      return
    }

    // Check for unmatched brackets
    const bracketError = checkBrackets(line, lineNumber)
    if (bracketError) errors.push(bracketError)

    // Check for unmatched quotes
    const quoteError = checkQuotes(line, lineNumber)
    if (quoteError) errors.push(quoteError)

    // Check for missing semicolons (simple heuristic)
    const semicolonError = checkSemicolon(line, lineNumber, trimmedLine)
    if (semicolonError) errors.push(semicolonError)
  })

  // Check overall bracket balance
  const overallBracketErrors = checkOverallBrackets(code)
  errors.push(...overallBracketErrors)

  return errors
}

/**
 * Check for unmatched brackets in a line
 */
function checkBrackets(line, lineNumber) {
  const openBrackets = (line.match(/\(/g) || []).length
  const closeBrackets = (line.match(/\)/g) || []).length
  const openCurly = (line.match(/\{/g) || []).length
  const closeCurly = (line.match(/\}/g) || []).length
  const openSquare = (line.match(/\[/g) || []).length
  const closeSquare = (line.match(/\]/g) || []).length

  if (openBrackets !== closeBrackets) {
    return {
      line: lineNumber,
      type: 'bracket',
      message: 'Unmatched parentheses ()',
    }
  }

  if (openCurly !== closeCurly) {
    return {
      line: lineNumber,
      type: 'bracket',
      message: 'Unmatched curly braces {}',
    }
  }

  if (openSquare !== closeSquare) {
    return {
      line: lineNumber,
      type: 'bracket',
      message: 'Unmatched square brackets []',
    }
  }

  return null
}

/**
 * Check for unmatched quotes in a line
 */
function checkQuotes(line, lineNumber) {
  // Remove escaped quotes
  const cleanLine = line.replace(/\\["'`]/g, '')

  const singleQuotes = (cleanLine.match(/'/g) || []).length
  const doubleQuotes = (cleanLine.match(/"/g) || []).length
  const backticks = (cleanLine.match(/`/g) || []).length

  if (singleQuotes % 2 !== 0) {
    return {
      line: lineNumber,
      type: 'quote',
      message: "Unmatched single quote '",
    }
  }

  if (doubleQuotes % 2 !== 0) {
    return {
      line: lineNumber,
      type: 'quote',
      message: 'Unmatched double quote "',
    }
  }

  if (backticks % 2 !== 0) {
    return {
      line: lineNumber,
      type: 'quote',
      message: 'Unmatched backtick `',
    }
  }

  return null
}

/**
 * Check for missing semicolons (simple heuristic)
 */
function checkSemicolon(line, lineNumber, trimmedLine) {
  // Skip if line is empty, comment, or already has semicolon
  if (!trimmedLine || trimmedLine.startsWith('//') || trimmedLine.endsWith(';')) {
    return null
  }

  // Skip control structures, function declarations, etc.
  const skipPatterns = [
    /^if\s*\(/,
    /^else/,
    /^for\s*\(/,
    /^while\s*\(/,
    /^function\s+/,
    /^class\s+/,
    /^const\s+\w+\s*=\s*\(/,
    /^let\s+\w+\s*=\s*\(/,
    /^var\s+\w+\s*=\s*\(/,
    /\{$/,
    /\}$/,
    /^import\s+/,
    /^export\s+/,
    /^return$/,
  ]

  if (skipPatterns.some(pattern => pattern.test(trimmedLine))) {
    return null
  }

  // Check if it looks like a statement that should end with semicolon
  const statementPatterns = [
    /^(const|let|var)\s+\w+\s*=\s*.+[^{]$/,
    /^return\s+.+$/,
    /^\w+\s*=\s*.+$/,
    /^\w+\(.*\)$/,
  ]

  if (statementPatterns.some(pattern => pattern.test(trimmedLine))) {
    return {
      line: lineNumber,
      type: 'semicolon',
      message: 'Missing semicolon ;',
    }
  }

  return null
}

/**
 * Check overall bracket balance across entire code
 */
function checkOverallBrackets(code) {
  const errors = []
  
  const openParen = (code.match(/\(/g) || []).length
  const closeParen = (code.match(/\)/g) || []).length
  const openCurly = (code.match(/\{/g) || []).length
  const closeCurly = (code.match(/\}/g) || []).length
  const openSquare = (code.match(/\[/g) || []).length
  const closeSquare = (code.match(/\]/g) || []).length

  if (openParen !== closeParen) {
    errors.push({
      line: code.split('\n').length,
      type: 'bracket',
      message: `Unmatched parentheses: ${openParen} open, ${closeParen} close`,
    })
  }

  if (openCurly !== closeCurly) {
    errors.push({
      line: code.split('\n').length,
      type: 'bracket',
      message: `Unmatched braces: ${openCurly} open, ${closeCurly} close`,
    })
  }

  if (openSquare !== closeSquare) {
    errors.push({
      line: code.split('\n').length,
      type: 'bracket',
      message: `Unmatched brackets: ${openSquare} open, ${closeSquare} close`,
    })
  }

  return errors
}

/**
 * Get unique errors (deduplicate by line number)
 */
export function getUniqueErrors(errors) {
  const seen = new Set()
  return errors.filter(error => {
    if (seen.has(error.line)) {
      return false
    }
    seen.add(error.line)
    return true
  })
}
