"use client"

import { useEffect, useState } from "react"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

interface ContactInfo {
    id: string
    address: string
    phone: string
    email: string
    visiting_hours: string
    map_embed_url: string
}

export default function ContactSection() {
    const [contact, setContact] = useState<ContactInfo | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        AOS.init({ duration: 700, once: true })
    }, [])

    useEffect(() => {
        const load = async () => {
            const res = await fetch("/api/public/contact-info")
            const data = await res.json()
            const arr = Array.isArray(data) ? data : data.data || []
            if (arr.length > 0) setContact(arr[0])
            setLoading(false)
        }
        load()
    }, [])

    return (
        <section id="contact" className="py-20 md:py-32 bg-muted">
            <div className="section-container">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4" data-aos="fade-up">Kontak & Lokasi</h2>
                    <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: "var(--orange)" }} data-aos="fade-up" data-aos-delay="100"></div>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                        Informasi resmi untuk menghubungi pengurus dan mengunjungi Pura Agung Kertajaya
                    </p>
                </div>

                {loading || !contact ? (
                    <p className="text-center text-muted-foreground">Memuat informasi...</p>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
                        <div className="space-y-10" data-aos="fade-right" data-aos-delay="300">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <MapPin className="w-6 h-6 text-orange" />
                                    <p className="font-semibold text-lg">Alamat</p>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">{contact.address}</p>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <Phone className="w-6 h-6 text-orange" />
                                    <p className="font-semibold text-lg">Telepon</p>
                                </div>
                                <p className="text-muted-foreground">{contact.phone}</p>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <Mail className="w-6 h-6 text-orange" />
                                    <p className="font-semibold text-lg">Email</p>
                                </div>
                                <p className="text-muted-foreground">{contact.email}</p>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <Clock className="w-6 h-6 text-orange" />
                                    <p className="font-semibold text-lg">Jam Kunjungan</p>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">{contact.visiting_hours}</p>
                            </div>
                        </div>

                        <div data-aos="fade-left" data-aos-delay="300">
                            <p className="font-semibold text-lg mb-3">Peta Lokasi</p>
                            <iframe
                                src={contact.map_embed_url}
                                loading="lazy"
                                allowFullScreen
                                className="w-full h-[430px] rounded-xl shadow-lg"
                            ></iframe>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
