"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"
import Marquee from "react-fast-marquee"
import AOS from "aos"
import "aos/dist/aos.css"

interface Testimonial {
    id: string
    name: string
    comment: string
    rating: number
    avatar_url: string
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    return (
        <div className="shrink-0 w-[360px] md:w-[380px] mx-4 rounded-3xl p-6 bg-white/70 dark:bg-neutral-900/50 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_6px_20px_rgb(0,0,0,0.08)] hover:shadow-[0_10px_30px_rgb(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-1 h-[200px] flex flex-col justify-between mb-10">
            <div>
                <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className="w-4 h-4"
                            color={i < testimonial.rating ? "#FACC15" : "#d1d5db"}
                            fill={i < testimonial.rating ? "#FACC15" : "transparent"}
                        />
                    ))}
                </div>
                <p className="text-foreground/90 mb-4 text-sm leading-relaxed line-clamp-3">“{testimonial.comment}”</p>
            </div>
            <div className="flex items-center gap-3">
                <img src={testimonial.avatar_url} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover transition-transform duration-500 hover:scale-110" />
                <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">Pengunjung</p>
                </div>
            </div>
        </div>
    )
}

function TestimonialCardSkeleton() {
    return (
        <div className="shrink-0 w-[360px] md:w-[380px] mx-4 rounded-3xl p-8 bg-muted/30 backdrop-blur-xl border border-white/10 animate-pulse h-[330px]">
            <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-muted rounded-full"></div>
                ))}
            </div>
            <div className="space-y-3 mb-8">
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-4/6"></div>
                <div className="h-4 bg-muted rounded w-3/6"></div>
            </div>
            <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="w-14 h-14 bg-muted rounded-full"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                    <div className="h-3 bg-muted rounded w-1/4"></div>
                </div>
            </div>
        </div>
    )
}

export default function TestimonialsSection() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        AOS.init({ duration: 700, once: true })
    }, [])

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch("/api/public/testimonials")
                const data = await response.json()
                const items = data.data || []
                setTestimonials(items.length > 0 && items.length < 5 ? [...items, ...items, ...items] : items)
            } finally {
                setLoading(false)
            }
        }
        fetchTestimonials()
    }, [])

    return (
        <section className="py-20 md:py-32 bg-muted relative overflow-hidden">
            <div className="section-container relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight" data-aos="fade-up">Apa kata mereka</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                        Kesan tulus dari para pengunjung yang telah merasakan kedamaian di Pura Agung Kertajaya.
                    </p>
                </div>
            </div>

            <div className="mt-16 relative z-10">
                {loading ? (
                    <div className="flex overflow-x-hidden">
                        <TestimonialCardSkeleton />
                        <TestimonialCardSkeleton />
                        <TestimonialCardSkeleton />
                        <TestimonialCardSkeleton />
                    </div>
                ) : testimonials.length > 0 ? (
                    <Marquee pauseOnHover gradient gradientColor="hsl(var(--muted))" gradientWidth={120} speed={45}>
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
                        ))}
                    </Marquee>
                ) : (
                    <div className="text-center py-12 text-muted-foreground">Testimonial tidak tersedia saat ini.</div>
                )}
            </div>
        </section>
    )
}
