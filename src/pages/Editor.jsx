import { motion } from 'framer-motion'
import HauntedEditor from '@/components/HauntedEditor'
import GhostDemo from '@/components/GhostDemo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

function Editor() {
  const handleCodeChange = (value) => {
    // Handle code changes if needed
    console.log('Code updated:', value.length, 'characters')
  }

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold blood-accent mb-4">
          👻 Haunted Code Editor
        </h1>
        <p className="text-gray-400 text-lg">
          Write code in the presence of spirits... if you dare
        </p>
        <div className="mt-3 space-y-1">
          <p className="text-purple-400 text-sm font-semibold">
            🎬 Click "Demo Mode" for a 20-second showcase of all features!
          </p>
          <p className="text-blood text-sm">
            ⚠️ Beware: Lines 3, 7, and 12 are cursed! Click them to solve riddles.
          </p>
          <p className="text-red-400 text-sm">
            👾 Syntax errors spawn monsters! Fix your code to make them disappear.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <HauntedEditor onChange={handleCodeChange} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-8"
      >
        <Card className="border-purple-500/50 bg-purple-900/20 backdrop-blur mb-6">
          <CardHeader>
            <CardTitle className="text-purple-400">🎬 Demo Mode</CardTitle>
            <CardDescription>20-second scripted showcase for judges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                Click the "Demo Mode" button to watch an automated demonstration of all features!
              </p>
              <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4">
                <div className="font-semibold text-purple-300 text-sm mb-3">Demo Timeline (20 seconds):</div>
                <div className="space-y-2 text-xs text-gray-400">
                  <div className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono">0-8s:</span>
                    <span>Automatically types spooky sample code with animation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono">8s:</span>
                    <span>Highlights cursed line 7, plays ghost whisper</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono">10s:</span>
                    <span>Triggers screen glitch effect with sound</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono">12s:</span>
                    <span>Creates syntax error → Monster spawns</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono">15s:</span>
                    <span>Fixes error → Monster despawns, success chime</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono">18s:</span>
                    <span>Final glitch effect</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono">20s:</span>
                    <span>Demo complete! ✨</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                <span className="text-2xl">👻</span>
                <p className="text-xs text-green-300">
                  <strong>Bonus:</strong> Ghosts react in real-time to all actions during the demo!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blood/50 bg-ghost/50 backdrop-blur mb-6">
          <CardHeader>
            <CardTitle className="text-blood">⚰️ Resurrection Mode</CardTitle>
            <CardDescription>Bring old code back from the dead</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                Click the "Resurrect Code" button to modernize legacy JavaScript. The Ghost AI will transform your old code with modern patterns!
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="p-3 rounded-lg bg-purple-900/20 border border-purple-500/30">
                  <div className="font-semibold text-purple-400 text-sm mb-2">Transformations</div>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• <code className="text-purple-300">var</code> → <code className="text-purple-300">const/let</code></li>
                    <li>• Functions → Arrow functions</li>
                    <li>• String concat → Template literals</li>
                    <li>• Adds JSDoc comments</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-purple-900/20 border border-purple-500/30">
                  <div className="font-semibold text-purple-400 text-sm mb-2">Spooky Animation</div>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• 👻 Ghosts circle the editor</li>
                    <li>• ⚡ White flash effect</li>
                    <li>• 🎵 Success chime sound</li>
                    <li>• ✨ 3-second ritual</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blood/50 bg-ghost/50 backdrop-blur mb-6">
          <CardHeader>
            <CardTitle className="text-blood">👾 Error Monster System</CardTitle>
            <CardDescription>Monsters spawn when syntax errors are detected</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                When you make a syntax error, a monster spawns next to the problematic line. 
                Fix the error to make the monster disappear!
              </p>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="p-3 rounded-lg bg-red-900/20 border border-red-500/30 text-center">
                  <div className="text-3xl mb-2">🦑</div>
                  <div className="font-semibold text-red-400 text-sm mb-1">Bracket Monster</div>
                  <p className="text-xs text-gray-400">Unmatched (), {}, []</p>
                </div>
                <div className="p-3 rounded-lg bg-red-900/20 border border-red-500/30 text-center">
                  <div className="text-3xl mb-2">🐙</div>
                  <div className="font-semibold text-red-400 text-sm mb-1">Quote Monster</div>
                  <p className="text-xs text-gray-400">Unmatched ', ", `</p>
                </div>
                <div className="p-3 rounded-lg bg-red-900/20 border border-red-500/30 text-center">
                  <div className="text-3xl mb-2">👹</div>
                  <div className="font-semibold text-red-400 text-sm mb-1">Semicolon Monster</div>
                  <p className="text-xs text-gray-400">Missing semicolons</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                <span className="text-2xl">✨</span>
                <div>
                  <p className="text-sm text-purple-300 font-semibold mb-1">Monster Behavior</p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Wiggles and pulses with red glow</li>
                    <li>• Shows error message in tooltip</li>
                    <li>• Automatically despawns when error is fixed</li>
                    <li>• Multiple monsters can spawn for multiple errors</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blood/50 bg-ghost/50 backdrop-blur mb-6">
          <CardHeader>
            <CardTitle className="text-blood">⚰️ Cursed Lines Challenge</CardTitle>
            <CardDescription>Solve riddles to exorcise cursed code</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                Three lines in the editor are cursed (lines 3, 7, and 12). Click on a cursed line to reveal a riddle. 
                Answer correctly to exorcise it, or face the wrath of the ghosts!
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="p-3 rounded-lg bg-red-900/20 border border-red-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">⚰️</span>
                    <span className="font-semibold text-red-400">Cursed Line</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Red pulsing background. Click to reveal riddle. Solve it to exorcise!
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-green-900/20 border border-green-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">✨</span>
                    <span className="font-semibold text-green-400">Exorcised Line</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Green glowing background. The curse has been lifted!
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                <span className="text-xl">💀</span>
                <p className="text-xs text-yellow-400">
                  <strong>Warning:</strong> Wrong answers trigger ghost screams and editor flickers!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blood/50 bg-ghost/50 backdrop-blur mb-6">
          <CardHeader>
            <CardTitle className="text-blood">👻 Meet Your Ghost Companions</CardTitle>
            <CardDescription>Three AI ghosts with unique personalities watch over your code</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 rounded-lg bg-crypt/50 border border-green-500/30">
                <div className="text-3xl mb-2">👻</div>
                <h3 className="font-semibold text-green-400 mb-2">Casper (Helper)</h3>
                <p className="text-gray-300 text-sm mb-2">
                  A friendly ghost who encourages you and celebrates your progress.
                </p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Reacts positively to typing</li>
                  <li>• Concerned when errors occur</li>
                  <li>• Sends cheers randomly</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-crypt/50 border border-red-500/30">
                <div className="text-3xl mb-2">😈</div>
                <h3 className="font-semibold text-red-400 mb-2">Loki (Mischief)</h3>
                <p className="text-gray-300 text-sm mb-2">
                  A playful trickster who finds your mistakes amusing.
                </p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Laughs at errors</li>
                  <li>• Fast, erratic movements</li>
                  <li>• Occasionally tries to scare you</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-crypt/50 border border-blue-500/30">
                <div className="text-3xl mb-2">👁️</div>
                <h3 className="font-semibold text-blue-400 mb-2">Oracle (Watcher)</h3>
                <p className="text-gray-300 text-sm mb-2">
                  A mysterious observer who silently watches your every move.
                </p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Mostly silent and observant</li>
                  <li>• Slow, deliberate movements</li>
                  <li>• Notes interesting mistakes</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-blood/50 bg-ghost/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-blood text-lg flex items-center gap-2">
                <span>🧠</span> AI Behavior
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">
                Ghosts react to your typing, detect errors, and have unique personalities with custom animations.
              </p>
            </CardContent>
          </Card>

          <Card className="border-blood/50 bg-ghost/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-blood text-lg flex items-center gap-2">
                <span>🌫️</span> Fog Effects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">
                Multiple fog layers drift across the editor creating an eerie atmosphere.
              </p>
            </CardContent>
          </Card>

          <Card className="border-blood/50 bg-ghost/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-blood text-lg flex items-center gap-2">
                <span>⚡</span> Flickering Cursor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">
                The cursor flickers like a dying candle, adding to the haunted experience.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-6"
      >
        <Card className="border-blood/50 bg-ghost/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-blood">Features</CardTitle>
            <CardDescription>What makes this editor haunted?</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blood">⚰️</span>
                <span><strong>CodeMirror Integration:</strong> Full-featured code editor with syntax highlighting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blood">👻</span>
                <span><strong>AI Ghost System:</strong> Three intelligent ghosts with unique personalities that react to your code</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blood">👾</span>
                <span><strong>Error Monsters:</strong> Syntax errors spawn monsters that wiggle and glow red until fixed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blood">⚰️</span>
                <span><strong>Cursed Lines:</strong> Lines 3, 7, and 12 are cursed - click to solve riddles and exorcise them</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blood">🌫️</span>
                <span><strong>Fog Layers:</strong> Multiple animated fog effects for atmosphere</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blood">⚡</span>
                <span><strong>Flickering Effects:</strong> Border and cursor animations for spooky vibes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blood">🎨</span>
                <span><strong>Custom Styling:</strong> Blood-red theme with dark backgrounds</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blood">⚡</span>
                <span><strong>Screen Glitches:</strong> Random glitch effects every 15-25 seconds</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blood">🔊</span>
                <span><strong>Ghost Whispers:</strong> Eerie sound effects when clicking cursed lines</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blood">⚰️</span>
                <span><strong>Resurrection Mode:</strong> Modernize old code with Ghost AI transformation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blood">📱</span>
                <span><strong>Responsive Design:</strong> Works on all screen sizes</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <GhostDemo />
      </motion.div>
    </div>
  )
}

export default Editor
