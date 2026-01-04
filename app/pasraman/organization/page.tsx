import { getOrganizationMembers, getOrganizationDetails } from "@/lib/api"
import OrganizationContent from "@/components/pages/organization-content"

export default async function PasramanOrgPage() {
    const ENTITY_TYPE = "pasraman"

    const [membersData, detailsData] = await Promise.all([
        getOrganizationMembers(ENTITY_TYPE),
        getOrganizationDetails(ENTITY_TYPE)
    ])
    
    return (
        <OrganizationContent 
            initialData={membersData} 
            entityType={ENTITY_TYPE} 
            title="Struktur Organisasi"
            subtitle="Pasraman Kertajaya"
            structureImageUrl={detailsData?.structure_image_url}
        />
    )
}