"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

interface HeroSlide {
    id: string
    image_url: string
    order_index: number
}

interface SiteIdentity {
    site_name: string
    tagline: string
    primary_button_text: string
    primary_button_link: string
    secondary_button_text: string
    secondary_button_link: string
}

interface HeroCarouselProps {
    slides?: HeroSlide[]
    site?: SiteIdentity | null
    entityType?: "pura" | "yayasan" | "pasraman"
}

export default function HeroCarousel({ slides = [], site, entityType = "pura" }: HeroCarouselProps) {
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    
    const themeConfig = {
        pura: {
            overlay: "bg-gradient-to-b from-black/70 via-black/20 to-black/80",
            btnPrimary: "bg-orange-600 hover:bg-orange-700 shadow-orange-600/30",
            indicatorActive: "bg-orange-500 w-8",
        },
        yayasan: {
            overlay: "bg-gradient-to-b from-black/70 via-black/20 to-black/80",
            btnPrimary: "bg-blue-600 hover:bg-blue-700 shadow-blue-600/30",
            indicatorActive: "bg-blue-500 w-8",
        },
        pasraman: {
            overlay: "bg-gradient-to-b from-black/70 via-black/20 to-black/80",
            btnPrimary: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30",
            indicatorActive: "bg-emerald-500 w-8",
        },
    }
    
    const theme = themeConfig[entityType]

    const getAdjustedSiteName = () => {
        if (!site) return ""
        if (entityType === "yayasan" && site.site_name === "Yayasan Kertajaya") {
            return "Yayasan Vidya Kertajaya"
        }
        return site.site_name
    }

    useEffect(() => {
        if (slides.length === 0) return
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 6000)
        return () => clearInterval(interval)
    }, [slides.length])

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

    if (slides.length === 0 || !site) return null

    return (
        <section id="home" className="relative h-screen w-full overflow-hidden bg-black">
            <div className="absolute inset-0">
                {slides.map((slide, i) => (
                    <div 
                        key={slide.id} 
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                            i === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                    >
                        <div className={`absolute inset-0 z-20 ${theme.overlay}`} />
                        <img
                            src={slide.image_url}
                            alt=""
                            className={`absolute inset-0 w-full h-full object-cover transition-transform ease-linear ${
                                i === currentSlide ? "scale-110 duration-[10000ms]" : "scale-100 duration-0"
                            }`}
                        />
                    </div>
                ))}
            </div>

            <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4 md:px-12">
                <div className="max-w-5xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-2xl">
                        {getAdjustedSiteName()}
                    </h1>
                    
                    <p className="text-base md:text-xl lg:text-2xl text-gray-100 font-normal max-w-3xl mx-auto leading-relaxed drop-shadow-lg opacity-90">
                        {site.tagline}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                        <a
                            href={site.primary_button_link}
                            className={`group px-10 py-4 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-xl flex items-center justify-center gap-2 ${theme.btnPrimary}`}
                        >
                            {site.primary_button_text}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>

                        {site.secondary_button_text && (
                            <a
                                href={site.secondary_button_link}
                                className="px-10 py-4 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md text-white font-bold rounded-full transition-all duration-300 hover:scale-105 text-center"
                            >
                                {site.secondary_button_text}
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <button onClick={prevSlide} className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 items-center justify-center rounded-full bg-black/20 hover:bg-white/20 border border-white/10 backdrop-blur-md text-white transition-all duration-300 group">
                <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button onClick={nextSlide} className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 items-center justify-center rounded-full bg-black/20 hover:bg-white/20 border border-white/10 backdrop-blur-md text-white transition-all duration-300 group">
                <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="absolute bottom-12 z-30 flex items-center gap-3 left-1/2 -translate-x-1/2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`h-2 rounded-full transition-all duration-500 ${
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