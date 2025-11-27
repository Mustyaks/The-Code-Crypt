import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

function Scrolls() {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold blood-accent mb-4">
          📜 Ancient Scrolls
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Dusty manuscripts from the depths of the crypt
        </p>

        <Card className="border-blood/50 bg-ghost/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-blood">Coming Soon...</CardTitle>
            <CardDescription>This chamber is still under construction</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              The ancient scrolls are being transcribed by ghostly scribes. Check back soon! 👻
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Scrolls
