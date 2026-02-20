"use client"

import { useEffect, useState, useRef } from "react"
import { CheckCircle2, GraduationCap, School, BookOpen, Users } from "lucide-react"

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

interface FacilitiesSectionProps {
    initialData: Facility[]
}

export default function FacilitiesSectionPasraman({ initialData }: FacilitiesSectionProps) {
    const [activeFacility, setActiveFacility] = useState<Facility | null>(null)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [screenSize, setScreenSize] = useState<string>("lg")
    
    const desktopSliderRef = useRef<HTMLDivElement>(null)
    const mobileTabsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        
        if (initialData.length > 0) setActiveFacility(initialData[0])

        const updateSize = () => {
            const width = window.innerWidth
            if (width < 640) setScreenSize("xs")
            else if (width < 1024) setScreenSize("md")
            else setScreenSize("lg")
        }
        updateSize()
        window.addEventListener("resize", updateSize, { passive: true })
        return () => window.removeEventListener("resize", updateSize)
    }, [initialData])

    const scrollToItem = (ref: React.RefObject<HTMLDivElement | null>, index: number) => {
        const container = ref.current
        if (!container) return
        
        const node = container.children[index] as HTMLElement
        if (!node) return

        const containerWidth = container.offsetWidth
        const nodeWidth = node.offsetWidth
        const nodeLeft = node.offsetLeft
        
        const newScrollLeft = nodeLeft - (containerWidth / 2) + (nodeWidth / 2)
        
        container.scrollTo({ left: newScrollLeft, behavior: 'smooth' })
    }

    useEffect(() => {
        if (!isAutoPlaying || !activeFacility) return

        const interval = setInterval(() => {
            const currentIndex = initialData.findIndex(f => f.id === activeFacility.id)
            const nextIndex = (currentIndex + 1) % initialData.length
            setActiveFacility(initialData[nextIndex])
            
            if (window.innerWidth < 1024) {
                scrollToItem(mobileTabsRef, nextIndex)
            } else {
                scrollToItem(desktopSliderRef, nextIndex)
            }
        }, 5000)

        return () => clearInterval(interval)
    }, [activeFacility, isAutoPlaying, initialData])

    const handleManualClick = (facility: Facility, index: number, isDesktop: boolean) => {
        setActiveFacility(facility)
        setIsAutoPlaying(false)
        if (isDesktop) {
            scrollToItem(desktopSliderRef, index)
        } else {
            scrollToItem(mobileTabsRef, index)
        }
    }

    const getOptimalUrl = (images: Facility['images']) => {
        if (screenSize === "xs") return images.sm || images.md || "";
        if (screenSize === "md") return images.md || images.lg || "";
        return images.lg || images.xl || "";
    }

    if (!initialData || initialData.length === 0) return null

    return (
        <section id="facilities" className="py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                
                <div className="flex flex-col items-center text-center mb-16 space-y-4" data-aos="fade-up">
                    <div className="flex items-center gap-3">
                        <div className="h-[2px] w-8 bg-emerald-600"></div>
                        <span className="text-emerald-600 font-bold text-sm uppercase tracking-widest">Sarana Belajar</span>
                        <div className="h-[2px] w-8 bg-emerald-600"></div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
                        Fasilitas <span className="text-emerald-600">Pasraman</span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-lg">
                        Lingkungan belajar yang kondusif didukung oleh sarana prasarana modern untuk kenyamanan siswa.
                    </p>
                </div>

                <div className="hidden lg:flex flex-col gap-8">
                    <div className="relative w-full h-[550px] rounded-[2.5rem] overflow-hidden group shadow-2xl bg-gray-100 dark:bg-gray-900" data-aos="zoom-in">
                        {activeFacility && (
                            <>
                                <img 
                                    key={activeFacility.id}
                                    src={getOptimalUrl(activeFacility.images)} 
                                    alt={activeFacility.name} 
                                    className="w-full h-full object-cover animate-in fade-in zoom-in-105 duration-1000"
                                    style={{
                                        backgroundImage: activeFacility.images.blur ? `url(${activeFacility.images.blur})` : "none",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center"
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent"></div>
                                
                                <div className="absolute inset-y-0 left-0 w-1/2 flex flex-col justify-center p-16 space-y-6 text-white z-10">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 rounded-full w-fit text-sm font-bold tracking-tighter animate-in slide-in-from-left-8 duration-700">
                                        <GraduationCap className="w-4 h-4" /> Ruang Unggulan
                                    </div>
                                    <h3 className="text-5xl font-bold leading-tight animate-in slide-in-from-left-12 duration-700 delay-100">
                                        {activeFacility.name}
                                    </h3>
                                    <p className="text-xl text-gray-200 leading-relaxed animate-in slide-in-from-left-16 duration-700 delay-200">
                                        {activeFacility.description}
                                    </p>
                                    <div className="flex gap-4 pt-4 animate-in fade-in duration-1000 delay-500">
                                        <div className="flex items-center gap-2 text-sm bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
                                            <BookOpen className="w-4 h-4 text-emerald-400" /> Literasi Tinggi
                                        </div>
                                        <div className="flex items-center gap-2 text-sm bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
                                            <Users className="w-4 h-4 text-emerald-400" /> Nyaman & Luas
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="relative group/slider" data-aos="fade-up" data-aos-delay="200">
                        <div 
                            ref={desktopSliderRef}
                        className="flex gap-4 overflow-x-auto py-4 -mx-2 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                        >
                            {initialData.map((facility, idx) => (
                                <button
                                    key={facility.id}
                                    onClick={() => handleManualClick(facility, idx, true)}
                                    className={`
                                        relative flex-shrink-0 w-[280px] h-32 rounded-3xl overflow-hidden transition-all duration-500 group
                                        ${activeFacility?.id === facility.id 
                                            ? "ring-4 ring-emerald-500 ring-offset-4 dark:ring-offset-gray-950 scale-[0.98]" 
                                            : "opacity-70 hover:opacity-100 hover:scale-[1.02]"
                                        }
                                    `}
                                >
                                    <img 
                                        src={getOptimalUrl(facility.images)} 
                                        alt={facility.name} 
                                        className="w-full h-full object-cover" 
                                        style={{
                                            backgroundImage: facility.images.blur ? `url(${facility.images.blur})` : "none",
                                            backgroundSize: "cover"
                                        }}
                                    />
                                    <div className={`absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-emerald-900/40 transition-colors`}>
                                        <span className="text-white font-bold text-center px-4 leading-tight text-sm md:text-base">{facility.name}</span>
                                    </div>
                                    {activeFacility?.id === facility.id && (
                                        <div className="absolute top-2 right-2 bg-emerald-500 p-1 rounded-full text-white animate-in zoom-in duration-300">
                                            <CheckCircle2 className="w-3 h-3" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
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
                                    style={{
                                        backgroundImage: activeFacility.images.blur ? `url(${activeFacility.images.blur})` : "none",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center"
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                                <div className="absolute top-4 right-4 bg-emerald-600 px-3 py-1 rounded-full border border-white/20 shadow-lg">
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
                                        <School className="w-3 h-3" /> Pasraman
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div ref={mobileTabsRef} className="flex overflow-x-auto gap-3 py-2 -mx-6 px-6 no-scrollbar overscroll-behavior-x-auto touch-action-pan-x">
                        {initialData.map((facility, idx) => (
                            <button
                                key={facility.id}
                                onClick={() => handleManualClick(facility, idx, false)}
                                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                                    activeFacility?.id === facility.id
                                    ? "bg-emerald-600 text-white border-emerald-600 shadow-lg scale-105"
                                    : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700"
                                }`}
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
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
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


