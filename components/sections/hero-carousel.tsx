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
    logo_url: string
}

interface HeroCarouselProps {
    slides?: HeroSlide[]
    site?: SiteIdentity | null
}

export default function HeroCarousel({ slides = [], site }: HeroCarouselProps) {
    const [currentSlide, setCurrentSlide] = useState<number>(0)

    useEffect(() => {
        if (slides.length === 0) return

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 6000)
        return () => clearInterval(interval)
    }, [slides.length])

    const nextSlide = () =>
        setCurrentSlide((prev) => (prev + 1) % slides.length)

    const prevSlide = () =>
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

    if (slides.length === 0 || !site) return null

    return (
        <section id="home" className="relative h-screen w-full overflow-hidden bg-black">
            <div className="absolute inset-0">
                {slides.map((slide, i) => {
                    const isActive = i === currentSlide
                    const hero = slide.image_url

                    return (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
                                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                            }`}
                        >
                            <picture>
                                <source
                                    media="(max-width: 768px)"
                                    srcSet={`${hero}?width=800&height=1200&fit=cover&quality=70&format=webp`}
                                />
                                <source
                                    media="(min-width: 769px)"
                                    srcSet={`${hero}?width=1600&height=900&fit=cover&quality=75&format=webp`}
                                />
                                <img
                                    src={`${hero}?width=1600&height=900&fit=cover&quality=75&format=webp`}
                                    fetchPriority={isActive ? "high" : "auto"}
                                    loading={isActive ? "eager" : "lazy"}
                                    decoding="async"
                                    className={`absolute inset-0 w-full h-full object-cover transition-transform ease-linear ${
                                        isActive
                                            ? "scale-110 duration-[10000ms]"
                                            : "scale-100 duration-0 delay-[2000ms]"
                                    }`}
                                    alt=""
                                />

                            </picture>

                            <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/20 to-black/80" />
                        </div>
                    )
                })}
            </div>

            <div className="absolute inset-0 z-20 flex items-center justify-center px-4 md:px-12">
                <div className="text-center max-w-4xl mx-auto space-y-6 md:space-y-8 animate-in fade-in zoom-in duration-1000">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-2xl">
                        {site.site_name}
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
                        {site.tagline}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 md:pt-8">
                        <a
                            href={site.primary_button_link}
                            className="group px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-600/30 flex items-center gap-2"
                        >
                            {site.primary_button_text}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>

                        <a
                            href={site.secondary_button_link}
                            className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm text-white font-semibold rounded-full transition-all duration-300 hover:scale-105"
                        >
                            {site.secondary_button_text}
                        </a>
                    </div>
                </div>
            </div>

            <button
                onClick={prevSlide}
                className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full bg-white/10 hover:bg-orange-600 border border-white/10 backdrop-blur-md text-white transition-all duration-300"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <button
                onClick={nextSlide}
                className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full bg-white/10 hover:bg-orange-600 border border-white/10 backdrop-blur-md text-white transition-all duration-300"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                            i === currentSlide
                                ? "w-8 bg-orange-500"
                                : "w-2 bg-white/40 hover:bg-white/80"
                        }`}
                    />
                ))}
            </div>
        </section>
    )
}
