const base_url = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${base_url}/api`;

export async function updateSiteSettings(payload) {
    try {
        const response = await fetch(`${API_BASE_URL}/contents`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            credentials: "include", 
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Failed to update Content");
        return result;
    } catch (error) {
        console.error("API Action Error:", error);
        throw error;
    }
}