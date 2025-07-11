import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const apiService = {
  async getTurfs() {
    try {
      const response = await axios.get(`${apiUrl}turf`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch turfs");
    }
  },
  async getOwnerTurfs(id) {
    try {
      const response = await axios.get(`${apiUrl}turf/owner/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch turfs");
    }
  },
  async getOneTurf(id) {
    try {
      const response = await axios.get(`${apiUrl}turf/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch turf");
    }
  },

  // async addTurf(turf) {
  //   try {
  //     const response = await axios.post(`${apiUrl}turf`, turf, {
  //       headers: {
  //         "Content-Type": "application/json", // Set the content type to JSON
  //         Authorization: "Bearer your_token_here", // Optional: Set Authorization header
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     throw new Error("Failed to create turf");
  //   }
  // },

  async addTurf(formDataFD) {
    axios.post(`${apiUrl}turf`, formDataFD, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  async editTurf(id, turf) {
    try {
      const response = await axios.put(`${apiUrl}turf/${id}`, turf, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to update turf");
    }
  },

  async deleteTurf(id) {
    try {
      await axios.delete(`${apiUrl}turf/${id}`);
    } catch (error) {
      throw new Error("Failed to delete turf");
    }
  },

  async searchTurf(turfName) {
    try {
      const response = await axios.get(
        `${apiUrl}turf/search?turfName=${turfName}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error during search:", error);
      throw new Error("Failed to search turf");
    }
  },
};

export default apiService;
