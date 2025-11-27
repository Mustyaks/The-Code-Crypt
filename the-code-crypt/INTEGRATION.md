# 🦇 The Code Crypt - Complete Integration Guide

## Architecture Overview

```
App.jsx (Router)
  └── Layout.jsx (Global effects: fog, background flicker)
      ├── Navbar.jsx
      ├── Sidebar.jsx
      └── Routes
          ├── Home.jsx
          └── Editor.jsx
              └── HauntedEditor.jsx (Main component)
                  ├── Ghost.jsx (x3 instances)
                  │   └── ghostHooks.js (AI behavior)
                  ├── Monster.jsx (Dynamic spawning)
                  │   └── errorDetection.js
                  ├── RiddleDialog.jsx
                  │   └── cursedLines.js
                  ├── ResurrectionModal.jsx
                  │   └── codeResurrection.js
                  └── soundEffects.js
```

## Component Integration

### 1. App.jsx
**Purpose**: Main router and application entry point

**Routes**:
- `/` - Home page
- `/editor` - Haunted Editor (main feature)
- `/scrolls`, `/spells`, `/potions`, `/grimoire`, `/rituals` - Placeholder pages

**Global Effects** (via Layout):
- Haunted background with flicker
- Fog overlay animation
- Screen vignette
- Noise overlay

### 2. Layout.jsx
**Purpose**: Provides consistent layout with global effects

**Features**:
- Fixed navbar at top
- Collapsible sidebar (responsive)
- Fog overlay (3 layers)
- Haunted background animations
- Content area with proper spacing

### 3. Editor.jsx (Page)
**Purpose**: Container page for HauntedEditor

**Features**:
- Page title and description
- Feature cards explaining functionality
- Ghost personality descriptions
- Cursed lines explanation
- Error monster system info
- Resurrection mode details
- GhostDemo component

### 4. HauntedEditor.jsx (Core Component)
**Purpose**: Main editor with all spooky features

**State Management**:
```javascript
const [code, setCode] = useState(defaultCode)
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
const [showResurrection, setShowResurrection] = useState(false)
const [resurrectionMessage, setResurrectionMessage] = useState('')
```

**Child Components**:

#### Ghost.jsx (3 instances)
- **Helper Ghost** (Casper) - Top right, green theme
- **Mischief Ghost** (Loki) - Top left, red theme
- **Watcher Ghost** (Oracle) - Bottom right, blue theme

**Props passed**:
```javascript
<Ghost
  personality="Helper|Mischief|Watcher"
  editorState={{ code, hasError }}
  onScare={handleScare}
  onCheer={handleCheer}
  position={{ top, right, bottom, left }}
/>
```

**Behavior** (via ghostHooks.js):
- `useGhostBehavior()` - Reacts to typing and errors
- `useGhostAnimation()` - Personality-based movement
- `useGhostAppearance()` - Color/opacity changes
- `useGhostInteraction()` - Triggers callbacks

#### Monster.jsx (Dynamic)
**Spawning Logic**:
```javascript
// Detect errors on code change
const detectedErrors = detectErrors(value)
const uniqueErrors = getUniqueErrors(detectedErrors)
setErrors(uniqueErrors)

// Render monsters for each error
{errors.map((error) => (
  <Monster
    lineNumber={error.line}
    errorType={error.type}
    message={error.message}
  />
))}
```

**Monster Types**:
- 🦑 Bracket Monster (unmatched brackets)
- 🐙 Quote Monster (unmatched quotes)
- 👹 Semicolon Monster (missing semicolons)
- 👾 Generic Monster (other errors)

**Auto-despawn**: When error is fixed, monster disappears via AnimatePresence

#### RiddleDialog.jsx
**Trigger**: Click on cursed line (3, 7, or 12)

**Flow**:
```javascript
// User clicks cursed line
handleLineClick() 
  → playGhostWhisper()
  → setCurrentRiddle(riddle)
  → Show RiddleDialog

// User submits answer
handleRiddleAnswer()
  → checkAnswer()
  → if correct: exorcise line, play success chime
  → if wrong: trigger flicker + glitch, increase scare count
```

#### ResurrectionModal.jsx
**Trigger**: Click "⚰️ Resurrect Code" button

**Flow**:
```javascript
// User clicks button
setShowResurrection(true)

// User pastes old code
validateCodeForResurrection()

// User clicks "Resurrect"
resurrectCode() // Transform code
  → 3-second animation (ghosts circle, white flash)
  → playSuccessChime()
  → setCode(modernCode)
  → Show success message
```

## State Sharing

### Editor → Ghosts
```javascript
const editorState = {
  code,      // Current code content
  hasError,  // Boolean error state
}

// Passed to all Ghost components
<Ghost editorState={editorState} />
```

### Ghosts → Editor
```javascript
// Callbacks for ghost interactions
const handleScare = () => setScareCount(prev => prev + 1)
const handleCheer = () => setCheerCount(prev => prev + 1)

// Passed to Ghost components
<Ghost onScare={handleScare} onCheer={handleCheer} />
```

### Editor → Monsters
```javascript
// Errors detected from code
const errors = detectErrors(code)

// Monsters spawned dynamically
{errors.map(error => <Monster {...error} />)}
```

### Cursed Lines → Editor
```javascript
// Line click detection
handleLineClick(view, pos)
  → isCursedLine(lineNumber)
  → setCurrentRiddle(riddle)
  → playGhostWhisper()

// Answer handling
handleRiddleAnswer(answer)
  → checkAnswer(currentLine, answer)
  → Update exorcisedLines set
  → Trigger effects
```

## Sound Effects Integration

All sounds use Web Audio API (soundEffects.js):

```javascript
// Ghost whisper on cursed line click
playGhostWhisper(0.1) // Low volume

// Screen glitch every 15-25 seconds
playGlitchSound(0.05)

// Success on exorcised line
playSuccessChime(0.1)

// Monster growl (available for future use)
playMonsterGrowl(0.08)
```

## Visual Effects Integration

### Global (Layout.jsx + global.css)
- Background flicker (4s cycle)
- Red pulse (12s cycle)
- Fog drift (20s cycle)
- Vignette breathing (6s cycle)
- Noise overlay (0.2s flicker)

### Editor-specific (hauntedEditor.css)
- Random glitch (15-25s interval)
- Cursed line pulse (2s cycle)
- Exorcised line glow (3s cycle)
- Border flicker (3s cycle)
- Ambient glow (10s cycle)

### Triggered Effects
- **Wrong answer**: Flicker + glitch + ghost scream
- **Cursed line click**: Whisper sound + ghost emoji
- **Resurrection**: 3 ghosts circle + white flash
- **Error spawn**: Monster appears with animation

## CodeMirror Extensions

### Cursed Line Decoration
```javascript
const cursedLineExtension = () => {
  return StateField.define({
    update(decorations, tr) {
      // Mark cursed lines (3, 7, 12)
      // Mark exorcised lines (green)
      return Decoration.set(builder)
    }
  })
}
```

### Click Handler
```javascript
const clickExtension = EditorView.domEventHandlers({
  click: (event, view) => {
    const pos = view.posAtCoords({ x, y })
    handleLineClick(view, pos)
  }
})
```

## Performance Optimizations

1. **CSS Animations**: Hardware-accelerated with `will-change`
2. **React**: `AnimatePresence` for smooth mount/unmount
3. **Debouncing**: Error detection on code change
4. **Lazy Loading**: Audio context created on first use
5. **Memoization**: Ghost hooks use `useCallback` and `useEffect`

## Usage Example

```javascript
// In your app
import App from './App'

// App.jsx already includes everything:
// - Router with all routes
// - Layout with global effects
// - Editor page with HauntedEditor
// - All components properly integrated

// Just run the app:
npm run dev

// Navigate to /editor to see all features
```

## Testing the Integration

1. **Navigate to Editor** (`/editor`)
2. **Type code** - Watch ghosts react
3. **Create syntax error** - Monster spawns
4. **Fix error** - Monster despawns
5. **Click line 3, 7, or 12** - Riddle appears, whisper plays
6. **Answer riddle** - Line exorcised or flicker on wrong answer
7. **Click "Resurrect Code"** - Modal opens
8. **Paste old code** - Watch 3-second ritual
9. **Wait 15-25 seconds** - Random glitch occurs

## State Flow Diagram

```
User Action
    ↓
HauntedEditor (state update)
    ↓
├─→ Ghost components (receive editorState)
│   └─→ ghostHooks (compute behavior)
│       └─→ Callbacks (onScare, onCheer)
│           └─→ HauntedEditor (update counts)
│
├─→ Monster components (receive errors)
│   └─→ errorDetection (compute errors)
│       └─→ Dynamic spawn/despawn
│
├─→ RiddleDialog (receive riddle)
│   └─→ cursedLines (check answer)
│       └─→ Callback (onAnswer)
│           └─→ HauntedEditor (update exorcised)
│
└─→ ResurrectionModal (receive code)
    └─→ codeResurrection (transform)
        └─→ Callback (onResurrect)
            └─→ HauntedEditor (update code)
```

## Summary

Everything is already integrated and working! The architecture follows React best practices:

- **Single source of truth**: HauntedEditor manages all state
- **Unidirectional data flow**: Props down, callbacks up
- **Component composition**: Small, focused components
- **Separation of concerns**: Logic in separate files
- **Performance**: Optimized animations and effects

Just navigate to `/editor` in the app to experience all features!
