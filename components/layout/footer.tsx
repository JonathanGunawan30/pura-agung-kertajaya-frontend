"use client"

import { Mail, MapPin, Phone } from "lucide-react"
import { useEffect, useState } from "react"

interface ContactInfo {
    id: string
    address: string
    phone: string
    email: string
}

export default function Footer() {
    const [contactInfo, setContactInfo] = useState<ContactInfo[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                const res = await fetch("/api/public/contact-info")
                const data = await res.json()
                setContactInfo(Array.isArray(data) ? data : data.data || [])
            } finally {
                setLoading(false)
            }
        }
        fetchContactInfo()
    }, [])

    return (
        <footer className="bg-foreground text-background mt-20">
            <div className="section-container py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

                    <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                        <h3 className="text-2xl font-bold mb-4">Pura Agung Kertajaya</h3>
                        <p className="text-background/80 leading-relaxed">
                            Pura Agung Kertajaya adalah tempat suci umat Hindu di wilayah Tangerang yang menjadi pusat kegiatan spiritual, budaya, dan kebersamaan umat.
                        </p>
                    </div>

                    <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                        <h4 className="text-lg font-semibold mb-4">Tautan Cepat</h4>
                        <ul className="space-y-2 text-background/80">
                            <li><a href="#about" className="hover:text-orange transition-colors">Tentang Kami</a></li>
                            <li><a href="#gallery" className="hover:text-orange transition-colors">Galeri</a></li>
                            <li><a href="#activities" className="hover:text-orange transition-colors">Aktivitas</a></li>
                            <li><a href="/organization" className="hover:text-orange transition-colors">Struktur Organisasi</a></li>
                        </ul>
                    </div>

                    <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                        <h4 className="text-lg font-semibold mb-4">Hubungi Kami</h4>
                        <div className="space-y-3 text-background/80">
                            {!loading && contactInfo.length > 0 ? (
                                <>
                                    {contactInfo[0]?.address && (
                                        <div className="flex items-start gap-3">
                                            <MapPin className="w-5 h-5 text-orange mt-1" />
                                            <p className="text-sm">{contactInfo[0].address}</p>
                                        </div>
                                    )}
                                    {contactInfo[0]?.phone && (
                                        <div className="flex items-start gap-3">
                                            <Phone className="w-5 h-5 text-orange mt-1" />
                                            <p className="text-sm">{contactInfo[0].phone}</p>
                                        </div>
                                    )}
                                    {contactInfo[0]?.email && (
                                        <div className="flex items-start gap-3">
                                            <Mail className="w-5 h-5 text-orange mt-1" />
                                            <p className="text-sm">{contactInfo[0].email}</p>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <p className="text-sm">Informasi kontak sedang dimuat...</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="border-t border-background/20 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-background/70 text-sm">
                        <p>&copy; 2025 Pura Agung Kertajaya. Semua hak dilindungi.</p>
                        <div className="flex gap-6">
                            <a href="/privacy" className="hover:text-orange transition-colors">Privasi</a>
                            <a href="/terms" className="hover:text-orange transition-colors">Ketentuan Layanan</a>
                            <a href="/sitemap.xml" className="hover:text-orange transition-colors">Sitemap</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
