import type { Metadata } from "next"
import { FileText, CheckCircle, AlertCircle, Copyright, ShieldAlert, RefreshCw, Mail } from "lucide-react"
import { getContactData } from "@/lib/api"

export const metadata: Metadata = {
    title: "Ketentuan Layanan | Pura Agung Kertajaya",
    description: "Syarat dan ketentuan penggunaan website resmi Pura Agung Kertajaya.",
}

export default async function TermsPage() {
    const contact = await getContactData()
    const email = contact?.email || "info@puraagungkertajaya.com"
    const lastUpdated = "10 Desember 2025"

    return (
        <section className="min-h-screen py-24 bg-gray-50 dark:bg-gray-950">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">

                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <FileText className="w-8 h-8 text-orange-600" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Ketentuan Layanan
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Terakhir Diperbarui: <span className="font-medium text-orange-600">{lastUpdated}</span>
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800">

                    <div className="space-y-12">

                        <div className="prose dark:prose-invert max-w-none">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                Selamat datang di website <strong>Pura Agung Kertajaya</strong>.
                                Halaman ini menjelaskan aturan dasar penggunaan website kami. Dengan mengakses dan menggunakan situs ini,
                                Anda dianggap telah membaca, memahami, dan menyetujui ketentuan yang berlaku di bawah ini.
                            </p>
                        </div>

                        <hr className="border-gray-100 dark:border-gray-800" />

                        <div className="flex gap-6">
                            <div className="shrink-0 hidden md:block">
                                <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600">
                                    <CheckCircle className="w-6 h-6" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                                    <span className="md:hidden text-orange-600"><CheckCircle className="w-5 h-5" /></span>
                                    Tujuan Penggunaan
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Website ini bertujuan untuk menyediakan informasi umum mengenai kegiatan keagamaan, fasilitas, struktur organisasi, dan profil Pura Agung Kertajaya.
                                    Anda setuju untuk menggunakan informasi ini hanya untuk tujuan yang sah dan tidak melanggar hukum, serta tidak merusak reputasi Pura maupun komunitas umat.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="shrink-0 hidden md:block">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                                    <AlertCircle className="w-6 h-6" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                                    <span className="md:hidden text-blue-600"><AlertCircle className="w-5 h-5" /></span>
                                    Keakuratan Informasi & Jadwal
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Kami berupaya semaksimal mungkin untuk menampilkan informasi yang tepat dan terbaru. Namun, harap dicatat bahwa:
                                </p>
                                <ul className="mt-4 space-y-2 list-disc list-inside text-gray-600 dark:text-gray-400 ml-1">
                                    <li>Jadwal kegiatan atau acara dapat berubah sewaktu-waktu tergantung situasi di lapangan.</li>
                                    <li>Informasi kontak pengurus mungkin mengalami pembaruan.</li>
                                </ul>
                                <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm italic">
                                    *Kami menyarankan Anda menghubungi pengurus melalui kontak yang tersedia jika memerlukan konfirmasi mendesak.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="shrink-0 hidden md:block">
                                <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600">
                                    <Copyright className="w-6 h-6" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                                    <span className="md:hidden text-purple-600"><Copyright className="w-5 h-5" /></span>
                                    Hak Cipta & Konten
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Seluruh aset digital dalam website ini, termasuk namun tidak terbatas pada teks, logo, dan foto dokumentasi kegiatan,
                                    adalah milik Pura Agung Kertajaya atau digunakan dengan izin.
                                </p>
                                <p className="mt-3 text-gray-600 dark:text-gray-400">
                                    Dilarang keras menyalin, memodifikasi, atau mendistribusikan ulang konten website ini untuk tujuan komersial tanpa izin tertulis dari pengurus.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="shrink-0 hidden md:block">
                                <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600">
                                    <ShieldAlert className="w-6 h-6" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                                    <span className="md:hidden text-red-600"><ShieldAlert className="w-5 h-5" /></span>
                                    Batasan Tanggung Jawab
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Pengurus Pura Agung Kertajaya tidak bertanggung jawab atas kerugian langsung maupun tidak langsung yang timbul akibat:
                                </p>
                                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400 text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                                    <li className="flex items-center gap-2">Gangguan teknis yang menyebabkan website tidak dapat diakses.</li>
                                    <li className="flex items-center gap-2">Kesalahan interpretasi pengguna terhadap informasi yang disajikan.</li>
                                    <li className="flex items-center gap-2">Tautan ke situs pihak ketiga (seperti Google Maps) yang berada di luar kendali kami.</li>
                                </ul>
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
                                    Perubahan Ketentuan
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Ketentuan layanan ini dapat kami perbarui sewaktu-waktu tanpa pemberitahuan sebelumnya.
                                    Anda disarankan untuk memeriksa halaman ini secara berkala untuk mengetahui perubahan terbaru.
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                        <p className="text-gray-500 dark:text-gray-400 text-center text-sm">
                            Jika Anda memerlukan klarifikasi mengenai ketentuan ini, silakan hubungi kami via email: <br className="md:hidden" />
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