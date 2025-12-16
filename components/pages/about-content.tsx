"use client"

import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface AboutData {
    id: string
    title: string
    description: string
    image_url: string
}

interface AboutContentProps {
    data: AboutData | null
}

export default function AboutContent({ data }: AboutContentProps) {

    useEffect(() => {
        AOS.init({ duration: 800, once: true })
    }, [])

    if (!data) return null;

    const paragraphs = data.description.split("\n").filter(p => p.trim()) || []

    return (
        <section className="pt-32 pb-20 bg-white dark:bg-gray-950 overflow-hidden min-h-screen">
            <div className="container mx-auto px-6 md:px-12">

                <div className="text-center max-w-4xl mx-auto mb-12 space-y-6">

                    <div className="flex items-center justify-center gap-4" data-aos="fade-up">
                        <div className="h-[2px] w-8 md:w-12 bg-orange-500/60"></div>
                        <span className="text-orange-600 dark:text-orange-400 text-xs md:text-sm font-bold tracking-[0.3em] uppercase">
                            Profil Lengkap
                        </span>
                        <div className="h-[2px] w-8 md:w-12 bg-orange-500/60"></div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight" data-aos="fade-up" data-aos-delay="100">
                        Tentang <span className="text-transparent bg-clip-text bg-gradient-to-r bg-orange-600">Pura</span>
                    </h1>

                    <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                        Menelusuri jejak sejarah, nilai spiritual, dan dedikasi pelayanan umat di Pura Agung Kertajaya.
                    </p>
                </div>

                <div className="w-full flex justify-center mb-16" data-aos="zoom-in" data-aos-duration="1000">
                    <div className="w-full max-w-5xl h-[40vh] md:h-[60vh] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                        <img
                            loading="lazy"
                            src={data.image_url}
                            alt="Pura Agung Kertajaya"
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                </div>

                <article className="max-w-4xl mx-auto text-gray-700 dark:text-gray-300 leading-relaxed space-y-8 text-lg md:text-xl text-justify mb-20">
                    {paragraphs.map((paragraph, index) => (
                        <p
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={100 + (index * 50)}
                        >
                            {paragraph}
                        </p>
                    ))}
                </article>

                <div className="flex justify-center pt-8 border-t border-gray-100 dark:border-gray-800" data-aos="fade-up">
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-orange-500 hover:text-white text-gray-600 dark:text-gray-300 font-medium transition-all duration-300"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Kembali ke Beranda</span>
                    </Link>
                </div>

            </div>
        </section>
    )
}