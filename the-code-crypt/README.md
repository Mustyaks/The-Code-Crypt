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
