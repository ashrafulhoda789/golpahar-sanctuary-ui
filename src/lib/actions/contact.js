const base_url = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${base_url}/api`;

export async function submitContactMessage(formData) {
    try {
        const response = await fetch(`${API_BASE_URL}/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Failed to submit contact message:", error);
        return { success: false, message: error.message };
    }
}

export async function markContactAsRead(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/contacts/${id}/read`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Failed to mark contact as read:", error);
        return { success: false, message: error.message };
    }
}

export async function replyContactMessage(id, replyMessage) {
    try {
        const response = await fetch(`${API_BASE_URL}/contacts/${id}/reply`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ replyMessage }),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Failed to reply to contact message:", error);
        return { success: false, message: error.message };
    }
}

export async function deleteContactMessage(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Failed to delete contact message:", error);
        return { success: false, message: error.message };
    }
}