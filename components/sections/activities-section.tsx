"use client"

import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import { CalendarWidget } from "@/components/ui/calendar-widget"

interface Activity {
    id: string
    title: string
    description: string
    time_info: string
    order_index: number
    location: string
    event_date: string
    entity_type: "pura" | "yayasan" | "pasraman"
}

interface ActivitiesSectionProps {
    initialData: Activity[]
    entityType?: "pura" | "yayasan" | "pasraman"
}

export default function ActivitiesSection({ initialData, entityType = "pura" }: ActivitiesSectionProps) {

    useEffect(() => {
        AOS.init({ duration: 700, once: true })
    }, [])

    const themeConfig = {
        pura: { text: "text-orange-600", border: "border-orange-600" },
        yayasan: { text: "text-blue-600", border: "border-blue-600" },
        pasraman: { text: "text-emerald-600", border: "border-emerald-600" },
    }

    const theme = themeConfig[entityType]

    if (!initialData) return null;

    return (
        <section id="activities" className="py-24 bg-white dark:bg-black">
            <div className="container mx-auto px-6 md:px-12">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16" data-aos="fade-up">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className={`h-[2px] w-12 ${theme.border.replace('border', 'bg')}`}></div>
                            <span className={`${theme.text} dark:${theme.text} text-sm font-bold tracking-[0.2em] uppercase`}>
                                Agenda {entityType}
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                            Kalender <span className={theme.text}>Kegiatan</span>
                        </h2>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md text-sm md:text-base leading-relaxed text-left md:text-right">
                        Simak jadwal lengkap persembahyangan, upacara, dan kegiatan sosial kami bulan ini.
                    </p>
                </div>

                <div data-aos="fade-up" data-aos-delay="100">
                    <CalendarWidget 
                        activities={initialData} 
                        entityType={entityType} 
                    />
                </div>

            </div>
        </section>
    )
}