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

export async function getHeroSlides() {
    const json = await fetchData("/api/public/hero-slides");
    return json?.data || [];
}

export async function getSiteIdentity() {
    const json = await fetchData("/api/public/site-identity", GLOBAL_REVALIDATE);
    const data = json?.data;
    return Array.isArray(data) ? data[0] : (data ?? null);
}

export async function getAboutData() {
    const json = await fetchData("/api/public/about");
    const data = json?.data;
    return Array.isArray(data) ? data[0] : (data ?? null);
}

export async function getGalleryData() {
    const json = await fetchData("/api/public/galleries");
    return json?.data || [];
}

export async function getActivitiesData() {
    const json = await fetchData("/api/public/activities");
    return json?.data || [];
}

export async function getFacilitiesData() {
    const json = await fetchData("/api/public/facilities");
    if (!json) return [];
    return Array.isArray(json) ? json : (json.data || []);
}

export async function getTestimonialsData() {
    const json = await fetchData("/api/public/testimonials");
    return json?.data || [];
}

export async function getContactData() {
    const json = await fetchData("/api/public/contact-info", GLOBAL_REVALIDATE);
    const data = json?.data || (Array.isArray(json) ? json : []);
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
}

export async function getOrganizationMembers() {
    const json = await fetchData("/api/public/organization-members");
    return json?.data || [];
}
