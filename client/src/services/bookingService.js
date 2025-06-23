import axios from "../utils/axiosInstance";

export const bookingService = {
  async validateBooking(id, data) {
    try {
      const response = await axios.get(`/booking/validate/${id}`, {
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

  async getOwnerBookings(id, role) {
    try {
      if (role == "owner") {
        const response = await axios.get(`/booking/${id}`, {
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
            Authorization: "Bearer your_token_here", // Optional: Set Authorization header
          },
        });
        return response.data;
      } else {
        const response = await axios.get(`/booking/user/${id}`, {
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
            Authorization: "Bearer your_token_here", // Optional: Set Authorization header
          },
        });
        return response.data;
      }
    } catch (err) {
      return null;
    }
  },

  async getBookingDetails(id) {
    try {
      const response = await axios.get(`/booking/user/turf/${id}`, {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
          Authorization: "Bearer your_token_here", // Optional: Set Authorization header
        },
      });
      return response.data;
    } catch (err) {
      return null;
    }
  },

  async completeBooking(turfId, ownerId) {
    try {
      const response = await axios.put(
        `/booking/complete/`,
        {
          turfId: turfId,
          ownerId: ownerId,
        },
        {
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
        }
      );
      return response.message;
    } catch (err) {
      return null;
    }
  },
};
