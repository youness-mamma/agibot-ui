"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"

const INPUT_TYPES = ["voice", "text", "photo"] as const
type InputType = (typeof INPUT_TYPES)[number]

const STEP_LABELS = ["Send", "Process", "Analyze", "Respond", "Insight"]
const TOTAL_STEPS = 5
const STEP_DURATIONS = [2500, 1600, 2600, 1600, 2800]

const STEP_DESCRIPTIONS: Record<InputType, string[]> = {
  voice: [
    "The farmer holds the mic button and sends a voice note in Darija describing yellow spots on their tomato leaves.",
    "The audio is securely streamed from WhatsApp to AgriBot's cloud over an encrypted connection.",
    "AI transcribes Darija speech, cross-references the crop database, and identifies Early Blight with 94% confidence.",
    "A structured treatment plan is generated in Arabic and formatted for WhatsApp delivery.",
    "The farmer receives a clear 3-step treatment plan with local product names they can act on today.",
  ],
  text: [
    "The farmer types a message in Arabic: 'My olive tree leaves are turning brown at the tips, what do I do?'",
    "The text message is routed from WhatsApp to AgriBot's NLP pipeline for language detection.",
    "AI parses the Arabic text, maps symptoms to Olive Leaf Scorch, and queries regional treatment protocols.",
    "A personalized response with irrigation advice and organic treatment options is composed.",
    "The farmer receives specific guidance: reduce watering, prune affected branches, apply copper spray.",
  ],
  photo: [
    "The farmer snaps a photo of a strange white powder on their grape vine leaves and sends it via WhatsApp.",
    "The image is uploaded and preprocessed for AgriBot's computer vision model pipeline.",
    "AI analyzes the photo using plant pathology models, identifying Powdery Mildew with 91% confidence.",
    "A visual diagnosis card with treatment steps and prevention tips is generated for the farmer.",
    "The farmer sees exactly what's wrong, with a side-by-side comparison and 3 actionable steps to fix it.",
  ],
}

const AI_STAGES: Record<InputType, string[]> = {
  voice: ["Transcribing Darija audio...", "Mapping symptoms to crop DB...", "Generating treatment plan..."],
  text: ["Parsing Arabic text...", "Identifying plant disease...", "Composing response..."],
  photo: ["Running vision analysis...", "Matching disease patterns...", "Building diagnosis card..."],
}

const INSIGHTS: Record<InputType, { title: string; steps: string[] }> = {
  voice: { title: "Early Blight", steps: ["Remove affected leaves", "Apply Mancozeb fungicide", "Water at soil level"] },
  text: { title: "Olive Leaf Scorch", steps: ["Reduce irrigation", "Prune dead branches", "Copper spray weekly"] },
  photo: { title: "Powdery Mildew", steps: ["Remove infected vines", "Apply sulfur treatment", "Improve air flow"] },
}

/* ── Sub-components ── */

function VoiceWaveform({ active }: { active: boolean }) {
  const bars = [4, 10, 7, 14, 11, 5, 16, 9, 13, 6, 15, 8, 3, 12, 10, 6, 14, 7, 11, 4, 9, 13, 5, 8]
  return (
    <div className="flex items-center justify-center gap-[2px]">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full transition-all duration-300"
          style={{
            height: active ? `${h}px` : "3px",
            backgroundColor: active ? "#C8A96E" : "#C8A96E40",
            transitionDelay: active ? `${i * 25}ms` : "0ms",
          }}
        />
      ))}
    </div>
  )
}

function FlowingDots({ active, reverse }: { active: boolean; reverse?: boolean }) {
  return (
    <div className="relative flex items-center justify-center py-2">
      <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-cream/10">
        {active && (
          <div
            className="absolute inset-y-0 w-8 rounded-full bg-earth/60"
            style={{
              animation: `flowDot 1.2s ease-in-out infinite`,
              animationDirection: reverse ? "reverse" : "normal",
            }}
          />
        )}
      </div>
      <style jsx>{`
        @keyframes flowDot {
          0% { left: -10%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  )
}

function InputTypeIcon({ type, active }: { type: InputType; active: boolean }) {
  const color = active ? "#C8A96E" : "#F9F6F040"
  if (type === "voice") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    )
  }
  if (type === "text") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h8" />
        <path d="M8 14h4" />
      </svg>
    )
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}

function PhoneInputPreview({ type, active }: { type: InputType; active: boolean }) {
  if (type === "voice") {
    return (
      <div className={`rounded-lg p-2.5 transition-all duration-500 ${active ? "bg-cream/10" : "bg-cream/5"}`}>
        <VoiceWaveform active={active} />
        <div className="mt-2 flex items-center justify-between">
          <div className={`flex h-5 w-5 items-center justify-center rounded-full transition-all duration-500 ${active ? "bg-earth" : "bg-cream/20"}`}>
            <svg width="6" height="8" viewBox="0 0 6 8" fill={active ? "#1a1a1a" : "#F9F6F060"}>
              {active ? (
                <>
                  <rect x="0" y="0" width="2" height="8" rx="0.5" />
                  <rect x="4" y="0" width="2" height="8" rx="0.5" />
                </>
              ) : (
                <polygon points="0,0 6,4 0,8" />
              )}
            </svg>
          </div>
          <span className="text-[8px] text-cream/40">{active ? "0:04" : "0:00"}</span>
        </div>
      </div>
    )
  }
  if (type === "text") {
    return (
      <div className={`rounded-lg p-2.5 transition-all duration-500 ${active ? "bg-cream/10" : "bg-cream/5"}`}>
        <div className="space-y-1">
          {active ? (
            <div className="animate-fade-in">
              <p className="text-[8px] leading-relaxed text-cream/70" dir="rtl">
                {"اوراق الزيتون كتبدل لونها للبني فالطرف، شنو ندير؟"}
              </p>
              <div className="mt-1.5 flex items-center justify-end gap-1">
                <span className="text-[7px] text-cream/30">14:23</span>
                <svg width="10" height="6" viewBox="0 0 16 10" fill="none" stroke="#25D366" strokeWidth="1.5" strokeLinecap="round">
                  <polyline points="1,5 4,8 11,1" />
                  <polyline points="5,5 8,8 15,1" />
                </svg>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 py-1">
              <div className="h-1 w-1 rounded-full bg-cream/20" />
              <div className="h-1 w-6 rounded-full bg-cream/10" />
            </div>
          )}
        </div>
      </div>
    )
  }
  // photo
  return (
    <div className={`rounded-lg p-2.5 transition-all duration-500 ${active ? "bg-cream/10" : "bg-cream/5"}`}>
      {active ? (
        <div className="animate-fade-in">
          <div className="flex aspect-[4/3] items-center justify-center rounded-md bg-forest/40">
            <div className="text-center">
              <svg className="mx-auto" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="1.5" strokeLinecap="round">
                <path d="M7 20h10" />
                <path d="M10 20c5.5-2.5.8-6.4 3-10" />
                <circle cx="14" cy="6" r="2" />
              </svg>
              <p className="mt-0.5 text-[6px] text-cream/40">Grape vine photo</p>
            </div>
          </div>
          <div className="mt-1.5 flex items-center justify-end gap-1">
            <span className="text-[7px] text-cream/30">14:25</span>
            <svg width="10" height="6" viewBox="0 0 16 10" fill="none" stroke="#25D366" strokeWidth="1.5" strokeLinecap="round">
              <polyline points="1,5 4,8 11,1" />
              <polyline points="5,5 8,8 15,1" />
            </svg>
          </div>
        </div>
      ) : (
        <div className="flex aspect-[4/3] items-center justify-center rounded-md bg-cream/5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F9F6F020" strokeWidth="2" strokeLinecap="round">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
        </div>
      )}
    </div>
  )
}

function InsightCard({ type, active }: { type: InputType; active: boolean }) {
  const insight = INSIGHTS[type]
  if (!active) {
    return (
      <div className="flex flex-col items-center gap-1.5 py-4">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="inline-block h-1.5 w-1.5 rounded-full bg-cream/30 animate-bounce"
              style={{ animationDelay: `${i * 150}ms`, animationDuration: "0.6s" }}
            />
          ))}
        </div>
        <span className="text-[8px] text-cream/20">Awaiting result...</span>
      </div>
    )
  }
  return (
    <div className="animate-fade-in space-y-2">
      <div className="flex items-center gap-1.5">
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-earth/20">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="3" strokeLinecap="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <span className="text-[9px] font-bold text-earth">{insight.title}</span>
      </div>
      <div className="h-px bg-cream/10" />
      <div className="space-y-1.5">
        {insight.steps.map((s, i) => (
          <div
            key={i}
            className="flex items-start gap-1.5 opacity-0 animate-fade-in"
            style={{ animationDelay: `${(i + 1) * 200}ms`, animationFillMode: "forwards" }}
          >
            <span className="mt-0.5 flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full bg-earth/20 text-[7px] font-bold text-earth">
              {i + 1}
            </span>
            <span className="text-[8px] leading-relaxed text-cream/60">{s}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Main Component ── */

export function AnimatedDemo() {
  const [step, setStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [inputTypeIndex, setInputTypeIndex] = useState(0)
  const loopRef = useRef(0)

  const currentInput = INPUT_TYPES[inputTypeIndex]

  const advanceStep = useCallback(() => {
    setStep((prev) => {
      if (prev >= TOTAL_STEPS - 1) {
        // Cycle to next input type on loop
        setInputTypeIndex((idx) => (idx + 1) % INPUT_TYPES.length)
        loopRef.current += 1
        return 0
      }
      return prev + 1
    })
  }, [])

  useEffect(() => {
    if (!isVisible || !hasStarted) return
    const timer = setTimeout(advanceStep, STEP_DURATIONS[step])
    return () => clearTimeout(timer)
  }, [step, isVisible, hasStarted, advanceStep, inputTypeIndex])

  useEffect(() => {
    if (isVisible && !hasStarted) {
      const delay = setTimeout(() => setHasStarted(true), 600)
      return () => clearTimeout(delay)
    }
  }, [isVisible, hasStarted])

  const handleReplay = () => {
    setStep(0)
    setInputTypeIndex((idx) => (idx + 1) % INPUT_TYPES.length)
  }

  return (
    <section id="how-it-works" className="bg-forest py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-earth">
              How It Works
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-cream md:text-4xl lg:text-5xl text-balance">
              From voice, text, or photo to actionable insight
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-cream/60">
              Three input types. No app downloads. Works on any phone with WhatsApp.
            </p>
          </div>
        </ScrollReveal>

        {/* Input type selector pills */}
        <ScrollReveal delay={0.5}>
          <div className="mx-auto mt-8 flex items-center justify-center gap-2">
            {INPUT_TYPES.map((type, i) => (
              <button
                key={type}
                onClick={() => { setInputTypeIndex(i); setStep(0); }}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                  inputTypeIndex === i
                    ? "bg-earth/20 text-earth ring-1 ring-earth/30"
                    : "bg-cream/5 text-cream/40 hover:bg-cream/10 hover:text-cream/60"
                }`}
              >
                <InputTypeIcon type={type} active={inputTypeIndex === i} />
                <span className="capitalize">{type}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Demo */}
        <ScrollReveal delay={1} onVisible={() => setIsVisible(true)}>
          <div className="mx-auto mt-10 max-w-5xl">

            {/* Progress bar */}
            <div className="mb-10 flex items-center">
              {STEP_LABELS.map((label, i) => (
                <div key={label} className="flex flex-1 flex-col items-center gap-2">
                  <div className="relative flex w-full items-center">
                    {i > 0 && (
                      <div className="h-[2px] flex-1 bg-cream/10">
                        <div
                          className="h-full bg-earth transition-all duration-500 ease-out"
                          style={{ width: step >= i ? "100%" : "0%" }}
                        />
                      </div>
                    )}
                    <div
                      className={`relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                        step > i
                          ? "border-earth bg-earth text-foreground scale-90"
                          : step === i
                            ? "border-earth bg-earth/20 text-earth scale-110 shadow-lg shadow-earth/20"
                            : "border-cream/15 bg-forest-dark text-cream/30"
                      }`}
                    >
                      {step > i ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <span className="text-xs font-bold">{i + 1}</span>
                      )}
                    </div>
                    {i < 4 && (
                      <div className="h-[2px] flex-1 bg-cream/10">
                        <div
                          className="h-full bg-earth transition-all duration-500 ease-out"
                          style={{ width: step > i ? "100%" : "0%" }}
                        />
                      </div>
                    )}
                  </div>
                  <span
                    className={`text-[11px] font-semibold transition-colors duration-300 hidden md:block ${
                      step === i ? "text-earth" : step > i ? "text-earth/50" : "text-cream/25"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Animation stage */}
            <div className="relative overflow-hidden rounded-3xl border border-cream/8 bg-forest-dark">
              {/* Ambient glow */}
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-1000"
                style={{
                  background: step === 2
                    ? "radial-gradient(circle at 50% 40%, rgba(200,169,110,0.06) 0%, transparent 60%)"
                    : "none",
                  opacity: step === 2 ? 1 : 0,
                }}
              />

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto_1.3fr_auto_1fr] items-stretch">

                {/* ── LEFT: Farmer's Phone ── */}
                <div className={`flex flex-col items-center justify-center gap-3 p-6 md:p-8 transition-all duration-500 ${step === 0 ? "bg-earth/[0.04]" : ""}`}>
                  <div className="mb-1 flex items-center gap-2">
                    <InputTypeIcon type={currentInput} active={step === 0} />
                    <span className={`text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${step === 0 ? "text-earth" : "text-cream/25"}`}>
                      {currentInput} Input
                    </span>
                  </div>

                  {/* Mini phone frame */}
                  <div className={`w-full max-w-[140px] rounded-2xl border-2 transition-all duration-500 ${step === 0 ? "border-earth/30 shadow-xl shadow-earth/10" : "border-cream/8"}`}>
                    {/* Phone notch */}
                    <div className="flex items-center justify-center py-1.5">
                      <div className="h-1 w-10 rounded-full bg-cream/10" />
                    </div>

                    <div className="px-2 pb-2">
                      {/* WhatsApp header */}
                      <div className="mb-2 flex items-center gap-1.5 rounded-lg bg-forest/40 px-2 py-1.5">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-earth/20">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="3" strokeLinecap="round">
                            <path d="M7 20h10" />
                            <path d="M10 20c5.5-2.5.8-6.4 3-10" />
                          </svg>
                        </div>
                        <span className="text-[8px] font-bold text-cream/80">AgriBot</span>
                      </div>

                      {/* Input preview */}
                      <PhoneInputPreview type={currentInput} active={step === 0} />
                    </div>

                    {/* Phone home bar */}
                    <div className="flex items-center justify-center pb-1.5">
                      <div className="h-0.5 w-8 rounded-full bg-cream/10" />
                    </div>
                  </div>

                  <span className={`text-[10px] font-medium transition-colors duration-300 ${step === 0 ? "text-cream/60" : "text-cream/20"}`}>
                    Farmer sends {currentInput}
                  </span>
                </div>

                {/* ── Arrow 1 ── */}
                <div className="hidden md:flex flex-col items-center justify-center px-1">
                  <div className="w-12">
                    <FlowingDots active={step === 1} />
                  </div>
                </div>

                {/* ── CENTER: AI Processing ── */}
                <div className={`flex flex-col items-center justify-center gap-4 p-6 md:p-8 transition-all duration-500 ${step === 2 ? "bg-earth/[0.04]" : ""}`}>
                  {/* AI Brain visual */}
                  <div className="relative">
                    {/* Pulse rings */}
                    <div className={`absolute inset-0 -m-3 rounded-2xl transition-all duration-700 ${step === 2 ? "bg-earth/10 scale-110 opacity-100" : "bg-transparent scale-100 opacity-0"}`} />
                    <div className={`absolute inset-0 -m-6 rounded-3xl transition-all duration-1000 ${step === 2 ? "bg-earth/5 scale-110 opacity-100" : "bg-transparent scale-100 opacity-0"}`} style={{ transitionDelay: "200ms" }} />

                    <div className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl border-2 transition-all duration-500 ${step === 2 ? "border-earth/40 bg-earth/10 shadow-xl shadow-earth/20" : step >= 1 && step <= 3 ? "border-cream/15 bg-cream/5" : "border-cream/8 bg-cream/[0.02]"}`}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={step === 2 ? "#C8A96E" : step >= 1 && step <= 3 ? "#F9F6F040" : "#F9F6F020"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-500">
                        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
                        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
                      </svg>
                    </div>
                  </div>

                  <div className="text-center">
                    <span className={`text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${step === 2 ? "text-earth" : "text-cream/25"}`}>
                      AgriBot AI
                    </span>

                    {/* Processing steps */}
                    <div className="mt-3 min-h-[56px]">
                      {step === 2 ? (
                        <div className="space-y-1.5 animate-fade-in">
                          {AI_STAGES[currentInput].map((stage, i) => (
                            <div
                              key={stage}
                              className="flex items-center justify-center gap-1.5 opacity-0 animate-fade-in"
                              style={{ animationDelay: `${i * 700}ms`, animationFillMode: "forwards" }}
                            >
                              <div
                                className="h-1.5 w-1.5 rounded-full bg-earth animate-pulse"
                                style={{ animationDelay: `${i * 700}ms` }}
                              />
                              <span className="text-[10px] text-cream/50">{stage}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[10px] text-cream/15">
                          {step < 2 ? "Waiting for input..." : "Processing complete"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── Arrow 2 ── */}
                <div className="hidden md:flex flex-col items-center justify-center px-1">
                  <div className="w-12">
                    <FlowingDots active={step === 3} reverse />
                  </div>
                </div>

                {/* ── RIGHT: Insight Delivered ── */}
                <div className={`flex flex-col items-center justify-center gap-3 p-6 md:p-8 transition-all duration-500 ${step === 4 ? "bg-earth/[0.04]" : ""}`}>
                  <span className={`text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${step === 4 ? "text-earth" : "text-cream/25"}`}>
                    Response
                  </span>

                  {/* Response phone frame */}
                  <div className={`w-full max-w-[140px] rounded-2xl border-2 transition-all duration-500 ${step === 4 ? "border-earth/30 shadow-xl shadow-earth/10" : "border-cream/8"}`}>
                    <div className="flex items-center justify-center py-1.5">
                      <div className="h-1 w-10 rounded-full bg-cream/10" />
                    </div>

                    <div className="px-2 pb-2">
                      <div className="mb-2 flex items-center gap-1.5 rounded-lg bg-forest/40 px-2 py-1.5">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-earth/20">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="3" strokeLinecap="round">
                            <path d="M7 20h10" />
                            <path d="M10 20c5.5-2.5.8-6.4 3-10" />
                          </svg>
                        </div>
                        <span className="text-[8px] font-bold text-cream/80">AgriBot</span>
                      </div>

                      <div className={`rounded-lg p-2.5 transition-all duration-500 ${step === 4 ? "bg-cream/10" : "bg-cream/5"}`}>
                        <InsightCard type={currentInput} active={step === 4} />
                      </div>
                    </div>

                    <div className="flex items-center justify-center pb-1.5">
                      <div className="h-0.5 w-8 rounded-full bg-cream/10" />
                    </div>
                  </div>

                  <span className={`text-[10px] font-medium transition-colors duration-300 ${step === 4 ? "text-cream/60" : "text-cream/20"}`}>
                    Farmer gets insight
                  </span>
                </div>
              </div>

              {/* Step description bar */}
              <div className="border-t border-cream/8 px-6 py-4 md:px-10">
                <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
                  <div className="min-h-[40px] flex-1">
                    <p key={`${currentInput}-${step}`} className="text-sm leading-relaxed text-cream/60 animate-fade-in">
                      <span className="font-semibold text-earth">{STEP_LABELS[step]}</span>
                      {" "}
                      {STEP_DESCRIPTIONS[currentInput][step]}
                    </p>
                  </div>
                  <button
                    onClick={handleReplay}
                    className="flex flex-shrink-0 items-center gap-1.5 rounded-full border border-cream/10 bg-cream/[0.03] px-4 py-1.5 text-xs font-medium text-cream/40 transition-all hover:border-earth/30 hover:text-earth"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="1 4 1 10 7 10" />
                      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                    </svg>
                    Replay
                  </button>
                </div>
              </div>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
