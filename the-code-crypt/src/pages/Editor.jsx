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
        <p className="text-blood text-sm mt-2">
          ⚠️ Beware: Lines 3, 7, and 12 are cursed! Click them to solve riddles and exorcise the curse.
        </p>
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
