const base_url = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${base_url}/api`;

export async function submitDonation(formData) {
    try {
        const response = await fetch(`${API_BASE_URL}/donations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Failed to submit donation:", error);
        return { success: false, message: error.message };
    }
}

export async function updateDonationStatus(id, status) {
    try {
        const response = await fetch(`${API_BASE_URL}/donations/${id}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ status }),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Failed to update donation status:", error);
        return { success: false, message: error.message };
    }
}

export async function deleteDonation(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/donations/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Failed to delete donation:", error);
        return { success: false, message: error.message };
    }
}