import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Custom hook for ghost behavior based on personality type
 * @param {string} personality - "Helper", "Mischief", or "Watcher"
 * @param {object} editorState - Current state of the editor
 */
export function useGhostBehavior(personality, editorState) {
  const [mood, setMood] = useState('neutral')
  const [message, setMessage] = useState('')
  const [isActive, setIsActive] = useState(false)
  const lastCodeLength = useRef(0)
  const activityTimer = useRef(null)

  // Detect typing activity
  useEffect(() => {
    if (!editorState.code) return

    const currentLength = editorState.code.length
    const isTyping = currentLength !== lastCodeLength.current

    if (isTyping) {
      setIsActive(true)
      clearTimeout(activityTimer.current)
      
      activityTimer.current = setTimeout(() => {
        setIsActive(false)
      }, 2000)
    }

    lastCodeLength.current = currentLength
  }, [editorState.code])

  // React to errors
  useEffect(() => {
    if (editorState.hasError) {
      handleError()
    }
  }, [editorState.hasError])

  // Personality-based reactions
  const handleError = useCallback(() => {
    switch (personality) {
      case 'Helper':
        setMood('concerned')
        setMessage('I sense a disturbance... 🔍')
        break
      case 'Mischief':
        setMood('amused')
        setMessage('Hehe, broken code! 😈')
        break
      case 'Watcher':
        setMood('observing')
        setMessage('Interesting mistake...')
        break
      default:
        setMood('neutral')
    }

    setTimeout(() => {
      setMood('neutral')
      setMessage('')
    }, 3000)
  }, [personality])

  const handleTyping = useCallback(() => {
    if (!isActive) return

    switch (personality) {
      case 'Helper':
        if (Math.random() > 0.95) {
          setMessage('Looking good! 👍')
          setTimeout(() => setMessage(''), 2000)
        }
        break
      case 'Mischief':
        if (Math.random() > 0.98) {
          setMessage('What are you doing? 😏')
          setTimeout(() => setMessage(''), 2000)
        }
        break
      case 'Watcher':
        // Watcher is mostly silent
        break
    }
  }, [personality, isActive])

  useEffect(() => {
    handleTyping()
  }, [isActive, handleTyping])

  return {
    mood,
    message,
    isActive,
  }
}

/**
 * Hook for random floating animation parameters
 */
export function useGhostAnimation(personality) {
  const [animationParams, setAnimationParams] = useState({
    duration: 6,
    yRange: [-20, 0],
    xRange: [0, 10],
    rotateRange: [-5, 5],
  })

  useEffect(() => {
    // Personality affects animation style
    switch (personality) {
      case 'Helper':
        setAnimationParams({
          duration: 5,
          yRange: [-15, 0],
          xRange: [0, 8],
          rotateRange: [-3, 3],
        })
        break
      case 'Mischief':
        setAnimationParams({
          duration: 3,
          yRange: [-30, 0],
          xRange: [-15, 15],
          rotateRange: [-10, 10],
        })
        break
      case 'Watcher':
        setAnimationParams({
          duration: 8,
          yRange: [-10, 0],
          xRange: [0, 5],
          rotateRange: [-2, 2],
        })
        break
    }
  }, [personality])

  return animationParams
}

/**
 * Hook for ghost color/opacity based on mood
 */
export function useGhostAppearance(mood, personality) {
  const [appearance, setAppearance] = useState({
    opacity: 0.6,
    color: '#ffffff',
    scale: 1,
  })

  useEffect(() => {
    switch (mood) {
      case 'concerned':
        setAppearance({
          opacity: 0.9,
          color: '#ffaa00',
          scale: 1.1,
        })
        break
      case 'amused':
        setAppearance({
          opacity: 0.8,
          color: '#ff4444',
          scale: 1.15,
        })
        break
      case 'observing':
        setAppearance({
          opacity: 0.5,
          color: '#4444ff',
          scale: 0.95,
        })
        break
      case 'neutral':
      default:
        // Base appearance by personality
        switch (personality) {
          case 'Helper':
            setAppearance({ opacity: 0.6, color: '#88ff88', scale: 1 })
            break
          case 'Mischief':
            setAppearance({ opacity: 0.7, color: '#ff8888', scale: 1 })
            break
          case 'Watcher':
            setAppearance({ opacity: 0.4, color: '#8888ff', scale: 1 })
            break
          default:
            setAppearance({ opacity: 0.6, color: '#ffffff', scale: 1 })
        }
    }
  }, [mood, personality])

  return appearance
}

/**
 * Hook for ghost interaction events
 */
export function useGhostInteraction(personality, onScare, onCheer) {
  const [interactionCount, setInteractionCount] = useState(0)

  const triggerScare = useCallback(() => {
    if (personality === 'Mischief' && onScare) {
      onScare()
      setInteractionCount((prev) => prev + 1)
    }
  }, [personality, onScare])

  const triggerCheer = useCallback(() => {
    if (personality === 'Helper' && onCheer) {
      onCheer()
      setInteractionCount((prev) => prev + 1)
    }
  }, [personality, onCheer])

  // Random interactions based on personality
  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.random()
      
      if (personality === 'Mischief' && random > 0.95) {
        triggerScare()
      } else if (personality === 'Helper' && random > 0.97) {
        triggerCheer()
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [personality, triggerScare, triggerCheer])

  return {
    interactionCount,
    triggerScare,
    triggerCheer,
  }
}
