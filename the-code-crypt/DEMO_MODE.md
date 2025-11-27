# 🎬 Demo Mode - Complete Guide

## Overview

Demo Mode is a 20-second scripted demonstration that automatically showcases all features of The Code Crypt. Perfect for judges, presentations, and quick feature tours!

## Quick Start

```bash
# Start the app
npm run dev

# Navigate to /editor
# Click "▶️ Demo Mode" button
# Watch the magic happen! ✨
```

## Timeline Breakdown

### Phase 1: Introduction (0-8s)
**Typing Animation**
```javascript
// Code appears character by character
// 👻 Welcome to The Code Crypt
// Where dead code comes back to life...

function summonSpirit() {
  const spirits = ['👻', '🦇', '🕷️', '⚰️'];
  return spirits[Math.floor(Math.random() * spirits.length)];
}
```

**What Happens:**
- Realistic typing speed (50ms per character)
- Random variations in speed
- Ghosts become active
- Helper ghost encourages
- Watcher ghost observes

### Phase 2: Cursed Line (8-8.5s)
**Line Highlighting**
```javascript
// This line is cursed... click it!
const hauntedVariable = "possessed";
```

**What Happens:**
- Line 7 highlighted
- Cursor moves to line
- Ghost whisper sound plays
- Visual activation effect
- Mischief ghost reacts

### Phase 3: Glitch Effect (10s)
**Screen Distortion**

**What Happens:**
- Full screen glitch
- Chromatic aberration
- Screen shake
- RGB separation
- Scanline sweep
- Glitch sound effect
- All ghosts react

### Phase 4: Error Creation (12s)
**Syntax Error Introduced**
```javascript
// Watch for syntax errors...
function brokenCode( {  // ← Missing closing parenthesis
  return "missing bracket";
}
```

**What Happens:**
- Bracket monster (🦑) spawns
- Appears next to line 12
- Wiggles menacingly
- Red pulsing glow
- Error tooltip shows
- Ghosts show concern

### Phase 5: Error Fix (15s)
**Problem Resolved**
```javascript
function brokenCode() {  // ← Fixed!
  return "missing bracket";
}
```

**What Happens:**
- Monster despawns
- Success chime plays
- Helper ghost cheers
- Green flash effect
- Celebration animation

### Phase 6: Finale (18-20s)
**Grand Finale**

**What Happens:**
- Final glitch effect
- All ghosts active
- Visual spectacle
- Demo complete message
- Auto-stop at 20s

## Technical Implementation

### DemoController Class

```javascript
class DemoController {
  constructor(editorRef, setCode, triggerGlitch)
  
  // Main methods
  start()           // Begin demo sequence
  stop()            // End demo and cleanup
  typeCode()        // Animate typing
  highlightLine()   // Show cursed line
  createError()     // Add syntax error
  fixError()        // Remove syntax error
  complete()        // Finish demo
}
```

### State Management

```javascript
// Demo state
const [isDemoRunning, setIsDemoRunning] = useState(false)
const demoControllerRef = useRef(null)

// Start demo
const startDemo = () => {
  demoControllerRef.current = new DemoController(...)
  demoControllerRef.current.start()
}

// Stop demo
const stopDemo = () => {
  demoControllerRef.current?.stop()
}
```

### Event Scheduling

```javascript
const steps = [
  { time: 0,     action: () => typeCode() },
  { time: 8000,  action: () => highlightLine(7) },
  { time: 8500,  action: () => playGhostWhisper() },
  { time: 10000, action: () => triggerGlitch() },
  { time: 12000, action: () => createError() },
  { time: 15000, action: () => fixError() },
  { time: 18000, action: () => triggerGlitch() },
  { time: 20000, action: () => complete() },
]
```

## Features Demonstrated

### ✅ Core Features
- [x] Code editor with syntax highlighting
- [x] Typing animation
- [x] Line highlighting
- [x] Error detection
- [x] Monster spawning/despawning

### ✅ Ghost AI System
- [x] 3 unique personalities
- [x] Real-time reactions
- [x] Activity detection
- [x] Mood changes
- [x] Message bubbles

### ✅ Visual Effects
- [x] Screen glitches
- [x] Chromatic aberration
- [x] Line highlighting
- [x] Fog animations
- [x] Glow effects

### ✅ Sound Effects
- [x] Ghost whispers
- [x] Glitch sounds
- [x] Success chimes
- [x] Ambient audio

### ✅ Interactive Elements
- [x] Cursed lines
- [x] Error monsters
- [x] Status bar updates
- [x] Real-time feedback

## UI Elements

### Demo Mode Button
```jsx
<Button
  variant={isDemoRunning ? "destructive" : "default"}
  onClick={isDemoRunning ? stopDemo : startDemo}
>
  {isDemoRunning ? '⏹️ Stop Demo' : '▶️ Demo Mode'}
</Button>
```

### Demo Indicator
```jsx
<motion.div className="demo-indicator">
  <motion.div animate={{ rotate: 360 }}>🎬</motion.div>
  <div>
    <div>Demo Mode Active</div>
    <div>Showcasing all features...</div>
  </div>
</motion.div>
```

## Customization

### Adjust Timing
```javascript
// In DemoController.js
const steps = [
  { time: 0, action: ... },     // Change timing
  { time: 5000, action: ... },  // Add new steps
  { time: 10000, action: ... }, // Remove steps
]
```

### Change Demo Code
```javascript
// In DemoController.js
const DEMO_CODE = `
// Your custom demo code here
function customDemo() {
  return "Modified demo!";
}
`
```

### Add New Actions
```javascript
// In DemoController.js
class DemoController {
  customAction() {
    // Your custom demo action
    playCustomSound()
    triggerCustomEffect()
  }
}
```

## Best Practices

### For Presentations
1. **Start with Demo Mode** - Immediate impact
2. **Let it run fully** - Shows all features
3. **Explain during demo** - Narrate what's happening
4. **Interact after** - Manual exploration

### For Judges
1. **Quick attention grab** - 20 seconds is perfect
2. **Shows technical skill** - Complex orchestration
3. **Demonstrates polish** - Smooth animations
4. **Proves functionality** - Everything works

### For Videos
1. **Record in 1080p** - Clear visuals
2. **Enable sound** - Audio effects matter
3. **Full screen editor** - Focus on features
4. **Add captions** - Explain features

## Troubleshooting

### Demo Won't Start
- Check console for errors
- Verify editorRef is set
- Ensure no other demo running

### Demo Stops Early
- Check for JavaScript errors
- Verify all timeouts clear
- Check component unmounting

### Animations Lag
- Close other browser tabs
- Disable browser extensions
- Check system resources

### Sounds Don't Play
- Check browser audio permissions
- Verify Web Audio API support
- Check volume settings

## Performance

### Optimizations
- Uses `requestAnimationFrame` for smooth typing
- Cleans up timeouts on stop
- Minimal re-renders
- Efficient state updates

### Resource Usage
- CPU: Low (mostly CSS animations)
- Memory: ~50MB during demo
- Network: None (all local)
- Audio: Web Audio API (efficient)

## Analytics

### Track Demo Usage
```javascript
// In DemoController.js
trackDemoEvent('demo_started', { timestamp: Date.now() })
trackDemoEvent('demo_completed', { duration: 20000 })
```

### Metrics to Track
- Demo start count
- Demo completion rate
- Average watch time
- Stop button usage
- Feature engagement

## Future Enhancements

### Potential Additions
- [ ] Multiple demo scenarios
- [ ] Adjustable speed
- [ ] Pause/resume functionality
- [ ] Step-by-step mode
- [ ] Narration audio
- [ ] Subtitles/captions
- [ ] Export demo as video
- [ ] Custom demo builder

## Conclusion

Demo Mode is the perfect way to showcase The Code Crypt's features in a concise, engaging format. It demonstrates:

- **Technical Complexity** - Orchestrated timing
- **Polish** - Smooth animations
- **Functionality** - All features work
- **Creativity** - Unique presentation
- **User Experience** - Easy to understand

Perfect for competitions, presentations, and quick demos! 🎬✨

---

**Pro Tip:** Run Demo Mode at the start of your presentation to immediately capture attention, then dive into manual exploration to show interactivity!
