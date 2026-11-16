const base_url = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${base_url}/api`;

export async function fetchDonations() {
    try {
        const response = await fetch(`${API_BASE_URL}/donations`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Failed to fetch donations:", error);
        return { success: false, message: error.message };
    }
}