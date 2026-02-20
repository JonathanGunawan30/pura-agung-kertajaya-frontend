"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { X, Search, ChevronLeft, ChevronRight, LayoutGrid, Grid as GridIcon, ArrowLeft } from "lucide-react"
import { Gallery } from "@/components/sections/gallery-section" 
import Link from "next/link"

interface GalleryImages {
    xs?: string; sm?: string; md?: string; lg?: string; xl?: string;
    "2xl"?: string; fhd?: string; blur?: string; avatar?: string;
}

type GalleryItem = Omit<Gallery, 'image_url'> & {
    images: GalleryImages
}

type EntityType = "pura" | "yayasan" | "pasraman"

interface GalleryGridProps {
    items: GalleryItem[]
    entityType: EntityType 
}

export default function GalleryGrid({ items, entityType }: GalleryGridProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [mobileColumns, setMobileColumns] = useState<1 | 2>(1)
    const [isSearchFocused, setIsSearchFocused] = useState(false)

    const touchStart = useRef<number | null>(null)
    const touchEnd = useRef<number | null>(null)

    const getImageUrl = (images: GalleryImages | undefined | null, mode: 'thumbnail' | 'full') => {
        if (!images || typeof images !== 'object') return "";
        if (mode === 'full') {
            return images.fhd || images["2xl"] || images.xl || images.lg || images.md || "";
        }
        return images.md || images.lg || images.sm || images.xl || "";
    }

    const themeConfig = {
        pura: {
            text: "text-orange-600",
            ring: "ring-orange-500",
            shadow: "shadow-orange-500/10",
            hoverText: "hover:text-red-500",
            bgHover: "hover:bg-orange-500",
            linkBack: "/"
        },
        yayasan: {
            text: "text-blue-600",
            ring: "ring-blue-500",
            shadow: "shadow-blue-500/10",
            hoverText: "hover:text-blue-500",
            bgHover: "hover:bg-blue-600",
            linkBack: "/yayasan"
        },
        pasraman: {
            text: "text-emerald-600",
            ring: "ring-emerald-500",
            shadow: "shadow-emerald-500/10",
            hoverText: "hover:text-emerald-500",
            bgHover: "hover:bg-emerald-600",
            linkBack: "/pasraman"
        }
    }

    const theme = themeConfig[entityType] || themeConfig.pura

    const validItems = items.filter(item => item?.images && (getImageUrl(item.images, 'thumbnail') !== ""))

    const filteredItems = validItems.filter(item =>
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    useEffect(() => {
        setSelectedIndex(null)
    }, [searchQuery])

    const handlePrev = useCallback(() => {
        if (selectedIndex === null) return
        setSelectedIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev! - 1))
    }, [selectedIndex, filteredItems.length])

    const handleNext = useCallback(() => {
        if (selectedIndex === null) return
        setSelectedIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev! + 1))
    }, [selectedIndex, filteredItems.length])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return
            if (e.key === "ArrowLeft") handlePrev()
            if (e.key === "ArrowRight") handleNext()
            if (e.key === "Escape") setSelectedIndex(null)
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [selectedIndex, handleNext, handlePrev])

    const onTouchStart = (e: React.TouchEvent) => {
        touchEnd.current = null
        touchStart.current = e.targetTouches[0].clientX
    }
    const onTouchMove = (e: React.TouchEvent) => {
        touchEnd.current = e.targetTouches[0].clientX
    }
    const onTouchEnd = () => {
        if (!touchStart.current || !touchEnd.current) return
        const distance = touchStart.current - touchEnd.current
        if (distance > 50) handleNext()
        if (distance < -50) handlePrev()
    }

    const activeItem = selectedIndex !== null ? filteredItems[selectedIndex] : null

    return (
        <div className="space-y-10">
            <div className="relative z-30 flex justify-center px-4 md:px-0">
                <div className={`
                    flex flex-col md:flex-row items-center gap-3 md:gap-4 
                    w-full max-w-2xl 
                    bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl 
                    p-2 md:p-3 rounded-2xl md:rounded-full 
                    shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/20 dark:border-gray-800
                    transition-all duration-300
                    ${isSearchFocused ? `ring-2 ${theme.ring}/20 ${theme.shadow} scale-[1.01]` : ''}
                `}>
                    <div className="relative w-full flex-grow group">
                        <div className={`
                            absolute left-3 md:left-4 top-1/2 -translate-y-1/2 transition-colors duration-300
                            ${isSearchFocused ? theme.text : 'text-gray-400 group-hover:text-gray-600'}
                        `}>
                            <Search className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            placeholder="Cari momen..."
                            value={searchQuery}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-11 md:h-12 pl-10 md:pl-12 pr-4 rounded-xl md:rounded-full bg-gray-50 dark:bg-gray-800 border-transparent focus:bg-white dark:focus:bg-gray-950 outline-none text-base transition-all placeholder:text-gray-400 text-gray-800 dark:text-gray-100"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 transition-colors ${theme.hoverText}`}
                            >
                                <X className="w-3 h-3" />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center justify-between w-full md:w-auto gap-4 pl-2 md:pl-0 pr-2 md:pr-1">
                        <div className="hidden md:block text-xs font-medium text-gray-500 whitespace-nowrap px-2">
                            <span className={`${theme.text} font-bold`}>{filteredItems.length}</span> Foto
                        </div>
                        <div className="md:hidden text-xs font-bold text-gray-400">
                            {filteredItems.length} Hasil
                        </div>
                        <div className="flex md:hidden bg-gray-100 dark:bg-gray-800 p-1 rounded-lg shrink-0">
                            <button
                                onClick={() => setMobileColumns(1)}
                                className={`p-1.5 px-3 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${mobileColumns === 1 ? `bg-white dark:bg-gray-700 shadow-sm ${theme.text}` : 'text-gray-400'}`}
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setMobileColumns(2)}
                                className={`p-1.5 px-3 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${mobileColumns === 2 ? `bg-white dark:bg-gray-700 shadow-sm ${theme.text}` : 'text-gray-400'}`}
                            >
                                <GridIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {filteredItems.length > 0 ? (
                <div className={`
                    grid gap-4 md:gap-6 transition-all duration-500
                    ${mobileColumns === 1 ? 'grid-cols-1' : 'grid-cols-2'} 
                    sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                `}>
                    {filteredItems.map((item, idx) => {
                        const thumbnailUrl = getImageUrl(item.images, 'thumbnail');
                        const blurUrl = item.images?.blur || "";

                        return (
                            <div
                                key={item.id}
                                className="relative group rounded-2xl overflow-hidden cursor-pointer aspect-square bg-gray-100 dark:bg-gray-800 shadow-sm hover:shadow-xl transition-all duration-300"
                                onClick={() => setSelectedIndex(idx)}
                            >
                                <img
                                    src={thumbnailUrl}
                                    alt={item.title || "Gallery image"}
                                    loading="lazy"
                                    style={{ 
                                        backgroundImage: blurUrl ? `url(${blurUrl})` : 'none',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-white text-sm font-bold truncate">{item.title || "Untitled"}</p>
                                    <p className="text-white/70 text-[10px] uppercase tracking-wider mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity delay-75">Lihat Foto</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 text-gray-400">
                        <Search className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tidak ditemukan</h3>
                    <p className="text-gray-500">Coba kata kunci lain{searchQuery ? ` untuk "${searchQuery}"` : ""}</p>
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className={`mt-6 ${theme.text} font-semibold hover:underline`}
                        >
                            Hapus Pencarian
                        </button>
                    )}
                </div>
            )}

            <div className="pt-12 border-t border-gray-100 dark:border-gray-800 flex justify-center">
                <Link
                    href={theme.linkBack}
                    className={`group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-800 ${theme.bgHover} hover:text-white text-gray-600 dark:text-gray-300 font-medium transition-all duration-300`}
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Kembali ke Beranda</span>
                </Link>
            </div>

            {activeItem && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black animate-in fade-in duration-300"
                    onClick={() => setSelectedIndex(null)}
                >
                    <div
                        className="relative w-full h-full flex items-center justify-center p-0 md:p-8 touch-action-pan-y overscroll-contain"
                        onClick={(e) => e.stopPropagation()}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        <img 
                            src={getImageUrl(activeItem.images, 'full')} 
                            alt={activeItem.title || "Gallery image"} 
                            className="w-full h-auto max-h-[80vh] md:max-h-[85vh] object-contain md:rounded-sm shadow-2xl" 
                        />
                    </div>
                    
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent pt-24 pb-8 px-6 md:px-12 pointer-events-none">
                        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-end gap-4">
                            <div className="text-left space-y-2 pointer-events-auto">
                                <h3 className="text-xl md:text-3xl font-bold text-white">{activeItem.title || "Untitled"}</h3>
                                <p className="text-gray-300 text-sm md:text-base max-w-2xl line-clamp-2 md:line-clamp-none">{activeItem.description || ""}</p>
                            </div>
                            <div className="text-white font-mono text-sm md:text-lg tracking-widest opacity-80 whitespace-nowrap">
                                {selectedIndex! + 1} / {filteredItems.length}
                            </div>
                        </div>
                    </div>
                    
                    <button onClick={(e) => { e.stopPropagation(); handlePrev() }} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10 active:scale-95 md:hover:scale-110 z-50"><ChevronLeft className="w-6 h-6 md:w-8 md:h-8" /></button>
                    <button onClick={(e) => { e.stopPropagation(); handleNext() }} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10 active:scale-95 md:hover:scale-110 z-50"><ChevronRight className="w-6 h-6 md:w-8 md:h-8" /></button>
                    <button onClick={() => setSelectedIndex(null)} className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10 group z-50"><X className="w-6 h-6 group-hover:rotate-90 transition-transform" /></button>
                </div>
            )}
        </div>
    )
}