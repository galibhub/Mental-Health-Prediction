import axios from "axios";


const api = axios.create({
  baseURL: "http://127.0.0.1:8000",

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 15000,
});


// =====================================================
// ATTACH JWT TOKEN TO EVERY REQUEST
// =====================================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(
      "mh_token"
    );

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


export default api;