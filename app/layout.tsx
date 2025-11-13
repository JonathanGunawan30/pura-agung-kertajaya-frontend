import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import Navigation from "@/components/layout/navigation"
import Footer from "@/components/layout/footer"

const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

interface SiteIdentityData {
  logo_url: string;
}

interface ApiResponse {
  data?: SiteIdentityData;
  logo_url?: string;
}

export async function generateMetadata(): Promise<Metadata> {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080";
  const API_URL = `${BASE_URL}/api/public/site-identity`;

  let faviconUrl = "/placeholder-logo.svg";

  try {
    const res = await fetch(API_URL, { cache: "no-store" });

    if (res.ok) {
      const data: ApiResponse = await res.json();
      if (data?.data?.logo_url) {
        faviconUrl = data.data.logo_url;
      } else if (data?.logo_url) {
        faviconUrl = data.logo_url;
      }
    }
  } catch (err) {
    console.error("Gagal mengambil site identity:", err);
  }

  return {
    title: "Pura Agung Kertajaya",
    description:
      "Pura Agung Kertajaya adalah tempat suci umat Hindu di wilayah Tangerang yang menjadi pusat kegiatan spiritual, budaya, dan kebersamaan umat.",
    keywords: "Pura Agung Kertajaya, Hindu temple, Pura Tangerang, Tempat suci umat Hindu, Pua Agung",
    icons: {
      icon: [
        { url: faviconUrl, type: "image/png" }
      ],
    },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: "https://puraagungkertajaya.com",
      title: "Pura Agung Kertajaya",
      description: "Pura Agung Kertajaya adalah tempat suci umat Hindu di wilayah Tangerang yang menjadi pusat kegiatan spiritual, budaya, dan kebersamaan umat.",
      images: [
        {
          url: "/pura-agung-kertajaya.jpg",
          width: 1200,
          height: 1200,
          alt: "Pura Agung Kertajaya",
        },
      ],
    },
    robots: "index, follow"
  }
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
          <Navigation />
            <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}