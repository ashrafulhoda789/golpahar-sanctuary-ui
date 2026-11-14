const base_url = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${base_url}/api`;

export const createNotice = async (noticeData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/notices`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(noticeData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error creating notice:", error);
    return { success: false, message: "Network error while creating notice" };
  }
};

export const updateNotice = async (id, noticeData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/notices/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(noticeData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error updating notice:", error);
    return { success: false, message: "Network error while updating notice" };
  }
};

export const toggleNoticePin = async (id, isPinned) => {
  try {
    const res = await fetch(`${API_BASE_URL}/notices/${id}/pin`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ isPinned }),
    });
    return await res.json();
  } catch (error) {
    console.error("Error updating notice pin status:", error);
    return { success: false, message: "Network error while updating pin status" };
  }
};

export const deleteNotice = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/notices/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    console.error("Error deleting notice:", error);
    return { success: false, message: "Network error while deleting notice" };
  }
};