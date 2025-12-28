import { getOrganizationMembers } from "@/lib/api"
import OrganizationContent from "@/components/pages/organization-content"

export default async function PuraOrgPage() {
    const data = await getOrganizationMembers("pura")
    
    return (
        <OrganizationContent 
            initialData={data} 
            entityType="pura" 
            title="Struktur Organisasi"
            subtitle="Banjar Pura Agung Kertajaya"
        />
    )
}