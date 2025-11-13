"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Sun, Moon, Menu, X } from "lucide-react"

interface SiteIdentity {
    site_name: string
    logo_url: string
}

export default function Navigation({ isLoading = false }: { isLoading?: boolean }) {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [site, setSite] = useState<SiteIdentity | null>(null)


    useEffect(() => {
        setMounted(true)
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        const fetchSite = async () => {
            try {
                const res = await fetch("/api/public/site-identity")
                const data = await res.json()
                setSite(data.data || null)
            } catch (err) {
                console.error("Failed to load site identity:", err)
            }
        }
        fetchSite()
    }, [])

    const navItems = [
        { label: "Beranda", href: "/#home" },
        { label: "Tentang", href: "/#about" },
        { label: "Galeri", href: "/#gallery" },
        { label: "Aktivitas", href: "/#activities" },
        { label: "Fasilitas", href: "/#facilities" },
        { label: "Organisasi", href: "/organization" },
        { label: "Kontak", href: "/#contact" },
    ]

    return (
        <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-background/40 backdrop-blur-md">
            <div className="section-container">
                <div className="flex items-center justify-between h-16 md:h-20">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-14 h-14 flex items-center justify-center">
                            {!isLoading && site?.logo_url && (
                                <img
                                    src={site.logo_url}
                                    alt="logo"
                                    className="w-full h-full object-contain"
                                />
                            )}
                        </div>



                        <span className="hidden sm:inline font-bold text-lg text-foreground whitespace-nowrap">
                          {site?.site_name || "Pura Agung Kertajaya"}
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="text-foreground transition-colors font-medium text-sm relative group hover-orange"
                            >
                                {item.label}
                                <span
                                    className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                                    style={{ backgroundColor: "var(--orange)" }}
                                ></span>
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="p-2 rounded-lg transition-all hover:bg-white/10 dark:hover:bg-white/20"
                            >
                                {theme === "dark" ? (
                                    <Sun className="w-5 h-5 text-yellow-400" />
                                ) : (
                                    <Moon className="w-5 h-5 text-gray-700" />
                                )}
                            </button>
                        )}

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 rounded-lg transition-all text-foreground hover:bg-white/10 dark:hover:bg-white/20"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <div className="md:hidden pb-4 border-t border-foreground/10 animate-fade-in-up">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="block px-4 py-2 text-foreground rounded-lg transition-colors hover-orange hover:bg-foreground/5"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    )
}
