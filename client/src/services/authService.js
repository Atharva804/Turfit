import axios from "../utils/axiosInstance";

export const fetchCurrentUser = async () => {
  try {
    const response = await axios.get("/auth/me");
    return response.data.user;
  } catch (err) {
    return null;
  }
};
