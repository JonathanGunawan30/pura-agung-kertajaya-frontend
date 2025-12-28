"use client"

import { useEffect, useState } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import Link from "next/link"
import { ArrowLeft, Target, CheckCircle2, Quote, Briefcase, ListTodo } from "lucide-react"

type EntityType = "pura" | "yayasan" | "pasraman"

export interface AboutData {
    id: string
    title: string
    description: string
    image_url: string
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

export default function AboutContentYayasan({ data, orgDetail }: AboutContentProps) {
    const [activeTab, setActiveTab] = useState<'vision' | 'mission'>('vision')

    useEffect(() => {
        AOS.init({ duration: 800, once: true })
    }, [])

    if (!data) return null;

    const paragraphs = data.description.split("\n").filter(p => p.trim()) || []

    const renderFlexibleContent = (content: string | null) => {
        if (!content) return <p className="text-gray-500 italic text-lg">Belum ada data.</p>;

        const items = content.split('\n').filter(item => item.trim() !== "");

        if (items.length > 1) {
            return (
                <ul className="space-y-4 mt-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {items.map((item, idx) => (
                        <li key={idx} className="flex gap-4 items-start group">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0 mt-1 transition-colors duration-300 bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white">
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
        <section className="pt-32 pb-20 bg-white dark:bg-gray-950 overflow-hidden min-h-screen">
            <div className="container mx-auto px-6 md:px-12">

                <div className="text-center max-w-4xl mx-auto mb-12 space-y-6">
                    <div className="flex items-center justify-center gap-4" data-aos="fade-up">
                        <div className="h-[2px] w-8 md:w-12 bg-blue-500/60"></div>
                        <span className="text-blue-600 dark:text-blue-400 text-xs md:text-sm font-bold tracking-[0.3em] uppercase">
                            Profil Lembaga
                        </span>
                        <div className="h-[2px] w-8 md:w-12 bg-blue-500/60"></div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight" data-aos="fade-up" data-aos-delay="100">
                        Tentang <span className="text-blue-600">Yayasan</span>
                    </h1>

                    <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                        Mengenal lebih dalam sejarah, legalitas, dan komitmen pengabdian Yayasan Kertajaya untuk umat.
                    </p>
                </div>

                <div className="w-full flex justify-center mb-16" data-aos="zoom-in" data-aos-duration="1000">
                    <div className="w-full max-w-5xl h-[40vh] md:h-[60vh] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 border-4 border-white dark:border-gray-800 relative">
                        <img
                            loading="lazy"
                            src={data.image_url}
                            alt="Yayasan Kertajaya"
                            className="w-full h-full object-cover object-center"
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
                                <div className="hidden md:block absolute inset-0 transform -translate-x-4 translate-y-4 bg-blue-50 dark:bg-blue-900/20 rounded-[2.5rem] -z-10"></div>
                                <div className="relative h-[400px] lg:h-[550px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                                    <img 
                                        src={orgDetail.vision_mission_image_url || data.image_url} 
                                        alt="Visi Misi Yayasan" 
                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-8 left-8 text-white">
                                        <Quote className="w-8 h-8 mb-2 opacity-80" />
                                        <p className="font-bold text-lg tracking-wider uppercase">Arah & Tujuan</p>
                                        <p className="text-sm opacity-80">Yayasan Kertajaya</p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:col-span-7 order-1 lg:order-2 lg:pt-8" data-aos="fade-left">
                                <div className="flex items-center gap-8 mb-8 border-b border-gray-200 dark:border-gray-800 relative">
                                    <button 
                                        onClick={() => setActiveTab('vision')}
                                        className={`pb-4 text-xl font-bold flex items-center gap-2 transition-all duration-300 relative ${
                                            activeTab === 'vision' 
                                            ? "text-blue-600 dark:text-blue-400" 
                                            : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                        }`}
                                    >
                                        <Target className={`w-5 h-5 ${activeTab === 'vision' ? "stroke-[2.5px]" : "stroke-2"}`} />
                                        VISI
                                        {activeTab === 'vision' && (
                                            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-t-full animate-in fade-in zoom-in duration-300" />
                                        )}
                                    </button>

                                    <button 
                                        onClick={() => setActiveTab('mission')}
                                        className={`pb-4 text-xl font-bold flex items-center gap-2 transition-all duration-300 relative ${
                                            activeTab === 'mission' 
                                            ? "text-blue-600 dark:text-blue-400" 
                                            : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                        }`}
                                    >
                                        <CheckCircle2 className={`w-5 h-5 ${activeTab === 'mission' ? "stroke-[2.5px]" : "stroke-2"}`} />
                                        MISI
                                        {activeTab === 'mission' && (
                                            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-t-full animate-in fade-in zoom-in duration-300" />
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

                        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                            
                            <div className="w-full lg:col-span-7 order-1 space-y-8" data-aos="fade-right">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                                            <Briefcase className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <span className="text-blue-600 dark:text-blue-400 text-sm font-bold tracking-[0.2em] uppercase">Rencana Kerja</span>
                                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-1">Program Kerja</h2>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        {renderFlexibleContent(orgDetail.work_program)}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:col-span-5 order-2" data-aos="fade-left">
                                <div className="relative group">
                                    <div className="hidden md:block absolute inset-0 transform translate-x-4 translate-y-4 bg-blue-50 dark:bg-blue-900/20 rounded-[2.5rem] -z-10"></div>
                                    <div className="relative h-[350px] md:h-[450px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                                        <img 
                                            src={orgDetail.work_program_image_url || data.image_url} 
                                            alt="Program Kerja Yayasan" 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent"></div>
                                        <div className="absolute bottom-8 left-8 text-white">
                                            <ListTodo className="w-8 h-8 mb-2 opacity-80" />
                                            <p className="font-bold text-lg tracking-wider uppercase">Agenda & Kegiatan</p>
                                            <p className="text-sm opacity-80">Rencana Strategis</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                )}

                <div className="flex justify-center pt-12 border-t border-gray-100 dark:border-gray-800" data-aos="fade-up">
                    <Link
                        href="/yayasan"
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-600 hover:text-white text-gray-600 dark:text-gray-300 font-bold transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-blue-500/30"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Kembali ke Beranda Yayasan</span>
                    </Link>
                </div>

            </div>
        </section>
    )
}