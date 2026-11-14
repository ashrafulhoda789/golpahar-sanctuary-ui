const base_url = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${base_url}/api`;

export const getAllEvents = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/events`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await res.json();
    } catch (error) {
        console.error("Error fetching events:", error);
        return { success: false, message: "Network error while fetching events" };
    }
};

export const getEventById = async (id) => {
    try {
        const res = await fetch(`${API_BASE_URL}/events/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await res.json();
    } catch (error) {
        console.error("Error fetching event details:", error);
        return { success: false, message: "Network error while fetching event details" };
    }
};