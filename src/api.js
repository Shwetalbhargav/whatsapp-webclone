// src/api.js
import axios from 'axios';

const API_BASE =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || // Vite/Vercel
  process.env.REACT_APP_API_URL ||                                         // CRA
  'http://localhost:3000';                                                 // dev fallback

const api = axios.create({ baseURL: API_BASE });
export default api;
