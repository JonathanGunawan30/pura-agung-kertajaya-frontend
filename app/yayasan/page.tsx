export const revalidate = 60;

import {
    getAboutData,
    getActivitiesData,
    getGalleryData,
    getFacilitiesData,
    getContactData,
    getHeroSlides,
    getSiteIdentity,
    getRemarks,
    getOrganizationDetails
} from "@/lib/api"

import HeroCarousel from "@/components/sections/hero-carousel"
import AboutSection from "@/components/sections/yayasan/about-section"
import GallerySection from "@/components/sections/yayasan/gallery-section"
import ContactSection from "@/components/sections/contact-section"
import RemarksSection from "@/components/sections/remarks-section"

export default async function YayasanPage() {
    const ENTITY_TYPE = "yayasan"

    const [
        aboutData, 
        galleryData, 
        activitiesData, 
        facilitiesData,
        contactData, 
        heroSlides, 
        siteIdentity,
        remarksData,
        organizationDetail
    ] = await Promise.all([
        getAboutData(ENTITY_TYPE),
        getGalleryData(ENTITY_TYPE),
        getActivitiesData(ENTITY_TYPE),
        getFacilitiesData(ENTITY_TYPE),
        getContactData(ENTITY_TYPE),
        getHeroSlides(ENTITY_TYPE),
        getSiteIdentity(ENTITY_TYPE),
        getRemarks(ENTITY_TYPE),
        getOrganizationDetails(ENTITY_TYPE),
    ])

    return (
        <main className="min-h-screen bg-blue-50/30">
            <HeroCarousel 
                slides={heroSlides} 
                site={siteIdentity} 
                entityType={ENTITY_TYPE} 
            />
            
            <AboutSection initialData={aboutData} />
            
            <RemarksSection 
                initialData={remarksData} 
                entityType={ENTITY_TYPE}
                title="Kata Sambutan"
            />

            <GallerySection initialData={galleryData} entityType={ENTITY_TYPE}/>
            
            <ContactSection initialData={contactData} entityType={ENTITY_TYPE}/>
        </main>
    )
}