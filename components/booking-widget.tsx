"use client"

import { useState, useCallback } from "react"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

const timeSlots = ["9:00", "10:00", "11:00", "14:00", "15:00", "16:00"]

// Days that are "unavailable" (weekends)
function isWeekend(date: Date) {
  const day = date.getDay()
  return day === 0 || day === 6
}

function isPast(date: Date) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay()
  // Convert Sunday=0 to Monday-based (Monday=0)
  return day === 0 ? 6 : day - 1
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

type BookingStep = "calendar" | "time" | "form" | "success"

export function BookingWidget() {
  const now = new Date()
  const [currentMonth, setCurrentMonth] = useState(now.getMonth())
  const [currentYear, setCurrentYear] = useState(now.getFullYear())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [step, setStep] = useState<BookingStep>("calendar")
  const [showLeaves, setShowLeaves] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" })

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)

  const goToPrevMonth = useCallback(() => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear((y) => y - 1)
    } else {
      setCurrentMonth((m) => m - 1)
    }
  }, [currentMonth])

  const goToNextMonth = useCallback(() => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear((y) => y + 1)
    } else {
      setCurrentMonth((m) => m + 1)
    }
  }, [currentMonth])

  const handleDateSelect = (day: number) => {
    const date = new Date(currentYear, currentMonth, day)
    if (isWeekend(date) || isPast(date)) return
    setSelectedDate(date)
    setShowLeaves(true)
    setTimeout(() => {
      setShowLeaves(false)
      setStep("time")
    }, 1600)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setStep("form")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("success")
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    )
  }

  const isSelected = (day: number) => {
    if (!selectedDate) return false
    return (
      day === selectedDate.getDate() &&
      currentMonth === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear()
    )
  }

  const renderCalendar = () => {
    const blanks = Array.from({ length: firstDay }, (_, i) => (
      <div key={`blank-${i}`} />
    ))

    const days = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1
      const date = new Date(currentYear, currentMonth, day)
      const unavailable = isWeekend(date) || isPast(date)
      const selected = isSelected(day)
      const today = isToday(day)

      return (
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          disabled={unavailable}
          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-all mx-auto
            ${unavailable ? "cursor-not-allowed text-muted-foreground/40" : "cursor-pointer hover:bg-forest/10 text-foreground"}
            ${selected ? "!bg-forest !text-cream shadow-md" : ""}
            ${today && !selected ? "ring-2 ring-forest/30" : ""}
          `}
        >
          {day}
        </button>
      )
    })

    return [...blanks, ...days]
  }

  return (
    <section id="book-demo" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-earth">
              See It In Action
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance">
              Book a Demo Consultation
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Schedule a 30-minute call with our team to see AgriBot in action.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
            {step === "success" ? (
              <div className="flex flex-col items-center justify-center py-20 px-6 animate-fade-in">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-forest/10">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-forest">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path
                      d="M8 12l2.5 2.5L16 9"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      className="animate-checkmark"
                    />
                  </svg>
                </div>
                <h3 className="mt-6 text-center font-serif text-2xl font-bold text-foreground">
                  Your demo is booked!
                </h3>
                <p className="mt-3 max-w-sm text-center text-base leading-relaxed text-muted-foreground">
                  We will contact you on WhatsApp to confirm your{" "}
                  {selectedDate && (
                    <span className="font-semibold text-forest">
                      {selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                    </span>
                  )}{" "}
                  at{" "}
                  <span className="font-semibold text-forest">{selectedTime}</span> appointment.
                </p>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row">
                {/* Calendar side */}
                <div className="relative flex-1 border-b border-border p-6 md:border-b-0 md:border-r">
                  {/* Leaf animation overlay */}
                  {showLeaves && (
                    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
                      <div className="leaf-fall-1 absolute top-0 left-[20%]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#1F5C2E" opacity="0.6">
                          <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                        </svg>
                      </div>
                      <div className="leaf-fall-2 absolute top-0 left-[50%]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#C8A96E" opacity="0.7">
                          <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                        </svg>
                      </div>
                      <div className="leaf-fall-3 absolute top-0 left-[75%]">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#1F5C2E" opacity="0.5">
                          <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Month navigation */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={goToPrevMonth}
                      className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-muted"
                      aria-label="Previous month"
                    >
                      <ChevronLeft className="h-5 w-5 text-foreground" />
                    </button>
                    <h3 className="text-base font-semibold text-foreground">
                      {MONTH_NAMES[currentMonth]} {currentYear}
                    </h3>
                    <button
                      onClick={goToNextMonth}
                      className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-muted"
                      aria-label="Next month"
                    >
                      <ChevronRight className="h-5 w-5 text-foreground" />
                    </button>
                  </div>

                  {/* Day labels */}
                  <div className="mt-4 grid grid-cols-7 gap-1 text-center">
                    {DAY_NAMES.map((name) => (
                      <div key={name} className="text-xs font-medium text-muted-foreground py-2">
                        {name}
                      </div>
                    ))}
                  </div>

                  {/* Calendar grid */}
                  <div className="mt-1 grid grid-cols-7 gap-1">
                    {renderCalendar()}
                  </div>
                </div>

                {/* Right side - Time slots or form */}
                <div className="flex flex-1 flex-col p-6">
                  {step === "calendar" && (
                    <div className="flex flex-1 flex-col items-center justify-center text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-forest/5">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1F5C2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                      </div>
                      <p className="mt-4 text-base font-medium text-foreground">Select a date</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Choose an available day to see time slots
                      </p>
                    </div>
                  )}

                  {step === "time" && (
                    <div className="animate-slide-in-right">
                      <p className="text-sm font-medium text-muted-foreground">
                        Available times for
                      </p>
                      <p className="mt-1 text-lg font-bold text-foreground">
                        {selectedDate?.toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <div className="mt-6 grid grid-cols-2 gap-3">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => handleTimeSelect(time)}
                            className={`rounded-full border-2 px-4 py-2.5 text-sm font-semibold transition-all
                              ${
                                selectedTime === time
                                  ? "border-forest bg-forest text-cream"
                                  : "border-forest/30 text-forest hover:border-forest hover:bg-forest/5"
                              }
                            `}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === "form" && (
                    <form onSubmit={handleSubmit} className="animate-fade-in flex flex-col gap-4">
                      <div className="flex items-center gap-2 rounded-lg bg-forest/5 px-3 py-2">
                        <Check className="h-4 w-4 text-forest" />
                        <span className="text-sm font-medium text-forest">
                          {selectedDate?.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}{" "}
                          at {selectedTime}
                        </span>
                      </div>

                      <div>
                        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-forest focus:ring-1 focus:ring-forest focus:outline-none"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-forest focus:ring-1 focus:ring-forest focus:outline-none"
                          placeholder="you@email.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">
                          WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData((d) => ({ ...d, phone: e.target.value }))}
                          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-forest focus:ring-1 focus:ring-forest focus:outline-none"
                          placeholder="+212 6XX XXX XXX"
                        />
                      </div>

                      <button
                        type="submit"
                        className="mt-2 w-full rounded-full bg-forest py-3 text-sm font-bold text-cream transition-all hover:bg-forest-dark hover:shadow-lg"
                      >
                        Confirm Booking
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
