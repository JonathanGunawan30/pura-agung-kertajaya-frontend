import { getOrganizationMembers } from "@/lib/api"
import OrganizationContent from "@/components/pages/organization-content"

export default async function YayasanOrgPage() {
    const data = await getOrganizationMembers("pasraman")
    
    return (
        <OrganizationContent 
            initialData={data} 
            entityType="pasraman" 
            title="Struktur Organisasi"
            subtitle="Pasraman Kertajaya"
        />
    )
}