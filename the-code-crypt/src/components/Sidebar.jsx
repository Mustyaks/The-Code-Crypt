import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

const menuItems = [
  { icon: '🏚️', label: 'Home', path: '/' },
  { icon: '👻', label: 'Editor', path: '/editor' },
  { icon: '📜', label: 'Scrolls', path: '/scrolls' },
  { icon: '🔮', label: 'Spells', path: '/spells' },
  { icon: '⚗️', label: 'Potions', path: '/potions' },
  { icon: '📚', label: 'Grimoire', path: '/grimoire' },
  { icon: '🕯️', label: 'Rituals', path: '/rituals' },
]

function Sidebar({ isOpen, onClose }) {
  const location = useLocation()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 bottom-0 w-64 bg-ghost/95 backdrop-blur-sm border-r border-blood/30 z-40 transition-transform duration-300",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-4">
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-blood/70 uppercase tracking-wider mb-2">
              Navigation
            </h2>
          </div>

          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                    "hover:bg-blood/10 hover:translate-x-1",
                    isActive
                      ? "bg-blood/20 text-blood border-l-4 border-blood"
                      : "text-gray-400 hover:text-gray-200"
                  )}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="pt-4 border-t border-blood/20">
            <div className="text-xs text-gray-500 text-center">
              <p>🕷️ Haunted since 2025</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
