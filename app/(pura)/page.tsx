export const revalidate = 60;

import {
    getAboutData, 
    getActivitiesData, 
    getGalleryData, 
    getFacilitiesData, 
    getTestimonialsData, 
    getContactData, 
    getHeroSlides, 
    getSiteIdentity
} from "@/lib/api"

import HeroCarousel from "@/components/sections/hero-carousel"
import AboutSection from "@/components/sections/about-section"
import GallerySection from "@/components/sections/gallery-section"
import ActivitiesSection from "@/components/sections/activities-section"
import FacilitiesSection from "@/components/sections/facilities-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import ContactSection from "@/components/sections/contact-section"

export default async function Home() {
    const ENTITY_TYPE = "pura"

    const [aboutData, galleryData, activitiesData, facilitiesData, testimonialsData, contactData, heroSlides, siteIdentity] = await Promise.all([
        getAboutData(ENTITY_TYPE),
        getGalleryData(ENTITY_TYPE),
        getActivitiesData(ENTITY_TYPE),
        getFacilitiesData(ENTITY_TYPE),
        getTestimonialsData(),
        getContactData(ENTITY_TYPE),
        getHeroSlides(ENTITY_TYPE),
        getSiteIdentity(ENTITY_TYPE),
    ])

    return (
        <main className="min-h-screen">
            <HeroCarousel 
                slides={heroSlides} 
                site={siteIdentity} 
                entityType={ENTITY_TYPE} 
            />
            
            <AboutSection initialData={aboutData} />
            <GallerySection initialData={galleryData}/>
            <ActivitiesSection initialData={activitiesData}/>
            <FacilitiesSection initialData={facilitiesData}/>
            <TestimonialsSection initialData={testimonialsData} />
            <ContactSection initialData={contactData} entityType={ENTITY_TYPE}/>
        </main>
    )
}