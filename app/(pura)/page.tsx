export const revalidate = 60;

import {
    getAboutData,
    getActivitiesData,
    getGalleryData,
    getFacilitiesData,
    getFeaturableReviews,
    getContactData,
    getHeroSlides,
    getSiteIdentity,
    getRemarks,
    getArticlesData
} from "@/lib/api"

import HeroCarousel from "@/components/sections/hero-carousel"
import AboutSection from "@/components/sections/about-section"
import GallerySection from "@/components/sections/gallery-section"
import ActivitiesSection from "@/components/sections/activities-section"
import FacilitiesSection from "@/components/sections/facilities-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import ContactSection from "@/components/sections/contact-section"
import RemarksSection from "@/components/sections/remarks-section";
import ArticleSection from "@/components/sections/articles-section";

export default async function Home() {
    const ENTITY_TYPE = "pura"

    const [
        aboutData, 
        galleryData, 
        activitiesData, 
        facilitiesData, 
        testimonialsData, 
        contactData, 
        heroSlides, 
        siteIdentity, 
        remarksData, 
        articlesData,
        yayasanIdentity,
        pasramanIdentity
    ] = await Promise.all([
        getAboutData(ENTITY_TYPE),
        getGalleryData(ENTITY_TYPE),
        getActivitiesData(ENTITY_TYPE),
        getFacilitiesData(ENTITY_TYPE),
        getFeaturableReviews(),
        getContactData(ENTITY_TYPE),
        getHeroSlides(ENTITY_TYPE),
        getSiteIdentity(ENTITY_TYPE),
        getRemarks(ENTITY_TYPE),
        getArticlesData(),
        getSiteIdentity("yayasan"),
        getSiteIdentity("pasraman")
    ])

    const otherSites = [yayasanIdentity, pasramanIdentity].filter(Boolean)

    return (
        <main className="min-h-[100dvh]">
            <HeroCarousel
                slides={heroSlides}
                site={siteIdentity}
                entityType={ENTITY_TYPE}
                otherSites={otherSites}
            />

            <AboutSection initialData={aboutData} />

            <RemarksSection
                initialData={remarksData}
                entityType={ENTITY_TYPE}
                title="Kata Sambutan"
            />

            <GallerySection initialData={galleryData} />
            
            <ArticleSection 
                initialData={articlesData} 
                entityType={ENTITY_TYPE} 
            />

            <ActivitiesSection initialData={activitiesData} entityType={ENTITY_TYPE}/>
            
            <FacilitiesSection initialData={facilitiesData} entityType={ENTITY_TYPE}/>
            
            <TestimonialsSection reviews={testimonialsData} entityType={ENTITY_TYPE}/>
            
            <ContactSection initialData={contactData} entityType={ENTITY_TYPE} />
        </main>
    )
}