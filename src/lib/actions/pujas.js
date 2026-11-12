const base_url = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${base_url}/api`;


export async function createPuja(pujaData) {
    try {
        const response = await fetch(`${API_BASE_URL}/pujas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', 
            body: JSON.stringify(pujaData),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Failed to create puja:", error);
        return { success: false, message: error.message };
    }
}

export async function updatePuja(id, pujaData) {
    try {
        const response = await fetch(`${API_BASE_URL}/pujas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(pujaData),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(`Failed to update puja ${id}:`, error);
        return { success: false, message: error.message };
    }
}


export async function togglePujaStatus(id, isAvailable) {
    try {
        const response = await fetch(`${API_BASE_URL}/pujas/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ isAvailable }),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(`Failed to update status for puja ${id}:`, error);
        return { success: false, message: error.message };
    }
}

export async function deletePuja(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/pujas/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(`Failed to delete puja ${id}:`, error);
        return { success: false, message: error.message };
    }
}