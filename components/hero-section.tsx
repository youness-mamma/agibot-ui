"use client"

import { ScrollReveal } from "@/components/scroll-reveal"

function DoubleCheck() {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" className="inline-block ml-1">
      <path d="M1.5 5.5L4.5 8.5L11 2" stroke="#53BDEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 5.5L8 8.5L14.5 2" stroke="#53BDEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function HeroSection() {
  return (
    <section className="grain-overlay relative overflow-hidden bg-forest pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-earth/5 blur-[120px]" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 lg:flex-row lg:items-center lg:gap-16">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <ScrollReveal>
            <p className="mb-4 inline-block rounded-full border border-earth/30 bg-earth/10 px-4 py-1.5 text-sm font-medium text-earth">
              WhatsApp-based Agricultural AI
            </p>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-cream md:text-5xl lg:text-6xl text-balance">
              Agricultural guidance, in your language, on WhatsApp.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70 lg:text-xl">
              Voice-first AI assistant for Moroccan smallholder farmers.
              No app download, no literacy required — just send a voice note
              and receive expert agronomic support instantly.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={3}>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <a
                href="#early-access"
                className="rounded-full bg-earth px-7 py-3.5 text-base font-semibold text-foreground transition-all hover:bg-earth/90 hover:shadow-lg"
              >
                Request Early Access
              </a>
              <a
                href="#how-it-works"
                className="rounded-full border border-cream/30 px-7 py-3.5 text-base font-semibold text-cream transition-all hover:border-cream/60 hover:bg-cream/5"
              >
                See How It Works
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Right - Premium Phone Mockup */}
        <ScrollReveal delay={2} className="flex-1">
          <div className="mx-auto w-full max-w-sm">
            {/* Phone shell */}
            <div className="relative mx-auto w-[280px] md:w-[300px]">
              {/* Outer bezel with shadow and reflection */}
              <div className="rounded-[3rem] bg-[#1a1a1a] p-[3px] shadow-[0_25px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)_inset]">
                {/* Inner bezel frame */}
                <div className="rounded-[2.85rem] bg-[#2a2a2a] p-[2px]">
                  <div className="rounded-[2.75rem] bg-[#1a1a1a] p-[10px]">
                    {/* Screen */}
                    <div className="overflow-hidden rounded-[2.25rem] bg-cream">
                      {/* Status bar */}
                      <div className="flex items-center justify-between bg-forest-dark px-5 pt-3 pb-0">
                        <span className="text-[10px] font-semibold text-cream/90">9:41</span>
                        <div className="flex items-center gap-1">
                          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                            <rect x="0" y="4" width="2.5" height="6" rx="0.5" fill="#F9F6F0" fillOpacity="0.9" />
                            <rect x="3.5" y="2.5" width="2.5" height="7.5" rx="0.5" fill="#F9F6F0" fillOpacity="0.9" />
                            <rect x="7" y="1" width="2.5" height="9" rx="0.5" fill="#F9F6F0" fillOpacity="0.9" />
                            <rect x="10.5" y="0" width="2.5" height="10" rx="0.5" fill="#F9F6F0" fillOpacity="0.4" />
                          </svg>
                          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                            <path d="M6 2C8.2 2 10.1 3.1 11.2 4.8L12 4C10.7 2 8.5 0.8 6 0.8S1.3 2 0 4L0.8 4.8C1.9 3.1 3.8 2 6 2Z" fill="#F9F6F0" fillOpacity="0.9" />
                            <path d="M6 4.5C7.4 4.5 8.6 5.2 9.4 6.2L10.2 5.4C9.2 4.1 7.7 3.3 6 3.3S2.8 4.1 1.8 5.4L2.6 6.2C3.4 5.2 4.6 4.5 6 4.5Z" fill="#F9F6F0" fillOpacity="0.9" />
                            <circle cx="6" cy="8.5" r="1.5" fill="#F9F6F0" fillOpacity="0.9" />
                          </svg>
                          <div className="flex items-center">
                            <div className="h-[10px] w-[20px] rounded-[2px] border border-cream/50 p-[1px]">
                              <div className="h-full w-[70%] rounded-[1px] bg-cream/90" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* WhatsApp header */}
                      <div className="flex items-center gap-2.5 bg-forest-dark px-3 pt-1 pb-2.5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F9F6F0" strokeWidth="2" strokeLinecap="round">
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-earth/20 ring-2 ring-earth/10">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 20h10" />
                            <path d="M10 20c5.5-2.5.8-6.4 3-10" />
                            <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
                            <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-[13px] font-semibold text-cream">AgriBot</p>
                          <p className="text-[10px] text-cream/50">online</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F9F6F0" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7">
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91" />
                          </svg>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F9F6F0" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7">
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="19" r="1" />
                          </svg>
                        </div>
                      </div>

                      {/* Chat messages area */}
                      <div className="relative flex flex-col gap-2 px-3 py-3" style={{ background: 'linear-gradient(180deg, #ECE5DD 0%, #E8E0D4 100%)' }}>
                        {/* WhatsApp wallpaper pattern overlay */}
                        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

                        {/* Date chip */}
                        <div className="mx-auto mb-1">
                          <span className="rounded-lg bg-[#E1F2FB] px-3 py-1 text-[9px] font-medium text-foreground/50 shadow-sm">
                            TODAY
                          </span>
                        </div>

                        {/* Voice note from user (right-aligned, green bubble) */}
                        <div className="ml-auto max-w-[82%]">
                          <div className="relative rounded-xl rounded-tr-sm bg-[#D9FDD3] px-2.5 py-1.5 shadow-sm">
                            {/* Tail */}
                            <div className="absolute -right-1.5 top-0 w-3 h-3 overflow-hidden">
                              <div className="absolute -left-1.5 top-0 w-3 h-3 bg-[#D9FDD3] rotate-45 origin-top-left" />
                            </div>
                            <div className="flex items-center gap-2">
                              {/* Play button */}
                              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-forest">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="#F9F6F0">
                                  <polygon points="2,0 10,5 2,10" />
                                </svg>
                              </div>
                              {/* Waveform */}
                              <div className="flex flex-1 items-center gap-[2px]">
                                {[4, 10, 7, 14, 11, 5, 16, 9, 13, 6, 15, 8, 3, 12, 10, 6, 14, 7, 11, 4, 9, 13, 5, 8].map((h, i) => (
                                  <div
                                    key={i}
                                    className="w-[2.5px] rounded-full bg-forest/50"
                                    style={{ height: `${h}px` }}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="mt-0.5 flex items-center justify-between">
                              <span className="text-[9px] text-foreground/35">0:08</span>
                              <div className="flex items-center">
                                <span className="text-[9px] text-foreground/35">10:32</span>
                                <DoubleCheck />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Transcription note */}
                        <div className="ml-auto max-w-[82%]">
                          <div className="relative rounded-xl rounded-tr-sm bg-[#D9FDD3] px-2.5 py-1.5 shadow-sm">
                            <div className="absolute -right-1.5 top-0 w-3 h-3 overflow-hidden">
                              <div className="absolute -left-1.5 top-0 w-3 h-3 bg-[#D9FDD3] rotate-45 origin-top-left" />
                            </div>
                            <p className="text-[10px] italic leading-relaxed text-foreground/50">
                              {"\"Tomatichi fihom taches sfar f wraq, ash khasni ndir?\""}
                            </p>
                            <div className="mt-0.5 flex items-center justify-end">
                              <span className="text-[9px] text-foreground/35">10:32</span>
                              <DoubleCheck />
                            </div>
                          </div>
                        </div>

                        {/* Bot response (left-aligned, white bubble) */}
                        <div className="mr-auto max-w-[82%]">
                          <div className="relative rounded-xl rounded-tl-sm bg-card px-2.5 py-1.5 shadow-sm">
                            {/* Tail */}
                            <div className="absolute -left-1.5 top-0 w-3 h-3 overflow-hidden">
                              <div className="absolute -right-1.5 top-0 w-3 h-3 bg-card rotate-45 origin-top-right" />
                            </div>
                            <p className="text-[10px] font-medium text-forest mb-0.5">AgriBot</p>
                            <p className="text-[10.5px] leading-[1.55] text-foreground/80">
                              I heard you mention yellow spots on your tomato leaves. This sounds like early blight.
                            </p>
                            <p className="mt-0.5 text-right text-[9px] text-foreground/35">10:33</p>
                          </div>
                        </div>

                        {/* Bot treatment card */}
                        <div className="mr-auto max-w-[82%]">
                          <div className="relative rounded-xl rounded-tl-sm bg-card px-2.5 py-1.5 shadow-sm">
                            <div className="absolute -left-1.5 top-0 w-3 h-3 overflow-hidden">
                              <div className="absolute -right-1.5 top-0 w-3 h-3 bg-card rotate-45 origin-top-right" />
                            </div>
                            <div className="rounded-lg bg-forest/[0.06] p-2">
                              <div className="flex items-center gap-1.5 mb-1">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1F5C2E" strokeWidth="2.5" strokeLinecap="round">
                                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                  <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                                <p className="text-[10px] font-bold text-forest">Treatment Plan</p>
                              </div>
                              <div className="flex flex-col gap-1">
                                <div className="flex items-start gap-1.5">
                                  <span className="mt-[1px] flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full bg-forest/10 text-[7px] font-bold text-forest">1</span>
                                  <p className="text-[10px] leading-snug text-foreground/65">Remove affected leaves</p>
                                </div>
                                <div className="flex items-start gap-1.5">
                                  <span className="mt-[1px] flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full bg-forest/10 text-[7px] font-bold text-forest">2</span>
                                  <p className="text-[10px] leading-snug text-foreground/65">Apply copper fungicide</p>
                                </div>
                                <div className="flex items-start gap-1.5">
                                  <span className="mt-[1px] flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full bg-forest/10 text-[7px] font-bold text-forest">3</span>
                                  <p className="text-[10px] leading-snug text-foreground/65">Water at soil level only</p>
                                </div>
                              </div>
                            </div>
                            <p className="mt-1 text-right text-[9px] text-foreground/35">10:33</p>
                          </div>
                        </div>

                        {/* Typing indicator */}
                        <div className="mr-auto">
                          <div className="inline-flex items-center gap-1 rounded-xl rounded-tl-sm bg-card px-3 py-2 shadow-sm">
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/30" style={{ animationDelay: '0ms' }} />
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/30" style={{ animationDelay: '150ms' }} />
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/30" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>

                      {/* Input bar */}
                      <div className="flex items-center gap-2 bg-[#F0F0F0] px-2 py-2">
                        <div className="flex items-center gap-2">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#54656F" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                            <line x1="9" y1="9" x2="9.01" y2="9" />
                            <line x1="15" y1="9" x2="15.01" y2="9" />
                          </svg>
                        </div>
                        <div className="flex-1 rounded-full bg-card px-3 py-1.5">
                          <p className="text-[10px] text-foreground/30">Type a message</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#54656F" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6">
                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66L9.42 17.41a2 2 0 01-2.83-2.83l8.49-8.49" />
                          </svg>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#54656F" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6">
                            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                            <circle cx="12" cy="13" r="4" />
                          </svg>
                        </div>
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-forest">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="#F9F6F0">
                            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side buttons */}
              <div className="absolute left-0 top-[100px] h-8 w-[3px] rounded-l-sm bg-[#2a2a2a]" />
              <div className="absolute left-0 top-[140px] h-14 w-[3px] rounded-l-sm bg-[#2a2a2a]" />
              <div className="absolute left-0 top-[165px] h-14 w-[3px] rounded-l-sm bg-[#2a2a2a]" />
              <div className="absolute right-0 top-[130px] h-16 w-[3px] rounded-r-sm bg-[#2a2a2a]" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
