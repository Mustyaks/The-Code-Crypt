import { useState } from 'react'
import Ghost from './Ghost'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

function GhostDemo() {
  const [demoCode, setDemoCode] = useState('const hello = "world"')
  const [hasError, setHasError] = useState(false)
  const [scares, setScares] = useState(0)
  const [cheers, setCheers] = useState(0)

  const editorState = {
    code: demoCode,
    hasError,
  }

  const simulateTyping = () => {
    setDemoCode((prev) => prev + '\n// New line added!')
  }

  const simulateError = () => {
    setHasError(true)
    setTimeout(() => setHasError(false), 3000)
  }

  return (
    <Card className="border-blood/50 bg-ghost/50 backdrop-blur mt-8">
      <CardHeader>
        <CardTitle className="text-blood">🎮 Ghost Behavior Demo</CardTitle>
        <CardDescription>Interact with the ghosts and see how they react</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative min-h-[300px] bg-crypt/50 rounded-lg p-4 mb-4">
          <Ghost
            personality="Helper"
            editorState={editorState}
            onCheer={() => setCheers((prev) => prev + 1)}
            position={{ top: '20%', right: '10%' }}
          />
          <Ghost
            personality="Mischief"
            editorState={editorState}
            onScare={() => setScares((prev) => prev + 1)}
            position={{ top: '20%', left: '10%' }}
          />
          <Ghost
            personality="Watcher"
            editorState={editorState}
            position={{ bottom: '20%', right: '50%' }}
          />

          <div className="text-center pt-16">
            <p className="text-gray-400 mb-4">
              Watch the ghosts react to your actions!
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button variant="outline" size="sm" onClick={simulateTyping}>
                Simulate Typing
              </Button>
              <Button variant="destructive" size="sm" onClick={simulateError}>
                Trigger Error
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div className="p-3 bg-crypt/50 rounded">
            <div className="text-2xl mb-1">📝</div>
            <div className="text-gray-400">Code Length</div>
            <div className="text-blood font-semibold">{demoCode.length}</div>
          </div>
          <div className="p-3 bg-crypt/50 rounded">
            <div className="text-2xl mb-1">😈</div>
            <div className="text-gray-400">Scares</div>
            <div className="text-blood font-semibold">{scares}</div>
          </div>
          <div className="p-3 bg-crypt/50 rounded">
            <div className="text-2xl mb-1">🎉</div>
            <div className="text-gray-400">Cheers</div>
            <div className="text-blood font-semibold">{cheers}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default GhostDemo
