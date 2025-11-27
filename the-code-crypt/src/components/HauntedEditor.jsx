import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView, Decoration } from '@codemirror/view'
import { StateField, StateEffect } from '@codemirror/state'
import Ghost from './Ghost'
import Monster from './Monster'
import RiddleDialog from './RiddleDialog'
import { isCursedLine, getRiddle, checkAnswer, getAllCursedLines } from '@/lib/cursedLines'
import { detectErrors, getUniqueErrors } from '@/lib/errorDetection'
import { playGhostWhisper, playGlitchSound, playSuccessChime } from '@/lib/soundEffects'
import './hauntedEditor.css'

const defaultCode = `// Welcome to the Haunted Editor...
// Where code writes itself... or does it? 👻

function summonSpirit() {
  const spirits = ['👻', '🦇', '🕷️', '⚰️'];
  return spirits[Math.floor(Math.random() * spirits.length)];
}

console.log('The crypt awakens...', summonSpirit());

// Beware: Your code may be possessed...
`

function HauntedEditor({ initialValue = defaultCode, onChange }) {
  const [code, setCode] = useState(initialValue)
  const [hasError, setHasError] = useState(false)
  const [scareCount, setScareCount] = useState(0)
  const [cheerCount, setCheerCount] = useState(0)
  const [exorcisedLines, setExorcisedLines] = useState(new Set())
  const [currentRiddle, setCurrentRiddle] = useState(null)
  const [currentLine, setCurrentLine] = useState(null)
  const [isFlickering, setIsFlickering] = useState(false)
  const [errors, setErrors] = useState([])
  const [isGlitching, setIsGlitching] = useState(false)
  const [showWhisper, setShowWhisper] = useState(false)
  const editorViewRef = useRef(null)
  const glitchTimerRef = useRef(null)

  const handleChange = (value) => {
    setCode(value)
    if (onChange) onChange(value)
    
    // Detect syntax errors
    const detectedErrors = detectErrors(value)
    const uniqueErrors = getUniqueErrors(detectedErrors)
    setErrors(uniqueErrors)
    
    // Simple error detection (check for common syntax issues)
    const hasBasicError = uniqueErrors.length > 0
    setHasError(hasBasicError)
  }

  // Get line position for monster placement
  const getLinePosition = (lineNumber) => {
    if (!editorViewRef.current) return null
    
    try {
      const line = editorViewRef.current.state.doc.line(lineNumber)
      const coords = editorViewRef.current.coordsAtPos(line.from)
      if (coords) {
        const editorRect = editorViewRef.current.dom.getBoundingClientRect()
        return {
          top: coords.top - editorRect.top,
        }
      }
    } catch (e) {
      console.error('Error getting line position:', e)
    }
    
    return null
  }

  // Ghost interaction handlers
  const handleScare = () => {
    setScareCount((prev) => prev + 1)
    console.log('👻 Ghost scared you!')
  }

  const handleCheer = () => {
    setCheerCount((prev) => prev + 1)
    console.log('👻 Ghost is cheering for you!')
  }

  // Random screen glitch effect (every 15-25 seconds)
  useEffect(() => {
    const scheduleGlitch = () => {
      const delay = 15000 + Math.random() * 10000 // 15-25 seconds
      glitchTimerRef.current = setTimeout(() => {
        triggerGlitch()
        scheduleGlitch() // Schedule next glitch
      }, delay)
    }

    scheduleGlitch()

    return () => {
      if (glitchTimerRef.current) {
        clearTimeout(glitchTimerRef.current)
      }
    }
  }, [])

  // Trigger screen glitch
  const triggerGlitch = () => {
    setIsGlitching(true)
    playGlitchSound()
    setTimeout(() => setIsGlitching(false), 300)
  }

  // Handle line click
  const handleLineClick = (view, pos) => {
    const line = view.state.doc.lineAt(pos)
    const lineNumber = line.number

    if (isCursedLine(lineNumber) && !exorcisedLines.has(lineNumber)) {
      const riddle = getRiddle(lineNumber)
      setCurrentRiddle(riddle)
      setCurrentLine(lineNumber)
      
      // Play ghost whisper sound and show visual effect
      playGhostWhisper()
      setShowWhisper(true)
      setTimeout(() => setShowWhisper(false), 1000)
    }
  }

  // Handle riddle answer
  const handleRiddleAnswer = (answer) => {
    const isCorrect = checkAnswer(currentLine, answer)

    if (isCorrect) {
      // Correct answer - exorcise the line
      setExorcisedLines((prev) => new Set([...prev, currentLine]))
      setCheerCount((prev) => prev + 1)
      playSuccessChime()
      console.log(`✅ Line ${currentLine} exorcised!`)
    } else {
      // Wrong answer - trigger scare and flicker
      setScareCount((prev) => prev + 1)
      triggerFlicker()
      triggerGlitch()
      console.log(`❌ Wrong answer for line ${currentLine}!`)
    }

    setCurrentRiddle(null)
    setCurrentLine(null)
  }

  // Trigger editor flicker effect
  const triggerFlicker = () => {
    setIsFlickering(true)
    setTimeout(() => setIsFlickering(false), 1000)
  }

  // Create CodeMirror extension for cursed lines
  const cursedLineExtension = () => {
    const cursedLineMark = Decoration.line({
      attributes: { class: 'cursed-line' }
    })
    
    const exorcisedLineMark = Decoration.line({
      attributes: { class: 'exorcised-line' }
    })

    return StateField.define({
      create() {
        return Decoration.none
      },
      update(decorations, tr) {
        const builder = []
        const allCursedLines = getAllCursedLines()

        for (let i = 1; i <= tr.state.doc.lines; i++) {
          if (allCursedLines.includes(i)) {
            const line = tr.state.doc.line(i)
            if (exorcisedLines.has(i)) {
              builder.push(exorcisedLineMark.range(line.from))
            } else {
              builder.push(cursedLineMark.range(line.from))
            }
          }
        }

        return Decoration.set(builder)
      },
      provide: f => EditorView.decorations.from(f)
    })
  }

  // Click handler extension
  const clickExtension = EditorView.domEventHandlers({
    click: (event, view) => {
      const pos = view.posAtCoords({ x: event.clientX, y: event.clientY })
      if (pos) {
        handleLineClick(view, pos)
      }
    }
  })

  // Editor state for ghosts
  const editorState = {
    code,
    hasError,
  }

  return (
    <div className="haunted-editor-container">
      {/* AI Ghost 1: Helper - Top Right */}
      <Ghost
        personality="Helper"
        editorState={editorState}
        onCheer={handleCheer}
        position={{ top: '5%', right: '5%' }}
      />

      {/* AI Ghost 2: Mischief - Top Left */}
      <Ghost
        personality="Mischief"
        editorState={editorState}
        onScare={handleScare}
        position={{ top: '15%', left: '8%' }}
      />

      {/* AI Ghost 3: Watcher - Bottom Right */}
      <Ghost
        personality="Watcher"
        editorState={editorState}
        position={{ bottom: '10%', right: '10%' }}
      />

      {/* Fog Animation Background */}
      <div className="fog-layer fog-1"></div>
      <div className="fog-layer fog-2"></div>
      <div className="fog-layer fog-3"></div>

      {/* Whisper Visual Effect */}
      <AnimatePresence>
        {showWhisper && (
          <motion.div
            className="whisper-effect"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.3, scale: 1.2 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1 }}
          >
            👻
          </motion.div>
        )}
      </AnimatePresence>

      {/* Editor Wrapper with Flickering Border */}
      <motion.div 
        className={`editor-wrapper ${isGlitching ? 'glitch' : ''}`}
        animate={isFlickering ? {
          opacity: [1, 0.3, 1, 0.5, 1],
          scale: [1, 0.98, 1, 0.99, 1],
        } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="editor-header">
          <div className="editor-title">
            <span className="title-icon">⚰️</span>
            <span>Haunted Code Editor</span>
          </div>
          <div className="editor-controls">
            <div className="control-dot red"></div>
            <div className="control-dot yellow"></div>
            <div className="control-dot green"></div>
          </div>
        </div>

        <div className={`editor-content ${isGlitching ? 'glitch-chromatic' : ''}`} style={{ position: 'relative' }}>
          <CodeMirror
            value={code}
            height="400px"
            theme={oneDark}
            extensions={[
              javascript({ jsx: true }),
              cursedLineExtension(),
              clickExtension
            ]}
            onChange={handleChange}
            onCreateEditor={(view) => {
              editorViewRef.current = view
            }}
            className="codemirror-haunted"
            basicSetup={{
              lineNumbers: true,
              highlightActiveLineGutter: true,
              highlightSpecialChars: true,
              foldGutter: true,
              drawSelection: true,
              dropCursor: true,
              allowMultipleSelections: true,
              indentOnInput: true,
              bracketMatching: true,
              closeBrackets: true,
              autocompletion: true,
              rectangularSelection: true,
              crosshairCursor: true,
              highlightActiveLine: true,
              highlightSelectionMatches: true,
              closeBracketsKeymap: true,
              searchKeymap: true,
              foldKeymap: true,
              completionKeymap: true,
              lintKeymap: true,
            }}
          />

          {/* Error Monsters */}
          <AnimatePresence>
            {errors.map((error, index) => {
              const position = getLinePosition(error.line)
              if (!position) return null

              return (
                <div
                  key={`${error.line}-${error.type}-${index}`}
                  style={{
                    position: 'absolute',
                    top: position.top,
                    right: 0,
                    pointerEvents: 'none',
                  }}
                >
                  <Monster
                    lineNumber={error.line}
                    errorType={error.type}
                    message={error.message}
                  />
                </div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Flickering Cursor Effect Overlay */}
        <div className="cursor-flicker"></div>
      </motion.div>

      {/* Riddle Dialog */}
      {currentRiddle && (
        <RiddleDialog
          riddle={currentRiddle}
          lineNumber={currentLine}
          onAnswer={handleRiddleAnswer}
          onClose={() => {
            setCurrentRiddle(null)
            setCurrentLine(null)
          }}
        />
      )}

      {/* Spooky Status Bar */}
      <div className="editor-status-bar">
        <span className="status-item">
          <span className="status-icon">🕯️</span>
          Lines: {code.split('\n').length}
        </span>
        <span className="status-item">
          <span className="status-icon">👻</span>
          Ghosts: 3 Active
        </span>
        <span className="status-item">
          <span className="status-icon">⚰️</span>
          Cursed: {getAllCursedLines().length - exorcisedLines.size}
        </span>
        <span className="status-item">
          <span className="status-icon">✨</span>
          Exorcised: {exorcisedLines.size}
        </span>
        <span className="status-item">
          <span className="status-icon">😈</span>
          Scares: {scareCount}
        </span>
        <span className="status-item">
          <span className="status-icon">👾</span>
          Monsters: {errors.length}
        </span>
        <span className="status-item">
          <span className="status-icon">💀</span>
          {hasError ? 'Error!' : 'OK'}
        </span>
      </div>
    </div>
  )
}

export default HauntedEditor
