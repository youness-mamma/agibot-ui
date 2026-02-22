"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Book a Demo", href: "#book-demo" },
  { label: "Partners", href: "#partners" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-border/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F9F6F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 20h10" />
              <path d="M10 20c5.5-2.5.8-6.4 3-10" />
              <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
              <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-forest">AgriBot</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-forest"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#early-access"
            className="rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-forest-dark"
          >
            Request Early Access
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/50 bg-cream px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-forest"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#early-access"
              onClick={() => setMobileOpen(false)}
              className="rounded-full bg-forest px-5 py-2.5 text-center text-sm font-semibold text-cream transition-colors hover:bg-forest-dark"
            >
              Request Early Access
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
