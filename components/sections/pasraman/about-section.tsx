"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import AOS from "aos"
import "aos/dist/aos.css"
import { ArrowRight, GraduationCap } from "lucide-react"

interface AboutValue {
    id: string
    title: string
    value: string
}

export interface AboutData {
    id: string
    title: string
    description: string
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
    values: AboutValue[]
}

export default function AboutSectionPasraman({ initialData }: { initialData: AboutData | null }) {
    const [screenSize, setScreenSize] = useState<string>("lg")

    useEffect(() => {
        AOS.init({ duration: 800, once: true })

        const updateSize = () => {
            const width = window.innerWidth
            if (width < 480) setScreenSize("xs")
            else if (width < 640) setScreenSize("sm")
            else if (width < 768) setScreenSize("md")
            else if (width < 1024) setScreenSize("lg")
            else if (width < 1280) setScreenSize("xl")
            else setScreenSize("2xl")
        }

        updateSize()
        window.addEventListener("resize", updateSize)
        return () => window.removeEventListener("resize", updateSize)
    }, [])

    if (!initialData) return null

    const getResponsiveImageUrl = () => {
        if (!initialData.images) return ""
        const priority = [screenSize, "lg", "md", "sm", "fhd"]
        for (const size of priority) {
            const url = initialData.images[size as keyof typeof initialData.images]
            if (url) return url
        }
        return Object.values(initialData.images).find(url => !!url && !url.includes('_blur')) || ""
    }

    const blurPlaceholder = initialData.images?.blur || ""
    const mainImageUrl = getResponsiveImageUrl()

    return (
        <section id="about" className="relative py-20 md:py-28 bg-white dark:bg-gray-950 overflow-hidden">
            
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.07] pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(#10b981_1.5px,transparent_1.5px)] [background-size:32px_32px]"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-50/50 dark:bg-emerald-900/10 rounded-full blur-3xl -z-10 pointer-events-none -translate-x-1/2 translate-y-1/4" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    <div className="space-y-6 md:space-y-8 w-full order-last lg:order-first" data-aos="fade-right">
                        
                        <div className="space-y-4 md:space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="h-[2px] w-8 md:w-12 bg-emerald-600"></div>
                                <span className="text-emerald-600 dark:text-emerald-400 text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                                    Lembaga Pendidikan
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                                Pasraman <span className="text-emerald-600">Kertajaya</span>
                            </h2>

                            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed text-justify line-clamp-5">
                                {initialData.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-6 sm:gap-y-0 sm:gap-x-8 py-8 border-y border-emerald-100 dark:border-emerald-900/30">
                            {initialData.values?.slice(0, 3).map((val) => (
                                <div key={val.id} className="flex flex-col">
                                    <div className="flex items-center gap-2 mb-2">
                                        <p className="text-sm sm:text-base font-bold uppercase text-gray-800 dark:text-gray-200">
                                            {val.title}
                                        </p>
                                    </div>
                                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                        {val.value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="pt-2 flex justify-center lg:justify-start">
                            <Link
                                href="/pasraman/about"
                                className="group inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors text-sm md:text-base"
                            >
                                Mengenal Lebih Dalam
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    <div className="relative w-full px-2 md:px-0" data-aos="fade-left">
                        
                        <div className="hidden md:block absolute -top-6 -right-6 w-32 h-32 border-t-4 border-r-4 border-emerald-600/30 rounded-tr-3xl -z-10"></div>
                        <div className="hidden md:block absolute -bottom-6 -left-6 w-32 h-32 border-b-4 border-l-4 border-emerald-600/30 rounded-bl-3xl -z-10"></div>

                        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 md:border-[8px] border-white dark:border-gray-800 group bg-gray-200 dark:bg-gray-900">
                            <img
                                src={mainImageUrl}
                                alt="Pasraman Kertajaya"
                                loading="lazy"
                                decoding="async"
                                style={{
                                    backgroundImage: blurPlaceholder ? `url(${blurPlaceholder})` : "none",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center"
                                }}
                                className="w-full h-full object-cover aspect-[4/3] transform group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                        </div>

                        <div className="absolute top-10 -right-4 md:top-16 md:-right-8 bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl shadow-2xl border border-emerald-50 dark:border-emerald-900/50 z-30 flex items-center gap-4 animate-bounce-slow">
                            <div className="bg-emerald-100 dark:bg-emerald-900/50 p-3 rounded-xl text-emerald-600">
                                <GraduationCap className="w-6 h-6 md:w-8 md:h-8" />
                            </div>
                            <div>
                                <p className="text-[10px] md:text-xs font-bold text-emerald-600 uppercase tracking-widest">
                                    Fokus Utama
                                </p>
                                <p className="text-xs md:text-sm font-bold text-gray-900 dark:text-gray-100 leading-tight">
                                    Pendidikan Karakter <br /> & Dharma
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 4s infinite ease-in-out;
                }
            `}</style>
        </section>
    )
}