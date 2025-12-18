"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Sun, Moon, Menu, X } from "lucide-react"

export interface SiteIdentity {
    site_name: string
    logo_url: string
}

export default function Navigation({ site }: { site: SiteIdentity | null }) {
    const { theme, setTheme } = useTheme()
    const pathname = usePathname()
    const [mounted, setMounted] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        document.documentElement.style.overflowX = "hidden"
        document.body.style.overflowX = "hidden"
        return () => {
            document.documentElement.style.overflowX = ""
            document.body.style.overflowX = ""
        }
    }, [])

    useEffect(() => {
        setMounted(true)
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        handleScroll()
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
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

    const isHomePage = pathname === "/"
    const isSolid = isScrolled || isOpen || !isHomePage

    const textColorClass = isSolid
        ? "text-gray-900 dark:text-gray-100"
        : "text-white drop-shadow-md"

    const hoverLineClass = isSolid ? "bg-orange-600" : "bg-white"

    return (
        <nav
            className={`
        fixed top-0 inset-x-0 z-50 overflow-x-hidden transition-all duration-300
        ${isSolid
                ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-800/50 py-3"
                : "bg-transparent py-6"
            }
      `}
        >
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group min-w-0">
                        <div
                            className={`relative flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                                isScrolled ? "w-10 h-10" : "w-12 h-12 md:w-14 md:h-14"
                            }`}
                        >
                            {site?.logo_url ? (
                                <img
                                    src={site.logo_url}
                                    alt="logo"
                                    className="w-full h-full object-contain drop-shadow-sm"
                                />
                            ) : (
                                <div
                                    className={`w-full h-full rounded-full border-2 ${
                                        isSolid ? "border-gray-200" : "border-white/30"
                                    }`}
                                />
                            )}
                        </div>

                        <span
                            className={`hidden md:block font-bold transition-all duration-300 truncate ${
                                isScrolled ? "text-lg" : "text-xl"
                            } ${textColorClass}`}
                        >
                          {site?.site_name || "Pura Agung Kertajaya"}
                        </span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className={`text-sm font-bold tracking-wide transition-colors relative group py-2 ${textColorClass} hover:opacity-80`}
                            >
                                {item.label}
                                <span
                                    className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${hoverLineClass}`}
                                />
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0">
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className={`p-2 rounded-full transition-all ${
                                    isSolid
                                        ? "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                                        : "hover:bg-white/20 text-white"
                                }`}
                                aria-label="Toggle theme"
                            >
                                {theme === "dark" ? (
                                    <Sun className="w-5 h-5" />
                                ) : (
                                    <Moon className="w-5 h-5" />
                                )}
                            </button>
                        )}

                        <button
                            onClick={() => setIsOpen((v) => !v)}
                            className={`lg:hidden p-2 rounded-lg transition-all ${
                                isSolid ? "text-gray-900 dark:text-gray-100" : "text-white"
                            }`}
                            aria-label="Toggle mobile menu"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <div className="lg:hidden mt-4 pb-4 border-t border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-top-5 duration-300">
                        <div className="flex flex-col space-y-2 pt-4">
                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="block px-4 py-3 text-sm font-medium rounded-xl text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-800 hover:text-orange-600 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}