"use client"

import { useEffect } from "react"
import { Mail, Phone, MapPin, Clock, Navigation, ArrowRight } from "lucide-react"

type EntityType = "pura" | "yayasan" | "pasraman"

interface ContactInfo {
    id: string
    address: string
    phone: string
    email: string
    visiting_hours: string
    map_embed_url: string
}

interface ContactSectionProps {
    initialData: ContactInfo | null
    entityType: EntityType
    title?: string
    subtitle?: string
}

export default function ContactSection({ 
    initialData, 
    entityType, 
    title = "Kunjungi Kami", 
    subtitle = "Lokasi & Kontak" 
}: ContactSectionProps) {
    
    useEffect(() => {
        
    }, [])

    if (!initialData) return null;

    const themeConfig = {
        pura: {
            line: "bg-orange-600",
            text: "text-orange-600",
            iconBg: "bg-orange-50 dark:bg-orange-900/20",
            iconText: "text-orange-600",
            iconHover: "group-hover:bg-orange-600",
            clockIcon: "text-orange-600",
            buttonBg: "bg-orange-600 hover:bg-orange-700",
            buttonShadow: "shadow-orange-600/30",
            gradientText: "text-orange-600",
        },
        yayasan: {
            line: "bg-blue-600",
            text: "text-blue-600",
            iconBg: "bg-blue-50 dark:bg-blue-900/20",
            iconText: "text-blue-600",
            iconHover: "group-hover:bg-blue-600",
            clockIcon: "text-blue-600",
            buttonBg: "bg-blue-600 hover:bg-blue-700",
            buttonShadow: "shadow-blue-600/30",
            gradientText: "text-blue-600",
        },
        pasraman: {
            line: "bg-emerald-600",
            text: "text-emerald-600",
            iconBg: "bg-emerald-50 dark:bg-emerald-900/20",
            iconText: "text-emerald-600",
            iconHover: "group-hover:bg-emerald-600",
            clockIcon: "text-emerald-600",
            buttonBg: "bg-emerald-600 hover:bg-emerald-700",
            buttonShadow: "shadow-emerald-600/30",
            gradientText: "text-emerald-600",
        },
    }

    const theme = themeConfig[entityType] || themeConfig.pura

    return (
        <section id="contact" className="py-20 md:py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-12 md:mb-16" data-aos="fade-up">
                    <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center gap-3 md:gap-4">
                            <div className={`h-[2px] w-8 md:w-12 ${theme.line}`}></div>
                            <span className={`${theme.text} dark:text-gray-300 text-xs md:text-sm font-bold tracking-[0.2em] uppercase`}>
                                {subtitle}
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                            {title.split(' ').slice(0, -1).join(' ')} <span className={theme.gradientText}>{title.split(' ').pop()}</span>
                        </h2>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md text-sm md:text-base leading-relaxed text-left md:text-right">
                        Kami menantikan kehadiran Anda. Berikut informasi lengkap untuk menghubungi dan mengunjungi kami.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    <div className="lg:col-span-5 bg-white dark:bg-gray-800 rounded-3xl md:rounded-[2rem] p-6 md:p-10 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700" data-aos="fade-up">

                        <div className="flex gap-4 md:gap-5 mb-6 md:mb-8">
                            <div className={`shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl ${theme.iconBg} flex items-center justify-center ${theme.iconText}`}>
                                <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-base md:text-lg text-gray-900 dark:text-white mb-1 md:mb-2">Alamat</h4>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                                    {initialData.address}
                                </p>
                            </div>
                        </div>

                        <hr className="border-dashed border-gray-200 dark:border-gray-700 mb-6 md:mb-8" />

                        <div className="space-y-5 md:space-y-6 mb-6 md:mb-8">
                            <div className="flex items-center gap-4 md:gap-5 group cursor-pointer">
                                <div className={`shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl ${theme.iconBg} flex items-center justify-center ${theme.iconText} ${theme.iconHover} group-hover:text-white transition-all duration-300`}>
                                    <Phone className="w-4 h-4 md:w-5 md:h-5" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">Telepon / WhatsApp</h4>
                                    <a href={`tel:${initialData.phone}`} className={`text-gray-600 dark:text-gray-400 hover:${theme.text} transition-colors text-sm md:text-base block truncate`}>
                                        {initialData.phone}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 md:gap-5 group cursor-pointer">
                                <div className={`shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl ${theme.iconBg} flex items-center justify-center ${theme.iconText} ${theme.iconHover} group-hover:text-white transition-all duration-300`}>
                                    <Mail className="w-4 h-4 md:w-5 md:h-5" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">Email</h4>
                                    <a href={`mailto:${initialData.email}`} className={`text-gray-600 dark:text-gray-400 hover:${theme.text} transition-colors text-sm md:text-base break-all line-clamp-1`}>
                                        {initialData.email}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-5 md:p-6 border border-gray-100 dark:border-gray-700">
                            <div className={`flex items-center gap-2 md:gap-3 mb-2 ${theme.clockIcon}`}>
                                <Clock className="w-4 h-4 md:w-5 md:h-5" />
                                <span className="font-bold uppercase tracking-wider text-[10px] md:text-xs">Jam Operasional</span>
                            </div>
                            <p className="text-gray-900 dark:text-white font-medium text-base md:text-lg">
                                {initialData.visiting_hours}
                            </p>
                        </div>

                    </div>

                    <div className="lg:col-span-7 h-[350px] md:h-[450px] lg:h-full lg:min-h-[500px]" data-aos="fade-up" data-aos-delay="200">
                        <div className="relative w-full h-full rounded-3xl md:rounded-[2rem] overflow-hidden shadow-2xl bg-gray-200 group">

                            <iframe
                                src={initialData.map_embed_url}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full"
                            ></iframe>

                            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-auto md:right-8">
                                <a
                                    href={`https://www.google.com/maps/dir/?api=1&destination=pura agung kertajaya`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`
                                        flex items-center justify-center gap-2 md:gap-3
                                        ${theme.buttonBg} text-white
                                        px-6 py-3 md:px-8 md:py-4 rounded-full
                                        font-bold text-sm md:text-base
                                        shadow-lg ${theme.buttonShadow}
                                        transform transition-all duration-300 hover:scale-105 hover:-translate-y-1
                                        w-full md:w-auto
                                    `}
                                >
                                    <Navigation className="w-4 h-4 md:w-5 md:h-5" />
                                    <span>Petunjuk Arah</span>
                                    <ArrowRight className="w-4 h-4 opacity-70" />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

