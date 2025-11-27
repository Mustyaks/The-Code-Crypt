import { motion } from 'framer-motion'
import './monster.css'

const MONSTER_TYPES = {
  bracket: '🦑', // Unmatched brackets
  semicolon: '👹', // Missing semicolon
  quote: '🐙', // Unmatched quotes
  generic: '👾', // Generic error
}

/**
 * Error Monster Component
 * Spawns at error locations and wiggles menacingly
 * @param {number} lineNumber - Line number where error occurs
 * @param {string} errorType - Type of error (bracket, semicolon, quote, generic)
 * @param {string} message - Error message to display
 * @param {function} onDespawn - Callback when monster should despawn
 */
function Monster({ lineNumber, errorType = 'generic', message = 'Syntax Error!', onDespawn }) {
  const monsterEmoji = MONSTER_TYPES[errorType] || MONSTER_TYPES.generic

  return (
    <motion.div
      className="error-monster"
      initial={{ scale: 0, rotate: -180, opacity: 0 }}
      animate={{ 
        scale: 1, 
        rotate: 0, 
        opacity: 1,
      }}
      exit={{ 
        scale: 0, 
        rotate: 180, 
        opacity: 0,
        y: -50 
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 200, 
        damping: 15 
      }}
    >
      {/* Monster Character with Wiggle */}
      <motion.div
        className="monster-character"
        animate={{
          rotate: [-5, 5, -5],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <motion.span 
          className="monster-emoji"
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          {monsterEmoji}
        </motion.span>
      </motion.div>

      {/* Pulsing Red Glow */}
      <motion.div
        className="monster-glow"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Error Message Tooltip */}
      <motion.div
        className="monster-tooltip"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="tooltip-content">
          <div className="tooltip-line">Line {lineNumber}</div>
          <div className="tooltip-message">{message}</div>
        </div>
        <div className="tooltip-arrow" />
      </motion.div>

      {/* Angry Eyes */}
      <motion.div
        className="monster-eyes"
        animate={{
          scaleY: [1, 0.3, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
        }}
      >
        <span className="eye">👁️</span>
        <span className="eye">👁️</span>
      </motion.div>

      {/* Particle Effects */}
      <div className="monster-particles">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            animate={{
              y: [0, -20, -40],
              x: [(i - 2) * 5, (i - 2) * 10],
              opacity: [1, 0.5, 0],
              scale: [1, 0.5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default Monster
