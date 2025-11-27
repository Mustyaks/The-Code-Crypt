# 🦇 The Code Crypt

A haunted, dark-themed React application with spooky animations and ghostly effects.

## 🎃 Features

- **Dark, Spooky Theme**: Flickering backgrounds, ghostly fog overlays, and blood-red accents
- **Smooth Animations**: Powered by Framer Motion
- **Code Editor Ready**: Includes CodeMirror for syntax highlighting
- **TailwindCSS**: Utility-first styling with custom haunted theme
- **shadcn/ui Components**: Pre-built, customizable UI components
- **React Router**: Client-side routing for multi-page navigation
- **TailwindCSS Plugins**: Forms, typography, and animate plugins included

## 🕷️ Tech Stack

- React 19
- Vite (Rolldown)
- React Router DOM
- Framer Motion
- CodeMirror + @uiw/react-codemirror
- shadcn/ui components
- TailwindCSS (with @tailwindcss/forms, @tailwindcss/typography, tailwindcss-animate)
- JavaScript (no TypeScript)

## 📁 Project Structure

```
src/
├── components/
│   └── ui/         # shadcn/ui components
│       ├── button.jsx
│       └── card.jsx
├── hooks/          # Custom React hooks
├── lib/
│   └── utils.js    # Utility functions (cn helper)
├── pages/          # Route pages
│   └── Home.jsx
├── styles/
│   └── global.css  # Haunted theme + Tailwind
├── assets/         # Images, fonts, etc.
├── App.jsx         # Router setup
└── main.jsx        # Entry point
```

## 🚀 Getting Started

```bash
# Install dependencies (already done)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Theme Colors

- **Crypt Black**: `#0a0a0a` - Main background
- **Ghost Gray**: `#1a1a1a` - Secondary background
- **Blood Red**: `#8B0000` - Accent color

## 👻 Custom Animations

- `flicker` - Flickering text effect
- `float` - Floating ghost effect
- `backgroundFlicker` - Subtle background animation
- `fogDrift` - Drifting fog overlay

Enjoy your haunted coding experience! 🧛‍♂️


## 🧛 shadcn/ui Setup

The project is configured with shadcn/ui. To add more components:

```bash
npx shadcn@latest add [component-name]
```

Example components available:
- `npx shadcn@latest add dialog`
- `npx shadcn@latest add input`
- `npx shadcn@latest add select`
- `npx shadcn@latest add toast`

All components will be added to `src/components/ui/` and automatically configured with the haunted theme.

## 🛣️ Routing

React Router DOM is configured in `App.jsx`. Add new routes:

```jsx
<Route path="/your-path" element={<YourComponent />} />
```

Create new pages in `src/pages/` directory.


## 👻 Ghost AI Behavior System

The Haunted Editor features an intelligent ghost AI system with three unique personalities:

### Ghost Personalities

**Casper (Helper) 👻**
- Friendly and encouraging
- Reacts positively when you type
- Shows concern when errors are detected
- Randomly sends cheers to motivate you
- Green color scheme

**Loki (Mischief) 😈**
- Playful and mischievous
- Laughs at your mistakes
- Fast, erratic movements
- Occasionally tries to scare you
- Red color scheme

**Oracle (Watcher) 👁️**
- Silent and mysterious
- Observes your coding quietly
- Slow, deliberate movements
- Notes interesting mistakes
- Blue color scheme

### Ghost Behaviors

Ghosts react to:
- **Typing Activity**: Ghosts become more active when you type
- **Syntax Errors**: Each personality reacts differently to errors
- **Code Length**: Ghosts respond to code complexity
- **Random Events**: Occasional spontaneous interactions

### Custom Hooks

The system uses custom React hooks for ghost behavior:

- `useGhostBehavior()` - Manages mood and reactions
- `useGhostAnimation()` - Controls movement patterns
- `useGhostAppearance()` - Handles color and opacity
- `useGhostInteraction()` - Triggers scare/cheer events

### Integration

```jsx
import Ghost from '@/components/Ghost'

<Ghost
  personality="Helper"
  editorState={{ code, hasError }}
  onScare={() => console.log('Scared!')}
  onCheer={() => console.log('Cheered!')}
  position={{ top: '10%', right: '5%' }}
/>
```


## ⚰️ Cursed Lines System

The editor features an interactive cursed line system where certain lines are "haunted" and require solving riddles to exorcise them.

### How It Works

**Cursed Lines**: Lines 3, 7, and 12 are cursed by default
- Displayed with a red pulsing background
- Click on a cursed line to trigger a riddle dialog
- Each line has a unique riddle with varying difficulty

**Riddle Dialog**:
- Presents a riddle related to the cursed line
- Includes a hint system (click to reveal)
- Difficulty levels: Easy, Medium, Hard

**Outcomes**:
- ✅ **Correct Answer**: Line becomes exorcised (green glow), ghosts cheer
- ❌ **Wrong Answer**: Ghost screams, editor flickers, scare count increases

**Visual States**:
- **Cursed**: Red pulsing background with left border
- **Exorcised**: Green glowing background with sparkle effect (✨)

### Implementation

```javascript
// Check if a line is cursed
import { isCursedLine, getRiddle, checkAnswer } from '@/lib/cursedLines'

// Detect line clicks
const handleLineClick = (view, pos) => {
  const line = view.state.doc.lineAt(pos)
  if (isCursedLine(line.number)) {
    // Show riddle dialog
  }
}
```

### Adding New Cursed Lines

Edit `src/lib/cursedLines.js`:

```javascript
export const CURSED_LINES = {
  3: {
    riddle: "Your riddle here",
    answer: "correct answer",
    hint: "Helpful hint",
    difficulty: "easy" // or "medium", "hard"
  },
  // Add more lines...
}
```


## 👾 Error Monster System

Monsters spawn when syntax errors are detected in your code, providing visual feedback for debugging.

### Monster Types

**🦑 Bracket Monster**
- Spawns when parentheses (), braces {}, or brackets [] are unmatched
- Wiggles angrily until brackets are balanced

**🐙 Quote Monster**
- Appears when quotes are unmatched (', ", `)
- Pulses with red glow until quotes are closed

**👹 Semicolon Monster**
- Spawns when semicolons are missing
- Disappears when semicolon is added

**👾 Generic Monster**
- Fallback for other syntax errors

### Monster Behavior

- **Spawn Animation**: Rotates in with spring physics
- **Wiggle Animation**: Continuous rotation and scale effects
- **Pulsing Glow**: Red radial gradient that pulses
- **Error Tooltip**: Shows line number and error message
- **Angry Eyes**: Blink and glare at you
- **Particle Effects**: Red particles float upward
- **Auto-Despawn**: Disappears when error is fixed

### Error Detection

The system uses regex-based detection for:
- Bracket matching: `()`, `{}`, `[]`
- Quote matching: `'`, `"`, `` ` ``
- Missing semicolons (heuristic-based)
- Overall code balance

### Implementation

```javascript
import { detectErrors } from '@/lib/errorDetection'

// Detect errors in code
const errors = detectErrors(code)
// Returns: [{ line, type, message }]

// Spawn monsters for each error
errors.map(error => (
  <Monster
    lineNumber={error.line}
    errorType={error.type}
    message={error.message}
  />
))
```

### Try It Out

1. Open the Haunted Editor
2. Create a syntax error (e.g., remove a closing bracket)
3. Watch a monster spawn next to the error line
4. Fix the error to make the monster disappear


## 🎭 Global UI Effects

The application features immersive atmospheric effects throughout:

### Background Effects

**Subtle Red Pulses**
- Random red flickers in the background
- Creates an ominous atmosphere
- Combines with base background flicker

**Moving Fog Layers**
- Three independent fog layers
- Slow, continuous movement
- Opacity pulsing for depth
- Enhanced drift animations

**Screen Vignette**
- Dark edges that breathe
- Focuses attention on content
- Subtle pulsing effect

**Noise Overlay**
- Subtle film grain effect
- Adds texture to the interface
- Constant flickering

### Editor-Specific Effects

**Random Screen Glitches**
- Occurs every 15-25 seconds
- Chromatic aberration
- Screen shake and skew
- RGB color separation
- Scanline effect
- Accompanied by glitch sound

**Cursed Line Activation**
- Ghost whisper sound effect (low volume)
- Visual ghost emoji appears
- Line highlights with red glow
- Triggered when clicking cursed lines

**Wrong Answer Effects**
- Editor flickers violently
- Screen glitch triggered
- Ghost scream reaction
- Multiple visual distortions

### Sound Effects

All sounds are generated using Web Audio API:

**Ghost Whisper** 🔊
- Layered sine wave oscillators
- Frequency sweep from 200Hz to 100Hz
- Low volume (0.1) for ambiance
- Plays on cursed line click

**Screen Glitch** ⚡
- White noise burst
- Very short duration (100ms)
- Low volume (0.05)
- Plays during glitch effects

**Monster Growl** 👾
- Deep sawtooth wave
- Frequency sweep 80Hz to 40Hz
- Plays when monsters spawn

**Success Chime** ✨
- Ascending notes (C5, E5, G5)
- Plays when line is exorcised
- Pleasant reward sound

### Performance

All effects are optimized with:
- CSS `will-change` properties
- Hardware acceleration
- Efficient animations
- Minimal JavaScript overhead


## ⚰️ Resurrection Mode

Bring old, legacy JavaScript code back from the dead with modern transformations!

### How It Works

1. Click the "Resurrect Code" button in the editor header
2. Paste your old/legacy JavaScript code
3. Watch the 3-second resurrection ritual
4. Receive modernized code with Ghost AI transformations

### Transformations Applied

**Variable Declarations**
- `var` → `const` or `let`
- Automatically chooses appropriate declaration

**Function Syntax**
- `function name() {}` → `const name = () => {}`
- Anonymous functions → Arrow functions
- Callback functions → Arrow functions

**String Handling**
- String concatenation → Template literals
- `'Hello ' + name + '!'` → `` `Hello ${name}!` ``

**Code Quality**
- Adds `'use strict'` mode
- Inserts JSDoc comments
- Adds helpful modernization tips
- Includes resurrection header comment

### Spooky Animation

During the resurrection ritual:
- **3 Ghost Spirits** circle the editor
- **White Flash** effect at peak moment
- **Success Chime** sound on completion
- **Progress Bar** shows ritual progress
- **Status Messages** narrate the process

### Example

**Before (Old Code):**
```javascript
var greeting = 'Hello';
function sayHello(name) {
  return greeting + ' ' + name;
}
```

**After (Resurrected):**
```javascript
// 👻 Code resurrected and modernized by Ghost AI
// Original code brought back from the crypt!

'use strict';

/**
 * Resurrected function - modernized by ghost AI
 */
const sayHello = (name) => {
  return `${greeting} ${name}`;
}
```

### Validation

- Minimum 10 characters required
- Maximum 10,000 characters allowed
- Empty code rejected with spooky message

### UI Features

- Modal with rotating coffin icon
- Flickering candles decoration
- Pentagram background (subtle)
- Ambient red glow pulsing
- Resurrection progress indicator
- Error messages for invalid input


## 🎬 Demo Mode

A 20-second scripted demonstration showcasing all features - perfect for judges and presentations!

### How to Use

1. Navigate to the Editor page (`/editor`)
2. Click the **"▶️ Demo Mode"** button in the editor header
3. Watch the automated demonstration
4. Click **"⏹️ Stop Demo"** to end early (or wait 20 seconds)

### Demo Timeline

**0-8 seconds: Typing Animation**
- Automatically types spooky sample code
- Character-by-character animation (50ms per char)
- Random typing speed variations
- Ghosts react to typing activity

**8 seconds: Cursed Line Activation**
- Highlights line 7 (cursed line)
- Scrolls to the line
- Adds activation animation

**8.5 seconds: Ghost Whisper**
- Plays eerie whisper sound effect
- Low volume ambient sound
- Layered oscillator frequencies

**10 seconds: Screen Glitch**
- Triggers full screen glitch effect
- Chromatic aberration
- Screen shake and skew
- Glitch sound effect

**12 seconds: Error Creation**
- Introduces syntax error (missing bracket)
- Monster spawns automatically
- Error tooltip appears
- Ghosts react to error

**15 seconds: Error Fix**
- Automatically fixes the syntax error
- Monster despawns with animation
- Success chime plays
- Ghosts cheer

**18 seconds: Final Glitch**
- One more glitch effect
- Visual spectacle

**20 seconds: Demo Complete**
- Demo automatically stops
- Editor remains in final state
- All features demonstrated

### Features Showcased

✅ **Typing Animation** - Realistic code entry
✅ **Ghost AI** - Real-time reactions
✅ **Cursed Lines** - Line highlighting
✅ **Sound Effects** - Whispers, glitches, chimes
✅ **Screen Glitches** - Visual effects
✅ **Error Monsters** - Spawn and despawn
✅ **Visual Feedback** - All animations
✅ **Interactive Elements** - Full system demo

### Technical Details

**DemoController.js**
- Class-based controller
- Async/await for timing
- Timeout management
- Clean cleanup on stop
- Event scheduling system

**Integration**
- Refs to CodeMirror editor
- State management via callbacks
- Sound effect triggers
- Visual effect coordination

**Code Sample**
```javascript
// Demo code includes:
- Function declarations
- Cursed line (line 7)
- Syntax error (line 12)
- Console logs
- Comments
```

### Demo Variations

The controller supports multiple demo types:
- **Full Demo** (20s) - All features
- **Quick Demo** (10s) - Essential features
- **Minimal Demo** (5s) - Basic showcase

### Stop Demo

- Click "Stop Demo" button
- Clears all timeouts
- Stops typing animation
- Resets demo state
- Editor remains editable

### Perfect For

- 🎯 Judge presentations
- 📊 Feature demonstrations
- 🎓 Tutorials and onboarding
- 🎥 Video recordings
- 📱 Social media clips
- 🏆 Competition showcases

### Demo Indicator

While demo is running:
- Purple banner at top
- "Demo Mode Active" message
- Rotating film icon 🎬
- Cannot start resurrection mode
- Can stop at any time

### Auto-Stop

Demo automatically stops after 20 seconds, ensuring:
- Consistent timing
- No infinite loops
- Clean state management
- Resource cleanup
