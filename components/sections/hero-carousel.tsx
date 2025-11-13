"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface HeroSlide { id: string; image_url: string; order_index: number }
interface SiteIdentity { site_name: string; tagline: string; primary_button_text: string; primary_button_link: string; secondary_button_text: string; secondary_button_link: string; logo_url: string }

export default function HeroCarousel() {
    const [slides, setSlides] = useState<HeroSlide[]>([])
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loading, setLoading] = useState(true)
    const [site, setSite] = useState<SiteIdentity | null>(null)

    useEffect(() => {
        const load = async () => {
            const [s1, s2] = await Promise.all([fetch("/api/public/hero-slides"), fetch("/api/public/site-identity")])
            const d1 = await s1.json()
            const d2 = await s2.json()
            setSlides(d1.data || [])
            setSite(d2.data || null)
            setLoading(false)
        }
        load()
    }, [])

    useEffect(() => {
        if (slides.length === 0) return
        const i = setInterval(() => setCurrentSlide(p => (p + 1) % slides.length), 5000)
        return () => clearInterval(i)
    }, [slides.length])

    const next = () => setCurrentSlide(p => (p + 1) % slides.length)
    const prev = () => setCurrentSlide(p => (p - 1 + slides.length) % slides.length)

    if (loading || slides.length === 0 || !site) {
        return <section id="home" className="relative h-screen w-full overflow-hidden bg-black"><div className="absolute inset-0 bg-black animate-slideScreen"></div></section>
    }

    return (
        <section id="home" className="relative h-screen overflow-hidden bg-black">
            <div className="absolute inset-0">
                {slides.map((slide, i) => (
                    <img key={slide.id} src={slide.image_url} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ${i === currentSlide ? "opacity-100" : "opacity-0"}`} />
                ))}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 animate-fadeUpHero">
                <div className="text-center text-white px-6 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3 whitespace-nowrap drop-shadow-lg">{site.site_name}</h1>
                    <p className="text-lg md:text-xl mb-6 text-white/90 drop-shadow-md">{site.tagline}</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
                        <a href={site.primary_button_link} className="px-6 py-2.5 rounded-md bg-orange text-white font-medium transition hover:bg-orange/90 hover:scale-105">{site.primary_button_text}</a>
                        <a href={site.secondary_button_link} className="px-6 py-2.5 rounded-md bg-white/10 border border-white/20 font-medium transition hover:bg-white/20 hover:scale-105">{site.secondary_button_text}</a>
                    </div>
                </div>
            </div>

            <button onClick={prev} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white z-20 p-3 md:p-4 rounded-full backdrop-blur-sm transition hover:scale-125 hover:bg-orange"><ChevronLeft className="w-6 h-6 md:w-8 md:h-8" /></button>
            <button onClick={next} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white z-20 p-3 md:p-4 rounded-full backdrop-blur-sm transition hover:scale-125 hover:bg-orange"><ChevronRight className="w-6 h-6 md:w-8 md:h-8" /></button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                {slides.map((_, i) => (
                    <button key={i} onClick={() => setCurrentSlide(i)} className={`rounded-full transition-all ${i === currentSlide ? "bg-orange w-6 h-2" : "bg-white/50 w-2 h-2"}`} />
                ))}
            </div>
        </section>
    )
}
