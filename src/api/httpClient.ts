import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-cache" },
});

export default httpClient;
