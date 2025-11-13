"use client"

import { useEffect, useState } from "react"
import { Calendar, Clock, MapPin } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

interface Activity {
    id: string
    title: string
    description: string
    time_info: string
    location: string
}

export default function ActivitiesSection() {
    const [activities, setActivities] = useState<Activity[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        AOS.init({ duration: 700, once: true })
    }, [])

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const res = await fetch("/api/public/activities")
                const data = await res.json()
                setActivities(data.data || [])
            } finally {
                setLoading(false)
            }
        }
        fetchActivities()
    }, [])

    return (
        <section id="activities" className="py-20 md:py-32 bg-muted">
            <div className="section-container">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4" data-aos="fade-up">Aktivitas & Acara</h2>
                    <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: "var(--orange)" }} data-aos="fade-up" data-aos-delay="100"></div>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                        Saksikan dan ikuti beragam kegiatan spiritual serta tradisi budaya kami sepanjang tahun.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-[260px] rounded-2xl animate-shimmer"></div>
                        ))}
                    </div>
                ) : activities.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activities.map((activity, index) => (
                            <div key={activity.id} data-aos="fade-up" data-aos-delay={(index % 3) * 100}>
                                <div className="bg-background rounded-2xl p-6 h-full shadow-lg hover:shadow-xl transition-all border border-transparent group hover:border-orange/50">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-500/10">
                                            <Calendar className="w-6 h-6 text-orange" />
                                        </div>
                                        <h3 className="text-lg font-bold">{activity.title}</h3>
                                    </div>

                                    <p className="text-foreground/80 mb-4">{activity.description}</p>

                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm pt-4 text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4 text-orange" />
                                            <span>{activity.time_info}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="w-4 h-4 text-orange" />
                                            <span>{activity.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-muted-foreground py-12">Tidak ada aktivitas.</p>
                )}
            </div>
        </section>
    )
}
