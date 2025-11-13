"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import AOS from "aos"
import "aos/dist/aos.css"

interface AboutValue {
    id: string
    title: string
    value: string
}

interface AboutSectionType {
    id: string
    title: string
    description: string
    image_url: string
    values: AboutValue[]
}

export default function AboutSection() {
    const [about, setAbout] = useState<AboutSectionType | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        AOS.init({ duration: 800, once: true })
    }, [])

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const res = await fetch("/api/public/about")
                const data = await res.json()
                setAbout(data.data?.[0] || null)
            } finally {
                setLoading(false)
            }
        }
        fetchAbout()
    }, [])

    const shortDescription = about ? about.description.split("\n")[0] : ""

    return (
        <section id="about" className="py-24 md:py-32 bg-background overflow-hidden">
            <div className="section-container">
                <header className="text-center mb-12">
                    <div className="text-center mb-12" data-aos="fade-up">
                        <span className="text-orange font-semibold tracking-wide">TENTANG KAMI</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3" data-aos="fade-up" data-aos-delay="100">Pura Agung Kertajaya</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                        Jelajahi sejarah, nilai, dan misi kami dalam melayani umat Hindu.
                    </p>
                </header>

                {about && (
                    <article className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg" data-aos="fade-left">
                            <img src={about.image_url} alt="Pura Agung Kertajaya" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/20" />
                        </div>

                        <div data-aos="fade-right">
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed" data-aos="zoom-in" data-aos-delay="100">{shortDescription}</p>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                                {about.values?.slice(0, 3).map((val, i) => (
                                    <li
                                        key={val.id}
                                        className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-gray-900 shadow-sm transition-all"
                                        data-aos="fade-up"
                                        data-aos-delay={i * 100}
                                    >
                                        <p className="text-sm text-muted-foreground">{val.title}</p>
                                        <p className="text-lg font-semibold text-foreground">{val.value}</p>
                                    </li>

                                ))}
                            </ul>

                            <div data-aos="zoom-in" data-aos-delay="200">
                                <Link
                                    href="/about"
                                    className="group inline-flex items-center gap-1 mt-2 text-orange font-semibold hover:underline text-lg transition-all"
                                >
                                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                                      Baca Selengkapnya →
                                    </span>
                                </Link>
                            </div>

                        </div>
                    </article>
                )}
            </div>
        </section>
    )
}
