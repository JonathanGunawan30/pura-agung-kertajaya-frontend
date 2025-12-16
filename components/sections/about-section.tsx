"use client"

import { useEffect } from "react"
import Link from "next/link"
import AOS from "aos"
import "aos/dist/aos.css"
import { ArrowRight } from "lucide-react"

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

export default function AboutSection({ initialData }: { initialData: AboutData | null }) {

    useEffect(() => {
        AOS.init({ duration: 800, once: true })
    }, [])

    if (!initialData) return null;

    return (
        <section id="about" className="relative py-16 md:py-24 bg-white dark:bg-gray-950 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:20px_20px]"></div>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    <div className="space-y-6 md:space-y-8 w-full" data-aos="fade-right">
                        <div className="space-y-4 md:space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-[2px] w-8 md:w-12 bg-orange-600"></div>
                                <span className="text-orange-600 dark:text-orange-600 text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                                    Tentang Kami
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                                Pura Agung <span className="text-orange-600">Kertajaya</span>
                            </h2>

                            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed text-justify line-clamp-4">
                                {initialData.description}
                            </p>
                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 py-4 md:py-8 border-y border-gray-100 dark:border-gray-800">
                            {initialData.values?.slice(0, 3).map((val) => (
                                <div key={val.id} className="text-left border-b border-gray-100 dark:border-gray-800 last:border-0 pb-3 sm:pb-0 sm:border-0">
                                    <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-0.5 md:mb-2">
                                        {val.value}
                                    </p>
                                    <p className="text-[10px] md:text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                                        {val.title}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="pt-2 flex justify-center lg:justify-start">
                            <Link
                                href="/about"
                                className="group inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors text-sm md:text-base"
                            >
                                Pelajari Sejarah Kami
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    <div className="relative w-full px-2 md:px-0" data-aos="fade-left">
                        <div className="hidden md:block absolute top-0 right-0 w-full h-full transform translate-x-6 translate-y-6 rotate-6 -z-10">
                            <div className="w-full h-full rounded-2xl overflow-hidden opacity-40 grayscale contrast-125 border-2 border-gray-200 dark:border-gray-700">
                                <img
                                    src={initialData.image_url}
                                    className="w-full h-full object-cover"
                                    alt="Background Layer"
                                />
                            </div>
                        </div>

                        <div className="relative aspect-video md:aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden shadow-xl border-4 md:border-[6px] border-white dark:border-gray-800 group">
                            <img
                                src={initialData.image_url}
                                alt="Pura Agung Kertajaya"
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        </div>

                        <div className="absolute -bottom-6 left-4 md:-bottom-8 md:-left-12 bg-white dark:bg-gray-800 p-2.5 md:p-5 rounded-lg md:rounded-2xl shadow-xl md:shadow-2xl border border-gray-100 dark:border-gray-700 z-30 min-w-[140px] md:min-w-[200px]">
                            <div className="flex items-center gap-2 md:gap-3 mb-1">
                                <div className="relative flex h-2 w-2 md:h-3 md:w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-orange-500"></span>
                                </div>
                                <span className="text-[9px] md:text-xs font-bold text-orange-600 uppercase tracking-wider">
                                    Lokasi
                                </span>
                            </div>
                            <p className="text-xs md:text-sm font-bold text-gray-900 dark:text-gray-100 leading-tight">
                                Pura Agung Kertajaya
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}