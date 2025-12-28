"use client"

import { useEffect } from "react"
import Link from "next/link"
import AOS from "aos"
import "aos/dist/aos.css"
import { ArrowRight, CheckCircle2 } from "lucide-react"

interface AboutValue {
    id: string
    title: string
    value: string
}

export interface AboutData {
    id: string
    title: string
    description: string
    image_url: string
    values: AboutValue[]
}

export default function AboutSectionYayasan({ initialData }: { initialData: AboutData | null }) {

    useEffect(() => {
        AOS.init({ duration: 800, once: true })
    }, [])

    if (!initialData) return null;

    return (
        <section id="about" className="relative py-20 md:py-28 bg-white dark:bg-gray-950 overflow-hidden">
            
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 dark:bg-blue-900/10 rounded-full blur-3xl -z-10 pointer-events-none translate-x-1/2 -translate-y-1/4" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    <div className="relative w-full px-2 md:px-0 order-first" data-aos="fade-right">
                        
                        <div className="hidden md:block absolute top-0 right-0 w-full h-full transform translate-x-6 translate-y-6 rotate-3 -z-10">
                            <div className="w-full h-full rounded-2xl overflow-hidden opacity-50 grayscale border border-gray-200 dark:border-gray-800">
                                <img
                                    src={initialData.image_url}
                                    className="w-full h-full object-cover"
                                    alt="Background Layer"
                                />
                            </div>
                        </div>

                        <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-4 md:border-[6px] border-white dark:border-gray-800 group">
                            <img
                                src={initialData.image_url}
                                alt="Yayasan Kertajaya"
                                className="w-full h-full object-cover aspect-[4/3] transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
                        </div>

                        <div className="absolute -bottom-6 -left-4 md:-bottom-8 md:-left-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-blue-100 dark:border-blue-900 z-30 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                            <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full text-blue-600">
                                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    Status
                                </p>
                                <p className="text-xs md:text-sm font-bold text-blue-900 dark:text-blue-100">
                                    Resmi & Terdaftar
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 md:space-y-8 w-full" data-aos="fade-left">
                        
                        <div className="space-y-4 md:space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="h-[2px] w-8 md:w-12 bg-blue-600"></div>
                                <span className="text-blue-600 dark:text-blue-400 text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                                    Tentang Kami
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                                Yayasan Vidya <span className="text-blue-600">Kertajaya</span>
                            </h2>

                            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed text-justify line-clamp-4">
                                {initialData.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-6 sm:gap-y-0 sm:gap-x-10 py-6 border-y border-gray-100 dark:border-gray-800">
                            {initialData.values?.slice(0, 3).map((val) => (
                                <div key={val.id} className="flex flex-col">
                                    <p className="text-sm sm:text-base font-semibold uppercase text-gray-800 dark:text-gray-400 mb-2">
                                        {val.title}
                                    </p>
                                    <p className="text-sm leading-[1.65] text-gray-600 dark:text-gray-400 max-w-full sm:max-w-[260px]">
                                        {val.value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="pt-2 flex justify-start">
                            <Link
                                href="/yayasan/about"
                                className="group inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors text-sm md:text-base"
                            >
                                Baca Selengkapnya
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}