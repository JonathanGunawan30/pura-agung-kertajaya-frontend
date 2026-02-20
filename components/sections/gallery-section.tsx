"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { X, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export interface Gallery {
    id: string
    title: string
    images: {
        xs?: string;
        sm?: string;
        md?: string;
        lg?: string;
        xl?: string;
        fhd?: string;
        blur?: string;
    }
    description: string
}

interface GallerySectionProps {
    initialData: Gallery[]
}

export default function GallerySection({ initialData }: GallerySectionProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [screenSize, setScreenSize] = useState<string>("lg")
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const displayData = initialData?.slice(0, 6) || []

    useEffect(() => {
        const updateSize = () => {
            const width = window.innerWidth
            if (width < 640) setScreenSize("xs")
            else if (width < 1024) setScreenSize("md")
            else setScreenSize("lg")
        }
        updateSize()
        window.addEventListener("resize", updateSize, { passive: true })
        return () => window.removeEventListener("resize", updateSize)
    }, [])

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const { scrollLeft, clientWidth } = container;
        
        // Optimasi: Gunakan requestAnimationFrame untuk sinkronisasi state dengan scroll
        window.requestAnimationFrame(() => {
            const itemWidth = clientWidth * 0.85;
            const newIndex = Math.round(scrollLeft / itemWidth);
            const clampedIndex = Math.min(Math.max(newIndex, 0), displayData.length - 1);
            
            setActiveIndex((prev) => prev !== clampedIndex ? clampedIndex : prev);
        });
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

    const getGridClass = (index: number) => {
        if (index === 0 || index === 1) return "md:col-span-2 md:row-span-2 h-[400px] md:h-[450px]"
        return "md:col-span-1 h-[400px] md:h-[220px]"
    }

    const getOptimalUrl = (images: Gallery['images'], isLightbox = false) => {
        if (isLightbox) return images.fhd || images.xl || images.lg || "";
        if (screenSize === "xs") return images.sm || images.md || "";
        return images.md || images.lg || "";
    }

    const activeImage = selectedIndex !== null ? initialData[selectedIndex] : null

    return (
        <section id="gallery" className="py-24 bg-white dark:bg-black overflow-hidden transition-colors duration-500">
            <div className="container mx-auto px-6 md:px-12">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12" data-aos="fade-up">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="h-[2px] w-12 bg-orange-600"></div>
                            <span className="text-orange-600 font-bold tracking-[0.2em] uppercase text-sm">
                                Galeri Foto
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                            Momen di <span className="text-orange-600">Pura</span>
                        </h2>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md text-sm md:text-base leading-relaxed text-left md:text-right">
                        Kumpulan dokumentasi kegiatan keagamaan, sosial, dan budaya yang mengabadikan keharmonisan umat.
                    </p>
                </div>

                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="
                        flex flex-nowrap overflow-x-auto overflow-y-hidden gap-4 pb-8 -mx-6 px-6
                        md:grid md:grid-cols-4 md:gap-4 md:pb-0 md:mx-0 md:px-0 md:overflow-visible
                        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
                        touch-action-pan-x overscroll-behavior-x-auto
                    "
                >
                    {displayData.map((item, idx) => {
                        const thumbUrl = getOptimalUrl(item.images);
                        const blurUrl = item.images.blur || "";

                        return (
                            <div
                                key={item.id}
                                className={`
                                    relative group rounded-2xl overflow-hidden cursor-pointer flex-shrink-0 
                                    shadow-sm hover:shadow-xl transition-all duration-300 
                                    bg-gray-100 dark:bg-gray-800
                                    w-[85vw]
                                    ${getGridClass(idx)} md:w-auto
                                `}
                                onClick={() => setSelectedIndex(idx)}
                                data-aos="fade-up"
                                data-aos-delay={idx * 100}
                            >
                                <img
                                    src={thumbUrl}
                                    alt={item.title}
                                    loading="lazy"
                                    decoding="async"
                                    style={{
                                        backgroundImage: blurUrl ? `url(${blurUrl})` : "none",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center"
                                    }}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <p className={`text-white font-bold truncate ${idx < 2 ? 'text-lg md:text-xl' : 'text-sm'}`}>
                                        {item.title}
                                    </p>
                                    <p className="text-white/70 text-[10px] uppercase tracking-wider mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity delay-75">
                                        Lihat Foto
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                    <div className="w-[5vw] flex-shrink-0 md:hidden"></div>
                </div>

                <div className="flex md:hidden justify-center gap-2 -mt-4 mb-8">
                    {displayData.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-300 
                                ${idx === activeIndex ? "w-8 bg-orange-500" : "w-1.5 bg-gray-300 dark:bg-gray-700"}
                            `}
                        ></div>
                    ))}
                </div>

                <div className="mt-12 md:mt-20 text-center" data-aos="fade-up">
                    <Link href="/gallery" className="group inline-flex items-center gap-4 md:gap-6">
                        <span className="text-base md:text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors duration-300">
                            Lihat Koleksi Lengkap
                        </span>
                        
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-orange-600/20 scale-100 group-hover:animate-ping-slow opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute inset-0 rounded-full bg-orange-600/10 scale-100 group-hover:animate-ping-slower opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-gray-200 dark:border-gray-800 transition-all duration-500 group-hover:border-orange-600 group-hover:bg-orange-600 z-10">
                                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors duration-300" />
                            </div>
                        </div>
                    </Link>
                </div>

                {activeImage && (
                    <div
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setSelectedIndex(null)}
                    >
                        <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8" onClick={(e) => e.stopPropagation()}>
                            <img 
                                src={getOptimalUrl(activeImage.images, true)} 
                                alt={activeImage.title} 
                                style={{
                                    backgroundImage: `url(${activeImage.images.blur})`,
                                    backgroundSize: 'cover'
                                }}
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
