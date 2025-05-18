
export const API_URL = String(import.meta.env.VITE_API_URL || "http://localhost:8000");
export const isDevelopment = import.meta.env.MODE === 'development';
