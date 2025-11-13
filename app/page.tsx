import HeroCarousel from "@/components/sections/hero-carousel"
import AboutSection from "@/components/sections/about-section"
import GallerySection from "@/components/sections/gallery-section"
import ActivitiesSection from "@/components/sections/activities-section"
import FacilitiesSection from "@/components/sections/facilities-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import ContactSection from "@/components/sections/contact-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroCarousel />
      <AboutSection />
      <GallerySection />
      <ActivitiesSection />
      <FacilitiesSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  )
}
