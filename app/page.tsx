import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProblemStats } from "@/components/problem-stats"
import { AnimatedDemo } from "@/components/animated-demo"
import { AIIntelligenceSection } from "@/components/ai-intelligence-section"
import { FeaturesSection } from "@/components/features-section"
import { BookingWidget } from "@/components/booking-widget"
import { WhoItsFor } from "@/components/who-its-for"
import { Partners } from "@/components/partners"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { LeafClickEffect } from "@/components/leaf-click-effect"

export default function Page() {
  return (
    <>
      <LeafClickEffect />
      <Navbar />
      <main>
        <HeroSection />
        <ProblemStats />
        <AnimatedDemo />
        <AIIntelligenceSection />
        <FeaturesSection />
        <BookingWidget />
        <WhoItsFor />
        <Partners />
        <CtaSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
