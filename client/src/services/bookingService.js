import axios from "../utils/axiosInstance";

export const bookingService = {
  async validateBooking(id, data) {
    try {
      const response = await axios.get(`/booking/${id}`, {
        params: {
          date: data.date,
          time: data.startTime,
        },
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
          Authorization: "Bearer your_token_here", // Optional: Set Authorization header
        },
      });
      return response.data.isAvailable;
    } catch (err) {
      return null;
    }
  },

  async createBooking(bookingData) {
    try {
      const response = await axios.post(`/booking`, bookingData, {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
          Authorization: "Bearer your_token_here", // Optional: Set Authorization header
        },
      });
      return response.data.isAvailable;
    } catch (err) {
      return null;
    }
  },
};
