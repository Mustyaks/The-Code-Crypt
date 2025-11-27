import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

function ResponsiveDemo() {
  return (
    <Card className="border-blood/50 bg-ghost/50 backdrop-blur mt-8">
      <CardHeader>
        <CardTitle className="text-blood">📱 Responsive Layout</CardTitle>
        <CardDescription>Adapts to all screen sizes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm text-gray-300">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📱</span>
            <div>
              <div className="font-semibold text-gray-200">Mobile (&lt; 1024px)</div>
              <div className="text-gray-400">Sidebar hidden, toggle with menu button</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">💻</span>
            <div>
              <div className="font-semibold text-gray-200">Desktop (&ge; 1024px)</div>
              <div className="text-gray-400">Sidebar always visible, content shifts right</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎨</span>
            <div>
              <div className="font-semibold text-gray-200">Tailwind Breakpoints</div>
              <div className="text-gray-400">sm, md, lg, xl, 2xl responsive utilities</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ResponsiveDemo
