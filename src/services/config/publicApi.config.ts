import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:9999/api/v1';

const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default publicApi;
