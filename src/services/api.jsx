import axios from "axios";

const api = axios.create({
  baseURL: "https://bt-tracker-api.onrender.com",
});

export default api;
