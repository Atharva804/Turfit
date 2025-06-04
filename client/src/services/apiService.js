import axios from "axios";

const apiUrl = "http://localhost:3000/";

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

  async addTurf(turf) {
    try {
      const response = await axios.post(`${apiUrl}turf`, turf, {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
          Authorization: "Bearer your_token_here", // Optional: Set Authorization header
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to create turf");
    }
  },

  async editTurf(id, turf) {
    try {
      const response = await axios.put(`${apiUrl}turf/${id}`, turf);
      return response.data;
    } catch (error) {
      throw new Error("Failed to update task");
    }
  },

  // async deleteTask(id) {
  //     try {
  //     await axios.delete(`${apiUrl}tasks/${id}`);
  //     } catch (error) {
  //     throw new Error("Failed to delete task");
  //     }
  // },
};

export default apiService;
