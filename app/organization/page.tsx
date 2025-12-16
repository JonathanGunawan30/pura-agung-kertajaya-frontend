import { getOrganizationMembers } from "@/lib/api"
import OrganizationContent from "@/components/pages/organization-content"

export const metadata = {
    title: 'Struktur Organisasi - Pura Agung Kertajaya',
    description: 'Susunan pengurus dan struktur organisasi Banjar Pura Agung Kertajaya.',
}

export default async function OrganizationPage() {
    const members = await getOrganizationMembers()

    return <OrganizationContent initialData={members} />
}