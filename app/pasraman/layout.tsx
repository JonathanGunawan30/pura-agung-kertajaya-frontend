import Navigation from "@/components/layout/navigation"
import Footer from "@/components/layout/footer"
import { getSiteIdentity, getContactData } from "@/lib/api"

export const metadata = {
    title: 'Pasraman Kertajaya',
    description: 'Melayani umat melalui pendidikan dan sosial.',
}

export default async function YayasanLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [siteIdentity, contactData] = await Promise.all([
        getSiteIdentity("pasraman"),
        getContactData("pasraman")
    ])

    const fixedSiteIdentity = {
        logo_url: siteIdentity?.logo_url, 
        site_name: "Pasraman Kertajaya"
    }

    return (
        <>
            <Navigation site={fixedSiteIdentity} entityType="pasraman" />
            
            <main className="min-h-screen">
                {children}
            </main>
            <Footer site={siteIdentity} contact={contactData} />
        </>
    )
}