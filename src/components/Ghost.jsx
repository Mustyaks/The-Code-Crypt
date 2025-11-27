import { motion } from 'framer-motion'
import { useGhostBehavior, useGhostAnimation, useGhostAppearance, useGhostInteraction } from '@/hooks/ghostHooks'
import './ghost.css'

const GHOST_EMOJIS = {
  Helper: '👻',
  Mischief: '😈',
  Watcher: '👁️',
}

const PERSONALITY_NAMES = {
  Helper: 'Casper',
  Mischief: 'Loki',
  Watcher: 'Oracle',
}

/**
 * Ghost Component with AI behavior
 * @param {string} personality - "Helper", "Mischief", or "Watcher"
 * @param {object} editorState - Current editor state { code, hasError }
 * @param {function} onScare - Callback when ghost scares
 * @param {function} onCheer - Callback when ghost cheers
 * @param {object} position - { top, left, right, bottom } CSS position
 */
function Ghost({ 
  personality = 'Helper', 
  editorState = { code: '', hasError: false },
  onScare,
  onCheer,
  position = { top: '10%', right: '5%' }
}) {
  const { mood, message, isActive } = useGhostBehavior(personality, editorState)
  const animationParams = useGhostAnimation(personality)
  const appearance = useGhostAppearance(mood, personality)
  const { interactionCount } = useGhostInteraction(personality, onScare, onCheer)

  const ghostEmoji = GHOST_EMOJIS[personality] || '👻'
  const ghostName = PERSONALITY_NAMES[personality] || 'Ghost'

  return (
    <motion.div
      className={`ghost-ai ${personality.toLowerCase()} ${isActive ? 'active' : ''}`}
      style={{
        position: 'absolute',
        ...position,
        zIndex: 10,
        pointerEvents: 'none',
      }}
      animate={{
        y: animationParams.yRange,
        x: animationParams.xRange,
        rotate: animationParams.rotateRange,
        opacity: appearance.opacity,
        scale: appearance.scale,
      }}
      transition={{
        duration: animationParams.duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
    >
      {/* Ghost Character */}
      <motion.div
        className="ghost-character"
        animate={{
          filter: [
            `drop-shadow(0 0 10px ${appearance.color})`,
            `drop-shadow(0 0 20px ${appearance.color})`,
            `drop-shadow(0 0 10px ${appearance.color})`,
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <span className="ghost-emoji" style={{ fontSize: '3rem' }}>
          {ghostEmoji}
        </span>
      </motion.div>

      {/* Ghost Name Tag */}
      <div className="ghost-nametag" style={{ color: appearance.color }}>
        {ghostName}
      </div>

      {/* Message Bubble */}
      {message && (
        <motion.div
          className="ghost-message"
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          style={{
            borderColor: appearance.color,
            backgroundColor: `${appearance.color}22`,
          }}
        >
          {message}
        </motion.div>
      )}

      {/* Activity Indicator */}
      {isActive && (
        <motion.div
          className="ghost-activity-indicator"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          style={{ backgroundColor: appearance.color }}
        />
      )}

      {/* Mood Indicator */}
      <div className={`ghost-mood-indicator mood-${mood}`}>
        {mood === 'concerned' && '😟'}
        {mood === 'amused' && '😏'}
        {mood === 'observing' && '🤔'}
      </div>

      {/* Interaction Counter (for debugging) */}
      {interactionCount > 0 && (
        <div className="ghost-interaction-count">
          {interactionCount}
        </div>
      )}
    </motion.div>
  )
}

export default Ghost
