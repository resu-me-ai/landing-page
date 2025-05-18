import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import HowItWorksSection from "@/components/how-it-works-section"
import FooterSection from "@/components/footer-section"

export const metadata: Metadata = {
  title: "ResumeAI - AI-Powered Resume Builder & Interview Prep",
  description:
    "Build a professional resume and prepare for interviews with our AI-powered platform featuring mock interviews with AI voice avatars.",
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
      </main>
      <FooterSection />
    </div>
  )
}
