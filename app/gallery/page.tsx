import { getGalleryData } from "@/lib/api"
import GalleryContent from "@/components/pages/gallery-content"

export const metadata = {
    title: 'Galeri Foto - Pura Agung Kertajaya',
    description: 'Dokumentasi kegiatan keagamaan, budaya, dan sosial di Pura Agung Kertajaya.',
}

export default async function GalleryPage() {
    const galleryData = await getGalleryData()
    return <GalleryContent initialData={galleryData} />
}