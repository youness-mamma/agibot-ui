import { Mic, ClipboardList, LayoutDashboard, Database, Languages, Download } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

const features = [
  {
    icon: Mic,
    title: "Voice-first interaction",
    description:
      "Farmers speak naturally in Darija, Arabic, or French. No typing, no complex menus — just talk.",
  },
  {
    icon: ClipboardList,
    title: "Structured field logging",
    description:
      "Voice inputs are automatically converted into structured data — crop type, issue, location, and actions taken.",
  },
  {
    icon: LayoutDashboard,
    title: "Technician dashboard",
    description:
      "Agricultural advisors see real-time field data organized by farmer, parcel, and crop season.",
  },
  {
    icon: Database,
    title: "Building Morocco's agri-data foundation",
    description:
      "Every farmer interaction contributes to a national agricultural data foundation for Morocco, enabling better decisions at field and ecosystem level.",
  },
  {
    icon: Languages,
    title: "Darija & Arabic support",
    description:
      "Built for Morocco from day one. Full support for Moroccan Darija, Modern Standard Arabic, and French.",
  },
  {
    icon: Download,
    title: "No app download needed",
    description:
      "Zero friction onboarding. Farmers just message a WhatsApp number — no installation, no sign-up forms.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-earth">
              Features
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance">
              Built for the field
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Every feature designed for real-world agricultural conditions,
              not Silicon Valley offices.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-8 transition-all hover:border-forest/20 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/5 transition-colors group-hover:bg-forest/10">
                  <feature.icon className="h-6 w-6 text-forest" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-foreground">{feature.title}</h3>
                <p className="mt-2 flex-1 text-base leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
