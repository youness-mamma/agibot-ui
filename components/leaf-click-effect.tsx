"use client"

import { useEffect, useCallback, useRef } from "react"

interface Leaf {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  drift: number
  duration: number
  delay: number
  variant: number
}

export function LeafClickEffect() {
  const containerRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef(0)
  const leavesRef = useRef<Leaf[]>([])
  const frameRef = useRef<number | null>(null)

  const spawnLeaves = useCallback((e: MouseEvent) => {
    const count = 3 + Math.floor(Math.random() * 3) // 3-5 leaves
    const newLeaves: Leaf[] = []

    for (let i = 0; i < count; i++) {
      counterRef.current++
      newLeaves.push({
        id: counterRef.current,
        x: e.clientX + (Math.random() - 0.5) * 40,
        y: e.clientY - 10,
        size: 12 + Math.random() * 14,
        rotation: Math.random() * 360,
        drift: (Math.random() - 0.5) * 120,
        duration: 1200 + Math.random() * 800,
        delay: i * 60,
        variant: Math.floor(Math.random() * 3),
      })
    }

    leavesRef.current = [...leavesRef.current, ...newLeaves]
    renderLeaves()

    // Clean up leaves after they've fallen
    const maxDuration = Math.max(...newLeaves.map(l => l.duration + l.delay))
    setTimeout(() => {
      const ids = new Set(newLeaves.map(l => l.id))
      leavesRef.current = leavesRef.current.filter(l => !ids.has(l.id))
      renderLeaves()
    }, maxDuration + 100)
  }, [])

  const renderLeaves = useCallback(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    // Remove old leaves that are no longer in state
    const activeIds = new Set(leavesRef.current.map(l => l.id))
    Array.from(container.children).forEach(child => {
      const id = Number(child.getAttribute('data-leaf-id'))
      if (!activeIds.has(id)) {
        child.remove()
      }
    })

    // Add new leaves
    leavesRef.current.forEach(leaf => {
      if (container.querySelector(`[data-leaf-id="${leaf.id}"]`)) return

      const el = document.createElement('div')
      el.setAttribute('data-leaf-id', String(leaf.id))
      el.style.cssText = `
        position: fixed;
        left: ${leaf.x}px;
        top: ${leaf.y}px;
        width: ${leaf.size}px;
        height: ${leaf.size}px;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        animation: leafClickFall ${leaf.duration}ms ease-in ${leaf.delay}ms forwards;
        --leaf-drift: ${leaf.drift}px;
        --leaf-rotation: ${leaf.rotation + 360 * (Math.random() > 0.5 ? 1 : -1)}deg;
      `

      // Different leaf SVG shapes
      const colors = ['#1F5C2E', '#2D7A3E', '#C8A96E']
      const color = colors[leaf.variant]

      if (leaf.variant === 0) {
        el.innerHTML = `<svg viewBox="0 0 24 24" fill="${color}" opacity="0.85"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/></svg>`
      } else if (leaf.variant === 1) {
        el.innerHTML = `<svg viewBox="0 0 24 24" fill="${color}" opacity="0.8"><path d="M6 21l1-4c-3-2-5-6-5-10C2 3.6 5.6 0 10 0h4c4.4 0 8 3.6 8 8 0 7-5 12-10 13l-2 1-4-1z"/></svg>`
      } else {
        el.innerHTML = `<svg viewBox="0 0 24 24" fill="${color}" opacity="0.8"><ellipse cx="12" cy="10" rx="6" ry="10" transform="rotate(-20 12 10)"/><line x1="12" y1="0" x2="12" y2="20" stroke="${color}" stroke-width="0.5" opacity="0.5"/></svg>`
      }

      container.appendChild(el)
    })
  }, [])

  useEffect(() => {
    document.addEventListener('click', spawnLeaves)
    return () => {
      document.removeEventListener('click', spawnLeaves)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [spawnLeaves])

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" />
}
