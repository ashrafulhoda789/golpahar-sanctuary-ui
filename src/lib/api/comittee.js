const base_url = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${base_url}/api`;

export const getAllCommitteeMembers = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/committee`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    console.error("Error fetching committee members:", error);
    return { success: false, message: "Network error while fetching committee members" };
  }
};

export const getCommitteeMemberById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/committee/${id}`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    console.error("Error fetching member details:", error);
    return { success: false, message: "Network error while fetching member details" };
  }
};