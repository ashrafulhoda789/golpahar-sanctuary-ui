const base_url = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${base_url}/api`;

export const getAllAlbums = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/gallery/albums`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    console.error("Error fetching albums:", error);
    return { success: false, message: "Network error while fetching albums" };
  }
};


export const getAllMedia = async (queryParams = "") => {
  try {
    const res = await fetch(`${API_BASE_URL}/gallery/media${queryParams}`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    console.error("Error fetching media:", error);
    return { success: false, message: "Network error while fetching media" };
  }
};