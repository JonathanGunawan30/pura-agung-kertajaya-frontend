import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ketentuan Layanan | Pura Agung Kertajaya",
}

export default function TermsPage() {
  return (
    <section className="py-20 md:py-32 bg-muted">
      <div className="section-container max-w-4xl">

        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Ketentuan Layanan
        </h1>

        <div
          className="w-20 h-1 mx-auto mb-12"
          style={{ backgroundColor: "var(--orange)" }}
        ></div>

        <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">

          <p>
            Ketentuan layanan ini menjelaskan aturan dasar penggunaan website
            Pura Agung Kertajaya. Dengan mengakses website ini, Anda dianggap
            telah memahami dan menyetujui ketentuan berikut.
          </p>

          <h2 className="text-2xl font-semibold text-foreground">Penggunaan Website</h2>
          <p>
            Website ini bertujuan untuk menyediakan informasi umum mengenai kegiatan,
            fasilitas, dan profil Pura Agung Kertajaya. Anda setuju untuk tidak
            menggunakan informasi ini untuk tujuan yang melanggar hukum atau merusak
            reputasi pura.
          </p>

          <h2 className="text-2xl font-semibold text-foreground">Keakuratan Informasi</h2>
          <p>
            Kami berupaya menampilkan informasi yang tepat dan terbaru, namun jadwal
            kegiatan maupun konten lain dapat berubah sewaktu-waktu. Silakan hubungi
            pengurus jika memerlukan konfirmasi terbaru.
          </p>

          <h2 className="text-2xl font-semibold text-foreground">Hak Kekayaan Intelektual</h2>
          <p>
            Seluruh teks, gambar, dan konten website merupakan milik Pura Agung
            Kertajaya atau bersumber dari layanan publik seperti Google Maps.
            Dilarang menyalin atau menggunakan konten tanpa izin.
          </p>

          <h2 className="text-2xl font-semibold text-foreground">Batasan Tanggung Jawab</h2>
          <p>
            Kami tidak bertanggung jawab atas kerugian yang timbul akibat perubahan
            jadwal, kesalahan informasi, atau gangguan teknis pada layanan pihak ketiga.
          </p>

          <h2 className="text-2xl font-semibold text-foreground">Perubahan Ketentuan</h2>
          <p>
            Ketentuan layanan dapat diperbarui sewaktu-waktu tanpa pemberitahuan.
            Periksa halaman ini secara berkala untuk mengetahui perubahan terbaru.
          </p>

        </div>
      </div>
    </section>
  )
}
