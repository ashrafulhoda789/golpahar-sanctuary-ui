const base_url = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${base_url}/api`;

export const getAllNotices = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/notices`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    console.error("Error fetching notices:", error);
    return { success: false, message: "Network error while fetching notices" };
  }
};

export const getNoticeById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/notices/${id}`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    console.error("Error fetching notice details:", error);
    return { success: false, message: "Network error while fetching notice details" };
  }
};