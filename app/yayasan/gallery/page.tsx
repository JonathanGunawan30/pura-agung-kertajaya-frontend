import { getGalleryData } from "@/lib/api"
import GalleryContent from "@/components/pages/gallery-content"

export const metadata = {
    title: 'Galeri Foto - Yayasan Vidya Kertajaya',
    description: 'Dokumentasi kegiatan sosial dan pendidikan.',
}

export default async function GalleryPage() {
    const galleryData = await getGalleryData("yayasan")
    return <GalleryContent initialData={galleryData} entityType="yayasan" />
}