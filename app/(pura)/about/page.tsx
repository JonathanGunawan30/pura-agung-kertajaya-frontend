import { getAboutData } from "@/lib/api"
import AboutContent from "@/components/pages/about-content"

export const metadata = {
    title: 'Tentang Kami - Pura Agung Kertajaya',
    description: 'Profil lengkap dan sejarah Pura Agung Kertajaya.',
}

export default async function AboutPage() {
    const aboutData = await getAboutData("pura")

    return <AboutContent data={aboutData} />
}