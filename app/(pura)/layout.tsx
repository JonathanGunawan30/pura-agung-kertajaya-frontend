import Navigation from "@/components/layout/navigation"
import Footer from "@/components/layout/footer"
import { getSiteIdentity, getContactData } from "@/lib/api"

export default async function PuraLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [siteIdentity, contactData] = await Promise.all([
        getSiteIdentity("pura"),
        getContactData("pura")
    ])

    return (
        <>
            <Navigation site={siteIdentity} entityType="pura" />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer site={siteIdentity} contact={contactData} />
        </>
    )
}