import Navigation from "@/components/layout/navigation"
import Footer from "@/components/layout/footer"
import { getSiteIdentity, getContactData } from "@/lib/api"

export const metadata = {
    title: 'Yayasan Vidya Kertajaya',
    description: 'Melayani umat melalui pendidikan dan sosial.',
}

export default async function YayasanLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [siteIdentity, contactData] = await Promise.all([
        getSiteIdentity("yayasan"),
        getContactData("yayasan")
    ])

    const fixedSiteIdentity = {
        logo_url: siteIdentity.logo_url, 
        site_name: "Yayasan Vidya Kertajaya"
    }

    return (
        <>
            <Navigation site={fixedSiteIdentity} entityType="yayasan" />
            
            <main className="min-h-screen">
                {children}
            </main>
            <Footer site={siteIdentity} contact={contactData} />
        </>
    )
}