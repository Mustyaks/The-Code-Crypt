import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { getDifficultyColor } from '@/lib/cursedLines'

function RiddleDialog({ riddle, lineNumber, onAnswer, onClose }) {
  const [userAnswer, setUserAnswer] = useState('')
  const [showHint, setShowHint] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    onAnswer(userAnswer)
  }

  if (!riddle) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          transition={{ type: 'spring', damping: 20 }}
          className="relative max-w-md w-full bg-ghost border-2 border-blood rounded-lg p-6 shadow-2xl"
          style={{ boxShadow: '0 0 50px rgba(139, 0, 0, 0.5)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Floating skull decoration */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0], y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-6xl"
          >
            💀
          </motion.div>

          {/* Header */}
          <div className="text-center mb-6 mt-4">
            <h2 className="text-2xl font-bold blood-accent mb-2">
              Cursed Line {lineNumber}
            </h2>
            <p className="text-sm text-gray-400">
              Solve the riddle to exorcise this line
            </p>
            <div className={`text-xs mt-1 ${getDifficultyColor(riddle.difficulty)}`}>
              Difficulty: {riddle.difficulty.toUpperCase()}
            </div>
          </div>

          {/* Riddle */}
          <div className="bg-crypt/50 border border-blood/30 rounded-lg p-4 mb-4">
            <p className="text-gray-200 text-center italic">
              "{riddle.riddle}"
            </p>
          </div>

          {/* Hint */}
          {showHint ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-3 mb-4"
            >
              <p className="text-yellow-400 text-sm">
                💡 Hint: {riddle.hint}
              </p>
            </motion.div>
          ) : (
            <button
              onClick={() => setShowHint(true)}
              className="text-xs text-gray-500 hover:text-gray-300 mb-4 underline"
            >
              Need a hint? 👻
            </button>
          )}

          {/* Answer Input */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer..."
                className="w-full px-4 py-2 bg-crypt border border-blood/50 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blood focus:ring-2 focus:ring-blood/20"
                autoFocus
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <Button
                type="submit"
                variant="spooky"
                className="flex-1"
                disabled={!userAnswer.trim()}
              >
                Submit Answer 🔮
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </form>

          {/* Decorative elements */}
          <div className="absolute -bottom-4 -left-4 text-4xl opacity-50">
            🕯️
          </div>
          <div className="absolute -bottom-4 -right-4 text-4xl opacity-50">
            🕯️
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default RiddleDialog
