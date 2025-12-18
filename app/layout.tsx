import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import Navigation from "@/components/layout/navigation"
import Footer from "@/components/layout/footer"

import { getSiteIdentity, getContactData } from "@/lib/api"

const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {

    const title = "Pura Agung Kertajaya"
    const icon = "/favicon.ico"

    return {
        title: title,
        description:
            "Pura Agung Kertajaya adalah tempat suci umat Hindu di wilayah Tangerang yang menjadi pusat kegiatan spiritual, budaya, dan kebersamaan umat.",
        keywords: "Pura Agung Kertajaya, Hindu temple, Pura Tangerang, Tempat suci umat Hindu, Pura Agung",
        icons: {
            icon: icon,
        },
        openGraph: {
            type: "website",
            locale: "id_ID",
            url: "https://puraagungkertajaya.com",
            title: title,
            description: "Pura Agung Kertajaya adalah tempat suci umat Hindu di wilayah Tangerang.",
            images: [
                {
                    url: "/pura-agung-kertajaya.jpg",
                    width: 1200,
                    height: 1200,
                    alt: title,
                },
            ],
        },
        robots: "index, follow"
    }
}

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode
}) {

    const [siteIdentity, contactData] = await Promise.all([
        getSiteIdentity(),
        getContactData()
    ])

    return (
        <html lang="id" suppressHydrationWarning>
        <body className={`${geistSans.className} bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>

            <Navigation site={siteIdentity} />

            <main className="min-h-screen">
                {children}
            </main>

            <Footer site={siteIdentity} contact={contactData} />

        </ThemeProvider>
        </body>
        </html>
    )
}