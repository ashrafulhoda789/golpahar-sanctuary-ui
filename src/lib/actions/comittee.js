const base_url = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${base_url}/api`;

export const createCommitteeMember = async (memberData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/committee`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(memberData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error creating committee member:", error);
    return { success: false, message: "Network error while creating committee member" };
  }
};

export const updateCommitteeMember = async (id, memberData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/committee/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(memberData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error updating committee member:", error);
    return { success: false, message: "Network error while updating committee member" };
  }
};

export const deleteCommitteeMember = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/committee/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    console.error("Error deleting committee member:", error);
    return { success: false, message: "Network error while deleting committee member" };
  }
};