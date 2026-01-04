"use client"

import { useState, useEffect, useMemo } from "react"
import { X, Search, LayoutGrid, Grid as GridIcon, ArrowLeft, Calendar, ArrowRight, Star } from "lucide-react"
import Link from "next/link"

export interface ArticleImages {
    xs?: string; sm?: string; md?: string; lg?: string; xl?: string;
    "2xl"?: string; fhd?: string; blur?: string;
}

export interface ArticleItem {
    id: string
    title: string
    slug: string
    excerpt: string
    author_name: string
    published_at: string
    is_featured: boolean
    category?: { name: string; slug: string }
    images: ArticleImages
}

type EntityType = "pura" | "yayasan" | "pasraman"

interface ArticlesFeedProps {
    items: ArticleItem[]
    entityType?: EntityType
}

export default function ArticlesFeed({ items, entityType = "pura" }: ArticlesFeedProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [mobileColumns, setMobileColumns] = useState<1 | 2>(1) 
    const [isSearchFocused, setIsSearchFocused] = useState(false)
    const [screenSize, setScreenSize] = useState<string>("lg")

    const themeConfig = {
        pura: {
            text: "text-orange-600",
            ring: "ring-orange-500",
            shadow: "shadow-orange-500/10",
            hoverText: "group-hover:text-orange-600",
            bgHover: "hover:bg-orange-600",
            linkBack: "/",
            star: "text-orange-500 fill-orange-500"
        },
        yayasan: {
            text: "text-blue-600",
            ring: "ring-blue-500",
            shadow: "shadow-blue-500/10",
            hoverText: "group-hover:text-blue-600",
            bgHover: "hover:bg-blue-600",
            linkBack: "/yayasan",
            star: "text-blue-500 fill-blue-500"
        },
        pasraman: {
            text: "text-emerald-600",
            ring: "ring-emerald-500",
            shadow: "shadow-emerald-500/10",
            hoverText: "group-hover:text-emerald-600",
            bgHover: "hover:bg-emerald-600",
            linkBack: "/pasraman",
            star: "text-emerald-500 fill-emerald-500"
        }
    }
    const theme = themeConfig[entityType] || themeConfig.pura

    useEffect(() => {
        const updateSize = () => {
            const width = window.innerWidth
            if (width < 640) setScreenSize("sm")
            else if (width < 1024) setScreenSize("lg")
            else setScreenSize("2xl")
        }
        updateSize()
        window.addEventListener("resize", updateSize)
        return () => window.removeEventListener("resize", updateSize)
    }, [])

    const getThumbnailUrl = (images: ArticleImages) => {
        if (!images) return ""
        const priority = [screenSize, "lg", "md", "sm", "xs"]
        for (const size of priority) {
            // @ts-ignore
            const url = images[size as keyof ArticleImages]
            if (url) return url
        }
        return Object.values(images).find(url => !!url && !url.includes('_blur')) || ""
    }

    const filteredItems = useMemo(() => {
        const filtered = items.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.author_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        return filtered.sort((a, b) => {
            if (a.is_featured && !b.is_featured) return -1
            if (!a.is_featured && b.is_featured) return 1
            return new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
        })
    }, [items, searchQuery])

    return (
        <div className="space-y-10 min-h-[60vh]">
            
            <div className="relative z-30 flex justify-center px-4 md:px-0">
                <div className={`
                    flex flex-col md:flex-row items-center gap-3 md:gap-4 
                    w-full max-w-2xl 
                    bg-white dark:bg-gray-900/95 backdrop-blur-xl 
                    p-2 md:p-3 rounded-2xl md:rounded-full 
                    shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/20 dark:border-gray-800
                    transition-all duration-300
                    ${isSearchFocused ? `ring-2 ${theme.ring} ring-opacity-50 ${theme.shadow} scale-[1.01]` : ''}
                `}>
                    <div className="relative w-full flex-grow group">
                        <div className={`absolute left-3 md:left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isSearchFocused ? theme.text : 'text-gray-400 group-hover:text-gray-600'}`}>
                            <Search className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            placeholder="Cari artikel, topik, atau penulis..."
                            value={searchQuery}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full h-11 md:h-12 pl-10 md:pl-12 pr-4 rounded-xl md:rounded-full bg-gray-50 dark:bg-gray-800 border-transparent focus:bg-white dark:focus:bg-gray-950 outline-none text-base transition-all placeholder:text-gray-400 text-gray-800 dark:text-gray-100 focus:ring-0`}
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery("")} className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 transition-colors ${theme.hoverText}`}>
                                <X className="w-3 h-3" />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center justify-between w-full md:w-auto gap-4 pl-2 md:pl-0 pr-2 md:pr-1">
                        <div className="hidden md:block text-xs font-medium text-gray-500 whitespace-nowrap px-2">
                            <span className={`${theme.text} font-bold`}>{filteredItems.length}</span> Artikel
                        </div>
                        
                        <div className="flex md:hidden bg-gray-100 dark:bg-gray-800 p-1 rounded-lg shrink-0">
                            <button onClick={() => setMobileColumns(1)} className={`p-1.5 px-3 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${mobileColumns === 1 ? `bg-white dark:bg-gray-700 shadow-sm ${theme.text}` : 'text-gray-400'}`}>
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button onClick={() => setMobileColumns(2)} className={`p-1.5 px-3 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${mobileColumns === 2 ? `bg-white dark:bg-gray-700 shadow-sm ${theme.text}` : 'text-gray-400'}`}>
                                <GridIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {filteredItems.length > 0 ? (
                <div className={`grid gap-4 md:gap-8 transition-all duration-500 ${mobileColumns === 1 ? 'grid-cols-1' : 'grid-cols-2'} md:grid-cols-2 lg:grid-cols-3`}>
                    {filteredItems.map((article, idx) => {
                        const thumbUrl = getThumbnailUrl(article.images)
                        const blurUrl = article.images.blur || ""

                        return (
                            <Link 
                                href={`/articles/${article.slug}?ref=${entityType}`} 
                                key={article.id}
                                className="group flex flex-col h-full bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-none transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
                                style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'backwards' }}
                            >
                                <div className={`relative w-full overflow-hidden ${mobileColumns === 2 ? 'aspect-square md:aspect-video h-auto' : 'h-52 md:h-60'}`}>
                                    <div className="absolute top-3 left-3 md:top-4 md:left-4 z-20 flex flex-col gap-2 items-start">
                                        {article.category && (
                                            <span className="px-2 py-1 md:px-3 md:py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm backdrop-blur-md bg-white/90 text-gray-900">
                                                {article.category.name}
                                            </span>
                                        )}
                                        {article.is_featured && (
                                            <span className={`px-2 py-1 md:px-3 md:py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm backdrop-blur-md bg-white/95 flex items-center gap-1 ${theme.text}`}>
                                                <Star className={`w-3 h-3 ${theme.star}`} />
                                                <span className="hidden md:inline">Pilihan</span>
                                            </span>
                                        )}
                                    </div>
                                    <img
                                        src={thumbUrl} alt={article.title} loading="lazy" decoding="async"
                                        style={{ backgroundImage: blurUrl ? `url(${blurUrl})` : "none", backgroundSize: "cover", backgroundPosition: "center" }}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                </div>

                                <div className={`flex flex-col flex-grow ${mobileColumns === 2 ? 'p-3 md:p-6' : 'p-6 md:p-8'}`}>
                                    <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 md:mb-4">
                                        <div className="flex items-center gap-1">
                                            <Calendar className={`w-3 h-3 ${theme.text}`} />
                                            <span className={mobileColumns === 2 ? 'text-[10px]' : ''}>
                                                {new Date(article.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className={`font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 transition-colors ${theme.hoverText} ${mobileColumns === 2 ? 'text-sm md:text-xl' : 'text-xl'}`}>
                                        {article.title}
                                    </h3>
                                    <p className={`text-gray-600 dark:text-gray-400 text-sm flex-grow leading-relaxed ${mobileColumns === 2 ? 'hidden md:line-clamp-3 mb-0' : 'line-clamp-3 mb-6'}`}>
                                        {article.excerpt}
                                    </p>
                                    <div className={`pt-6 mt-auto border-t border-gray-100 dark:border-gray-800 items-center gap-2 text-sm font-bold ${theme.text} ${mobileColumns === 2 ? 'hidden md:flex' : 'flex'}`}>
                                        Baca Selengkapnya <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 text-gray-400"><Search className="w-8 h-8" /></div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tidak ditemukan</h3>
                    <p className="text-gray-500">Coba kata kunci lain untuk "{searchQuery}"</p>
                    <button onClick={() => setSearchQuery("")} className={`mt-6 ${theme.text} font-semibold hover:underline`}>Hapus Pencarian</button>
                </div>
            )}

            <div className="pt-12 border-t border-gray-100 dark:border-gray-800 flex justify-center">
                <Link href={theme.linkBack} className={`group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-800 ${theme.bgHover} hover:text-white text-gray-600 dark:text-gray-300 font-medium transition-all duration-300`}>
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> <span>Kembali ke Beranda</span>
                </Link>
            </div>
        </div>
    )
}