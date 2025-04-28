import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const signup = async (userData) => {
    return await axios.post(`${API_BASE_URL}/signup`, userData, { withCredentials: true });
  };
  
  export const login = async (userData) => {
    return await axios.post(`${API_BASE_URL}/login`, userData, { withCredentials: true });
  };

  export const getUserProfile = (userId) => {
    return axios.get(`${API_BASE_URL}/profile/${userId}`);
  };
  
  export const updateUserProfile = (userId, data) => {
    return axios.put(`${API_BASE_URL}/profile/${userId}`, data);
  };