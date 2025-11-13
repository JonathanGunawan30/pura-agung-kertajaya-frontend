"use client"

import { useEffect, useState } from "react"
import { X, ArrowDown, ArrowUp } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

interface Gallery {
    id: string
    title: string
    image_url: string
    description: string
}

export default function GallerySection() {
    const [galleries, setGalleries] = useState<Gallery[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState<Gallery | null>(null)
    const [showAll, setShowAll] = useState(false)
    const [isHiding, setIsHiding] = useState(false)

    useEffect(() => {
        AOS.init({ duration: 700, once: true })
    }, [])

    useEffect(() => {
        if (showAll) AOS.refresh()
    }, [showAll])

    useEffect(() => {
        const fetchGalleries = async () => {
            try {
                const res = await fetch("/api/public/galleries")
                const data = await res.json()
                setGalleries(data.data || [])
            } finally {
                setLoading(false)
            }
        }
        fetchGalleries()
    }, [])

    const visibleCount = showAll ? galleries.length : 6

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
        <section id="gallery" className="py-20 md:py-32 bg-background">
            <div className="section-container">
                <div className="text-center mb-16">
                    <h2 data-aos="fade-up" className="text-4xl md:text-5xl font-bold mb-4">Galeri</h2>
                    <div data-aos="fade-up" data-aos-delay="100" className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: "var(--orange)" }}></div>
                    <p data-aos="fade-up" data-aos-delay="200" className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Temukan keindahan dan keajaiban Pura Agung Kertajaya melalui koleksi foto kami
                    </p>
                </div>

                {loading ? (
                    <p className="text-center text-muted-foreground py-12">Memuat galeri...</p>
                ) : galleries.length === 0 ? (
                    <p className="text-center text-muted-foreground py-12">Galeri tidak tersedia.</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {galleries.slice(0, visibleCount).map((g, idx) => {
                                const isExiting = isHiding && idx >= 6
                                return (
                                    <div
                                        key={g.id}
                                        className={`cursor-pointer group ${isExiting ? "animate-fade-out-down" : ""}`}
                                        data-aos="fade-up"
                                        data-aos-delay={(idx % 3) * 100}
                                        onClick={() => setSelectedImage(g)}
                                    >
                                        <div className="relative overflow-hidden rounded-2xl h-64 bg-muted">
                                            <img src={g.image_url} alt={g.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition duration-300"></div>
                                            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                                                <h3 className="text-xl font-bold mb-2">{g.title}</h3>
                                                <p className="text-sm text-white/90">{g.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {galleries.length > 6 && (
                            <div className="mt-10 text-center" data-aos="fade-up" data-aos-delay="100">
                                <button
                                    onClick={handleToggleShowAll}
                                    disabled={isHiding}
                                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-orange border border-orange disabled:opacity-50 transition-all hover:text-white hover:-translate-y-0.5 hover:bg-[hsl(33_100%_50%)] hover:shadow-xl hover:shadow-[hsl(33_100%_50%)/0.3]"
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
                )}

                {selectedImage && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedImage(null)}>
                        <div className="relative max-w-4xl w-full max-h-[80vh] rounded-2xl overflow-hidden animate-scale-in" onClick={(e) => e.stopPropagation()}>
                            <img src={selectedImage.image_url} alt={selectedImage.title} className="w-full max-h-[80vh] object-contain" />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent p-6 animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
                                <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
                                <p className="text-white/90">{selectedImage.description}</p>
                            </div>
                            <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/40 transition">
                                <X className="w-6 h-6 text-white" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
