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
import AboutSectionPasraman from "@/components/sections/pasraman/about-section"
import ActivityGallerySection from "@/components/sections/pasraman/gallery-section"
import FacilitiesSectionPasraman from "@/components/sections/pasraman/facilities-section"
import ContactSection from "@/components/sections/contact-section"
import RemarksSection from "@/components/sections/remarks-section"

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
        <main className="min-h-screen bg-emerald-50/20">
            <HeroCarousel 
                slides={heroSlides} 
                site={siteIdentity} 
                entityType={ENTITY_TYPE} 
            />
            
            <AboutSectionPasraman initialData={aboutData} />
            
            <RemarksSection 
                initialData={remarksData} 
                entityType={ENTITY_TYPE}
                title="Sambutan Kepala Pasraman"
            />

            <FacilitiesSectionPasraman initialData={facilitiesData} />

            <ActivityGallerySection 
                initialData={galleryData} 
                entityType={ENTITY_TYPE}
                title="Galeri Pendidikan"
                subtitle="Dokumentasi Siswa"
                description="Kumpulan momen proses belajar mengajar, praktik keagamaan, dan kreativitas siswa Pasraman Kertajaya."
            />
            
            <ContactSection initialData={contactData} entityType={ENTITY_TYPE}/>
        </main>
    )
}