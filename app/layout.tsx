// app/layout.tsx
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"

const geistSans = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Pura Agung Kertajaya",
    description: "Portal resmi Pura Agung Kertajaya, Yayasan Vidya Kertajaya, dan Pasraman Kertajaya.",
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
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}