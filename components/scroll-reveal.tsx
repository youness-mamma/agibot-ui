"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  onVisible?: () => void
}

export function ScrollReveal({ children, className = "", delay = 0, onVisible }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          onVisible?.()
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const delayClass =
    delay === 1
      ? "animate-fade-up-delay-1"
      : delay === 2
        ? "animate-fade-up-delay-2"
        : delay === 3
          ? "animate-fade-up-delay-3"
          : delay === 4
            ? "animate-fade-up-delay-4"
            : "animate-fade-up"

  return (
    <div
      ref={ref}
      className={`${isVisible ? delayClass : "opacity-0"} ${className}`}
    >
      {children}
    </div>
  )
}
