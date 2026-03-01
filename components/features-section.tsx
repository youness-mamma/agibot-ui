"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Beaker, Beef, CloudRain, HardHat, Landmark, ShieldCheck, Tractor, Wheat } from "lucide-react"

type Feature = {
  title: string
  description: string
}

const FEATURES: Feature[] = [
  {
    title: "Drought & Climate Alerts",
    description:
      "Proactive WhatsApp voice alerts 2-3 weeks before drought stress peaks. Farmers receive daily updates in Darija: which crops to prioritize, when to harvest early, and how to manage limited water supply.",
  },
  {
    title: "Post-Harvest Prevention",
    description:
      "Morocco loses $1 billion per year in post-harvest wheat losses. AgriBot asks what you grew, how much, and where you store it - then delivers crop-specific storage and sell-timing guidance by voice.",
  },
  {
    title: "MAMDA Insurance Enrollment",
    description:
      "AgriBot guides farmers through MAMDA insurance enrollment step by step, entirely by voice in Darija. Eligibility check, document list, office directions, and automatic renewal reminders included.",
  },
  {
    title: "Government Subsidy Navigator",
    description:
      "Morocco distributes billions in agricultural subsidies that most smallholder farmers never access due to paperwork complexity. AgriBot becomes the navigation layer - voice-guided, in Darija, step by step.",
  },
  {
    title: "Precision Fertilizer Optimizer",
    description:
      "Before planting, AgriBot asks crop type, plot size, and last season's rotation. It prescribes the exact NPK dose, application timing, and estimated input cost - reducing waste and increasing yield.",
  },
  {
    title: "Livestock Drought Advisor",
    description:
      "AgriBot monitors drought forecasts and advises farmers whether to hold, sell, or reduce their herd. A farmer who avoids panic-selling 5 sheep at drought price saves up to 1,500 MAD from a single decision.",
  },
  {
    title: "Women Farmer Module",
    description:
      "52% of Moroccan working women are employed in agriculture. AgriBot provides a dedicated voice-guided experience designed specifically for women farmers, entirely in Darija.",
  },
]

const SEGMENT_COUNT = FEATURES.length
const FULL_CIRCLE = Math.PI * 2
const SEGMENT_ANGLE = FULL_CIRCLE / SEGMENT_COUNT
const GAP_ANGLE = (2.6 * Math.PI) / 180

const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => ({
  x: cx + r * Math.cos(angle),
  y: cy + r * Math.sin(angle),
})

const createSegmentPath = (
  cx: number,
  cy: number,
  outerRadius: number,
  innerRadius: number,
  startAngle: number,
  endAngle: number,
) => {
  const outerStart = polarToCartesian(cx, cy, outerRadius, startAngle)
  const outerEnd = polarToCartesian(cx, cy, outerRadius, endAngle)
  const innerEnd = polarToCartesian(cx, cy, innerRadius, endAngle)
  const innerStart = polarToCartesian(cx, cy, innerRadius, startAngle)
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ")
}

const SEGMENT_ICONS = [
  CloudRain,
  Wheat,
  ShieldCheck,
  Landmark,
  Beaker,
  Beef,
  HardHat,
]

const featureNumber = (index: number) => String(index + 1).padStart(2, "0")

export function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const pauseUntilRef = useRef(0)

  const segments = useMemo(() => {
    const cx = 200
    const cy = 200
    const outerRadius = 184
    const innerRadius = 102

    return Array.from({ length: SEGMENT_COUNT }, (_, index) => {
      const start = -Math.PI / 2 + index * SEGMENT_ANGLE + GAP_ANGLE / 2
      const end = -Math.PI / 2 + (index + 1) * SEGMENT_ANGLE - GAP_ANGLE / 2
      const middle = (start + end) / 2
      const icon = polarToCartesian(cx, cy, (outerRadius + innerRadius) / 2, middle)
      return {
        path: createSegmentPath(cx, cy, outerRadius, innerRadius, start, end),
        iconX: icon.x,
        iconY: icon.y,
      }
    })
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (hovered || Date.now() < pauseUntilRef.current) return
      setActiveIndex((prev) => (prev + 1) % SEGMENT_COUNT)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [hovered])

  const activate = (index: number) => {
    setActiveIndex(index)
    pauseUntilRef.current = Date.now() + 8000
  }

  return (
    <section id="features" className="agri-wheel-section">
      <div className="agri-wheel-wrap">
        <header className="agri-wheel-header">
          <p className="agri-label">What AgriBot Does</p>
          <h2 className="agri-title">Features built for the field</h2>
          <p className="agri-subtitle">
            Every feature addresses a documented, quantified problem that Moroccan smallholder farmers face every season.
          </p>
        </header>

        <div className="agri-grid">
          <div
            className="agri-wheel-shell"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <svg className="agri-wheel" viewBox="0 0 400 400" role="group" aria-label="AgriBot feature wheel">
              <circle cx="200" cy="200" r="194" className="outer-ring" />
              {segments.map((segment, index) => {
                const Icon = SEGMENT_ICONS[index]
                const active = activeIndex === index
                return (
                  <g key={`segment-${index}`}>
                    <path
                      d={segment.path}
                      className={`segment-path ${active ? "segment-active" : ""}`}
                      onClick={() => activate(index)}
                      role="button"
                      tabIndex={0}
                      aria-label={`${featureNumber(index)} ${FEATURES[index].title}`}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault()
                          activate(index)
                        }
                      }}
                    />
                    <g
                      className={`segment-icon ${active ? "segment-icon-active" : ""}`}
                      transform={`translate(${segment.iconX - 12} ${segment.iconY - 12})`}
                      role="presentation"
                    >
                      <Icon className="segment-icon-svg" aria-hidden="true" strokeWidth={1.9} />
                    </g>
                  </g>
                )
              })}
            </svg>

            <div className="agri-wheel-center" aria-hidden="true">
              <FarmerCenterIcon />
            </div>
          </div>

          <aside
            className="agri-feature-panel"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <article className="agri-feature-card" key={`feature-${activeIndex}`}>
              <span className="feature-number">{featureNumber(activeIndex)}</span>
              <h3>{FEATURES[activeIndex].title}</h3>
              <p>{FEATURES[activeIndex].description}</p>
            </article>

            <div className="feature-dots" role="tablist" aria-label="Feature navigation">
              {FEATURES.map((feature, index) => (
                <button
                  key={feature.title}
                  type="button"
                  className={`feature-dot ${activeIndex === index ? "feature-dot-active" : ""}`}
                  onClick={() => activate(index)}
                  aria-label={`Show ${featureNumber(index)} ${feature.title}`}
                  aria-selected={activeIndex === index}
                  role="tab"
                />
              ))}
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        .agri-wheel-section {
          width: 100%;
          padding: clamp(4.5rem, 7vw, 7.5rem) 1.25rem;
          background:
            radial-gradient(circle at 14% 8%, rgba(112, 171, 106, 0.18), transparent 35%),
            radial-gradient(circle at 86% 90%, rgba(80, 132, 90, 0.2), transparent 40%),
            linear-gradient(160deg, #0f1916 0%, #0b1411 56%, #121f1a 100%);
          color: #f4efe2;
          overflow: hidden;
        }

        .agri-wheel-wrap {
          max-width: 1220px;
          margin: 0 auto;
        }

        .agri-wheel-header {
          text-align: center;
          margin-bottom: clamp(2rem, 4vw, 3.25rem);
        }

        .agri-label {
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 0.74rem;
          font-weight: 700;
          color: #8ccf85;
        }

        .agri-title {
          margin: 0.7rem auto 0;
          font-family: var(--font-syne), "Syne", sans-serif;
          font-size: clamp(2rem, 5vw, 3.35rem);
          line-height: 1.03;
          font-weight: 750;
          color: #f8f2e7;
          text-wrap: balance;
          max-width: 14ch;
        }

        .agri-subtitle {
          margin: 1rem auto 0;
          font-size: clamp(1rem, 2vw, 1.15rem);
          line-height: 1.7;
          color: #c8c3b6;
          max-width: 65ch;
        }

        .agri-grid {
          display: grid;
          align-items: center;
          gap: clamp(1.5rem, 4vw, 3rem);
          grid-template-columns: 1fr;
        }

        .agri-wheel-shell {
          position: relative;
          width: min(100%, 500px);
          margin: 0 auto;
          aspect-ratio: 1;
        }

        .agri-wheel {
          width: 100%;
          height: 100%;
          display: block;
        }

        .outer-ring {
          fill: transparent;
          stroke: rgba(140, 207, 133, 0.25);
          stroke-width: 2;
        }

        .segment-path {
          fill: #1d2a25;
          stroke: rgba(169, 184, 153, 0.18);
          stroke-width: 1;
          transition: fill 260ms ease, transform 260ms ease, filter 260ms ease;
          cursor: pointer;
          transform-origin: 200px 200px;
        }

        .segment-path:hover,
        .segment-active {
          fill: #73b36d;
          filter: drop-shadow(0 0 12px rgba(115, 179, 109, 0.33));
        }

        .segment-icon {
          color: #89a081;
          transition: color 220ms ease, transform 220ms ease;
          pointer-events: none;
        }

        .segment-icon-svg {
          width: 24px;
          height: 24px;
        }

        .segment-icon-active {
          color: #0f1916;
        }

        .agri-wheel-center {
          position: absolute;
          inset: 50% auto auto 50%;
          transform: translate(-50%, -50%);
          width: 35%;
          aspect-ratio: 1;
          border-radius: 999px;
          background: radial-gradient(circle at 35% 20%, #22352d, #0d1613 65%);
          border: 3px solid #73b36d;
          display: grid;
          place-items: center;
          color: #dff1d7;
          box-shadow: 0 12px 26px rgba(0, 0, 0, 0.35);
          overflow: hidden;
        }

        .agri-wheel-center::before {
          content: "";
          position: absolute;
          inset: 8%;
          border-radius: 999px;
          border: 1px solid rgba(156, 219, 150, 0.38);
          pointer-events: none;
        }

        .farmer-center-icon {
          position: relative;
          width: 58%;
          height: 58%;
          z-index: 1;
          display: grid;
          place-items: center;
          color: #e3f5dc;
        }

        .farmer-center-main {
          width: 78%;
          height: 78%;
          stroke-width: 2;
        }

        .agri-feature-panel {
          width: min(100%, 520px);
          margin: 0 auto;
        }

        .agri-feature-card {
          background: linear-gradient(160deg, rgba(26, 40, 34, 0.94), rgba(14, 25, 21, 0.96));
          border: 1px solid rgba(115, 179, 109, 0.3);
          border-radius: 24px;
          padding: clamp(1.35rem, 3.4vw, 2rem);
          position: relative;
          overflow: hidden;
          animation: cardSlide 420ms ease;
        }

        .agri-feature-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 80% 0%, rgba(115, 179, 109, 0.18), transparent 43%);
          pointer-events: none;
        }

        .feature-number {
          display: inline-block;
          font-family: var(--font-syne), "Syne", sans-serif;
          font-size: clamp(2.6rem, 8vw, 4.2rem);
          line-height: 0.9;
          color: rgba(131, 196, 125, 0.3);
          font-weight: 780;
          margin-bottom: 0.7rem;
        }

        .agri-feature-card h3 {
          margin: 0;
          font-family: var(--font-syne), "Syne", sans-serif;
          font-size: clamp(1.38rem, 2.8vw, 2rem);
          line-height: 1.2;
          color: #f2eadb;
        }

        .agri-feature-card p {
          margin: 0.95rem 0 1.3rem;
          color: #cec7b7;
          line-height: 1.72;
          font-size: 1rem;
        }

        .feature-dots {
          margin-top: 1.15rem;
          display: flex;
          justify-content: center;
          gap: 0.52rem;
        }

        .feature-dot {
          border: 0;
          width: 11px;
          height: 11px;
          border-radius: 999px;
          background: rgba(217, 209, 188, 0.26);
          cursor: pointer;
          transition: transform 220ms ease, background-color 220ms ease;
        }

        .feature-dot:hover {
          transform: scale(1.12);
          background: rgba(131, 196, 125, 0.7);
        }

        .feature-dot-active {
          background: #73b36d;
          transform: scale(1.16);
        }

        @keyframes cardSlide {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (min-width: 1024px) {
          .agri-grid {
            grid-template-columns: minmax(340px, 540px) minmax(350px, 1fr);
          }

          .agri-wheel-shell {
            margin: 0;
          }

          .agri-feature-panel {
            margin: 0;
            justify-self: stretch;
          }

          .feature-dots {
            justify-content: flex-start;
          }
        }
      `}</style>
    </section>
  )
}
const FarmerCenterIcon = () => (
  <div className="farmer-center-icon" aria-hidden="true">
    <Tractor className="farmer-center-main" />
  </div>
)
