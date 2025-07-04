import axios from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

client.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("accessToken");
  if (token) cfg.headers!["Authorization"] = `Bearer ${token}`;
  return cfg;
});

export default client;
