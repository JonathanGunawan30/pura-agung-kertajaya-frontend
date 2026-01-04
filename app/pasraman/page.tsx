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
import AboutSectionPasraman from "@/components/sections/pasraman/about-section"
import ActivityGallerySection from "@/components/sections/pasraman/gallery-section"
import FacilitiesSectionPasraman from "@/components/sections/pasraman/facilities-section"
import ContactSection from "@/components/sections/contact-section"
import RemarksSection from "@/components/sections/remarks-section"
import TestimonialsSection from "@/components/sections/testimonials-section";
import ArticleSection from "@/components/sections/articles-section";
import ActivitiesSection from "@/components/sections/activities-section";

export default async function PasramanPage() {
    const ENTITY_TYPE = "pasraman"

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
        yayasanIdentity
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
        getSiteIdentity("yayasan")
    ])

    const otherSites = [puraIdentity, yayasanIdentity].filter(Boolean)

    return (
        <main className="min-h-screen bg-emerald-50/20">
            <HeroCarousel
                slides={heroSlides}
                site={siteIdentity}
                entityType={ENTITY_TYPE}
                otherSites={otherSites}
            />

            <AboutSectionPasraman initialData={aboutData} />

            <RemarksSection
                initialData={remarksData}
                entityType={ENTITY_TYPE}
                title="Sambutan Kepala Pasraman"
            />

            <ActivityGallerySection
                initialData={galleryData}
                entityType={ENTITY_TYPE}
                title="Galeri Pendidikan"
                subtitle="Dokumentasi Siswa"
                description="Kumpulan momen proses belajar mengajar, praktik keagamaan, dan kreativitas siswa Pasraman Kertajaya."
            />

            <ArticleSection
                initialData={articlesData}
                entityType={ENTITY_TYPE}
            />

            <ActivitiesSection initialData={activitiesData} entityType={ENTITY_TYPE}/>

            <FacilitiesSectionPasraman initialData={facilitiesData} />

            <TestimonialsSection reviews={testimonialsData} entityType={ENTITY_TYPE} />

            <ContactSection initialData={contactData} entityType={ENTITY_TYPE} />
        </main>
    )
}