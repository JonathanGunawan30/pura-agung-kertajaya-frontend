import {getAboutData, getActivitiesData, getGalleryData, getFacilitiesData, getTestimonialsData, getContactData} from "@/lib/api"

import HeroCarousel from "@/components/sections/hero-carousel"
import AboutSection from "@/components/sections/about-section"
import GallerySection from "@/components/sections/gallery-section"
import ActivitiesSection from "@/components/sections/activities-section"
import FacilitiesSection from "@/components/sections/facilities-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import ContactSection from "@/components/sections/contact-section"

export default async function Home() {
    const [aboutData, galleryData, activitiesData, facilitiesData, testimonialsData, contactData] = await Promise.all([
        getAboutData(),
        getGalleryData(),
        getActivitiesData(),
        getFacilitiesData(),
        getTestimonialsData(),
        getContactData()
    ])

    return (
        <main className="min-h-screen">
            <HeroCarousel />
            <AboutSection initialData={aboutData} />
            <GallerySection initialData={galleryData}/>
            <ActivitiesSection initialData={activitiesData}/>
            <FacilitiesSection initialData={facilitiesData}/>
            <TestimonialsSection initialData={testimonialsData} />
            <ContactSection initialData={contactData}/>
        </main>
    )
}