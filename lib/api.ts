export async function getAboutData() {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/public/about`, {
            cache: "no-store",
        })

        if (!res.ok) {
            throw new Error("Failed to fetch data")
        }

        const json = await res.json()
        return json.data?.[0] || null
    } catch (error) {
        console.error("Error fetching about data:", error)
        return null
    }
}

export async function getGalleryData() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/public/galleries`, {
            cache: "no-store",
        })

        if (!res.ok) {
            throw new Error("Failed to fetch gallery data")
        }

        const json = await res.json()
        return json.data || []
    } catch (error) {
        console.error("Error fetching gallery data:", error)
        return []
    }
}

export async function getActivitiesData() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/public/activities`, {
            cache: "no-store",
        })

        if (!res.ok) throw new Error("Failed to fetch activities")

        const json = await res.json()
        return json.data || []
    } catch (error) {
        console.error("Error fetching activities:", error)
        return []
    }
}

export async function getFacilitiesData() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/public/facilities`, {
            cache: "no-store",
        })
        if (!res.ok) throw new Error("Failed to fetch facilities")
        const json = await res.json()
        return Array.isArray(json) ? json : json.data || []
    } catch (error) {
        console.error("Error fetching facilities:", error)
        return []
    }
}

export async function getTestimonialsData() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/public/testimonials`, {
            cache: "no-store",
        })
        if (!res.ok) throw new Error("Failed to fetch testimonials")
        const json = await res.json()
        return json.data || []
    } catch (error) {
        console.error("Error fetching testimonials:", error)
        return []
    }
}

export async function getContactData() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/public/contact-info`, {
            cache: "no-store",
        })

        if (!res.ok) throw new Error("Failed to fetch contact info")

        const json = await res.json()
        const data = Array.isArray(json) ? json : json.data || []
        return data.length > 0 ? data[0] : null
    } catch (error) {
        console.error("Error fetching contact info:", error)
        return null
    }
}

export async function getOrganizationMembers() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/public/organization-members`, {
            cache: "no-store",
        })

        if (!res.ok) throw new Error("Failed to fetch organization")

        const json = await res.json()
        return json.data || []
    } catch (error) {
        console.error("Error fetching organization:", error)
        return []
    }
}