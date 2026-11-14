const base_url = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${base_url}/api`;


export const createEvent = async (eventData) => {
    try {
        const res = await fetch(`${API_BASE_URL}/events`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(eventData),
        });
        return await res.json();
    } catch (error) {
        console.error("Error creating event:", error);
        return { success: false, message: "Network error while creating event" };
    }
};

export const updateEvent = async (id, eventData) => {
    try {
        const res = await fetch(`${API_BASE_URL}/events/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(eventData),
        });
        return await res.json();
    } catch (error) {
        console.error("Error updating event:", error);
        return { success: false, message: "Network error while updating event" };
    }
};

export const updateEventStatus = async (id, eventStatus) => {
    try {
        const res = await fetch(`${API_BASE_URL}/events/${id}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ eventStatus }),
        });
        return await res.json();
    } catch (error) {
        console.error("Error updating event status:", error);
        return { success: false, message: "Network error while updating status" };
    }
};

export const deleteEvent = async (id) => {
    try {
        const res = await fetch(`${API_BASE_URL}/events/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
        return await res.json();
    } catch (error) {
        console.error("Error deleting event:", error);
        return { success: false, message: "Network error while deleting event" };
    }
};