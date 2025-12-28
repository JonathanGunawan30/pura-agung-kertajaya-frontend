import "server-only";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const DEFAULT_REVALIDATE = 60;
const GLOBAL_REVALIDATE = 600;

async function fetchData(endpoint: string, revalidateSeconds = DEFAULT_REVALIDATE) {
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            next: { revalidate: revalidateSeconds },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch ${endpoint}: ${res.status} ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return null;
    }
}

export async function getHeroSlides(type: string) {
    const json = await fetchData(`/api/public/hero-slides?entity_type=${type}`);
    return json?.data || [];
}

export async function getSiteIdentity(type: string) {
    const json = await fetchData(`/api/public/site-identity?entity_type=${type}`, GLOBAL_REVALIDATE);
    const data = json?.data;
    return Array.isArray(data) ? data[0] : (data ?? null);
}

export async function getAboutData(type: string) {
    const json = await fetchData(`/api/public/about?entity_type=${type}`);
    const data = json?.data;
    return Array.isArray(data) ? data[0] : (data ?? null);
}

export async function getGalleryData(type: string) {
    const json = await fetchData(`/api/public/galleries?entity_type=${type}`);
    return json?.data || [];
}

export async function getActivitiesData(type: string) {
    const json = await fetchData(`/api/public/activities?entity_type=${type}`);
    return json?.data || [];
}

export async function getFacilitiesData(type: string) {
    const json = await fetchData(`/api/public/facilities?entity_type=${type}`);
    if (!json) return [];
    return Array.isArray(json) ? json : (json.data || []);
}

export async function getTestimonialsData(type?: string) {
    const endpoint = type ? `/api/public/testimonials?entity_type=${type}` : "/api/public/testimonials";
    const json = await fetchData(endpoint);
    return json?.data || [];
}

export async function getContactData(type: string) {
    const json = await fetchData(`/api/public/contact-info?entity_type=${type}`, GLOBAL_REVALIDATE);
    const data = json?.data || (Array.isArray(json) ? json : []);
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
}

export async function getOrganizationMembers(type: string) {
    const json = await fetchData(`/api/public/organization-members?entity_type=${type}`);
    return json?.data || [];
}

export async function getRemarks(type: string){
    const json = await fetchData(`/api/public/remarks?entity_type=${type}`);
    return json?.data || [];
}

export async function getOrganizationDetails(type: string){
    const json = await fetchData(`/api/public/organization-details?entity_type=${type}`);
    return json?.data || [];
}