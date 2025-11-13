import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kebijakan Privasi | Pura Agung Kertajaya",
}

export default function PrivacyPage() {
  return (
    <section className="py-20 md:py-32 bg-muted">
      <div className="section-container max-w-4xl">

        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Kebijakan Privasi
        </h1>

        <div
          className="w-20 h-1 mx-auto mb-12"
          style={{ backgroundColor: "var(--orange)" }}
        ></div>

        <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">

          <p>
            Website Pura Agung Kertajaya dibuat untuk menyediakan informasi umum
            mengenai kegiatan, fasilitas, dan lokasi pura. Kami menghargai privasi
            setiap pengunjung dan memastikan bahwa website ini tidak mengumpulkan
            data pribadi secara aktif.
          </p>

          <h2 className="text-2xl font-semibold text-foreground">Informasi yang Kami Tampilkan</h2>
          <p>
            Website ini hanya menampilkan informasi umum mengenai kegiatan, fasilitas, 
            serta dokumentasi visual Pura Agung Kertajaya. Satu-satunya data pribadi yang ditampilkan 
            adalah pada halaman testimonial, berupa nama, foto, dan komentar yang bersumber dari ulasan 
            publik Google Maps. Informasi tersebut disalin secara manual oleh pengelola dan disimpan di database 
            internal hanya untuk keperluan tampilan website. Kami tidak mengumpulkan atau memproses data pribadi 
            dari pengunjung website.
          </p>

          <h2 className="text-2xl font-semibold text-foreground">Data Teknis</h2>
          <p>
            Hosting atau penyedia layanan web dapat mencatat data teknis non-pribadi
            seperti tipe browser, perangkat, dan halaman yang dikunjungi. Informasi ini
            bersifat umum dan tidak mengidentifikasi pengunjung secara spesifik.
          </p>

          <h2 className="text-2xl font-semibold text-foreground">Tautan Eksternal</h2>
          <p>
            Website ini mungkin memuat tautan ke situs eksternal seperti Google Maps.
            Kami tidak bertanggung jawab atas kebijakan privasi pada situs tersebut.
          </p>

          <h2 className="text-2xl font-semibold text-foreground">Perubahan Kebijakan</h2>
          <p>
            Kebijakan privasi ini dapat diperbarui sewaktu-waktu berdasarkan kebutuhan.
            Tanggal pembaruan terakhir akan ditampilkan pada halaman ini.
          </p>

        </div>
      </div>
    </section>
  )
}
