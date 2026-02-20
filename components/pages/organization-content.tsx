"use client"

import { useEffect, useState } from "react"
import { User, ChevronDown, Network, ZoomIn, X, ZoomOut, RotateCcw } from "lucide-react"

export interface Member {
    id: string
    name: string
    position: string
    position_order: number
    order_index: number
}

type EntityType = "pura" | "yayasan" | "pasraman"

interface OrganizationContentProps {
    initialData: Member[]
    entityType: EntityType
    title?: string
    subtitle?: string
    structureImageUrl?: string | null
}

export default function OrganizationContent({
    initialData,
    entityType,
    title = "Struktur Organisasi",
    subtitle = "Susunan Pengurus",
    structureImageUrl
}: OrganizationContentProps) {

    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    const [zoomLevel, setZoomLevel] = useState(1)

    useEffect(() => {
        
    }, [])

    useEffect(() => {
        if (isLightboxOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
            setZoomLevel(1)
        }
    }, [isLightboxOpen])

    const themeConfig = {
        pura: {
            line: "bg-orange-600",
            text: "text-orange-600",
            numberBg: "bg-orange-600 shadow-orange-600/20",
            borderLeft: "border-orange-400",
            hoverBorder: "hover:border-orange-200 dark:hover:border-orange-900",
            iconHoverBg: "group-hover/member:bg-orange-100",
            iconHoverText: "group-hover/member:text-orange-600",
            textHover: "group-hover/member:text-orange-600",
            chevronText: "text-orange-500",
            gradientText: "text-orange-600",
            bgSoft: "bg-orange-50 dark:bg-orange-900/10",
        },
        yayasan: {
            line: "bg-blue-600",
            text: "text-blue-600",
            numberBg: "bg-blue-600 shadow-blue-600/20",
            borderLeft: "border-blue-400",
            hoverBorder: "hover:border-blue-200 dark:hover:border-blue-900",
            iconHoverBg: "group-hover/member:bg-blue-100",
            iconHoverText: "group-hover/member:text-blue-600",
            textHover: "group-hover/member:text-blue-600",
            chevronText: "text-blue-500",
            gradientText: "text-blue-600",
            bgSoft: "bg-blue-50 dark:bg-blue-900/10",
        },
        pasraman: {
            line: "bg-emerald-600",
            text: "text-emerald-600",
            numberBg: "bg-emerald-600 shadow-emerald-600/20",
            borderLeft: "border-emerald-400",
            hoverBorder: "hover:border-emerald-200 dark:hover:border-emerald-900",
            iconHoverBg: "group-hover/member:bg-emerald-100",
            iconHoverText: "group-hover/member:text-emerald-600",
            textHover: "group-hover/member:text-emerald-600",
            chevronText: "text-emerald-500",
            gradientText: "text-emerald-600",
            bgSoft: "bg-emerald-50 dark:bg-emerald-900/10",
        },
    }

    const theme = themeConfig[entityType] || themeConfig.pura

    const groupByOrder = initialData.reduce<Record<string, Member[]>>((acc, m) => {
        if (!acc[m.position_order]) acc[m.position_order] = []
        acc[m.position_order].push(m)
        return acc
    }, {})

    const sortedOrders = Object.keys(groupByOrder).sort((a, b) => Number(a) - Number(b))

    const handleZoomIn = (e: React.MouseEvent) => {
        e.stopPropagation()
        setZoomLevel(prev => Math.min(prev + 0.5, 4)) 
    }

    const handleZoomOut = (e: React.MouseEvent) => {
        e.stopPropagation()
        setZoomLevel(prev => Math.max(prev - 0.5, 1))
    }

    return (
        <section id="organization" className="min-h-[100dvh] py-32 bg-gray-50 dark:bg-gray-950">
            <div className="container mx-auto px-6 md:px-12">

                <div className="text-center mb-16 space-y-4" data-aos="fade-up">
                    <div className="flex items-center justify-center gap-4">
                        <div className={`h-[2px] w-12 ${theme.line}`}></div>
                        <span className={`${theme.text} dark:${theme.text} text-sm font-bold tracking-[0.2em] uppercase`}>
                            {title}
                        </span>
                        <div className={`h-[2px] w-12 ${theme.line}`}></div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                        {subtitle.split(' ').slice(0, -1).join(' ')} <span className={theme.gradientText}>{subtitle.split(' ').pop()}</span>
                    </h1>
                </div>

                {structureImageUrl && (
                    <>
                        <div className="max-w-5xl mx-auto mb-24" data-aos="fade-up" data-aos-delay="100">
                            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                                <div className={`p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-center gap-3 ${theme.bgSoft}`}>
                                    <Network className={`w-5 h-5 ${theme.text}`} />
                                    <h3 className={`text-lg font-bold uppercase tracking-widest ${theme.text}`}>
                                        Bagan Struktur Visual
                                    </h3>
                                </div>
                                
                                <div 
                                    className="p-4 md:p-8 bg-gray-50/50 dark:bg-gray-900/50 flex justify-center cursor-zoom-in group relative"
                                    onClick={() => setIsLightboxOpen(true)}
                                >
                                    <img
                                        src={structureImageUrl}
                                        alt={`Bagan Struktur ${entityType}`}
                                        className="w-full h-auto max-w-4xl object-contain rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-black transition-transform duration-300 group-hover:scale-[1.01]"
                                        loading="lazy"
                                    />
                                    
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                        <div className="bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm flex items-center gap-2">
                                            <ZoomIn className="w-4 h-4" /> Klik untuk memperbesar
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isLightboxOpen && (
                            <div 
                                className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col animate-in fade-in duration-300"
                                onClick={() => setIsLightboxOpen(false)} 
                            >
                                <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-gradient-to-b from-black/50 to-transparent">
                                    <div className="text-white/80 text-sm font-medium px-4">
                                        {subtitle} - {entityType.toUpperCase()}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={handleZoomOut}
                                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                                            title="Zoom Out"
                                        >
                                            <ZoomOut className="w-5 h-5" />
                                        </button>
                                        <span className="text-white text-xs font-mono w-12 text-center">{Math.round(zoomLevel * 100)}%</span>
                                        <button 
                                            onClick={handleZoomIn}
                                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                                            title="Zoom In"
                                        >
                                            <ZoomIn className="w-5 h-5" />
                                        </button>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setZoomLevel(1); }}
                                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors ml-2"
                                            title="Reset"
                                        >
                                            <RotateCcw className="w-5 h-5" />
                                        </button>
                                        <button 
                                            onClick={() => setIsLightboxOpen(false)}
                                            className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-100 hover:text-white transition-colors ml-4"
                                            title="Close"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-auto flex items-center justify-center p-4 md:p-8 cursor-grab active:cursor-grabbing">
                                    <img
                                        src={structureImageUrl}
                                        alt="Full View"
                                        className="max-w-none transition-transform duration-200 ease-out origin-center shadow-2xl"
                                        style={{ 
                                            transform: `scale(${zoomLevel})`,
                                            maxHeight: zoomLevel === 1 ? '90vh' : 'none',
                                            maxWidth: zoomLevel === 1 ? '90vw' : 'none',
                                        }}
                                        onClick={(e) => e.stopPropagation()} 
                                        draggable={false}
                                    />
                                </div>
                            </div>
                        )}
                    </>
                )}

                <div className="max-w-5xl mx-auto space-y-12">
                    {sortedOrders.map((order, index) => {
                        const groupMembers = groupByOrder[order].sort((a, b) => a.order_index - b.order_index)

                        const fullPosition = groupMembers[0].position
                        const mainTitle = fullPosition.includes(" - ") ? fullPosition.split(" - ")[0] : fullPosition

                        const subGroups: Record<string, Member[]> = {}
                        groupMembers.forEach((item) => {
                            const parts = item.position.split(" - ")
                            const subTitle = parts.length > 1 ? parts[1].trim() : "Pengurus"

                            if (!subGroups[subTitle]) subGroups[subTitle] = []
                            subGroups[subTitle].push(item)
                        })

                        return (
                            <div key={order} className="relative group">
                                {index > 0 && (
                                    <div className="absolute -top-12 left-8 md:left-[2.25rem] w-[2px] h-12 border-l-2 border-dashed border-gray-300 dark:border-gray-700 -z-10"></div>
                                )}

                                <div
                                    className={`bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl ${theme.hoverBorder} transition-all duration-500`}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 50}
                                >

                                    <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-700 flex items-center gap-6 bg-gray-50/50 dark:bg-gray-800/50">
                                        <div className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg ${theme.numberBg}`}>
                                            {order}
                                        </div>
                                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                                            {mainTitle}
                                        </h2>
                                    </div>

                                    <div className="p-6 md:p-8">
                                        <div className={`grid gap-8 ${Object.keys(subGroups).length === 1
                                                ? "grid-cols-1"
                                                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                                            }`}>
                                            {Object.keys(subGroups).map((subTitle) => (
                                                <div key={subTitle} className="space-y-4">
                                                    {(subTitle !== "Pengurus" || Object.keys(subGroups).length > 1) && (
                                                        <h3 className={`text-sm font-bold text-gray-400 uppercase tracking-widest border-l-4 pl-3 ${theme.borderLeft}`}>
                                                            {subTitle}
                                                        </h3>
                                                    )}

                                                    <ul className="space-y-3">
                                                        {subGroups[subTitle].map((person) => (
                                                            <li key={person.id} className="flex items-start gap-3 group/member">
                                                                <div className={`mt-1 shrink-0 p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors ${theme.iconHoverBg} ${theme.iconHoverText}`}>
                                                                    <User className="w-3.5 h-3.5" />
                                                                </div>
                                                                <div>
                                                                    <p className={`text-gray-700 dark:text-gray-200 font-medium text-base leading-snug transition-colors ${theme.textHover}`}>
                                                                        {person.name}
                                                                    </p>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>

                                {index < sortedOrders.length - 1 && (
                                    <div className="flex justify-center -mb-6 relative z-10">
                                        <div className={`w-8 h-8 bg-white dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm mt-4 ${theme.chevronText}`}>
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                <div className="mt-16 text-center" data-aos="fade-up">
                    <p className="text-sm text-gray-400">
                        Total {initialData.length} Pengurus & Anggota
                    </p>
                </div>

            </div>
        </section>
    )
}

