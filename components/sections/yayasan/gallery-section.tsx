"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { X, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"
import Link from "next/link"

export interface Gallery {
    id: string
    title: string
    image_url: string
    description: string
}

type EntityType = "pura" | "yayasan" | "pasraman"

interface ActivityGallerySectionProps {
    initialData: Gallery[]
    entityType: EntityType
    title?: string
    subtitle?: string
    description?: string
}

export default function ActivityGallerySection({ 
    initialData,
    entityType, 
    title = "Momen Dokumentasi",
    subtitle = "Kegiatan Lembaga",
    description = "Arsip visual berbagai program, seminar, bakti sosial, dan pertemuan pengurus."
}: ActivityGallerySectionProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const displayData = initialData?.slice(0, 6) || []

    useEffect(() => {
        AOS.init({ duration: 700, once: true })
    }, [])

    const themeConfig = {
        pura: {
            text: "text-orange-600",
            bg: "bg-orange-600",
            buttonHover: "group-hover:text-orange-600",
            buttonBgHover: "group-hover:bg-orange-600",
            dotActive: "bg-orange-600",
            shadowHover: "hover:shadow-orange-900/10",
        },
        yayasan: {
            text: "text-blue-600",
            bg: "bg-blue-600",
            buttonHover: "group-hover:text-blue-600",
            buttonBgHover: "group-hover:bg-blue-600",
            dotActive: "bg-blue-600",
            shadowHover: "hover:shadow-blue-900/10",
        },
        pasraman: {
            text: "text-emerald-600",
            bg: "bg-emerald-600",
            buttonHover: "group-hover:text-emerald-600",
            buttonBgHover: "group-hover:bg-emerald-600",
            dotActive: "bg-emerald-600",
            shadowHover: "hover:shadow-emerald-900/10",
        },
    }

    const theme = themeConfig[entityType] || themeConfig.pura

    const getGridClass = (index: number) => {
        if (index === 0) return "md:col-span-2 md:row-span-2 h-[450px] md:h-[580px]" 
        if (index === 1) return "md:col-span-1 md:row-span-2 h-[450px] md:h-[580px]"
        if (index === 2) return "md:col-span-1 h-[450px] md:h-[282px]"
        if (index === 3) return "md:col-span-1 h-[450px] md:h-[282px]"
        if (index === 4) return "md:col-span-2 h-[450px] md:h-[282px]"
        if (index === 5) return "md:col-span-2 h-[450px] md:h-[282px]"
        return "md:col-span-1 h-[450px] md:h-[282px]" 
    }

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = scrollContainerRef.current
            const index = Math.round(scrollLeft / (clientWidth * 0.85))
            setActiveIndex(index)
        }
    }

    const handlePrev = useCallback(() => {
        if (selectedIndex === null) return
        setSelectedIndex((prev) => (prev === 0 ? initialData.length - 1 : prev! - 1))
    }, [selectedIndex, initialData.length])

    const handleNext = useCallback(() => {
        if (selectedIndex === null) return
        setSelectedIndex((prev) => (prev === initialData.length - 1 ? 0 : prev! + 1))
    }, [selectedIndex, initialData.length])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return
            if (e.key === "ArrowLeft") handlePrev()
            if (e.key === "ArrowRight") handleNext()
            if (e.key === "Escape") setSelectedIndex(null)
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [selectedIndex, handleNext, handlePrev])

    if (!initialData || initialData.length === 0) return null;

    const activeImage = selectedIndex !== null ? initialData[selectedIndex] : null

    return (
        <section id="gallery" className="py-20 md:py-28 bg-white dark:bg-gray-950 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16" data-aos="fade-up">
                    <div className="space-y-4 max-w-2xl">
                        <div className="flex items-center gap-3">
                            <div className={`h-[2px] w-10 ${theme.bg}`}></div>
                            <span className={`${theme.text} dark:text-gray-300 text-xs md:text-sm font-bold tracking-[0.3em] uppercase`}>
                                {subtitle}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                            {title.split(' ').slice(0, -1).join(' ')} <span className={`${theme.text}`}>{title.split(' ').pop()}</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="
                        flex flex-nowrap overflow-x-auto overflow-y-hidden snap-x snap-mandatory gap-5 pb-10 -mx-6 px-6
                        md:grid md:grid-cols-4 md:gap-5 md:pb-0 md:mx-0 md:px-0 md:overflow-visible
                        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
                    "
                >
                    {displayData.map((item, idx) => (
                        <div
                            key={item.id}
                            className={`
                                relative group rounded-3xl overflow-hidden cursor-pointer flex-shrink-0 
                                shadow-lg shadow-gray-200 dark:shadow-none transition-all duration-500 
                                bg-gray-100 dark:bg-gray-800 border border-gray-100 dark:border-gray-800
                                w-[85%] snap-center ${theme.shadowHover}
                                ${getGridClass(idx)} md:w-auto
                            `}
                            onClick={() => setSelectedIndex(idx)}
                            data-aos="fade-up"
                            data-aos-delay={idx * 75}
                        >
                            <img
                                src={item.image_url}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <p className={`text-white font-bold leading-snug ${idx < 2 ? 'text-xl md:text-2xl' : 'text-base'}`}>
                                    {item.title}
                                </p>
                                <p className="text-white/80 text-[10px] md:text-xs uppercase tracking-wider mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity delay-75 duration-300">
                                    Lihat Foto
                                </p>
                            </div>
                        </div>
                    ))}
                    <div className="w-[1px] flex-shrink-0 md:hidden invisible"></div>
                </div>

                <div className="flex md:hidden justify-center gap-2.5 -mt-2 mb-10">
                    {displayData.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-2 rounded-full transition-all duration-300 
                                ${idx === activeIndex ? `w-9 ${theme.dotActive}` : "w-2 bg-gray-300 dark:bg-gray-700"}
                            `}
                        ></div>
                    ))}
                </div>

                <div className="mt-10 md:mt-16 text-center" data-aos="fade-up">
                    <Link href={`/${entityType}/gallery`}>
                        <button className={`group inline-flex items-center gap-3 px-9 py-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 ${theme.shadowHover}`}>
                            <span className={`font-bold text-gray-900 dark:text-white ${theme.buttonHover}`}>Lihat Semua Dokumentasi</span>
                            <div className={`w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition-colors ${theme.buttonBgHover}`}>
                                <ArrowRight className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-white" />
                            </div>
                        </button>
                    </Link>
                </div>

                {activeImage && (
                    <div
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setSelectedIndex(null)}
                    >
                        <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8" onClick={(e) => e.stopPropagation()}>
                            <img 
                                src={activeImage.image_url} 
                                alt={activeImage.title} 
                                className="max-w-full max-h-[80vh] md:max-h-[85vh] object-contain rounded-sm shadow-2xl" 
                            />
                        </div>

                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent pt-24 pb-8 px-6 md:px-12 pointer-events-none">
                            <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-end gap-4">
                                <div className="text-left space-y-2 pointer-events-auto">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white">{activeImage.title}</h3>
                                    <p className="text-gray-300 text-sm md:text-base max-w-2xl line-clamp-2 md:line-clamp-none">{activeImage.description}</p>
                                </div>
                                <div className="text-white font-mono text-sm md:text-lg tracking-widest opacity-80 whitespace-nowrap">
                                    {selectedIndex! + 1} / {initialData.length}
                                </div>
                            </div>
                        </div>

                        <button onClick={(e) => { e.stopPropagation(); handlePrev() }} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10 hover:scale-110 hidden md:block"><ChevronLeft className="w-8 h-8" /></button>
                        <button onClick={(e) => { e.stopPropagation(); handleNext() }} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10 hover:scale-110 hidden md:block"><ChevronRight className="w-8 h-8" /></button>
                        <button onClick={() => setSelectedIndex(null)} className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10 group"><X className="w-6 h-6 group-hover:rotate-90 transition-transform" /></button>
                    </div>
                )}
            </div>
        </section>
    )
}