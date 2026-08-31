import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/landing/Hero";
import { Features } from "../components/landing/Features";
import { FeatureSection } from "../components/landing/FeatureSection";
import { HowItWorks } from "../components/landing/HowItWorks";
import { Stats } from "../components/landing/Stats";
import { Testimonials } from "../components/landing/Testimonials";
import { FAQ } from "../components/landing/FAQ";
import { CTASection } from "../components/landing/CTASection";

export function LandingPage() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-white text-foreground">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <FeatureSection />
        <HowItWorks />
        <Stats />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
