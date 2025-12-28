import { getAboutData, getOrganizationDetails } from "@/lib/api"
import AboutContent from "@/components/pages/pasraman/about-content"

export const metadata = {
    title: 'Tentang Kami - Pasraman Kertajaya',
    description: 'Profil lembaga pendidikan keagamaan Pasraman Kertajaya.',
}

export default async function PasramanAboutPage() {
    const aboutData = await getAboutData("pasraman")
    let orgDetail = null
    
    try {
        orgDetail = await getOrganizationDetails("pasraman")
    } catch (error) {
        console.error("Gagal mengambil data Organization Details Pasraman:", error)
    }

    return <AboutContent data={aboutData} orgDetail={orgDetail} />
}