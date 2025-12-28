"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Sun, Moon, Menu, X, ChevronDown, ExternalLink } from "lucide-react"

export interface SiteIdentity {
    site_name: string
    logo_url: string
}

type EntityType = "pura" | "yayasan" | "pasraman"

interface NavigationProps {
    site: SiteIdentity | null
    entityType?: EntityType
}

export default function Navigation({ site, entityType = "pura" }: NavigationProps) {
    const { theme, setTheme } = useTheme()
    const pathname = usePathname()
    const [mounted, setMounted] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isDropdownHovered, setIsDropdownHovered] = useState(false)

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

    const themeConfig = {
        pura: {
            hoverLine: "bg-orange-600",
            mobileHoverBg: "hover:bg-orange-50 dark:hover:bg-orange-900/20",
            mobileHoverText: "hover:text-orange-600",
            dropdownTextHover: "hover:text-orange-600",
            textAccent: "text-orange-600",
        },
        yayasan: {
            hoverLine: "bg-blue-600",
            mobileHoverBg: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
            mobileHoverText: "hover:text-blue-600",
            dropdownTextHover: "hover:text-blue-600",
            textAccent: "text-blue-600",
        },
        pasraman: {
            hoverLine: "bg-emerald-600",
            mobileHoverBg: "hover:bg-emerald-50 dark:hover:bg-emerald-900/20",
            mobileHoverText: "hover:text-emerald-600",
            dropdownTextHover: "hover:text-emerald-600",
            textAccent: "text-emerald-600",
        },
    }

    const currentTheme = themeConfig[entityType] || themeConfig.pura

    const getNavItems = (type: EntityType) => {
        const rootPath = type === 'pura' ? '' : `/${type}`
        
        const baseItems = [
            { label: "Beranda", href: `${rootPath}/` },
            { label: "Tentang", href: `${rootPath}/#about` },
            { label: "Galeri", href: `${rootPath}/#gallery` },
        ]

        if (type === 'pura') {
            return [
                ...baseItems,
                { label: "Aktivitas", href: "/#activities" },
                { label: "Fasilitas", href: "/#facilities" },
                { label: "Organisasi", href: "/organization" },
                { label: "Kontak", href: "/#contact" },
            ]
        }

        return [
            ...baseItems,
            { label: "Organisasi", href: `${rootPath}/organization` },
            { label: "Kontak", href: `${rootPath}/#contact` },
        ]
    }

    const navItems = getNavItems(entityType)

    const otherEntities = [
        { label: "Pura", href: "/", type: "pura" },
        { label: "Yayasan", href: "/yayasan", type: "yayasan" },
        { label: "Pasraman", href: "/pasraman", type: "pasraman" },
    ].filter(item => item.type !== entityType)

    const isHomePage = pathname === "/" || pathname === `/${entityType}`
    const isSolid = isScrolled || isOpen || !isHomePage

    const textColorClass = isSolid
        ? "text-gray-900 dark:text-gray-100"
        : "text-white drop-shadow-md"

    const hoverLineClass = isSolid ? currentTheme.hoverLine : "bg-white"

    return (
        <nav
            className={`
                fixed top-0 inset-x-0 z-50 transition-all duration-300
                ${isSolid
                    ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-800/50 py-3"
                    : "bg-transparent py-6"
                }
            `}
        >
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between">
                    <Link href={`/${entityType === 'pura' ? '' : entityType}`} className="flex items-center gap-3 group min-w-0">
                        <div
                            className={`relative flex-shrink-0 flex items-center justify-center transition-all duration-300 ${isScrolled ? "w-10 h-10" : "w-12 h-12 md:w-14 md:h-14"
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
                                    className={`w-full h-full rounded-full border-2 ${isSolid ? "border-gray-200" : "border-white/30"
                                        }`}
                                />
                            )}
                        </div>

                        <span
                            className={`hidden md:block font-bold transition-all duration-300 truncate ${isScrolled ? "text-lg" : "text-xl"
                                } ${textColorClass}`}
                        >
                            {site?.site_name || (entityType === 'pura' ? "Pura Agung Kertajaya" : entityType === 'yayasan' ? "Yayasan Vidya Kertajaya" : "Pasraman Vidya Kertajaya")}
                        </span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-sm font-bold tracking-wide transition-colors relative group py-2 ${textColorClass} hover:opacity-80`}
                            >
                                {item.label}
                                <span
                                    className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${hoverLineClass}`}
                                />
                            </Link>
                        ))}

                        <div 
                            className="relative py-2"
                            onMouseEnter={() => setIsDropdownHovered(true)}
                            onMouseLeave={() => setIsDropdownHovered(false)}
                        >
                            <button
                                className={`flex items-center gap-1 text-sm font-bold tracking-wide transition-colors ${textColorClass} hover:opacity-80`}
                            >
                                Lembaga Lain
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownHovered ? 'rotate-180' : ''}`} />
                            </button>
                            
                            <div className={`
                                absolute top-full right-0 w-48 pt-4
                                transition-all duration-200 origin-top-right
                                ${isDropdownHovered ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible pointer-events-none'}
                            `}>
                                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden py-1">
                                    {otherEntities.map((entity) => (
                                        <Link
                                            key={entity.href}
                                            href={entity.href}
                                            className={`flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 ${currentTheme.dropdownTextHover} transition-colors`}
                                        >
                                            <span>{entity.label}</span>
                                            <ExternalLink className="w-3 h-3 opacity-50" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0">
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className={`p-2 rounded-full transition-all ${isSolid
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
                            className={`lg:hidden p-2 rounded-lg transition-all ${isSolid ? "text-gray-900 dark:text-gray-100" : "text-white"
                                }`}
                            aria-label="Toggle mobile menu"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <div className="lg:hidden mt-4 pb-4 border-t border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-top-5 duration-300 bg-white dark:bg-gray-950 rounded-b-2xl shadow-lg">
                        <div className="flex flex-col space-y-1 pt-4 px-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`block px-4 py-3 text-sm font-medium rounded-xl text-gray-700 dark:text-gray-200 ${currentTheme.mobileHoverBg} ${currentTheme.mobileHoverText} transition-colors`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            
                            <div className="my-2 border-t border-gray-100 dark:border-gray-800" />
                            
                            <p className={`px-4 py-2 text-xs font-bold uppercase tracking-wider opacity-60 ${currentTheme.textAccent}`}>Lembaga Lain</p>
                            
                            {otherEntities.map((entity) => (
                                <Link
                                    key={entity.href}
                                    href={entity.href}
                                    className="flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {entity.label}
                                    <ExternalLink className="w-3 h-3 opacity-50" />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}