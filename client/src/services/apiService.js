import axios from "axios";

const apiUrl = "http://localhost:3000/";

const apiService = {
  async getTasks() {
    try {
      const response = await axios.get(`${apiUrl}turf`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch tasks");
    }
  },

  // async createTask(task) {
  //     try {
  //     const response = await axios.post(`${apiUrl}tasks`, task, {
  //         headers: {
  //         "Content-Type": "application/json", // Set the content type to JSON
  //         Authorization: "Bearer your_token_here", // Optional: Set Authorization header
  //         },
  //     });
  //     return response.data;
  //     } catch (error) {
  //     throw new Error("Failed to create task");
  //     }
  // },

  // async updateTask(id, task) {
  //     try {
  //     const response = await axios.put(`${apiUrl}tasks/${id}`, task);
  //     return response.data;
  //     } catch (error) {
  //     throw new Error("Failed to update task");
  //     }
  // },

  // async deleteTask(id) {
  //     try {
  //     await axios.delete(`${apiUrl}tasks/${id}`);
  //     } catch (error) {
  //     throw new Error("Failed to delete task");
  //     }
  // },
};

export default apiService;
