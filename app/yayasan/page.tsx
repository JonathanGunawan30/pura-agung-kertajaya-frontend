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
    getOrganizationDetails,
    getFeaturableReviews,
    getArticlesData
} from "@/lib/api"

import HeroCarousel from "@/components/sections/hero-carousel"
import AboutSection from "@/components/sections/yayasan/about-section"
import GallerySection from "@/components/sections/yayasan/gallery-section"
import ContactSection from "@/components/sections/contact-section"
import RemarksSection from "@/components/sections/remarks-section"
import FacilitiesSection from "@/components/sections/yayasan/facilities-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import ArticleSection from "@/components/sections/articles-section";
import ActivitiesSection from "@/components/sections/activities-section";

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
        organizationDetail,
        testimonialsData,
        articlesData,
        puraIdentity,
        pasramanIdentity
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
        getFeaturableReviews(),
        getArticlesData(),
        getSiteIdentity("pura"),
        getSiteIdentity("pasraman")
    ])

    const otherSites = [puraIdentity, pasramanIdentity].filter(Boolean)

    return (
        <main className="min-h-screen bg-blue-50/30">
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

            <GallerySection initialData={galleryData} entityType={ENTITY_TYPE} />

            <ArticleSection
                initialData={articlesData}
                entityType={ENTITY_TYPE}
            />

            <ActivitiesSection initialData={activitiesData} entityType={ENTITY_TYPE}/>

            <FacilitiesSection initialData={facilitiesData} entityType={ENTITY_TYPE} />

            <TestimonialsSection reviews={testimonialsData} entityType={ENTITY_TYPE} />

            <ContactSection initialData={contactData} entityType={ENTITY_TYPE} />
        </main>
    )
}