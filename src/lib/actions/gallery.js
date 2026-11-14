const base_url = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${base_url}/api`;

export const createAlbum = async (albumData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/gallery/albums`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(albumData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error creating album:", error);
    return { success: false, message: "Network error while creating album" };
  }
};

export const deleteAlbum = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/gallery/albums/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    console.error("Error deleting album:", error);
    return { success: false, message: "Network error while deleting album" };
  }
};


export const uploadMedia = async (mediaData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/gallery/media`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(mediaData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error uploading media:", error);
    return { success: false, message: "Network error while uploading media" };
  }
};

export const updateMedia = async (id, mediaData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/gallery/media/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(mediaData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error updating media:", error);
    return { success: false, message: "Network error while updating media" };
  }
};

export const deleteMedia = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/gallery/media/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    console.error("Error deleting media:", error);
    return { success: false, message: "Network error while deleting media" };
  }
};