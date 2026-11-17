const base_url = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${base_url}/api`;

export const createBooking = async (bookingData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/puja-bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error creating booking:", error);
    return { success: false, message: "Network error while creating booking" };
  }
};

export const submitBookingPayment = async (bookingId, paymentData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/puja-bookings/${bookingId}/payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error submitting payment:", error);
    return { success: false, message: "Network error while submitting payment" };
  }
};

export const updateBookingStatus = async (bookingId, statusData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/puja-bookings/admin/${bookingId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(statusData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error updating booking status:", error);
    return { success: false, message: "Network error while updating status" };
  }
};

export const scheduleBookingPuja = async (bookingId, scheduleData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/puja-bookings/admin/${bookingId}/schedule`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(scheduleData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error scheduling puja:", error);
    return { success: false, message: "Network error while scheduling puja" };
  }
};