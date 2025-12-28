import { getAboutData, getOrganizationDetails } from "@/lib/api"
import AboutContent from "@/components/pages/yayasan/about-content"

export const metadata = {
    title: 'Tentang Kami - Yayasan Vidya Kertajaya',
    description: 'Profil lembaga Yayasan Vidya Kertajaya.',
}

export default async function YayasanAboutPage() {
    const aboutData = await getAboutData("yayasan")
    let orgDetail = null
    try {
        orgDetail = await getOrganizationDetails("yayasan")
    } catch (error) {
        console.error("Gagal mengambil data Organization Details:", error)
    }

    return <AboutContent data={aboutData} orgDetail={orgDetail} />
}