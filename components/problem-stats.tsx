import { ScrollReveal } from "@/components/scroll-reveal"

const stats = [
  { value: "1 : 5,726", label: "Advisor-to-farmer ratio in Morocco" },
  { value: "38%", label: "Rural illiteracy rate" },
  { value: "84%", label: "WhatsApp adoption nationwide" },
]

export function ProblemStats() {
  return (
    <section className="bg-foreground py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i as 0 | 1 | 2}>
              <div className="text-center">
                <p className="font-serif text-3xl font-bold text-earth md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-cream/60">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
