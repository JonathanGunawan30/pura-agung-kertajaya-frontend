"use client"

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import AOS from "aos"
import "aos/dist/aos.css"
import { ArrowRight, Calendar, User, Star } from "lucide-react"

export interface Article {
    id: string
    title: string
    slug: string
    excerpt: string
    author_name: string
    published_at: string
    is_featured: boolean;
    category?: {
        name: string
        slug: string
    }
    images: {
        xs?: string
        sm?: string
        md?: string
        lg?: string
        xl?: string
        "2xl"?: string
        fhd?: string
        blur?: string
    }
}

interface ArticleSectionProps {
    initialData: Article[]
    entityType?: "pura" | "yayasan" | "pasraman"
}

export default function ArticleSection({ initialData, entityType = "pura" }: ArticleSectionProps) {
    const [screenSize, setScreenSize] = useState<string>("lg")

    const themeConfig = {
        pura: {
            text: "text-orange-600",
            bg: "bg-orange-600",
            bgSoft: "bg-orange-50 dark:bg-orange-900/10",
            hoverText: "group-hover:text-orange-600",
            badge: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
            star: "fill-orange-600 text-orange-600"
        },
        yayasan: {
            text: "text-blue-600",
            bg: "bg-blue-600",
            bgSoft: "bg-blue-50 dark:bg-blue-900/10",
            hoverText: "group-hover:text-blue-600",
            badge: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
            star: "fill-blue-600 text-blue-600"
        },
        pasraman: {
            text: "text-emerald-600",
            bg: "bg-emerald-600",
            bgSoft: "bg-emerald-50 dark:bg-emerald-900/10",
            hoverText: "group-hover:text-emerald-600",
            badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
            star: "fill-emerald-600 text-emerald-600"
        },
    }

    const theme = themeConfig[entityType] || themeConfig.pura

    useEffect(() => {
        AOS.init({ duration: 800, once: true })
        
        const updateSize = () => {
            const width = window.innerWidth
            if (width < 480) setScreenSize("xs")
            else if (width < 640) setScreenSize("sm")
            else if (width < 768) setScreenSize("md")
            else if (width < 1024) setScreenSize("lg")
            else if (width < 1280) setScreenSize("xl")
            else setScreenSize("2xl")
        }
        
        updateSize()
        window.addEventListener("resize", updateSize)
        return () => window.removeEventListener("resize", updateSize)
    }, [])

    const displayArticles = useMemo(() => {
        if (!initialData) return [];
        return [...initialData]
            .sort((a, b) => {
                if (a.is_featured && !b.is_featured) return -1;
                if (!a.is_featured && b.is_featured) return 1;
                return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
            })
            .slice(0, 3);
    }, [initialData]);

    const getResponsiveImageUrl = (images: Article['images']) => {
        if (!images) return ""
        const priority = [screenSize, "lg", "md", "sm", "fhd"]
        for (const size of priority) {
            // @ts-ignore
            const url = images[size as keyof typeof images]
            if (url) return url
        }
        return Object.values(images).find(url => !!url && !url.includes('_blur')) || ""
    }

    if (!displayArticles || displayArticles.length === 0) return null

    return (
        <section id="articles" className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6" data-aos="fade-up">
                    <div className="space-y-4 max-w-2xl">
                        <div className="flex items-center gap-4">
                            <div className={`h-[2px] w-12 ${theme.bg}`}></div>
                            <span className={`${theme.text} text-sm font-bold tracking-[0.2em] uppercase`}>
                                Berita & Artikel
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                            Artikel <span className={theme.text}>Terkini</span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed">
                            Informasi terbaru seputar kegiatan, upacara, dan pengumuman penting.
                        </p>
                    </div>

                    <Link 
                        href={`/articles?ref=${entityType}`}
                        className={`group hidden md:flex items-center gap-2 font-bold transition-colors ${theme.text}`}
                    >
                        Lihat Semua Berita
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayArticles.map((article, index) => {
                        const mainImageUrl = getResponsiveImageUrl(article.images)
                        const blurPlaceholder = article.images?.blur || ""

                        return (
                            <Link 
                                href={`/articles/${article.slug}?ref=${entityType}`}
                                key={article.id}
                                className={`group flex flex-col h-full bg-gray-50 dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-none transition-all duration-500`}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="relative h-60 w-full overflow-hidden">
                                    
                                    <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 items-start">
                                        {article.category && (
                                            <span className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm backdrop-blur-md bg-white/90 text-gray-900`}>
                                                {article.category.name}
                                            </span>
                                        )}
                                        
                                        {article.is_featured && (
                                            <span className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm backdrop-blur-md bg-white/95 flex items-center gap-1.5 ${theme.text}`}>
                                                <Star className={`w-3 h-3 ${theme.star}`} />
                                                Pilihan
                                            </span>
                                        )}
                                    </div>

                                    <img
                                        src={mainImageUrl}
                                        alt={article.title}
                                        loading="lazy"
                                        decoding="async"
                                        style={{
                                            backgroundImage: blurPlaceholder ? `url(${blurPlaceholder})` : "none",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center"
                                        }}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                </div>

                                <div className="p-6 md:p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400 mb-4">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className={`w-3.5 h-3.5 ${theme.text}`} />
                                            <span>
                                                {new Date(article.published_at).toLocaleDateString("id-ID", {
                                                    day: "numeric", month: "long", year: "numeric"
                                                })}
                                            </span>
                                        </div>
                                        {article.author_name && (
                                            <div className="flex items-center gap-1.5">
                                                <User className={`w-3.5 h-3.5 ${theme.text}`} />
                                                <span className="line-clamp-1">{article.author_name}</span>
                                            </div>
                                        )}
                                    </div>

                                    <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 transition-colors ${theme.hoverText}`}>
                                        {article.title}
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                                        {article.excerpt}
                                    </p>

                                    <div className={`pt-6 mt-auto border-t border-gray-200 dark:border-gray-800 flex items-center gap-2 text-sm font-bold ${theme.text}`}>
                                        Baca Selengkapnya
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>

                 <div className="mt-8 flex justify-center md:hidden" data-aos="fade-up">
                    <Link 
                        href={`/articles?ref=${entityType}`}
                        className={`inline-flex items-center gap-2 font-bold ${theme.text}`}
                    >
                        Lihat Semua Berita
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                 </div>
            </div>
        </section>
    )
}