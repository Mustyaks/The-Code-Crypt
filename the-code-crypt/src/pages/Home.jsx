import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ResponsiveDemo from '@/components/ResponsiveDemo'

function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold blood-accent mb-4">
          Welcome to the Crypt
        </h1>
        <p className="text-gray-400 text-lg md:text-xl">
          Where code comes to rest... or does it? 👻
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-blood/50 bg-ghost/50 backdrop-blur h-full">
            <CardHeader>
              <CardTitle className="text-blood flex items-center gap-2">
                <span>🏚️</span> Home
              </CardTitle>
              <CardDescription>Your haunted sanctuary</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">
                Welcome to your dark coding haven. Navigate through the crypt using the sidebar.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-blood/50 bg-ghost/50 backdrop-blur h-full">
            <CardHeader>
              <CardTitle className="text-blood flex items-center gap-2">
                <span>⚡</span> Features
              </CardTitle>
              <CardDescription>Dark magic included</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>✓ Responsive layout</li>
                <li>✓ Collapsible sidebar</li>
                <li>✓ Spooky animations</li>
                <li>✓ shadcn/ui components</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-blood/50 bg-ghost/50 backdrop-blur h-full">
            <CardHeader>
              <CardTitle className="text-blood flex items-center gap-2">
                <span>🔮</span> Get Started
              </CardTitle>
              <CardDescription>Begin your journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-300 text-sm">
                Try the haunted code editor with floating ghosts!
              </p>
              <Link to="/editor">
                <Button variant="spooky" size="sm" className="w-full">
                  Open Editor 👻
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-8"
      >
        <Card className="border-blood/50 bg-ghost/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-blood">Tech Stack</CardTitle>
            <CardDescription>Powered by modern tools and dark magic</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
              <div className="p-3 rounded-lg bg-crypt/50">
                <div className="text-2xl mb-1">⚛️</div>
                <div className="text-xs text-gray-400">React 19</div>
              </div>
              <div className="p-3 rounded-lg bg-crypt/50">
                <div className="text-2xl mb-1">⚡</div>
                <div className="text-xs text-gray-400">Vite</div>
              </div>
              <div className="p-3 rounded-lg bg-crypt/50">
                <div className="text-2xl mb-1">🎨</div>
                <div className="text-xs text-gray-400">Tailwind</div>
              </div>
              <div className="p-3 rounded-lg bg-crypt/50">
                <div className="text-2xl mb-1">🎭</div>
                <div className="text-xs text-gray-400">Framer</div>
              </div>
              <div className="p-3 rounded-lg bg-crypt/50">
                <div className="text-2xl mb-1">🧩</div>
                <div className="text-xs text-gray-400">shadcn/ui</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <ResponsiveDemo />
      </motion.div>
    </div>
  )
}

export default Home
