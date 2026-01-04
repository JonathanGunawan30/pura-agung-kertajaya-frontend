import { getOrganizationMembers, getOrganizationDetails } from "@/lib/api"
import OrganizationContent from "@/components/pages/organization-content"

export default async function PuraOrgPage() {
    const ENTITY_TYPE = "pura"

    const [membersData, detailsData] = await Promise.all([
        getOrganizationMembers(ENTITY_TYPE),
        getOrganizationDetails(ENTITY_TYPE)
    ])
    
    return (
        <OrganizationContent 
            initialData={membersData} 
            entityType={ENTITY_TYPE}
            title="Struktur Organisasi"
            subtitle="Banjar Pura Agung Kertajaya"
            structureImageUrl={detailsData?.structure_image_url} 
        />
    )
}