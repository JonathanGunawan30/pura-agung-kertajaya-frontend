"use client"

import { useEffect, useState } from "react"
import { X, ArrowDown, ArrowUp } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

interface Facility {
    id: string
    name: string
    description: string
    image_url: string
}

export default function FacilitiesSection() {
    const [facilities, setFacilities] = useState<Facility[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null)
    const [showAll, setShowAll] = useState(false)
    const [isHiding, setIsHiding] = useState(false)

    useEffect(() => {
        AOS.init({ duration: 700, once: true })
    }, [])

    useEffect(() => {
        if (showAll) AOS.refresh()
    }, [showAll])

    useEffect(() => {
        const fetchFacilities = async () => {
            try {
                const res = await fetch("/api/public/facilities")
                const data = await res.json()
                setFacilities(Array.isArray(data) ? data : data.data || [])
            } finally {
                setLoading(false)
            }
        }
        fetchFacilities()
    }, [])

    const visibleCount = showAll ? facilities.length : 8

    const handleToggleShowAll = () => {
        if (showAll) {
            setIsHiding(true)
            setTimeout(() => {
                setShowAll(false)
                setIsHiding(false)
            }, 500)
        } else setShowAll(true)
    }

    return (
        <section id="facilities" className="py-20 md:py-32 bg-background">
            <div className="section-container">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4" data-aos="fade-up">Fasilitas</h2>
                    <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: "var(--orange)" }} data-aos="fade-up" data-aos-delay="100"></div>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                        Nikmati berbagai fasilitas modern kami untuk kenyamanan pengunjung
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-[320px] rounded-2xl animate-shimmer"></div>
                        ))}
                    </div>
                ) : facilities.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {facilities.slice(0, visibleCount).map((facility, index) => {
                                const isExiting = isHiding && index >= 8
                                return (
                                    <div
                                        key={facility.id}
                                        data-aos="fade-up"
                                        data-aos-delay={(index % 4) * 100}
                                        className={`cursor-pointer group ${isExiting ? "animate-fade-out-down" : ""}`}
                                        onClick={() => setSelectedFacility(facility)}
                                    >
                                        <div className="group relative h-[320px] rounded-2xl shadow-lg overflow-hidden border border-transparent transition hover:shadow-xl hover:border-orange/50">
                                            <img src={facility.image_url} alt={facility.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                            <div className="absolute left-4 right-4 bottom-4 rounded-xl bg-black/40 backdrop-blur-lg p-4 max-h-[5rem] transition-all duration-300 group-hover:max-h-40">
                                                <h3 className="text-lg font-bold text-white mb-2">{facility.name}</h3>
                                                <p className="text-sm text-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">{facility.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {facilities.length > 8 && (
                            <div className="mt-10 text-center" data-aos="fade-up">
                                <button
                                    onClick={handleToggleShowAll}
                                    disabled={isHiding}
                                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-orange border border-orange disabled:opacity-50 transition-all hover:text-white hover:bg-[hsl(33_100%_50%)] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[hsl(33_100%_50%)/0.3]"
                                >
                                    <span>{showAll ? "Lihat Lebih Sedikit" : "Lihat Semua"}</span>
                                    {showAll ? (
                                        <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
                                    ) : (
                                        <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
                                    )}
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-center py-12 text-muted-foreground">Informasi fasilitas tidak tersedia.</p>
                )}

                {selectedFacility && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedFacility(null)}>
                        <div className="relative max-w-4xl w-full max-h-[80vh] rounded-2xl overflow-hidden animate-scale-in" onClick={(e) => e.stopPropagation()}>
                            <img src={selectedFacility.image_url} alt={selectedFacility.name} className="w-full h-auto max-h-[80vh] object-contain" />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent p-6 animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
                                <h3 className="text-2xl font-bold text-white mb-2">{selectedFacility.name}</h3>
                                <p className="text-white/90 leading-relaxed">{selectedFacility.description}</p>
                            </div>
                            <button onClick={() => setSelectedFacility(null)} className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/40 transition">
                                <X className="w-6 h-6 text-white" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
