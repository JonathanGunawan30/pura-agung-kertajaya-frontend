"use client"

import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import GalleryGrid from "@/components/gallery/gallery-grid"
import { Gallery } from "@/components/sections/gallery-section"

type EntityType = "pura" | "yayasan" | "pasraman"

interface GalleryContentProps {
    initialData: Gallery[]
    entityType: EntityType 
}

export default function GalleryContent({ initialData, entityType }: GalleryContentProps) {

    useEffect(() => {
        AOS.init({ duration: 800, once: true })
    }, [])

    const themeConfig = {
        pura: {
            line: "bg-orange-500/60",
            text: "text-orange-600 dark:text-orange-400",
            gradient: "bg-orange-600"
        },
        yayasan: {
            line: "bg-blue-500/60",
            text: "text-blue-600 dark:text-blue-400",
            gradient: "bg-blue-600"
        },
        pasraman: {
            line: "bg-emerald-500/60",
            text: "text-emerald-600 dark:text-emerald-400",
            gradient: "bg-emerald-600"
        }
    }

    const theme = themeConfig[entityType] || themeConfig.pura

    return (
        <section className="min-h-screen bg-white dark:bg-gray-950 pt-32 pb-20 overflow-x-hidden">
            <div className="container mx-auto px-6 md:px-12">

                <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">

                    <div className="flex items-center justify-center gap-4" data-aos="fade-up">
                        <div className={`h-[2px] w-8 md:w-12 ${theme.line}`}></div>
                        <span className={`${theme.text} text-xs md:text-sm font-bold tracking-[0.3em] uppercase`}>
                            Dokumentasi
                        </span>
                        <div className={`h-[2px] w-8 md:w-12 ${theme.line}`}></div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight" data-aos="fade-up" data-aos-delay="100">
                        Galeri <span className={`text-transparent bg-clip-text ${theme.gradient} `}>Kegiatan</span>
                    </h1>

                    <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                        Menyimpan kenangan indah dari setiap momen kebersamaan dan kegiatan yang kami laksanakan.
                    </p>
                </div>

                <GalleryGrid items={initialData} entityType={entityType} />

            </div>
        </section>
    )
}