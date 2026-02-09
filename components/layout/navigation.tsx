"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Sun, Moon, Menu, X, ArrowRight } from "lucide-react"

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

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [isOpen])

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
            textAccent: "text-orange-600",
            bgAccent: "bg-orange-600",
        },
        yayasan: {
            hoverLine: "bg-blue-600",
            textAccent: "text-blue-600",
            bgAccent: "bg-blue-600",
        },
        pasraman: {
            hoverLine: "bg-emerald-600",
            textAccent: "text-emerald-600",
            bgAccent: "bg-emerald-600",
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

    const logoContainerClass = (!isSolid && (entityType === 'yayasan' || entityType === 'pasraman'))
        ? "bg-white p-2 rounded-full shadow-lg scale-110"
        : "bg-transparent scale-100"

    return (
        <>
            <nav
                className={`
                fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-in-out
                ${isSolid
                        ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-800/50 py-3"
                        : "bg-transparent py-5 md:py-6"
                    }
            `}
            >
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex items-center justify-between">

                        <Link href={`/${entityType === 'pura' ? '' : entityType}`} className="flex items-center gap-3 group min-w-0 z-50 relative">
                            <div
                                className={`
                                    relative flex-shrink-0 flex items-center justify-center transition-all duration-500
                                    ${logoContainerClass}
                                    ${isScrolled ? "w-10 h-10" : "w-12 h-12 md:w-14 md:h-14"}
                                `}
                            >
                                {site?.logo_url ? (
                                    <img
                                        src={site.logo_url}
                                        alt="logo"
                                        className="w-full h-full object-contain drop-shadow-sm"
                                    />
                                ) : (
                                    <div className={`w-full h-full rounded-full border-2 ${isSolid ? "border-gray-200" : "border-white/30"}`} />
                                )}
                            </div>

                            <div className="flex flex-col items-start justify-center min-w-0">
                                <span
                                    className={`font-bold transition-all duration-300 truncate leading-tight 
                                    ${isScrolled ? "text-base md:text-lg" : "text-lg md:text-xl"} 
                                    ${textColorClass}`}
                                >
                                    {site?.site_name || (entityType === 'pura' ? "Pura Agung Kertajaya" : entityType === 'yayasan' ? "Yayasan Vidya Kertajaya" : "Pasraman Nonformal Kertajaya")}
                                </span>

                                {(entityType === 'pura' || entityType === 'pasraman') && (
                                    <span className={`text-[9px] md:text-xs font-medium leading-tight tracking-wide opacity-80 uppercase mt-0.5 ${textColorClass}`}>
                                        Yayasan Vidya Kertajaya
                                    </span>
                                )}
                            </div>
                        </Link>

                        <div className="hidden lg:flex items-center gap-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`text-sm font-bold tracking-wide transition-colors relative group py-2 ${textColorClass} hover:opacity-80`}
                                >
                                    {item.label}
                                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${hoverLineClass}`} />
                                </Link>
                            ))}
                            
                            {mounted && (
                                <button
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    className={`ml-4 p-2 rounded-full transition-all ${isSolid
                                            ? "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                                            : "hover:bg-white/20 text-white"
                                        }`}
                                >
                                    {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-4 flex-shrink-0 lg:hidden z-50">
                            <button
                                onClick={() => setIsOpen((v) => !v)}
                                className={`p-2 rounded-full transition-all duration-300 ${isOpen ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100" : (isSolid ? "text-gray-900 dark:text-gray-100" : "text-white bg-black/20 backdrop-blur-sm")}`}
                                aria-label="Toggle mobile menu"
                            >
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div 
                className={`
                    fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl
                    flex flex-col justify-center items-center
                    transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                    ${isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-full invisible"}
                `}
            >
                <div className={`absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-10 blur-3xl ${currentTheme.bgAccent}`} />

                <div className="container px-6 flex flex-col items-center gap-8 w-full max-w-lg mx-auto relative z-10">
                    
                    <div className="flex flex-col items-center gap-6 w-full">
                        {navItems.map((item, idx) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`
                                    text-3xl md:text-4xl font-bold tracking-tight
                                    transition-all duration-300 hover:scale-105
                                    ${currentTheme.textAccent} hover:opacity-80
                                    animate-in slide-in-from-bottom-8 fade-in fill-mode-forwards
                                `}
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="w-12 h-1 bg-gray-200 dark:bg-gray-800 rounded-full my-4" />

                    <div className="flex flex-col items-center gap-6 w-full animate-in slide-in-from-bottom-8 fade-in fill-mode-forwards" style={{ animationDelay: '400ms' }}>
                        
                        <div className="flex flex-wrap justify-center gap-3">
                            {otherEntities.map((entity) => (
                                <Link
                                    key={entity.href}
                                    href={entity.href}
                                    onClick={() => setIsOpen(false)}
                                    className="px-5 py-2.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                                >
                                    {entity.label}
                                    <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                                </Link>
                            ))}
                        </div>

                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                            >
                                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}