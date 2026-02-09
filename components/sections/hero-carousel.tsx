"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import Link from "next/link"

interface HeroSlide {
    id: string
    images: {
        xs?: string
        sm?: string
        md?: string
        lg?: string
        xl?: string
        "2xl"?: string
        fhd?: string
        thumb?: string
        avatar?: string
        blur?: string
    }
    order_index: number
}

export interface SiteIdentity {
    id?: string
    site_name: string
    tagline: string
    primary_button_text: string
    primary_button_link: string
    secondary_button_text: string
    secondary_button_link: string
    logo_url?: string
    entity_type?: "pura" | "yayasan" | "pasraman"
}

interface HeroCarouselProps {
    slides?: HeroSlide[]
    site?: SiteIdentity | null
    entityType?: "pura" | "yayasan" | "pasraman"
    otherSites?: SiteIdentity[]
}

export default function HeroCarousel({ slides = [], site, entityType = "pura", otherSites = [] }: HeroCarouselProps) {
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const [screenSize, setScreenSize] = useState<string>("lg")

    const themeConfig = {
        pura: {
            overlay: "bg-gradient-to-b from-black/70 via-black/20 to-black/80",
            btnPrimary: "bg-orange-600 hover:bg-orange-700 shadow-orange-600/30",
            indicatorActive: "bg-orange-500 w-8",
            ring: "group-hover:ring-4 group-hover:ring-orange-500/50"
        },
        yayasan: {
            overlay: "bg-gradient-to-b from-black/70 via-black/20 to-black/80",
            btnPrimary: "bg-blue-600 hover:bg-blue-700 shadow-blue-600/30",
            indicatorActive: "bg-blue-500 w-8",
            ring: "group-hover:ring-4 group-hover:ring-blue-500/50"
        },
        pasraman: {
            overlay: "bg-gradient-to-b from-black/70 via-black/20 to-black/80",
            btnPrimary: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30",
            indicatorActive: "bg-emerald-500 w-8",
            ring: "group-hover:ring-4 group-hover:ring-emerald-500/50"
        },
    }

    const theme = themeConfig[entityType] || themeConfig.pura

    useEffect(() => {
        const updateSize = () => {
            const width = window.innerWidth
            if (width < 480) setScreenSize("xs")
            else if (width < 640) setScreenSize("sm")
            else if (width < 768) setScreenSize("md")
            else if (width < 1024) setScreenSize("lg")
            else if (width < 1280) setScreenSize("xl")
            else if (width < 1536) setScreenSize("2xl")
            else setScreenSize("fhd")
        }
        updateSize()
        window.addEventListener("resize", updateSize)
        return () => window.removeEventListener("resize", updateSize)
    }, [])

    useEffect(() => {
        if (slides.length === 0) return
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 6000)
        return () => clearInterval(interval)
    }, [slides.length])

    const getResponsiveImageUrl = (slide: HeroSlide) => {
        const priority = [screenSize, "fhd", "2xl", "xl", "lg", "md", "sm", "xs"]
        for (const size of priority) {
            // @ts-ignore
            const url = slide.images[size as keyof typeof slide.images]
            if (url) return url
        }
        return Object.values(slide.images).find(url => !!url && !url.includes('_blur')) || ""
    }

    const getAdjustedSiteName = () => {
        if (!site) return ""
        if (entityType === "yayasan" && site.site_name === "Yayasan Kertajaya") {
            return "Yayasan Vidya Kertajaya"
        }
        return site.site_name
    }

    const getEntityLink = (type?: string) => {
        if (type === 'pura') return '/';
        return `/${type}`;
    }

    const getEntityLabel = (type?: string) => {
        if (type === 'pura') return 'Pura Agung';
        if (type === 'yayasan') return 'Yayasan';
        if (type === 'pasraman') return 'Pasraman';
        return 'Lembaga';
    }

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

    if (slides.length === 0 || !site) return null

    return (
        <section id="home" className="relative h-screen w-full overflow-hidden bg-black">
            <div className="absolute inset-0">
                {slides.map((slide, i) => {
                    const blurUrl = slide.images.blur || ""
                    const mainUrl = getResponsiveImageUrl(slide)

                    return (
                        <div 
                            key={slide.id} 
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                i === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                            }`}
                        >
                            <div className={`absolute inset-0 z-20 ${theme.overlay}`} />
                            <img
                                src={mainUrl}
                                alt=""
                                loading={i === 0 ? "eager" : "lazy"}
                                decoding="async"
                                style={{
                                    backgroundImage: blurUrl ? `url(${blurUrl})` : "none",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center"
                                }}
                                className={`absolute inset-0 w-full h-full object-cover transition-transform ease-linear ${
                                    i === currentSlide ? "scale-110 duration-[10000ms]" : "scale-100 duration-0"
                                }`}
                            />
                        </div>
                    )
                })}
            </div>

            <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4 md:px-12">
                <div className="max-w-5xl w-full flex flex-col items-center justify-center h-full pt-16 md:pt-0">
                    
                    {otherSites.length > 0 && (
                        <div className="animate-in fade-in slide-in-from-top-8 duration-1000 w-full mb-8 md:mb-10">
                            
                            <p className="text-white text-[10px] md:text-xs font-extrabold tracking-[0.25em] uppercase mb-6 drop-shadow-md">
                                Kunjungi Lembaga Kami Lainnya
                            </p>
                            
                            <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center">
                                {otherSites.map((item, idx) => (
                                    <Link 
                                        key={idx}
                                        href={getEntityLink(item.entity_type)}
                                        className="group flex flex-col items-center gap-3 md:gap-4"
                                    >
                                        <div className={`
                                            relative 
                                            w-20 h-20 md:w-28 md:h-28
                                            rounded-full 
                                            bg-white/80
                                            flex items-center justify-center p-3 md:p-4
                                            shadow-2xl transition-all duration-300 ease-out
                                            group-hover:scale-110 group-hover:-translate-y-2
                                            ${theme.ring}
                                        `}>
                                            {item.logo_url ? (
                                                <img 
                                                    src={item.logo_url} 
                                                    alt={item.site_name} 
                                                    className="w-full h-full object-contain drop-shadow-sm"
                                                />
                                            ) : (
                                                <div className="w-full h-full rounded-full bg-gray-200" /> 
                                            )}
                                        </div>
                                        
                                        <span className="text-white font-bold text-[10px] md:text-sm tracking-widest uppercase drop-shadow-md group-hover:text-white/90 transition-colors">
                                            {getEntityLabel(item.entity_type)}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-2xl">
                            {getAdjustedSiteName()}
                        </h1>
                        
                        <p className="text-base md:text-xl lg:text-2xl text-gray-100 font-normal max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                            {site.tagline}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center">
                            <a
                                href={site.primary_button_link}
                                className={`group px-10 py-4 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-xl flex items-center justify-center gap-2 CTA-Button ${theme.btnPrimary}`}
                            >
                                {site.primary_button_text}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>

                            {site.secondary_button_text && (
                                <a
                                    href={site.secondary_button_link}
                                    className="CTA-Button-Secondary px-10 py-4 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md text-white font-bold rounded-full transition-all duration-300 hover:scale-105 text-center shadow-lg"
                                >
                                    {site.secondary_button_text}
                                </a>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            <button onClick={prevSlide} className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full bg-black/20 hover:bg-white/20 border border-white/10 backdrop-blur-md text-white transition-all duration-300 group Arrows">
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button onClick={nextSlide} className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full bg-black/20 hover:bg-white/20 border border-white/10 backdrop-blur-md text-white transition-all duration-300 group Arrows">
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="absolute bottom-8 md:bottom-8 z-30 flex items-center gap-3 left-1/2 -translate-x-1/2 Indicators">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`h-1.5 md:h-2 rounded-full transition-all duration-500 shadow-md ${
                            i === currentSlide 
                                ? theme.indicatorActive 
                                : "w-2.5 bg-white/30 hover:bg-white/60"
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    )
}