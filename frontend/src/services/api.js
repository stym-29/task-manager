import axios from "axios";

const API = axios.create({
  baseURL: "https://team-task-manager-production-8ecc.up.railway.app/api"
});

// Attach token automatically
API.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem("token");

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  },

  (error) => {

    return Promise.reject(error);

  }

);

export default API;