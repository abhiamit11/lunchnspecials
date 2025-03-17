import axios from "axios";

const env = import.meta.env;
export const headers = { Authorization: `Bearer ` };
export const API_URL: string | undefined = env.VITE_API_URL || "";

axios.defaults.baseURL = API_URL;
