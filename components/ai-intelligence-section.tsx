import {
  FileText,
  MapPinned,
  Sprout,
  CloudSunRain,
  Droplets,
  FlaskConical,
} from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

const capabilities = [
  {
    icon: MapPinned,
    title: "Field Analysis",
    description:
      "Pin your plot and instantly get soil type, water-holding capacity, and climate-zone context.",
  },
  {
    icon: FlaskConical,
    title: "AI Recommendations",
    description:
      "Receive optimal fertilizer doses, accurate water needs, and the best irrigation timing for your crops.",
  },
  {
    icon: CloudSunRain,
    title: "Weather Alerts",
    description:
      "Get 7-14 day forecasts with frost, wind, and storm alerts, plus real-time evapotranspiration signals.",
  },
  {
    icon: Droplets,
    title: "Irrigation Management",
    description:
      "Optimize water consumption with precise recommendations based on crop type and field conditions.",
  },
  {
    icon: Sprout,
    title: "Best-Fit Crops",
    description:
      "Discover which crops are most suitable for your land profile and current climate conditions.",
  },
  {
    icon: FileText,
    title: "PDF Reports",
    description:
      "Generate complete reports including irrigation curves, yield projections, and practical action plans.",
  },
]

export function AIIntelligenceSection() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-earth">
              AI Intelligence
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance">
              Artificial Intelligence for Your Land
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Our AI analyzes your fields by combining satellite data, climate history,
              and agronomic models to deliver personalized, practical recommendations.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item, i) => (
            <ScrollReveal key={item.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <article className="group h-full rounded-2xl border border-border bg-card p-7 transition-all hover:border-forest/25 hover:shadow-lg">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest/8 transition-colors group-hover:bg-forest/12">
                  <item.icon className="h-5 w-5 text-forest" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
