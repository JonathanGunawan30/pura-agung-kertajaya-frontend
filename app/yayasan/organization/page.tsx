import { getOrganizationMembers } from "@/lib/api"
import OrganizationContent from "@/components/pages/organization-content"

export default async function YayasanOrgPage() {
    const data = await getOrganizationMembers("yayasan")
    
    return (
        <OrganizationContent 
            initialData={data} 
            entityType="yayasan" 
            title="Struktur Organisasi"
            subtitle="Yayasan Vidya Kertajaya"
        />
    )
}