'use client'

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react"
import { useMemo } from "react"

interface FooterProps {
    site?: {
        site_name?: string
        tagline?: string
    } | null
    contact?: {
        address?: string
        phone?: string
        email?: string
    } | null
}
type EntityType = 'pura' | 'yayasan' | 'pasraman';

export default function Footer({ site, contact }: FooterProps) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    
    const activeEntity: EntityType = useMemo(() => {
        const ref = searchParams.get('ref')
        
        if (ref === 'yayasan') return 'yayasan'
        if (ref === 'pasraman') return 'pasraman'
        if (ref === 'pura') return 'pura'

        if (pathname.startsWith('/yayasan')) return 'yayasan'
        if (pathname.startsWith('/pasraman')) return 'pasraman'
        
        return 'pura'
    }, [pathname, searchParams])

    const entityConfig = {
        pura: {
            colors: {
                accent: 'bg-orange-600',
                text: 'text-orange-600',
                hover: 'hover:text-orange-600 dark:hover:text-orange-500',
                iconText: 'text-orange-600'
            },
            explore: [
                { name: "Beranda", href: "/" },
                { name: "Tentang Kami", href: "/#about" },
                { name: "Galeri Kegiatan", href: "/#gallery" },
                { name: "Agenda & Jadwal", href: "/#activities" },
                { name: "Fasilitas Pura", href: "/#facilities" },
            ],
            basePath: ''
        },
        yayasan: {
            colors: {
                accent: 'bg-blue-600',
                text: 'text-blue-600',
                hover: 'hover:text-blue-600 dark:hover:text-blue-500',
                iconText: 'text-blue-600'
            },
            explore: [
                { name: "Beranda", href: "/yayasan" },
                { name: "Tentang Kami", href: "/yayasan#about" },
                { name: "Galeri Kegiatan", href: "/yayasan#gallery" },
                { name: "Hubungi Kami", href: "/yayasan#contact" },
            ],
            basePath: '/yayasan'
        },
        pasraman: {
            colors: {
                accent: 'bg-green-600',
                text: 'text-green-600',
                hover: 'hover:text-green-600 dark:hover:text-green-500',
                iconText: 'text-green-600'
            },
            explore: [
                { name: "Beranda", href: "/pasraman" },
                { name: "Tentang Kami", href: "/pasraman#about" },
                { name: "Galeri Kegiatan", href: "/pasraman#gallery" },
                { name: "Hubungi Kami", href: "/pasraman#contact" },
            ],
            basePath: '/pasraman'
        }
    }

    const currentTheme = entityConfig[activeEntity]
    const { colors, explore, basePath } = currentTheme

    const infoLinks = [
        { name: "Struktur Organisasi", href: `${basePath}/organization` },
        { name: "Hubungi Kami", href: `${basePath}/#contact` }, 
        { name: "Kebijakan Privasi", href: "/privacy" },
        { name: "Syarat & Ketentuan", href: "/terms" },
    ]

    return (
        <footer className="bg-white dark:bg-gray-950 pt-20 pb-10 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-6 md:px-12">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {site?.site_name || "Pura Agung Kertajaya"}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-4 leading-relaxed">
                                {site?.tagline || "Tempat suci umat Hindu di Tangerang yang menjadi pusat kegiatan spiritual, pelestarian budaya, dan kebersamaan umat yang harmonis."}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                            <span className={`w-8 h-[2px] ${colors.accent}`}></span> Jelajahi
                        </h4>
                        <ul className="space-y-3">
                            {explore.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className={`text-gray-500 dark:text-gray-400 ${colors.hover} transition-colors flex items-center gap-2 group text-sm`}>
                                        <ArrowRight className={`w-3 h-3 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 ${colors.text}`} />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                            <span className={`w-8 h-[2px] ${colors.accent}`}></span> Informasi
                        </h4>
                        <ul className="space-y-3">
                            {infoLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className={`text-gray-500 dark:text-gray-400 ${colors.hover} transition-colors text-sm`}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                            <span className={`w-8 h-[2px] ${colors.accent}`}></span> Kontak
                        </h4>
                        <div className="space-y-4">
                            {contact ? (
                                <>
                                    <div className="flex items-start gap-3 text-gray-500 dark:text-gray-400 text-sm">
                                        <MapPin className={`w-5 h-5 ${colors.iconText} shrink-0 mt-0.5`} />
                                        <span className="leading-relaxed">{contact.address}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                                        <Phone className={`w-5 h-5 ${colors.iconText} shrink-0`} />
                                        <span>{contact.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                                        <Mail className={`w-5 h-5 ${colors.iconText} shrink-0`} />
                                        <span className="break-all">{contact.email}</span>
                                    </div>
                                </>
                            ) : (
                                <p className="text-gray-500 text-sm italic">Memuat informasi kontak...</p>
                            )}
                        </div>
                    </div>

                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                    <p>&copy; {new Date().getFullYear()} {site?.site_name || "Pura Agung Kertajaya"}. All rights reserved.</p>
                    <p>Designed & Developed with <span className="text-red-500">❤</span> for the Community.</p>
                </div>
            </div>
        </footer>
    )
}