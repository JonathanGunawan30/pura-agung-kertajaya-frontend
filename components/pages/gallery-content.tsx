"use client"

import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import GalleryGrid from "@/components/gallery/gallery-grid"
import { Gallery } from "@/components/sections/gallery-section"

interface GalleryContentProps {
    initialData: Gallery[]
}

export default function GalleryContent({ initialData }: GalleryContentProps) {

    useEffect(() => {
        AOS.init({ duration: 800, once: true })
    }, [])

    return (
        <section className="min-h-screen bg-white dark:bg-gray-950 pt-32 pb-20 overflow-x-hidden">
            <div className="container mx-auto px-6 md:px-12">

                <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">

                    <div className="flex items-center justify-center gap-4" data-aos="fade-up">
                        <div className="h-[2px] w-8 md:w-12 bg-orange-500/60"></div>
                        <span className="text-orange-600 dark:text-orange-400 text-xs md:text-sm font-bold tracking-[0.3em] uppercase">
                            Dokumentasi
                        </span>
                        <div className="h-[2px] w-8 md:w-12 bg-orange-500/60"></div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight" data-aos="fade-up" data-aos-delay="100">
                        Galeri <span className="text-transparent bg-clip-text bg-gradient-to-r bg-orange-600 ">Kegiatan</span>
                    </h1>

                    <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                        Menyimpan kenangan indah dari setiap momen kebersamaan dan kegiatan spiritual umat.
                    </p>
                </div>

                <GalleryGrid items={initialData} />

            </div>
        </section>
    )
}