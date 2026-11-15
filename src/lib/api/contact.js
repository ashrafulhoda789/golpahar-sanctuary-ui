const base_url = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${base_url}/api`;

export async function fetchContactMessages(token) {
    try {
        const response = await fetch(`${API_BASE_URL}/contacts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            credentials: 'include' 
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Failed to fetch contact messages:", error);
        return { success: false, message: error.message };
    }
}