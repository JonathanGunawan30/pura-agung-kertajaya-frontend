"use client"

import { useEffect } from "react"
import { Star, Quote } from "lucide-react"
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

interface TestimonialsSectionProps {
    initialData: Testimonial[]
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    return (
        <div className="
            relative shrink-0 mx-3
            w-[350px] md:w-[350px]
            h-[200px] md:h-[200px]
            p-5 md:p-6 rounded-2xl
            bg-gray-50 dark:bg-gray-800
            border border-gray-100 dark:border-gray-700
            shadow-sm hover:shadow-lg hover:shadow-orange-500/5 hover:-translate-y-1
            transition-all duration-500
            flex flex-col justify-between overflow-hidden
        ">
            <div className="absolute top-4 right-5 opacity-5 pointer-events-none">
                <Quote className="w-8 h-8 md:w-10 md:h-10 text-orange-500 fill-orange-500" />
            </div>

            <div>
                <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className="w-3.5 h-3.5"
                            color={i < testimonial.rating ? "#F97316" : "#E5E7EB"}
                            fill={i < testimonial.rating ? "#F97316" : "transparent"}
                        />
                    ))}
                </div>

                <div className="relative z-10">
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-4 md:line-clamp-2 italic">
                        "{testimonial.comment}"
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-gray-200 dark:border-gray-700 mt-auto">
                <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-gray-200 dark:border-gray-600 shrink-0">
                    <img
                        src={testimonial.avatar_url}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="min-w-0">
                    <p className="font-bold text-gray-900 dark:text-white text-sm truncate">
                        {testimonial.name}
                    </p>
                    <p className="text-[10px] text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wider">
                        Pengunjung
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function TestimonialsSection({ initialData }: TestimonialsSectionProps) {
    useEffect(() => {
        AOS.init({ duration: 700, once: true })
    }, [])

    if (!initialData || initialData.length === 0) return null;

    const displayData = initialData.length < 4 ? [...initialData, ...initialData, ...initialData] : initialData

    return (
        <section className="py-24 bg-white dark:bg-gray-950 relative border-t border-gray-100 dark:border-gray-800 w-full max-w-[100vw] overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 relative z-10 mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8" data-aos="fade-up">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="h-[2px] w-12 bg-orange-600"></div>
                            <span className="text-orange-600 dark:text-orange-600 text-sm font-bold tracking-[0.2em] uppercase">
                                Kata Mereka
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                            Pengalaman <span className="text-orange-600">Spiritual</span>
                        </h2>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md text-sm md:text-base leading-relaxed text-left md:text-right">
                        Kesan tulus dari para pengunjung yang telah merasakan kedamaian dan keharmonisan di Pura Agung Kertajaya.
                    </p>
                </div>
            </div>

            <div className="relative z-10 w-full overflow-hidden">
                <Marquee
                    pauseOnHover
                    gradient={true}
                    gradientColor="var(--marquee-bg-white, #ffffff)"
                    gradientWidth={100}
                    speed={40}
                    className="py-4 overflow-hidden"
                >
                    {displayData.map((testimonial, index) => (
                        <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
                    ))}
                </Marquee>
            </div>
        </section>
    )
}