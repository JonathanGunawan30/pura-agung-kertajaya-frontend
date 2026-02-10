"use client"

import { useEffect, useState, useRef } from "react"
import { ArrowRight, CheckCircle2, Star } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

export interface Facility {
    id: string
    name: string
    description: string
    images: {
        xs?: string;
        sm?: string;
        md?: string;
        lg?: string;
        xl?: string;
        fhd?: string;
        blur?: string;
    }
}

type EntityType = "pura" | "yayasan" | "pasraman"

interface FacilitiesSectionProps {
    initialData: Facility[]
    entityType: EntityType
}

export default function FacilitiesSection({ initialData, entityType }: FacilitiesSectionProps) {
    const [activeFacility, setActiveFacility] = useState<Facility | null>(null)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [screenSize, setScreenSize] = useState<string>("lg")

    const tabsContainerRef = useRef<HTMLDivElement>(null)

    const isMirrored = entityType === "yayasan"

    const themeConfig = {
        pura: {
            text: "text-orange-600",
            bg: "bg-orange-600",
            activeBorder: "border-orange-500/30",
            hoverBg: "hover:bg-orange-50 dark:hover:bg-orange-900/10",
            icon: "text-orange-500",
            star: "text-orange-400",
            pillText: "text-orange-600",
            bar: "bg-orange-600"
        },
        yayasan: {
            text: "text-blue-600",
            bg: "bg-blue-600",
            activeBorder: "border-blue-500/30",
            hoverBg: "hover:bg-blue-50 dark:hover:bg-blue-900/10",
            icon: "text-blue-500",
            star: "text-blue-400",
            pillText: "text-blue-600",
            bar: "bg-blue-600"
        },
        pasraman: {
            text: "text-emerald-600",
            bg: "bg-emerald-600",
            activeBorder: "border-emerald-500/30",
            hoverBg: "hover:bg-emerald-50 dark:hover:bg-emerald-900/10",
            icon: "text-emerald-500",
            star: "text-emerald-400",
            pillText: "text-emerald-600",
            bar: "bg-emerald-600"
        }
    }

    const theme = themeConfig[entityType] || themeConfig.pura

    useEffect(() => {
        AOS.init({ duration: 700, once: true })
        if (initialData.length > 0) setActiveFacility(initialData[0])

        const updateSize = () => {
            const width = window.innerWidth
            if (width < 640) setScreenSize("xs")
            else if (width < 1024) setScreenSize("md")
            else setScreenSize("lg")
        }
        updateSize()
        window.addEventListener("resize", updateSize)
        return () => window.removeEventListener("resize", updateSize)
    }, [initialData])

    useEffect(() => {
        if (!isAutoPlaying || !activeFacility) return

        const interval = setInterval(() => {
            const currentIndex = initialData.findIndex(f => f.id === activeFacility.id)
            const nextIndex = (currentIndex + 1) % initialData.length
            setActiveFacility(initialData[nextIndex])
            
            if (window.innerWidth < 1024) {
                scrollTabIntoView(nextIndex)
            }
        }, 4000)

        return () => clearInterval(interval)
    }, [activeFacility, isAutoPlaying, initialData])

    const scrollTabIntoView = (index: number) => {
        const container = tabsContainerRef.current
        if (!container) return
        const tabNode = container.children[index] as HTMLElement
        if (!tabNode) return
        const containerWidth = container.offsetWidth
        const tabWidth = tabNode.offsetWidth
        const tabLeft = tabNode.offsetLeft
        const newScrollLeft = tabLeft - (containerWidth / 2) + (tabWidth / 2)
        container.scrollTo({ left: newScrollLeft, behavior: 'smooth' })
    }

    const getOptimalUrl = (images: Facility['images']) => {
        if (screenSize === "xs") return images.sm || images.md || "";
        if (screenSize === "md") return images.md || images.lg || "";
        return images.lg || images.xl || "";
    }

    if (!initialData || initialData.length === 0) return null;

    return (
        <section id="facilities" className="py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16" data-aos="fade-up">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className={`h-[2px] w-12 ${theme.bar}`}></div>
                            <span className={`${theme.text} text-sm font-bold tracking-[0.2em] uppercase`}>
                                Fasilitas Lembaga
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                            Kenyamanan <span className={theme.text}>Pengunjung</span>
                        </h2>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md text-sm md:text-base leading-relaxed text-left md:text-right">
                        Sarana dan prasarana yang tersedia untuk menunjang kegiatan dan pelayanan umat.
                    </p>
                </div>

                <div className="hidden lg:grid grid-cols-12 gap-8 h-[600px]">
                    
                    <div
                        className={`
                            col-span-4 flex flex-col gap-3 overflow-y-auto custom-scrollbar
                            ${isMirrored ? "order-2 pl-2" : "order-1 pr-2"} 
                        `}
                        onMouseEnter={() => setIsAutoPlaying(false)}
                        onMouseLeave={() => setIsAutoPlaying(true)}
                        data-aos={isMirrored ? "fade-left" : "fade-right"}
                    >
                        {initialData.map((facility) => (
                            <div
                                key={facility.id}
                                onClick={() => setActiveFacility(facility)}
                                className={`
                                    group relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border
                                    ${activeFacility?.id === facility.id
                                    ? `bg-white dark:bg-gray-800 ${theme.activeBorder} shadow-lg ${isMirrored ? "-translate-x-2" : "translate-x-2"}`
                                    : `bg-transparent border-transparent hover:bg-white/50 dark:hover:bg-gray-800/50 hover:border-gray-200`
                                }
                                `}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className={`font-bold text-lg transition-colors ${activeFacility?.id === facility.id ? theme.text : "text-gray-700 dark:text-gray-300"}`}>
                                        {facility.name}
                                    </h3>
                                    {activeFacility?.id === facility.id && (
                                        <ArrowRight className={`w-5 h-5 ${theme.icon} animate-pulse`} />
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                    {facility.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div 
                        className={`
                            col-span-8 relative rounded-3xl overflow-hidden shadow-2xl bg-gray-200 dark:bg-gray-800
                            ${isMirrored ? "order-1" : "order-2"}
                        `} 
                        data-aos={isMirrored ? "fade-right" : "fade-left"}
                    >
                        {activeFacility && (
                            <div key={activeFacility.id} className="relative w-full h-full animate-in fade-in zoom-in-105 duration-700">
                                <img 
                                    src={getOptimalUrl(activeFacility.images)} 
                                    alt={activeFacility.name} 
                                    className="w-full h-full object-cover"
                                    style={{
                                        backgroundImage: activeFacility.images.blur ? `url(${activeFacility.images.blur})` : "none",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center"
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6 md:max-w-xl p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl">
                                    <div className={`flex items-center gap-2 mb-3 ${theme.pillText} font-bold uppercase text-xs tracking-widest`}>
                                        <CheckCircle2 className="w-4 h-4" /> Fasilitas Tersedia
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white">
                                        {activeFacility.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base md:text-lg">
                                        {activeFacility.description}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="lg:hidden flex flex-col gap-6" data-aos="fade-up">
                    <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gray-200 dark:bg-gray-800 border-4 border-white dark:border-gray-800">
                        {activeFacility && (
                            <div key={activeFacility.id} className="relative w-full h-full animate-in fade-in duration-500">
                                <img
                                    src={getOptimalUrl(activeFacility.images)}
                                    alt={activeFacility.name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    style={{
                                        backgroundImage: activeFacility.images.blur ? `url(${activeFacility.images.blur})` : "none",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center"
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
                                        <Star className={`w-3 h-3 ${theme.star} fill-current`} />
                                        Featured
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div
                        ref={tabsContainerRef}
                        className="flex overflow-x-auto gap-3 py-2 px-1 -mx-6 px-6 no-scrollbar snap-x scroll-smooth"
                    >
                        {initialData.map((facility, idx) => (
                            <button
                                key={facility.id}
                                onClick={() => { setActiveFacility(facility); setIsAutoPlaying(false); scrollTabIntoView(idx); }}
                                className={`
                                    flex-shrink-0 snap-center px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border
                                    ${activeFacility?.id === facility.id
                                    ? `bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white shadow-lg scale-105`
                                    : `bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:${theme.activeBorder}`
                                }
                                `}
                            >
                                {facility.name}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm min-h-[140px] flex flex-col justify-center transition-all">
                        {activeFacility && (
                            <div key={activeFacility.id} className="animate-in slide-in-from-bottom-2 fade-in duration-500">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                    {activeFacility.name}
                                    <CheckCircle2 className={`w-5 h-5 ${theme.icon}`} />
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                                    {activeFacility.description}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </section>
    )
}