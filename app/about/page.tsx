"use client"

import { useEffect, useState } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

interface AboutValue {
    id: string
    title: string
    value: string
}

interface AboutSectionData {
    id: string
    title: string
    description: string
    image_url: string
    values: AboutValue[]
}

export default function AboutPage() {
    const [sections, setSections] = useState<AboutSectionData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        AOS.init({ duration: 800, once: true })
    }, [])

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const res = await fetch("/api/public/about")
                const data = await res.json()
                setSections(data.data || [])
            } finally {
                setLoading(false)
            }
        }
        fetchAbout()
    }, [])

    const hero = sections[0]
    const paragraphs = hero?.description.split("\n").filter(p => p.trim()) || []

    return (
        <section className="pb-24 bg-background overflow-hidden">
            {hero && (
                <div className="w-full flex justify-center mt-24 md:mt-32" data-aos="zoom-in" data-aos-duration="1000">
                    <div className="w-full max-w-5xl h-[38vh] sm:h-[42vh] md:h-[50vh] rounded-2xl overflow-hidden shadow-xl">
                        <img loading="lazy" src={hero.image_url} alt="Pura Agung Kertajaya - Tampak Depan" className="w-full h-full object-cover object-center" />
                    </div>
                </div>
            )}

            <div className="section-container text-center mt-12">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-aos="fade-up">
                    Tentang Pura
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="100">
                    Profil, sejarah, nilai, dan perjalanan Pura Agung Kertajaya.
                </p>
            </div>

            <article className="section-container max-w-4xl text-foreground leading-relaxed space-y-6 text-lg">
                {!loading &&
                    paragraphs.map((paragraph, index) => (
                        <p key={index} className="text-muted-foreground" data-aos="fade-up" data-aos-delay={index * 50}>
                            {paragraph}
                        </p>
                    ))}
            </article>

            <div className="section-container mt-16 flex justify-center" data-aos="fade-up" data-aos-delay="200">
                <a href="/#about" className="text-orange font-semibold hover:underline text-lg flex items-center gap-2 transition-transform hover:-translate-x-1">
                    ← Kembali
                </a>
            </div>
        </section>
    )
}
