// app/layout.tsx
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { AOSProvider } from "@/components/providers/aos-provider"

const geistSans = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Pura Agung Kertajaya",
    description: "Portal resmi Pura Agung Kertajaya, Yayasan Vidya Kertajaya, dan Pasraman Nonformal Kertajaya.",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="id" suppressHydrationWarning>
            <body className={`${geistSans.className} bg-background text-foreground`}>
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
                    <AOSProvider>
                        {children}
                    </AOSProvider>
                </ThemeProvider>
                <Analytics />
            </body>
        </html>
    )
}