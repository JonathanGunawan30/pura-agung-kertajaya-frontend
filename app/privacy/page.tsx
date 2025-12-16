import type { Metadata } from "next"
import { Shield, Eye, Server, ExternalLink, RefreshCw, Mail } from "lucide-react"
import { getContactData } from "@/lib/api"

export const metadata: Metadata = {
    title: "Kebijakan Privasi | Pura Agung Kertajaya",
    description: "Kebijakan privasi mengenai penggunaan data dan informasi di website Pura Agung Kertajaya.",
}

export default async function PrivacyPage() {
    const contact = await getContactData()
    const email = contact?.email || "info@puraagungkertajaya.com"
    const lastUpdated = "10 Desember 2025"

    return (
        <section className="min-h-screen py-24 bg-gray-50 dark:bg-gray-950">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">

                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Shield className="w-8 h-8 text-orange-600" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Kebijakan Privasi
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Terakhir Diperbarui: <span className="font-medium text-orange-600">{lastUpdated}</span>
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800">

                    <div className="space-y-12">

                        <div className="prose dark:prose-invert max-w-none">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                Selamat datang di website resmi <strong>Pura Agung Kertajaya</strong>.
                                Kami menghargai privasi Anda dan berkomitmen untuk transparan mengenai bagaimana informasi dikelola dalam website ini.
                                Secara umum, website ini bersifat informatif dan <strong>tidak mengumpulkan data pribadi</strong> pengunjung secara aktif (seperti pendaftaran akun atau formulir online).
                            </p>
                        </div>

                        <hr className="border-gray-100 dark:border-gray-800" />

                        <div className="flex gap-6">
                            <div className="shrink-0 hidden md:block">
                                <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600">
                                    <Eye className="w-6 h-6" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                                    <span className="md:hidden text-orange-600"><Eye className="w-5 h-5" /></span>
                                    Informasi & Data Testimonial
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Website ini menampilkan informasi umum mengenai kegiatan, fasilitas, serta dokumentasi visual Pura.
                                    Terkait data pribadi, satu-satunya bagian yang memuat informasi personal adalah halaman <strong>Kata Mereka (Testimonial)</strong>.
                                </p>
                                <ul className="mt-4 space-y-2 list-disc list-inside text-gray-600 dark:text-gray-400 ml-1">
                                    <li>Data berupa nama, foto profil, dan komentar bersumber dari <strong>ulasan publik Google Maps</strong>.</li>
                                    <li>Informasi tersebut disalin secara manual dan disimpan di database internal hanya untuk keperluan tampilan website.</li>
                                    <li>Kami tidak memproses data tersebut untuk keperluan pemasaran atau pihak ketiga lainnya.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="shrink-0 hidden md:block">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                                    <Server className="w-6 h-6" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                                    <span className="md:hidden text-blue-600"><Server className="w-5 h-5" /></span>
                                    Log Data Teknis
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Seperti kebanyakan website, penyedia layanan hosting kami mungkin mencatat data teknis standar secara otomatis (server logs) yang bersifat non-pribadi, meliputi:
                                </p>
                                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400 text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                                    <li className="flex items-center gap-2">Alamat Protokol Internet (IP Address)</li>
                                    <li className="flex items-center gap-2">Tipe Browser dan Perangkat</li>
                                    <li className="flex items-center gap-2">Halaman yang dikunjungi dan waktu akses</li>
                                </ul>
                                <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
                                    Data ini digunakan semata-mata untuk analisis keamanan dan stabilitas website.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="shrink-0 hidden md:block">
                                <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600">
                                    <ExternalLink className="w-6 h-6" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                                    <span className="md:hidden text-purple-600"><ExternalLink className="w-5 h-5" /></span>
                                    Tautan Pihak Ketiga
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Website ini memuat tautan atau embed dari layanan eksternal, khususnya <strong>Google Maps</strong>.
                                    Harap diperhatikan bahwa kami tidak memiliki kendali atas kebijakan privasi atau konten situs pihak ketiga tersebut.
                                    Kami menyarankan Anda untuk meninjau kebijakan privasi masing-masing layanan.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="shrink-0 hidden md:block">
                                <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600">
                                    <RefreshCw className="w-6 h-6" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                                    <span className="md:hidden text-green-600"><RefreshCw className="w-5 h-5" /></span>
                                    Pembaruan Kebijakan
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Kebijakan privasi ini dapat kami perbarui sewaktu-waktu untuk mencerminkan perubahan operasional atau hukum.
                                    Setiap perubahan akan ditandai dengan tanggal "Terakhir Diperbarui" di bagian atas halaman ini.
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                        <p className="text-gray-500 dark:text-gray-400 text-center text-sm">
                            Jika Anda memiliki pertanyaan mengenai kebijakan ini, silakan hubungi kami melalui email: <br className="md:hidden" />
                            <a href={`mailto:${email}`} className="text-orange-600 hover:text-orange-700 font-medium ml-1 inline-flex items-center gap-1 transition-colors">
                                <Mail className="w-3 h-3" /> {email}
                            </a>
                        </p>
                    </div>

                </div>
            </div>
        </section>
    )
}