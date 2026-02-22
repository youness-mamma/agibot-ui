import { ScrollReveal } from "@/components/scroll-reveal"

export function Partners() {
  const collaborators = [
    { name: "OCP Group", src: "/OCP_Group.svg.png", width: 150, height: 60 },
    { name: "COPAG", src: "/copag_logo.png", width: 150, height: 60 },
    { name: "Y Combinator", src: "/Logo YC.png", width: 130, height: 60 },
  ]

  return (
    <section id="partners" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-earth">
              Validation
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
              Built in Partnership With
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <div className="mt-12 flex flex-col items-center justify-center gap-12 sm:flex-row sm:gap-20">
            {collaborators.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center justify-center grayscale transition-all duration-300 hover:grayscale-0"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="h-14 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
