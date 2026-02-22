import { Mic, Brain, BarChart3 } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

const steps = [
  {
    icon: Mic,
    number: "01",
    title: "Send a voice note",
    description:
      "Farmer describes a crop issue or logs a field activity by sending a voice note on WhatsApp — in Darija, Arabic, or French.",
  },
  {
    icon: Brain,
    number: "02",
    title: "AI processes & structures",
    description:
      "AgriBot transcribes the audio, understands the context, and structures the data into actionable field records automatically.",
  },
  {
    icon: BarChart3,
    number: "03",
    title: "Guidance & data dashboard",
    description:
      "The farmer receives practical advice instantly. Technicians access a live dashboard with structured field data for every parcel.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-forest py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-earth">
              How It Works
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-cream md:text-4xl lg:text-5xl text-balance">
              From voice note to actionable insight
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-cream/60">
              Three simple steps. No app downloads. No typing required.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={(i + 1) as 1 | 2 | 3}>
              <div className="group flex h-full flex-col rounded-2xl bg-forest-dark p-8 transition-all hover:bg-forest-dark/80">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-earth/10">
                    <step.icon className="h-6 w-6 text-earth" />
                  </div>
                  <span className="font-serif text-3xl font-bold text-cream/20">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-cream">{step.title}</h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-cream/60">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
