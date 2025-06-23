import axios from "../utils/axiosInstance";

export const userService = {
  async editUser(id, updatedUser) {
    try {
      const response = await axios.put(`user/${id}`, updatedUser);
      return response.data;
    } catch (error) {
      throw new Error("Failed to update task");
    }
  },
};
