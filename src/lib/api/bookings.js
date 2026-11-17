const base_url = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${base_url}/api`;


export async function fetchAllBookings() {
    try {
        const response = await fetch(`${API_BASE_URL}/puja-bookings/admin/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Failed to fetch bookings:", error);
        return { success: false, message: error.message };
    }
}

export async function trackBookingByReference(referenceCode) {
    try {
        const response = await fetch(`${API_BASE_URL}/puja-bookings/track/${referenceCode}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(`Failed to track booking with reference ${referenceCode}:`, error);
        return { success: false, message: error.message };
    }
}