import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

function Navbar({ onMenuClick }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-crypt/95 backdrop-blur-sm border-b border-blood/30">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden text-blood hover:text-blood/80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </Button>
          
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🦇</span>
            <span className="text-xl font-bold blood-accent">The Code Crypt</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden md:inline-flex">
            👻 Docs
          </Button>
          <Button variant="spooky" size="sm">
            ⚰️ Enter
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
