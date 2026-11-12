const base_url = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${base_url}/api`;

export async function fetchSiteSettings() {
    try {
        const response = await fetch(`${API_BASE_URL}/contents`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Failed to fetch Contents");
        return result.data;
    } catch (error) {
        console.error("API GET Error:", error);
        throw error;
    }
}