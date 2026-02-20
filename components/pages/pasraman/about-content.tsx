"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Target, CheckCircle2, Quote } from "lucide-react"

type EntityType = "pura" | "yayasan" | "pasraman"

export interface AboutImages {
    xs?: string; sm?: string; md?: string; lg?: string; xl?: string;
    "2xl"?: string; fhd?: string; blur?: string;
}

export interface AboutData {
    id: string
    title: string
    description: string
    images: AboutImages
}

export interface OrganizationDetail {
    id: string
    entity_type: EntityType
    vision: string | null
    mission: string | null
    rules: string | null
    work_program: string | null
    vision_mission_image_url: string | null
    work_program_image_url: string | null
    rules_image_url: string | null
    created_at: string
    updated_at: string
}

interface AboutContentProps {
    data: AboutData | null
    orgDetail: OrganizationDetail | null
}

export default function AboutContentPasraman({ data, orgDetail }: AboutContentProps) {
    const [activeTab, setActiveTab] = useState<'vision' | 'mission'>('vision')

    useEffect(() => {
        
    }, [])

    if (!data) return null;

    const paragraphs = data.description.split("\n").filter(p => p.trim()) || []

    const getHeroImageUrl = (imgs: AboutImages) => {
        if (!imgs) return "";
        return imgs.fhd || imgs["2xl"] || imgs.xl || imgs.lg || imgs.md || "";
    }

    const mainImageUrl = getHeroImageUrl(data.images);
    
    const fallbackOrgImage = data.images.lg || data.images.md || "";

    const renderFlexibleContent = (content: string | null) => {
        if (!content) return <p className="text-gray-500 italic text-lg">Belum ada data visi & misi untuk Pasraman.</p>;

        const items = content.split('\n').filter(item => item.trim() !== "");

        if (items.length > 1) {
            return (
                <ul className="space-y-4 mt-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {items.map((item, idx) => (
                        <li key={idx} className="flex gap-4 items-start group">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0 mt-1 transition-colors duration-300 bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white">
                                {idx + 1}
                            </span>
                            <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed text-justify">
                                {item}
                            </p>
                        </li>
                    ))}
                </ul>
            );
        }

        return (
            <div className="mt-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 text-justify">
                    {items[0]}
                </p>
            </div>
        );
    };

    return (
        <section id="about" className="pt-32 pb-20 bg-white dark:bg-gray-950 overflow-hidden min-h-[100dvh]">
            <div className="container mx-auto px-6 md:px-12">

                <div className="text-center max-w-4xl mx-auto mb-12 space-y-6">
                    <div className="flex items-center justify-center gap-4" data-aos="fade-up">
                        <div className="h-[2px] w-8 md:w-12 bg-emerald-500/60"></div>
                        <span className="text-emerald-600 dark:text-emerald-400 text-xs md:text-sm font-bold tracking-[0.3em] uppercase">
                            Lembaga Pendidikan
                        </span>
                        <div className="h-[2px] w-8 md:w-12 bg-emerald-500/60"></div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight" data-aos="fade-up" data-aos-delay="100">
                        Tentang <span className="text-emerald-600">Pasraman</span>
                    </h1>

                    <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                        Mengenal lebih dekat sistem pendidikan, pembentukan karakter, dan nilai-nilai Dharma yang diajarkan di Pasraman Kertajaya.
                    </p>
                </div>

                <div className="w-full flex justify-center mb-16" data-aos="zoom-in" data-aos-duration="1000">
                    <div className="w-full max-w-5xl h-[40vh] md:h-[60vh] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-emerald-900/10 border-4 border-white dark:border-gray-800 relative bg-gray-100 dark:bg-gray-900">
                        <img
                            loading="lazy"
                            src={mainImageUrl}
                            alt="Pasraman Kertajaya"
                            className="w-full h-full object-cover object-center"
                            style={{ 
                                backgroundImage: data.images.blur ? `url(${data.images.blur})` : 'none',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        />
                        <div className="absolute inset-0 bg-black/10"></div>
                    </div>
                </div>

                <article className="max-w-4xl mx-auto text-gray-700 dark:text-gray-300 leading-relaxed space-y-8 text-lg md:text-xl text-justify mb-24 border-b border-gray-100 dark:border-gray-800 pb-12">
                    {paragraphs.map((paragraph, index) => (
                        <p key={index} data-aos="fade-up" data-aos-delay={100 + (index * 50)}>
                            {paragraph}
                        </p>
                    ))}
                </article>

                {orgDetail && (
                    <div className="max-w-6xl mx-auto mb-24 space-y-32">
                        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                            
                            <div className="w-full lg:col-span-5 relative lg:sticky lg:top-32 order-2 lg:order-1" data-aos="fade-right">
                                <div className="hidden md:block absolute inset-0 transform -translate-x-4 translate-y-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-[2.5rem] -z-10"></div>
                                <div className="relative h-[400px] lg:h-[550px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-900">
                                    <img 
                                        src={orgDetail.vision_mission_image_url || fallbackOrgImage} 
                                        alt="Visi Misi Pasraman" 
                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-8 left-8 text-white">
                                        <Quote className="w-8 h-8 mb-2 opacity-80" />
                                        <p className="font-bold text-lg tracking-wider uppercase">Tujuan Pendidikan</p>
                                        <p className="text-sm opacity-80">Pasraman Kertajaya</p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:col-span-7 order-1 lg:order-2 lg:pt-8" data-aos="fade-left">
                                <div className="flex items-center gap-8 mb-8 border-b border-gray-200 dark:border-gray-800 relative">
                                    <button 
                                        onClick={() => setActiveTab('vision')}
                                        className={`pb-4 text-xl font-bold flex items-center gap-2 transition-all duration-300 relative ${
                                            activeTab === 'vision' 
                                            ? "text-emerald-600 dark:text-emerald-400" 
                                            : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                        }`}
                                    >
                                        <Target className={`w-5 h-5 ${activeTab === 'vision' ? "stroke-[2.5px]" : "stroke-2"}`} />
                                        VISI
                                        {activeTab === 'vision' && (
                                            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-emerald-600 rounded-t-full animate-in fade-in zoom-in duration-300" />
                                        )}
                                    </button>

                                    <button 
                                        onClick={() => setActiveTab('mission')}
                                        className={`pb-4 text-xl font-bold flex items-center gap-2 transition-all duration-300 relative ${
                                            activeTab === 'mission' 
                                            ? "text-emerald-600 dark:text-emerald-400" 
                                            : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                        }`}
                                    >
                                        <CheckCircle2 className={`w-5 h-5 ${activeTab === 'mission' ? "stroke-[2.5px]" : "stroke-2"}`} />
                                        MISI
                                        {activeTab === 'mission' && (
                                            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-emerald-600 rounded-t-full animate-in fade-in zoom-in duration-300" />
                                        )}
                                    </button>
                                </div>

                                <div className="min-h-[200px]">
                                    {activeTab === 'vision' ? (
                                        <div key="vision-content">
                                            {renderFlexibleContent(orgDetail.vision)}
                                        </div>
                                    ) : (
                                        <div key="mission-content">
                                            {renderFlexibleContent(orgDetail.mission)}
                                        </div>
                                    )}
                                </div>
                                
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-center pt-12 border-t border-gray-100 dark:border-gray-800" data-aos="fade-up">
                    <Link
                        href="/pasraman"
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-emerald-600 hover:text-white text-gray-600 dark:text-gray-300 font-bold transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-emerald-500/30"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Kembali ke Beranda Pasraman</span>
                    </Link>
                </div>

            </div>
        </section>
    )
}

