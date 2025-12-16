"use client"

import { useEffect, useState, useRef } from "react"
import { Clock, MapPin, ArrowUpRight } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"
import ActivityModal from "./activities/activity-modal"

interface Activity {
    id: string
    title: string
    description: string
    time_info: string
    location: string
}

interface ActivitiesSectionProps {
    initialData: Activity[]
}

export default function ActivitiesSection({ initialData }: ActivitiesSectionProps) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        AOS.init({ duration: 700, once: true })
    }, [])

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current
            const { scrollLeft, clientWidth } = container
            const itemWidth = clientWidth * 0.85
            const newIndex = Math.round(scrollLeft / itemWidth)
            const clampedIndex = Math.min(Math.max(newIndex, 0), (initialData?.length || 0) - 1)
            setActiveIndex(clampedIndex)
        }
    }

    if (!initialData || initialData.length === 0) return null;

    return (
        <section id="activities" className="py-24 bg-white dark:bg-gray-950 overflow-hidden border-t border-gray-100 dark:border-gray-900">
            <div className="container mx-auto px-6 md:px-12">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16" data-aos="fade-up">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="h-[2px] w-12 bg-orange-600"></div>
                            <span className="text-orange-600 dark:text-orange-600 text-sm font-bold tracking-[0.2em] uppercase">
                                Agenda Pura
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                            Jadwal & <span className="text-orange-600">Kegiatan</span>
                        </h2>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md text-sm md:text-base leading-relaxed text-left md:text-right">
                        Saksikan dan ikuti beragam kegiatan spiritual serta tradisi budaya kami yang akan datang.
                    </p>
                </div>

                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="
                        flex flex-nowrap overflow-x-auto overflow-y-hidden snap-x snap-mandatory gap-6 pb-12 -mx-6 px-6
                        md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:pb-0 md:mx-0 md:px-0 md:overflow-visible
                        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
                    "
                >
                    {initialData.map((activity, index) => (
                        <div
                            key={activity.id}
                            onClick={() => setSelectedActivity(activity)}
                            className="
                                group relative flex flex-col justify-between cursor-pointer
                                w-[85%] md:w-auto flex-shrink-0 snap-center
                                bg-gray-50 dark:bg-gray-900 rounded-3xl p-6 md:p-8
                                border border-gray-100 dark:border-gray-800
                                md:hover:border-orange-200 dark:md:hover:border-orange-900
                                transition-all duration-500
                                md:hover:-translate-y-2 md:hover:shadow-xl md:hover:shadow-orange-500/5
                            "
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >

                            <div className="flex justify-between items-start mb-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                                    <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-orange-500" />
                                    <span className="text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-300">
                                        {activity.time_info}
                                    </span>
                                </div>

                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-300 md:group-hover:text-orange-500 md:group-hover:bg-orange-50 dark:md:group-hover:bg-orange-900/20 transition-all duration-500 border border-gray-100 dark:border-gray-700">
                                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 transform md:group-hover:rotate-45 transition-transform duration-500" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:group-hover:text-orange-600 transition-colors">
                                        {activity.title}
                                    </h3>

                                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3 text-sm md:text-base">
                                        {activity.description}
                                    </p>

                                    <p className="mt-4 text-sm font-bold text-orange-600 opacity-0 -translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300 hidden md:block">
                                        Baca Selengkapnya
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs md:text-sm">
                                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                <span className="font-medium truncate">{activity.location}</span>
                            </div>
                        </div>
                    ))}

                    <div className="w-[5%] flex-shrink-0 md:hidden"></div>
                </div>

                <div className="flex md:hidden justify-center gap-2 -mt-4 mb-4">
                    {initialData.map((_, idx) => (
                        <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? "w-8 bg-orange-500" : "w-1.5 bg-gray-300 dark:bg-gray-700"}`}></div>
                    ))}
                </div>

                {selectedActivity && (
                    <ActivityModal
                        activity={selectedActivity}
                        onClose={() => setSelectedActivity(null)}
                    />
                )}

            </div>
        </section>
    )
}