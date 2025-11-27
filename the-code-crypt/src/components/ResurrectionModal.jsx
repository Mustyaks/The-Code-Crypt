import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { resurrectCode, validateCodeForResurrection, getResurrectionStats, getResurrectionMessage } from '@/lib/codeResurrection'
import './resurrectionModal.css'

function ResurrectionModal({ isOpen, onClose, onResurrect }) {
  const [oldCode, setOldCode] = useState('')
  const [isResurrecting, setIsResurrecting] = useState(false)
  const [error, setError] = useState('')

  const handleResurrect = async () => {
    // Validate code
    const validation = validateCodeForResurrection(oldCode)
    if (!validation.valid) {
      setError(validation.message)
      return
    }

    setError('')
    setIsResurrecting(true)

    // Simulate resurrection process with delay
    setTimeout(() => {
      const modernCode = resurrectCode(oldCode)
      const stats = getResurrectionStats(oldCode, modernCode)
      const message = getResurrectionMessage(stats)

      // Call parent callback with resurrected code
      onResurrect(modernCode, message)
      
      // Reset and close
      setIsResurrecting(false)
      setOldCode('')
      onClose()
    }, 3000) // 3 second resurrection ritual
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, y: 50, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="resurrection-modal"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Floating spirits during resurrection */}
          {isResurrecting && (
            <>
              <motion.div
                className="resurrection-spirit spirit-1"
                animate={{
                  x: [0, 100, 0, -100, 0],
                  y: [0, -50, -100, -50, 0],
                  opacity: [0, 1, 1, 1, 0],
                  scale: [0.5, 1, 1.2, 1, 0.5],
                }}
                transition={{ duration: 3, ease: 'easeInOut' }}
              >
                👻
              </motion.div>
              <motion.div
                className="resurrection-spirit spirit-2"
                animate={{
                  x: [0, -100, 0, 100, 0],
                  y: [0, -50, -100, -50, 0],
                  opacity: [0, 1, 1, 1, 0],
                  scale: [0.5, 1, 1.2, 1, 0.5],
                }}
                transition={{ duration: 3, ease: 'easeInOut', delay: 0.3 }}
              >
                👻
              </motion.div>
              <motion.div
                className="resurrection-spirit spirit-3"
                animate={{
                  x: [0, 50, 0, -50, 0],
                  y: [0, -80, -120, -80, 0],
                  opacity: [0, 1, 1, 1, 0],
                  scale: [0.5, 1, 1.2, 1, 0.5],
                }}
                transition={{ duration: 3, ease: 'easeInOut', delay: 0.6 }}
              >
                👻
              </motion.div>

              {/* White flash effect */}
              <motion.div
                className="resurrection-flash"
                animate={{
                  opacity: [0, 0.8, 0, 0.6, 0],
                }}
                transition={{ duration: 3, times: [0, 0.3, 0.5, 0.7, 1] }}
              />
            </>
          )}

          {/* Header */}
          <div className="resurrection-header">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="text-5xl mb-4"
            >
              ⚰️
            </motion.div>
            <h2 className="text-3xl font-bold blood-accent mb-2">
              Resurrection Mode
            </h2>
            <p className="text-gray-400 text-sm">
              Bring your old code back from the dead
            </p>
          </div>

          {/* Content */}
          {!isResurrecting ? (
            <div className="resurrection-content">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-blood mb-2">
                  Paste Your Old Code 📜
                </label>
                <textarea
                  value={oldCode}
                  onChange={(e) => setOldCode(e.target.value)}
                  placeholder="// Paste your ancient JavaScript here...&#10;// The Ghost AI will modernize it for you!&#10;&#10;var oldVariable = 'legacy code';&#10;function oldFunction() {&#10;  return 'needs resurrection';&#10;}"
                  className="resurrection-textarea"
                  rows={12}
                  disabled={isResurrecting}
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="error-message"
                >
                  ⚠️ {error}
                </motion.div>
              )}

              <div className="resurrection-info">
                <p className="text-xs text-gray-500">
                  <strong>What happens:</strong>
                </p>
                <ul className="text-xs text-gray-500 space-y-1 mt-2">
                  <li>• Transforms <code>var</code> to <code>const</code>/<code>let</code></li>
                  <li>• Converts functions to arrow functions</li>
                  <li>• Adds modern JavaScript patterns</li>
                  <li>• Includes helpful comments</li>
                </ul>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <Button
                  variant="spooky"
                  className="flex-1"
                  onClick={handleResurrect}
                  disabled={!oldCode.trim() || isResurrecting}
                >
                  🦇 Resurrect Code
                </Button>
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={isResurrecting}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="resurrection-ritual">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                ⚡
              </motion.div>
              <h3 className="text-2xl font-bold text-blood mb-2">
                Resurrection in Progress...
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                The Ghost AI is modernizing your code
              </p>
              <div className="resurrection-progress">
                <motion.div
                  className="resurrection-progress-bar"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3, ease: 'linear' }}
                />
              </div>
              <div className="mt-4 space-y-2 text-xs text-gray-500">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  👻 Summoning ghost spirits...
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  ⚡ Channeling modern JavaScript energy...
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                >
                  ✨ Resurrection complete!
                </motion.p>
              </div>
            </div>
          )}

          {/* Decorative elements */}
          <div className="resurrection-candles">
            <span className="candle">🕯️</span>
            <span className="candle">🕯️</span>
            <span className="candle">🕯️</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ResurrectionModal
