import { ScrollReveal } from "@/components/scroll-reveal"

const cards = [
  {
    title: "For Farmers",
    description:
      "Log your field activities by voice. Get instant guidance on crop health, pest management, and best practices — all in Darija on WhatsApp.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600",
    alt: "A farmer working in agricultural fields at golden hour",
  },
  {
    title: "For Cooperatives & Technicians",
    description:
      "Access structured, real-time field data from every farmer in your network. Monitor crop health, track activities, and provide targeted support.",
    image: "/agri-techni.jpg",
    alt: "Cooperatives and technicians working with agricultural field data",
  },
]

export function WhoItsFor() {
  return (
    <section className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-earth">
              Who It{"'"}s For
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance">
              Designed for every link in the chain
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {cards.map((card, i) => (
            <ScrollReveal key={card.title} delay={(i + 1) as 1 | 2}>
              <div className="group h-full overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-xl">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-forest/0 transition-colors duration-300 group-hover:bg-forest/20" />
                </div>
                <div className="p-8">
                  <h3 className="font-serif text-2xl font-bold text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
