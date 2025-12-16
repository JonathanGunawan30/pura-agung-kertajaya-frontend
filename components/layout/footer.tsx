import Link from "next/link"
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react"
import { getContactData } from "@/lib/api"

export default async function Footer() {
    const contact = await getContactData()

    return (
        <footer className="bg-white dark:bg-gray-950 pt-20 pb-10 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-6 md:px-12">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Pura Agung <span className="text-orange-600">Kertajaya</span>
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-4 leading-relaxed">
                                Tempat suci umat Hindu di Tangerang yang menjadi pusat kegiatan spiritual, pelestarian budaya, dan kebersamaan umat yang harmonis.
                            </p>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                            <span className="w-8 h-[2px] bg-orange-600"></span> Jelajahi
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { name: "Beranda", href: "/" },
                                { name: "Tentang Kami", href: "/#about" },
                                { name: "Galeri Kegiatan", href: "/#gallery" },
                                { name: "Agenda & Jadwal", href: "/#activities" },
                                { name: "Fasilitas Pura", href: "/#facilities" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors flex items-center gap-2 group text-sm">
                                        <ArrowRight className="w-3 h-3 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-orange-600" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                            <span className="w-8 h-[2px] bg-orange-600"></span> Informasi
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { name: "Struktur Organisasi", href: "/organization" },
                                { name: "Hubungi Kami", href: "/#contact" },
                                { name: "Kebijakan Privasi", href: "/privacy" },
                                { name: "Syarat & Ketentuan", href: "/terms" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors text-sm">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                            <span className="w-8 h-[2px] bg-orange-600"></span> Kontak
                        </h4>
                        <div className="space-y-4">
                            {contact ? (
                                <>
                                    <div className="flex items-start gap-3 text-gray-500 dark:text-gray-400 text-sm">
                                        <MapPin className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                                        <span className="leading-relaxed">{contact.address}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                                        <Phone className="w-5 h-5 text-orange-600 shrink-0" />
                                        <span>{contact.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                                        <Mail className="w-5 h-5 text-orange-600 shrink-0" />
                                        <span className="break-all">{contact.email}</span>
                                    </div>
                                </>
                            ) : (
                                <p className="text-gray-500 text-sm italic">Memuat informasi kontak...</p>
                            )}
                        </div>
                    </div>

                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Pura Agung Kertajaya. All rights reserved.</p>
                    <p>Designed & Developed with <span className="text-red-500">❤</span> for the Community.</p>
                </div>
            </div>
        </footer>
    )
}