const base_url = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${base_url}/api`;

export async function fetchPujas() {
    try {
        const response = await fetch(`${API_BASE_URL}/pujas`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Failed to fetch pujas:", error);
        return { success: false, message: error.message };
    }
}

export async function fetchPujaById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/pujas/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(`Failed to fetch puja with id ${id}:`, error);
        return { success: false, message: error.message };
    }
}