"use client"

import { useEffect, useState, useRef } from "react"
import { Quote, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

export interface Remark {
    id: string
    entity_type: "pura" | "yayasan" | "pasraman"
    name: string
    position: string
    content: string
    image_url: string | null
    order_index: number
    is_active: boolean
}

interface RemarksSectionProps {
    initialData: Remark[]
    title?: string
    subtitle?: string
    entityType?: "pura" | "yayasan" | "pasraman"
}

export default function RemarksSection({
    initialData,
    title = "Kata Sambutan",
    subtitle = "Pesan Pengurus",
    entityType = "pura",
}: RemarksSectionProps) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

    const themeConfig = {
        pura: {
            text: "text-orange-600",
            bg: "bg-orange-600",
            bgSoft: "bg-orange-100 dark:bg-orange-900/50",
            border: "border-orange-200 dark:border-orange-800",
            bgGradient: "bg-blue-50/50 dark:bg-blue-900/10", 
        },
        yayasan: {
            text: "text-blue-600",
            bg: "bg-blue-600",
            bgSoft: "bg-blue-100 dark:bg-blue-900/50",
            border: "border-blue-200 dark:border-blue-800",
            bgGradient: "bg-blue-50/50 dark:bg-blue-900/10",
        },
        pasraman: {
            text: "text-emerald-600",
            bg: "bg-emerald-600",
            bgSoft: "bg-emerald-100 dark:bg-emerald-900/50",
            border: "border-emerald-200 dark:border-emerald-800",
            bgGradient: "bg-emerald-50/50 dark:bg-emerald-900/10",
        },
    }

    const theme = themeConfig[entityType] || themeConfig.pura
    const activeRemark = initialData[activeIndex]

    useEffect(() => {
        AOS.init({ duration: 800, once: true })
    }, [])

    useEffect(() => {
        if (!isAutoPlaying || initialData.length <= 1) return
        autoPlayRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % initialData.length)
        }, 6000)
        return () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current)
        }
    }, [isAutoPlaying, initialData.length])

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % initialData.length)
        setIsAutoPlaying(false)
    }

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + initialData.length) % initialData.length)
        setIsAutoPlaying(false)
    }

    if (!initialData || initialData.length === 0) return null

    return (
        <section className="relative py-20 md:py-28 bg-gray-50 dark:bg-gray-900 overflow-hidden">

            <div className={`absolute top-0 left-0 w-[500px] h-[500px] ${theme.bgGradient} rounded-full blur-3xl -z-10 pointer-events-none -translate-x-1/2 -translate-y-1/4`} />

            <div className="container mx-auto px-6 md:px-12 relative z-10">

                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    <div className="w-full relative order-2 lg:order-1 flex flex-col justify-between" data-aos="fade-right">

                        <div className="space-y-4 md:space-y-6 mb-8">
                            <div className="flex items-center gap-3">
                                <div className={`h-[2px] w-8 md:w-12 ${theme.bg}`}></div>
                                <span className={`${theme.text} dark:text-gray-400 text-xs md:text-sm font-bold tracking-[0.2em] uppercase`}>
                                    {title}
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                                Sambutan Manajemen <span className={`${theme.text} capitalize`}>{entityType}</span>
                            </h2>
                        </div>

                        <div key={activeRemark.id} className="animate-in fade-in slide-in-from-bottom-3 duration-700 relative">
                            <Quote className="absolute -top-6 -left-2 w-12 h-12 text-gray-200 dark:text-gray-800 -z-10 rotate-180 opacity-100" />

                            <blockquote className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-400 italic mb-8 text-justify lg:text-left">
                                "{activeRemark.content}"
                            </blockquote>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-gray-200 dark:border-gray-800">

                                <div>
                                    <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                                        {activeRemark.name}
                                    </h4>
                                    <p className={`text-sm font-semibold uppercase tracking-wider ${theme.text}`}>
                                        {activeRemark.position}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={prevSlide}
                                        className="group flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 hover:border-gray-400 bg-white dark:bg-gray-800 transition-all shadow-sm"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                    </button>

                                    <div className="flex gap-1.5">
                                        {initialData.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => { setActiveIndex(idx); setIsAutoPlaying(false); }}
                                                className={`h-1.5 rounded-full transition-all duration-500 ${idx === activeIndex
                                                        ? `w-6 ${theme.bg}`
                                                        : "w-1.5 bg-gray-300 dark:bg-gray-700"
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    <button
                                        onClick={nextSlide}
                                        className="group flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 hover:border-gray-400 bg-white dark:bg-gray-800 transition-all shadow-sm"
                                    >
                                        <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="relative w-full px-2 md:px-0 order-1 lg:order-2" data-aos="fade-left">

                        <div className={`hidden md:block absolute inset-0 transform translate-x-6 translate-y-6 ${theme.bgSoft} rounded-t-[3rem] rounded-bl-[3rem] rounded-br-[100px] -z-10`}></div>

                        <div className="relative w-full h-[350px] md:h-[450px] rounded-t-[3rem] rounded-bl-[3rem] rounded-br-[100px] overflow-hidden shadow-2xl border-4 md:border-[6px] border-white dark:border-gray-800 group z-10">
                            {activeRemark.image_url ? (
                                <img
                                    key={activeRemark.image_url}
                                    src={activeRemark.image_url}
                                    alt={activeRemark.name}
                                    className="w-full h-full object-cover animate-in fade-in zoom-in-105 duration-1000 object-top transform transition-transform duration-700 group-hover:scale-110"
                                />
                            ) : (
                                <div className={`w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800`}>
                                    <span className={`text-6xl font-bold opacity-20 ${theme.text}`}>
                                        {activeRemark.name.charAt(0)}
                                    </span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
                        </div>

                        <div className="absolute -bottom-6 -left-4 md:-bottom-8 md:-left-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-30 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                            <div className={`p-2 rounded-full ${theme.bgSoft} ${theme.text}`}>
                                <Quote className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                            </div>

                            <div>
                                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    Status
                                </p>
                                <p className="text-xs md:text-sm font-bold text-gray-900 dark:text-white capitalize">
                                    Pengurus Aktif
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
}