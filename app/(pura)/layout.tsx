import Navigation from "@/components/layout/navigation"
import Footer from "@/components/layout/footer"
import { getSiteIdentity, getContactData, getHeroSlides } from "@/lib/api"
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
    const [siteIdentity, heroSlides] = await Promise.all([
        getSiteIdentity("pura"),
        getHeroSlides("pura")
    ])
    let shareImage = siteIdentity?.logo_url || '/default-share.jpg'

    if (heroSlides && Array.isArray(heroSlides) && heroSlides.length > 0) {
        const sortedSlides = heroSlides.sort((a: any, b: any) => a.order_index - b.order_index);
        const mainSlide = sortedSlides[0];
        if (mainSlide.images && mainSlide.images['fhd']) {
            shareImage = mainSlide.images['fhd'];
        }
    }

    return {
        title: {
            default: siteIdentity?.site_name || 'Pura Agung Kertajaya',
            template: `%s | ${siteIdentity?.site_name || 'Pura Agung Kertajaya'}`
        },
        description: siteIdentity?.description || 'Tempat peribadatan dan pusat kegiatan umat Hindu di Tangerang.',
        icons: {
            icon: siteIdentity?.logo_url || '/favicon.ico'
        },
        openGraph: {
            title: siteIdentity?.site_name,
            description: siteIdentity?.description,
            siteName: siteIdentity?.site_name,
            images: [
                {
                    url: shareImage,
                    width: 1200,
                    height: 630,
                    alt: siteIdentity?.site_name,
                }
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: siteIdentity?.site_name,
            description: siteIdentity?.description,
            images: [shareImage],
        },
    }
}

export default async function PuraLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [siteIdentity, contactData] = await Promise.all([
        getSiteIdentity("pura"),
        getContactData("pura")
    ])

    const fixedSiteIdentity = {
        logo_url: siteIdentity?.logo_url, 
        site_name: siteIdentity?.site_name
    }

    return (
        <>
            <Navigation site={fixedSiteIdentity} entityType="pura" />
            
            <main className="min-h-screen">
                {children}
            </main>
            <Footer site={siteIdentity} contact={contactData} />
        </>
    )
}