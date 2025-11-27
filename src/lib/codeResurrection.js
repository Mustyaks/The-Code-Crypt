/**
 * Code Resurrection Utilities
 * Simulates modernizing old code with spooky transformations
 */

/**
 * Modernize old JavaScript code
 * Applies various transformations to make code more modern
 * @param {string} oldCode - Legacy code to modernize
 * @returns {string} Modernized code
 */
export function resurrectCode(oldCode) {
  let modernCode = oldCode

  // Transform var to const/let
  modernCode = modernCode.replace(/\bvar\s+(\w+)\s*=/g, (match, varName) => {
    // Use const for simple assignments, let for others
    return `const ${varName} =`
  })

  // Transform function declarations to arrow functions (simple cases)
  modernCode = modernCode.replace(
    /function\s+(\w+)\s*\(([^)]*)\)\s*\{/g,
    'const $1 = ($2) => {'
  )

  // Transform callbacks to arrow functions
  modernCode = modernCode.replace(
    /function\s*\(([^)]*)\)\s*\{/g,
    '($1) => {'
  )

  // Add template literals for string concatenation
  modernCode = modernCode.replace(
    /(['"])([^'"]*)\1\s*\+\s*(\w+)\s*\+\s*(['"])([^'"]*)\4/g,
    '`$2${$3}$5`'
  )

  // Transform array methods
  modernCode = modernCode.replace(/\.push\(/g, '.push(')
  
  // Add async/await hints (just comments)
  if (modernCode.includes('callback') || modernCode.includes('then(')) {
    modernCode = '// Consider using async/await for better readability\n' + modernCode
  }

  // Add strict mode if not present
  if (!modernCode.includes('use strict')) {
    modernCode = "'use strict';\n\n" + modernCode
  }

  // Add JSDoc comments for functions
  modernCode = modernCode.replace(
    /(const\s+\w+\s*=\s*\([^)]*\)\s*=>)/g,
    '/**\n * Resurrected function - modernized by ghost AI\n */\n$1'
  )

  // Add destructuring hints
  if (modernCode.includes('.') && modernCode.includes('const')) {
    modernCode = '// Tip: Consider using destructuring for cleaner code\n' + modernCode
  }

  // Add final resurrection comment
  modernCode = `// 👻 Code resurrected and modernized by Ghost AI\n// Original code brought back from the crypt!\n\n${modernCode}`

  return modernCode
}

/**
 * Get resurrection statistics
 * @param {string} oldCode - Original code
 * @param {string} newCode - Modernized code
 * @returns {object} Statistics about the transformation
 */
export function getResurrectionStats(oldCode, newCode) {
  const stats = {
    varToConst: (oldCode.match(/\bvar\s+/g) || []).length,
    functionsModernized: (oldCode.match(/function\s+\w+/g) || []).length,
    linesAdded: newCode.split('\n').length - oldCode.split('\n').length,
    charactersChanged: Math.abs(newCode.length - oldCode.length),
  }

  return stats
}

/**
 * Generate resurrection message based on stats
 * @param {object} stats - Resurrection statistics
 * @returns {string} Spooky message
 */
export function getResurrectionMessage(stats) {
  const messages = [
    `🦇 Transformed ${stats.varToConst} ancient var declarations into modern const/let`,
    `👻 Modernized ${stats.functionsModernized} function declarations to arrow functions`,
    `⚰️ Added ${stats.linesAdded} lines of modern JavaScript wisdom`,
    `💀 Changed ${stats.charactersChanged} characters in the resurrection ritual`,
  ]

  return messages.filter(msg => !msg.includes('0 ')).join('\n')
}

/**
 * Validate code before resurrection
 * @param {string} code - Code to validate
 * @returns {object} Validation result
 */
export function validateCodeForResurrection(code) {
  if (!code || code.trim().length === 0) {
    return {
      valid: false,
      message: 'The crypt is empty! Please provide some code to resurrect.',
    }
  }

  if (code.length < 10) {
    return {
      valid: false,
      message: 'This code fragment is too small to resurrect. Need at least 10 characters.',
    }
  }

  if (code.length > 10000) {
    return {
      valid: false,
      message: 'This code is too powerful! Maximum 10,000 characters allowed.',
    }
  }

  return {
    valid: true,
    message: 'Code is ready for resurrection!',
  }
}
